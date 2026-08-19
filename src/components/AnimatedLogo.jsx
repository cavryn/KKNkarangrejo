'use client';
import { useState, useEffect, useRef } from 'react';

export default function AnimatedLogo({ className = "h-12 sm:h-14 w-auto", dropShadow = false }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || videoFailed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animId;

    const processFrame = () => {
      if (video && video.videoWidth && video.videoHeight) {
        if (video.paused || video.ended) {
          video.play().catch(() => {});
        }

        // Downsample width to max 240px for ultra fast small logo rendering
        const targetWidth = Math.min(video.videoWidth, 240);
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

        for (let i = 0; i < len; i += 4) {
          if (data[i] < 35 && data[i + 1] < 35 && data[i + 2] < 35) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animId = requestAnimationFrame(processFrame);
    };

    video.play().catch(() => setVideoFailed(true));
    animId = requestAnimationFrame(processFrame);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [videoFailed]);

  if (videoFailed) {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <img
          src="/logo/logoonlyKKN.png"
          alt="Logo KKN Karangrejo"
          className={`w-full h-full object-contain ${dropShadow ? 'filter drop-shadow-md' : ''}`}
        />
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onError={() => setVideoFailed(true)}
        className="hidden"
      >
        <source src="/logo/transparanKKN.webm" type="video/webm" />
        <source src="/logo/transparanKKN.mp4" type="video/mp4" />
      </video>

      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain pointer-events-none ${
          dropShadow ? 'filter drop-shadow-[0_12px_24px_rgba(222,146,39,0.4)]' : ''
        }`}
      />
    </div>
  );
}
