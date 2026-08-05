'use client';
import { useState, useEffect, useRef } from 'react';

export default function SplashScreen({ onFinish, duration = 4800 }) {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animId;

    const processFrame = () => {
      if (video && !video.paused && !video.ended && video.videoWidth && video.videoHeight) {
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Eliminate black background pixels if present
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r < 35 && g < 35 && b < 35) {
            data[i + 3] = 0; // Transparent
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animId = requestAnimationFrame(processFrame);
    };

    video.play().catch(() => { });
    animId = requestAnimationFrame(processFrame);

    // Start fade out 800ms before finishing
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - 800);

    // Complete phase and unmount
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, duration);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-transparent overflow-hidden transition-all duration-800 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
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

      {/* Real-time Processed Canvas with Increased Scale */}
      <div className="relative w-full max-w-4xl sm:max-w-5xl md:max-w-6xl aspect-video flex items-center justify-center p-4 scale-125 sm:scale-150 md:scale-[1.65]">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none filter drop-shadow-[0_16px_40px_rgba(222,146,39,0.5)]"
        />
      </div>
    </div>
  );
}
