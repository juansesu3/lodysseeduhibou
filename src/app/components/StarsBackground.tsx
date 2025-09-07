'use client';
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function StarsBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine); // engine ahora es del tipo correcto
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#F3EFEA" },
        fpsLimit: 60,
        particles: {
          number: { value: 100, density: { enable: true, area: 800 } },
          color: { value: "#6B4C6B" },
          shape: { type: "circle" },
          opacity: {
            value: 1,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.3, sync: false },
          },
          size: { value: { min: 1, max: 2 } },
          move: { enable: true, speed: 0.2, direction: "none", random: true, straight: false, outModes: "out" },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
