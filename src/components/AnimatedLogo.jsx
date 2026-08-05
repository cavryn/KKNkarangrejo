'use client';
import { useEffect, useRef } from 'react';

export default function AnimatedLogo({ className = "h-12 sm:h-14 w-auto", dropShadow = false }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animId;

    const handlePlay = () => {
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }
    };

    const processFrame = () => {
      if (video && video.videoWidth && video.videoHeight) {
        // Ensure video keeps playing in a continuous loop
        if (video.paused || video.ended) {
          video.play().catch(() => { });
        }

        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Eliminate black background pixels for transparent rendering
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r < 35 && g < 35 && b < 35) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animId = requestAnimationFrame(processFrame);
    };

    video.addEventListener('ended', handlePlay);
    video.play().catch(() => { });
    animId = requestAnimationFrame(processFrame);

    return () => {
      cancelAnimationFrame(animId);
      if (video) {
        video.removeEventListener('ended', handlePlay);
      }
    };
  }, []);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Hidden Source Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="hidden"
      >
        <source src="/logo/transparanKKN.webm" type="video/webm" />
        <source src="/logo/transparanKKN.mp4" type="video/mp4" />
      </video>

      {/* Processed Transparent Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain pointer-events-none ${dropShadow ? 'filter drop-shadow-[0_16px_40px_rgba(222,146,39,0.5)]' : ''
          }`}
      />
    </div>
  );
}
