import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes: { x: number; y: number; r: number; d: number }[] = [];
    const maxSnowflakes = 100;

    for (let i = 0; i < maxSnowflakes; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1,
        d: Math.random() * maxSnowflakes,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      for (let i = 0; i < maxSnowflakes; i++) {
        const p = snowflakes[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
      requestAnimationFrame(draw);
    };

    let angle = 0;
    const update = () => {
      angle += 0.01;
      for (let i = 0; i < maxSnowflakes; i++) {
        const p = snowflakes[i];
        // Updating X and Y coordinates
        // We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        // Every particle has its own density which can be used to make the downward movement different for each flake
        // To make it more random, we can add a small radius to the cos function
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        // Sending flakes back from the top when it exits
        if (p.x > width + 5 || p.x < -5 || p.y > height) {
          if (i % 3 > 0) {
            // 66.67% of the flakes
            snowflakes[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d };
          } else {
            // If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              // Enter from the left
              snowflakes[i] = { x: -5, y: Math.random() * height, r: p.r, d: p.d };
            } else {
              // Enter from the right
              snowflakes[i] = { x: width + 5, y: Math.random() * height, r: p.r, d: p.d };
            }
          }
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    const animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="snow-container" />;
};

export default Snowfall;