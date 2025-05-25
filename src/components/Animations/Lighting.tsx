"use client";
import Lightning from '@/components/Animations/Backgroundlight';

const Lighting = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none mix-blend-screen">
        <Lightning
        hue={40}
        xOffset={0}
        speed={1}
        intensity={1}
        size={1}
        />
    </div>
  )
}

export default Lighting;