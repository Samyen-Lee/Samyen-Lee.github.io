"use client";

import { motion } from "framer-motion";

const shapes = [
  { type: "circle", x: "10%", y: "20%", size: 80, delay: 0, duration: 20 },
  { type: "square", x: "80%", y: "15%", size: 60, delay: -5, duration: 25 },
  { type: "triangle", x: "70%", y: "70%", size: 90, delay: -10, duration: 22 },
  { type: "circle", x: "25%", y: "75%", size: 50, delay: -3, duration: 18 },
  { type: "square", x: "50%", y: "40%", size: 40, delay: -8, duration: 24 },
  { type: "hexagon", x: "90%", y: "50%", size: 70, delay: -12, duration: 20 },
];

function Shape({ type, size }: { type: string; size: number }) {
  const stroke = "rgba(59, 130, 246, 0.15)";
  const sw = 1;

  if (type === "circle") {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
    );
  }
  if (type === "square") {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect x={2} y={2} width={size - 4} height={size - 4} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
    );
  }
  if (type === "triangle") {
    const h = size * 0.866;
    return (
      <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`}>
        <polygon points={`${size / 2},2 ${size - 2},${h - 2} 2,${h - 2}`} fill="none" stroke={stroke} strokeWidth={sw} />
      </svg>
    );
  }
  const r = size / 2 - 2;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${size / 2 + r * Math.cos(angle)},${size / 2 + r * Math.sin(angle)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={points} fill="none" stroke={stroke} strokeWidth={sw} />
    </svg>
  );
}

export default function GeometricShapesBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -10, 5, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "linear",
            delay: s.delay,
          }}
        >
          <Shape type={s.type} size={s.size} />
        </motion.div>
      ))}
    </div>
  );
}
