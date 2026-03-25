"use client";

export default function GradientMeshBg({ isVisible: _isVisible = true }: { isVisible?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="gradient-blob gradient-blob-1" />
      <div className="gradient-blob gradient-blob-2" />
      <div className="gradient-blob gradient-blob-3" />

      <style jsx>{`
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.12;
          animation: blobFloat 12s ease-in-out infinite;
        }
        .gradient-blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #3b82f6, transparent 70%);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }
        .gradient-blob-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #8b5cf6, transparent 70%);
          bottom: -5%;
          right: -5%;
          animation-delay: -4s;
          animation-duration: 15s;
        }
        .gradient-blob-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #06b6d4, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -8s;
          animation-duration: 18s;
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        .gradient-blob-3 {
          animation-name: blobFloat3;
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-45%, -55%) scale(1.1); }
          66% { transform: translate(-55%, -45%) scale(0.9); }
        }
      `}</style>
    </div>
  );
}
