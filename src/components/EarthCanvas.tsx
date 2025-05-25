"use client";
import dynamic from 'next/dynamic';
import { useTexture } from '@react-three/drei';


const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false });
const Stars = dynamic(() => import('@react-three/drei').then(mod => mod.Stars), { ssr: false });
const Sphere = dynamic(() => import('@react-three/drei').then(mod => mod.Sphere), { ssr: false });


import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const [earthTexture, bumpMap, specularMap, cloudsMap] = useTexture([
    '/assets/earth_atmos_2048.jpg',
    '/assets/earth_normal_2048.jpg',
    '/assets/earth_specular_2048.jpg',
    '/assets/earth_clouds_1024.png',
  ]);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sphere ref={earthRef} args={[1, 64, 64]} scale={2}>
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.1}
          specularMap={specularMap}
          specular={new THREE.Color('grey')}
          shininess={5}
        />
      </Sphere>
      <Sphere args={[1.02, 64, 64]} scale={2}>
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </>
  );
};

const EarthCanvas = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[-2, 5, 2]} intensity={1} />
    <Earth />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 2.5}
      maxPolarAngle={Math.PI / 1.5}
      autoRotate
      autoRotateSpeed={0.5}
    />
  </Canvas>
);

export default EarthCanvas;
