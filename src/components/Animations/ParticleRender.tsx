"use client";
import Particles from "./Particles"

const ParticleRender = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.2}
            particleBaseSize={200}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
        />
    </div>
  )
}

export default ParticleRender;