import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface UserPlanProps {
  x: number;
  y: number;
  z: number;
  color: string;
  lineColor?: string;
}

export default function Plan({ x, y, z, color, lineColor }: UserPlanProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const delay = 1; // 1초 딜레이

  useFrame((state, delta) => {
    if (!isDragging && state.clock.elapsedTime > delay && groupRef.current) {
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        -z,
        delta * 2,
      );
    }
  });

  const vertices = useMemo(
    () =>
      new Float32Array([
        -x,
        0,
        0, // 0
        -x,
        y,
        0, // 1
        0,
        y,
        0, // 2
        0,
        0,
        0, // 3
      ]),
    [x, y],
  );

  const indices = [0, 1, 2, 0, 2, 3];

  const points = useMemo(
    () => [
      new THREE.Vector3(-x, 0, 0),
      new THREE.Vector3(-x, y, 0),
      new THREE.Vector3(0, y, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-x, 0, 0),
    ],
    [x, y],
  );

  return (
    <group
      ref={groupRef}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
    >
      <mesh castShadow>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[vertices, 3]} />
          <bufferAttribute
            attach="index"
            args={[new Uint16Array(indices), 1]}
          />
        </bufferGeometry>
        <meshBasicMaterial
          color={color}
          side={THREE.DoubleSide}
          depthWrite={false}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
      <Line points={points} color={lineColor || "#024FCB"} lineWidth={1} />
    </group>
  );
}
