// Low-poly mesh geometry for the hero backdrop: scatter points, Delaunay-
// triangulate them once, then let each point orbit its home position so the
// mesh breathes without the triangulation ever degenerating.
//
// Why hand-rolled rather than a library: this runs exactly once per resize,
// never per frame, so the classic O(n^2) Bowyer-Watson is instant at our
// point count and saves pulling in a dependency for a single call site.
// ponytail: O(n^2) triangulation, fine at n<=220; swap in delaunator if the
// point count ever grows past a few hundred.

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
  // Deterministic layout so the mesh looks identical every load — same LCG
  // the retired cluster field used.
  let seed = 21;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const density = 0.000085;
  const count = Math.max(70, Math.min(210, Math.round(width * height * density)));

  // Jittered scatter, plus a margin ring so triangles run past every edge
  // instead of leaving a straight uncovered border.
  const margin = 0.14;
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      hx: (-margin + rand() * (1 + margin * 2)) * width,
      hy: (-margin + rand() * (1 + margin * 2)) * height,
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
  // Per-triangle fill alpha, biased brighter toward the lower-right so the
  // field reads as lit from one side rather than uniformly flat.
  const shades = tris.map((t) => {
    const cx = (points[t[0]].hx + points[t[1]].hx + points[t[2]].hx) / 3 / width;
    const cy = (points[t[0]].hy + points[t[1]].hy + points[t[2]].hy) / 3 / height;
    const bias = Math.min(1, Math.max(0, cx * 0.55 + cy * 0.45));
    return 0.012 + rand() * 0.055 + bias * 0.035;
  });

  function update(t) {
    for (const p of points) {
      p.x = p.hx + Math.cos(t * p.speed + p.phase) * p.amp;
      p.y = p.hy + Math.sin(t * p.speed * 0.85 + p.phase) * p.amp;
    }
  }

  function draw(ctx) {
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
      ctx.fillStyle = `rgba(37,99,235,${shades[i]})`;
      ctx.fill();
      ctx.strokeStyle = 'rgba(37,99,235,0.10)';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.accent ? p.dotSize * 1.5 : p.dotSize * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = p.accent ? 'rgba(29,78,216,0.75)' : 'rgba(37,99,235,0.28)';
      ctx.fill();
    }
  }

  return { update, draw };
}
