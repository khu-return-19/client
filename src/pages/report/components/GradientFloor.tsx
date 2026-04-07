import * as THREE from "three";
import { useMemo } from "react";

export default function GradientFloor({ size }: { size: number }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (!context) return null;

    const gradient = context.createLinearGradient(64, 0, 64, 128);

    gradient.addColorStop(0, "rgba(40, 118, 241, 0.4)"); // 시작점 색상
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.4)"); // 끝점 색상

    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  if (!texture) return null;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
