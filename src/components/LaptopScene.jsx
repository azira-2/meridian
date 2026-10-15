import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, RoundedBox } from '@react-three/drei';
import React, { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function makeScreenTexture() {
  const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 760;
  const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fbfcfb'; ctx.fillRect(0, 0, 1200, 760);
  ctx.fillStyle = '#142d38'; ctx.fillRect(0, 0, 195, 760);
  ctx.fillStyle = '#b7ded4'; ctx.font = '600 28px Arial'; ctx.fillText('meridian', 34, 58);
  for (let row = 0; row < 6; row += 1) { ctx.fillStyle = row === 0 ? '#345461' : '#24414d'; ctx.fillRect(22, 108 + row * 62, 150, 42); ctx.fillStyle = '#d4e0df'; ctx.fillRect(38, 123 + row * 62, 15, 12); ctx.fillRect(64, 124 + row * 62, 70 + (row % 2) * 28, 9); }
  ctx.fillStyle = '#6d7d7e'; ctx.font = '20px Arial'; ctx.fillText('Good morning, Alex', 240, 70);
  ctx.fillStyle = '#172b31'; ctx.font = '600 38px Arial'; ctx.fillText('Your money, in one place.', 240, 124);
  ctx.fillStyle = '#fff'; ctx.fillRect(235, 160, 425, 190); ctx.fillStyle = '#75817f'; ctx.font = '17px Arial'; ctx.fillText('Total balance', 266, 198);
  ctx.fillStyle = '#172b31'; ctx.font = '600 42px Arial'; ctx.fillText('$128,450.80', 266, 254);
  ctx.strokeStyle = '#69a99d'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(266, 313);
  [0, 30, 56, 92, 118, 164, 200, 240, 280, 320, 360].forEach((x, i) => ctx.lineTo(266 + x, 316 - [0, 13, 7, 23, 18, 32, 21, 40, 33, 47, 42][i])); ctx.stroke();
  for (let col = 0; col < 2; col += 1) { ctx.fillStyle = '#fff'; ctx.fillRect(686 + col * 220, 160, 195, 190); ctx.fillStyle = '#76827e'; ctx.font = '16px Arial'; ctx.fillText(col === 0 ? 'Checking' : 'Savings', 710 + col * 220, 200); ctx.fillStyle = '#1d3034'; ctx.font = '600 26px Arial'; ctx.fillText(col === 0 ? '$82,450' : '$46,000', 710 + col * 220, 250); }
  ctx.fillStyle = '#fff'; ctx.fillRect(235, 380, 865, 300); ctx.fillStyle = '#172b31'; ctx.font = '600 22px Arial'; ctx.fillText('Recent activity', 266, 422);
  for (let row = 0; row < 4; row += 1) { ctx.fillStyle = ['#ded9f3', '#d8eee8', '#f4e4dc', '#e4e5e2'][row]; ctx.beginPath(); ctx.arc(286, 475 + row * 48, 14, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#4f5f5d'; ctx.fillRect(317, 468 + row * 48, 170, 10); ctx.fillRect(317, 484 + row * 48, 112, 7); ctx.fillStyle = '#243536'; ctx.fillRect(970, 473 + row * 48, 72, 10); }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}

function Laptop({ progressRef }) {
  const rig = useRef(); const screenTexture = useMemo(makeScreenTexture, []); const keyRows = [14, 14, 13, 11];
  useFrame((state, delta) => {
    const zoom = THREE.MathUtils.smoothstep(progressRef.current, 0.06, 0.8);
    const cameraZ = THREE.MathUtils.lerp(8.3, -0.65, zoom);
    const targetZ = THREE.MathUtils.lerp(0.1, -10, zoom);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, cameraZ, 4.4, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, THREE.MathUtils.lerp(0.5, 0.34, zoom), 4.4, delta);
    state.camera.fov = THREE.MathUtils.damp(state.camera.fov, THREE.MathUtils.lerp(36, 31, zoom), 4.4, delta);
    state.camera.lookAt(0, THREE.MathUtils.lerp(-0.05, 0.34, zoom), targetZ); state.camera.updateProjectionMatrix();
    if (rig.current) { rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, THREE.MathUtils.lerp(-0.18, 0, zoom), 4, delta); rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, THREE.MathUtils.lerp(-0.07, 0, zoom), 4, delta); rig.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.025 * (1 - zoom); }
  });
  return <group ref={rig} position={[0, -0.28, 0]}>
    <group position={[0, 0.62, -0.12]} rotation={[-0.04, 0, 0]}>
      <RoundedBox args={[4.92, 3.12, 0.14]} radius={0.1} smoothness={4}><meshStandardMaterial color="#23292b" metalness={0.48} roughness={0.24} /></RoundedBox>
      <mesh position={[0, 0, 0.078]}><planeGeometry args={[4.69, 2.89]} /><meshBasicMaterial map={screenTexture} toneMapped={false} /></mesh>
      <mesh position={[0, -1.47, 0.08]}><sphereGeometry args={[0.025, 16, 16]} /><meshBasicMaterial color="#384448" /></mesh>
    </group>
    <RoundedBox args={[5.25, 0.16, 3.48]} radius={0.12} smoothness={5} position={[0, -0.99, 0.68]}><meshStandardMaterial color="#c5c9c7" metalness={0.82} roughness={0.25} /></RoundedBox>
    <mesh position={[0, -0.895, 0.65]}><boxGeometry args={[4.75, 0.018, 2.72]} /><meshStandardMaterial color="#afb5b3" metalness={0.65} roughness={0.36} /></mesh>
    {keyRows.map((count, row) => Array.from({ length: count }, (_, index) => { const width = row === 3 && index === 5 ? 1.2 : 0.245; const totalWidth = row === 3 ? 3.65 : 4.1; const x = (index - (count - 1) / 2) * (totalWidth / count); const z = -0.39 + row * 0.41; return <RoundedBox key={`${row}-${index}`} args={[width, 0.035, 0.24]} radius={0.025} smoothness={2} position={[x, -0.87, z]}><meshStandardMaterial color="#737b7a" metalness={0.3} roughness={0.48} /></RoundedBox>; }))}
    <RoundedBox args={[1.35, 0.012, 0.76]} radius={0.08} smoothness={4} position={[0, -0.875, 1.12]}><meshStandardMaterial color="#b8bfbd" metalness={0.5} roughness={0.3} /></RoundedBox>
    <mesh position={[0, -0.9, 2.33]} rotation={[-Math.PI / 2, 0, 0]}><boxGeometry args={[0.66, 0.025, 0.018]} /><meshStandardMaterial color="#7b8584" metalness={0.72} roughness={0.3} /></mesh>
  </group>;
}

export default function LaptopScene({ progressRef }) {
  return <Canvas className="laptop-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0.5, 8.3], fov: 36 }} gl={{ antialias: true, alpha: true }}>
    <Suspense fallback={null}><ambientLight intensity={1.2} /><directionalLight position={[-4, 6, 5]} intensity={3.1} /><pointLight position={[4, 2, 1]} color="#b7e0d6" intensity={42} distance={9} /><Laptop progressRef={progressRef} /><ContactShadows position={[0, -1.28, 0]} opacity={0.31} scale={8} blur={2.8} far={4} /><Environment preset="studio" /></Suspense>
  </Canvas>;
}