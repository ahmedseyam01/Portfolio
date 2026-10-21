// Pure CSS background: no blur filters and no JS animation loop, so it stays
// cheap on mobile GPUs (iOS Safari crashes on large animated blur layers).
const orbs = [
  { size: 600, top: "-10%", left: "-10%", color: "#C800DF", dur: 18, delay: 0 },
  { size: 500, top: "60%", left: "70%", color: "#E60076", dur: 22, delay: -3 },
  { size: 350, top: "40%", left: "30%", color: "#7c00df", dur: 26, delay: -6 },
];

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7) % 100,
  size: (i % 3) + 1.5,
  dur: 6 + (i % 5) * 1.6,
  delay: -(i % 4) * 1.3,
}));

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0a0a] overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #C800DF 1px, transparent 1px), linear-gradient(to bottom, #C800DF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbs: the radial gradient already fades out, so no blur filter is needed */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="bg-orb absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle, ${orb.color}1c 0%, ${orb.color}0a 35%, transparent 70%)`,
            animationDuration: `${orb.dur}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="bg-particle absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 2 === 0 ? "#C800DF" : "#E60076",
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
