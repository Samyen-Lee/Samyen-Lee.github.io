"use client";

export default function RadialGlowBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="radial-glow" />
      <div className="radial-ring" />

      <style jsx>{`
        .radial-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(37, 99, 235, 0.12) 0%,
            rgba(37, 99, 235, 0.04) 40%,
            transparent 70%
          );
          animation: glowPulse 5s ease-in-out infinite;
        }
        .radial-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(59, 130, 246, 0.08);
          animation: ringExpand 6s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes ringExpand {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.8); }
        }
      `}</style>
    </div>
  );
}
