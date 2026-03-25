"use client";

export default function AuroraBeamsBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="aurora-beam aurora-beam-1" />
      <div className="aurora-beam aurora-beam-2" />
      <div className="aurora-beam aurora-beam-3" />
      <div className="aurora-beam aurora-beam-4" />

      <style jsx>{`
        .aurora-beam {
          position: absolute;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            to top,
            transparent,
            rgba(59, 130, 246, 0.3),
            rgba(139, 92, 246, 0.15),
            transparent
          );
          animation: beamPulse 4s ease-in-out infinite;
        }
        .aurora-beam-1 {
          left: 15%;
          height: 70%;
          animation-delay: 0s;
        }
        .aurora-beam-2 {
          left: 35%;
          height: 85%;
          width: 1px;
          animation-delay: -1s;
          animation-duration: 5s;
        }
        .aurora-beam-3 {
          left: 65%;
          height: 60%;
          animation-delay: -2s;
          animation-duration: 4.5s;
        }
        .aurora-beam-4 {
          left: 85%;
          height: 75%;
          width: 1px;
          animation-delay: -3s;
          animation-duration: 5.5s;
        }
        @keyframes beamPulse {
          0%, 100% { opacity: 0.2; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(1.1); }
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f] opacity-60" />
    </div>
  );
}
