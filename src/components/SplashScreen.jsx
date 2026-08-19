'use client';
import { useState, useEffect, useRef } from 'react';

export default function SplashScreen({ onFinish, duration = 3800 }) {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Use a lightweight downsampled canvas resolution (e.g. max width 480px) to drastically reduce CPU load
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animId;

    const processFrame = () => {
      if (video && !video.paused && !video.ended && video.videoWidth && video.videoHeight) {
        // Scale down canvas for 10x faster pixel processing
        const targetWidth = Math.min(video.videoWidth, 480);
        const scale = targetWidth / video.videoWidth;
        const targetHeight = Math.round(video.videoHeight * scale);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }

        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
        
        const frame = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const data = frame.data;
        const len = data.length;

        // Key out black background fast
        for (let i = 0; i < len; i += 4) {
          if (data[i] < 35 && data[i + 1] < 35 && data[i + 2] < 35) {
            data[i + 3] = 0; // Make transparent
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animId = requestAnimationFrame(processFrame);
    };

    video.play().catch(() => {});
    animId = requestAnimationFrame(processFrame);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - 700);

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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50/95 backdrop-blur-md overflow-hidden transition-all duration-700 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
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

      {/* Rendered Transparent Canvas */}
      <div className="relative w-full max-w-2xl aspect-video flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none filter drop-shadow-[0_12px_32px_rgba(222,146,39,0.35)]"
        />
      </div>
    </div>
  );
}
