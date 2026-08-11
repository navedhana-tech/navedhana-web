import React from 'react';
import { Code2, Database, BarChart3 } from 'lucide-react';

const NODES = [
  { icon: <Code2 size={20} />, className: 'top-[9%] left-[7%] lg:left-[11%]' },
  { icon: <span className="font-display font-bold text-[13px]">AI</span>, className: 'top-[12%] right-[7%] lg:right-[11%]' },
  { icon: <Database size={20} />, className: 'top-[46%] left-[3%] lg:left-[8%]' },
  { icon: <BarChart3 size={20} />, className: 'top-[40%] right-[4%] lg:right-[9%]' },
];

const DotGrid = ({ className }) => (
  <div className={`absolute hidden lg:grid grid-cols-4 gap-2 opacity-30 ${className}`}>
    {Array.from({ length: 12 }).map((_, i) => (
      <span key={i} className="w-1 h-1 rounded-full bg-electric" />
    ))}
  </div>
);

// Decorative hero backdrop — a soft glow plus four icon nodes naming what the
// company actually builds (code, AI, data, analytics), echoing the logo
// mark's circuit-stem motif. Replaces the old abstract particle-network
// canvas (ParticleConstellation/clusterNetwork.js, retired) with something
// that reads as intentional rather than ambient noise.
const HeroCircuitBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div
      className="absolute left-1/2 top-[6%] -translate-x-1/2 w-[900px] h-[900px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(1,100,245,0.08) 0%, rgba(1,100,245,0) 65%)' }}
    />
    {NODES.map((n, i) => (
      <div key={i} className={`absolute hidden md:block ${n.className}`}>
        <div className="w-14 h-14 rounded-2xl bg-card border border-electric/20 shadow-sm flex items-center justify-center text-electric">
          {n.icon}
        </div>
      </div>
    ))}
    <DotGrid className="top-[6%] left-[20%]" />
    <DotGrid className="bottom-[16%] right-[22%]" />
  </div>
);

export default HeroCircuitBackground;
