// Low-poly mesh geometry for the hero backdrop: scatter points, Delaunay-
// triangulate them once, then let each point orbit its home position so the
// mesh breathes without the triangulation ever degenerating.
//
// Canvas2D, not WebGL/three.js — a few hundred filled triangles per frame is
// well within budget, and it skips WebGL context setup and a ~600KB+ bundle
// for an effect that doesn't need a real 3D camera.
//
// Why hand-rolled triangulation rather than a library: this runs exactly
// once per resize, never per frame, so the classic O(n^2) Bowyer-Watson is
// instant at our point count and saves pulling in a dependency for a single
// call site.
// ponytail: O(n^2) triangulation, fine at n<=220; swap in delaunator if the
// point count ever grows past a few hundred.

// Fixed reference "world" size (not tied to the live canvas size) — a
// narrow phone canvas then just shows a cropped window into the same-scale
// design instead of the whole thing being squeezed to fit. On a canvas
// bigger than the reference (an ultra-wide monitor), the world grows to
// match so it still covers edge-to-edge.
const REFERENCE_W = 1600;
const REFERENCE_H = 850;

const CIRCUM_EPSILON = 1e-12;

function circumcircle(a, b, c) {
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  if (Math.abs(d) < CIRCUM_EPSILON) return null;
  const a2 = a.x * a.x + a.y * a.y;
  const b2 = b.x * b.x + b.y * b.y;
  const c2 = c.x * c.x + c.y * c.y;
  const x = (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d;
  const y = (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d;
  return { x, y, r: Math.hypot(a.x - x, a.y - y) };
}

function triangulate(points) {
  const n = points.length;
  const far = 1e6;
  // Super-triangle vertices are appended past the real points, then any
  // triangle still referencing them is dropped at the end.
  const all = points.concat([
    { x: -far, y: -far },
    { x: far, y: -far },
    { x: 0, y: far },
  ]);
  let tris = [[n, n + 1, n + 2]];

  for (let i = 0; i < n; i++) {
    const p = all[i];
    const cavity = [];
    for (let t = tris.length - 1; t >= 0; t--) {
      const [i0, i1, i2] = tris[t];
      const cc = circumcircle(all[i0], all[i1], all[i2]);
      if (cc && Math.hypot(p.x - cc.x, p.y - cc.y) < cc.r) {
        cavity.push(tris[t]);
        tris.splice(t, 1);
      }
    }
    const edges = [];
    for (const [i0, i1, i2] of cavity) edges.push([i0, i1], [i1, i2], [i2, i0]);
    // An edge on the cavity boundary appears exactly once; shared edges twice.
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      let shared = false;
      for (let f = 0; f < edges.length; f++) {
        if (f === e) continue;
        const [c, d] = edges[f];
        if ((a === c && b === d) || (a === d && b === c)) { shared = true; break; }
      }
      if (!shared) tris.push([a, b, i]);
    }
  }

  return tris.filter((t) => t[0] < n && t[1] < n && t[2] < n);
}

export function createPolyMesh(width, height) {
  // Deterministic layout so the mesh looks identical every load.
  let seed = 21;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const worldW = Math.max(REFERENCE_W, width);
  const worldH = Math.max(REFERENCE_H, height);
  // Centers the (possibly larger-than-canvas) world in the canvas — on a
  // narrow phone canvas this is negative, i.e. the world is shifted left/up
  // so the canvas window looks at its middle rather than its edge.
  const offsetX = (width - worldW) / 2;
  const offsetY = (height - worldH) / 2;

  const density = 0.000045;
  const count = Math.max(70, Math.min(160, Math.round(worldW * worldH * density)));

  // Jittered scatter, plus a margin ring so triangles run past every edge
  // instead of leaving a straight uncovered border.
  const margin = 0.14;
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      hx: (-margin + rand() * (1 + margin * 2)) * worldW,
      hy: (-margin + rand() * (1 + margin * 2)) * worldH,
      amp: 6 + rand() * 16,
      speed: 0.18 + rand() * 0.32,
      phase: rand() * Math.PI * 2,
      // A minority of vertices render as solid accent dots.
      accent: rand() < 0.16,
      dotSize: 1 + rand() * 1.4,
      x: 0,
      y: 0,
    });
  }
  points.forEach((p) => { p.x = p.hx; p.y = p.hy; });

  const tris = triangulate(points.map((p) => ({ x: p.hx, y: p.hy })));

  // Per-triangle fill alpha — a handful of random "hotspots" pull nearby
  // triangles brighter, so the field reads as uneven patches of concentrated
  // blue fading into a mostly-empty field, rather than one smooth gradient.
  const hotspots = Array.from({ length: 3 }, () => ({
    x: rand() * worldW,
    y: rand() * worldH,
  }));
  const shades = tris.map((t) => {
    const cx = (points[t[0]].hx + points[t[1]].hx + points[t[2]].hx) / 3;
    const cy = (points[t[0]].hy + points[t[1]].hy + points[t[2]].hy) / 3;
    let glow = 0;
    for (const h of hotspots) {
      const d = Math.hypot(cx - h.x, cy - h.y) / worldH;
      glow = Math.max(glow, Math.max(0, 1 - d * 4.5));
    }
    return 0.05 + rand() * 0.06 + glow * glow * 0.32;
  });

  function update(t) {
    for (const p of points) {
      p.x = p.hx + Math.cos(t * p.speed + p.phase) * p.amp;
      p.y = p.hy + Math.sin(t * p.speed * 0.85 + p.phase) * p.amp;
    }
  }

  function draw(ctx) {
    ctx.save();
    ctx.translate(offsetX, offsetY);

    for (let i = 0; i < tris.length; i++) {
      const [a, b, c] = tris[i];
      const pa = points[a];
      const pb = points[b];
      const pc = points[c];
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.lineTo(pc.x, pc.y);
      ctx.closePath();
      ctx.fillStyle = `rgba(59,130,246,${shades[i]})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(96,165,250,${0.22 + shades[i] * 0.6})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }

    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.accent ? p.dotSize * 1.5 : p.dotSize * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = p.accent ? 'rgba(147,197,253,0.9)' : 'rgba(96,165,250,0.5)';
      ctx.fill();
    }

    ctx.restore();
  }

  return { update, draw };
}
