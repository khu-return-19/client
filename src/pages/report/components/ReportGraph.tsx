import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";

// components
import Plan from "./Plan";
import GradientFloor from "./GradientFloor";

function ResetCamera({
  controlsRef,
  isResetting,
  setIsResetting,
}: {
  controlsRef: any;
  isResetting: boolean;
  setIsResetting: (b: boolean) => void;
}) {
  const { camera } = useThree();
  const initialPosition = useMemo(() => new THREE.Vector3(4, 2.5, 4), []);

  useFrame((state, delta) => {
    if (isResetting) {
      camera.position.lerp(initialPosition, delta * 2);
      if (camera.position.distanceTo(initialPosition) < 0.01) {
        setIsResetting(false);
      }
    } else {
      controlsRef.current.enabled = true;
    }
  });

  return null;
}

function Axis() {
  const AXIS_COLOR = "#002983";
  const AXIS_LENGTH = 5; // 축 길이
  const HEAD_SIZE = 0.1; // 화살표 크기

  const lineGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, AXIS_LENGTH, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [AXIS_LENGTH]);

  const coneGeometry = useMemo(
    () => new THREE.ConeGeometry(HEAD_SIZE / 2, HEAD_SIZE, 8),
    [HEAD_SIZE],
  );

  return (
    <group>
      <GradientFloor size={10} />
      {/* Y축 */}
      <group>
        <primitive
          object={
            new THREE.Line(
              lineGeometry,
              new THREE.LineBasicMaterial({ color: AXIS_COLOR }),
            )
          }
        />
        <mesh geometry={coneGeometry} position={[0, AXIS_LENGTH, 0]}>
          <meshBasicMaterial color={AXIS_COLOR} />
        </mesh>
        {/* 축 라벨 */}
        <Text
          position={[0, AXIS_LENGTH + 0.4, 0]}
          fontSize={0.4}
          color={AXIS_COLOR}
          anchorX="center"
          anchorY="middle"
        >
          Y
        </Text>
      </group>

      {/* X축 */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <primitive
          object={
            new THREE.Line(
              lineGeometry,
              new THREE.LineBasicMaterial({ color: AXIS_COLOR }),
            )
          }
        />
        <mesh geometry={coneGeometry} position={[0, AXIS_LENGTH, 0]}>
          <meshBasicMaterial color={AXIS_COLOR} />
        </mesh>
      </group>
      <Text
        position={[-AXIS_LENGTH - 0.4, 0, 0]} // X축 음수 방향 끝
        fontSize={0.4}
        color={AXIS_COLOR}
        anchorX="center"
        anchorY="middle"
      >
        X
      </Text>

      {/* Z축 */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <primitive
          object={
            new THREE.Line(
              lineGeometry,
              new THREE.LineBasicMaterial({ color: AXIS_COLOR }),
            )
          }
        />
        <mesh geometry={coneGeometry} position={[0, AXIS_LENGTH, 0]}>
          <meshBasicMaterial color={AXIS_COLOR} />
        </mesh>
      </group>
      <Text
        position={[0, 0, -AXIS_LENGTH - 0.4]} // Z축 양수 방향 끝
        fontSize={0.4}
        color={AXIS_COLOR}
        anchorX="center"
        anchorY="middle"
      >
        Z
      </Text>
    </group>
  );
}

interface UserPlanProps {
  zoom?: number;
  position?: number;
}

export default function ReportGraph({ zoom, position }: UserPlanProps) {
  const controlsRef = useRef<any>(null);
  const [isResetting, setIsResetting] = useState(false);

  return (
    <div className="w-full h-full">
      <Canvas
        orthographic
        camera={{ zoom: zoom || 35, position: [4, 2.5, 4], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <ResetCamera
          controlsRef={controlsRef}
          isResetting={isResetting}
          setIsResetting={setIsResetting}
        />

        <group position={[0, position || -3, 0]}>
          <Axis />
          <Plan x={3} y={3} z={1} color="#2876F1" />
          <Plan x={3} y={3} z={3} color="#C1D9FF4D" lineColor="#AEB4BC" />
        </group>

        <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          onEnd={() => {
            if (controlsRef.current && !isResetting) {
              controlsRef.current.enabled = false;
              setIsResetting(true);
            }
          }}
        />
      </Canvas>
    </div>
  );
}
