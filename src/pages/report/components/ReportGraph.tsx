import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Line } from "@react-three/drei";
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

function AxisScoreLine({
  highlightAxis,
  userX,
  userY,
  userZ,
}: {
  highlightAxis?: "X" | "Y" | "Z";
  userX: number;
  userY: number;
  userZ: number;
}) {
  const points = useMemo(() => {
    if (highlightAxis === "X") {
      return [
        new THREE.Vector3(-userX, 0, 0),
        new THREE.Vector3(-userX, 0, -userZ),
      ];
    } else if (highlightAxis === "Y") {
      return [
        new THREE.Vector3(0, userY, 0),
        new THREE.Vector3(0, userY, -userZ),
      ];
    } else if (highlightAxis === "Z") {
      return [
        new THREE.Vector3(0, 0, -userZ),
        new THREE.Vector3(-userX, 0, -userZ),
      ];
    }
    return null;
  }, [highlightAxis, userX, userY, userZ]);

  if (!points) return null;

  return (
    <Line
      points={points}
      color="#000000"
      lineWidth={1}
      dashed
      dashSize={0.12}
      gapSize={0.08}
    />
  );
}

function Axis({
  highlightAxis,
  highlightScore,
}: {
  highlightAxis?: "X" | "Y" | "Z";
  highlightScore?: number;
}) {
  const INACTIVE_COLOR = "#B5B5B5";
  const ACTIVE_COLOR = "#000000";

  const xColor =
    !highlightAxis || highlightAxis === "X" ? ACTIVE_COLOR : INACTIVE_COLOR;
  const yColor =
    !highlightAxis || highlightAxis === "Y" ? ACTIVE_COLOR : INACTIVE_COLOR;
  const zColor =
    !highlightAxis || highlightAxis === "Z" ? ACTIVE_COLOR : INACTIVE_COLOR;

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
              new THREE.LineBasicMaterial({ color: yColor }),
            )
          }
        />
        <mesh geometry={coneGeometry} position={[0, AXIS_LENGTH, 0]}>
          <meshBasicMaterial color={yColor} />
        </mesh>
        {/* 축 라벨 */}
        <Text
          position={[0, AXIS_LENGTH + 0.4, 0]}
          fontSize={0.4}
          color={yColor}
          anchorX="center"
          anchorY="middle"
        >
          Y
        </Text>
        {/* Y축 점수 라벨 */}
        {highlightAxis === "Y" && highlightScore !== undefined && (
          <Text
            position={[0.4, highlightScore, 0]}
            fontSize={0.35}
            color={yColor}
            anchorX="left"
            anchorY="middle"
          >
            {highlightScore.toFixed(1)}
          </Text>
        )}
      </group>

      {/* X축 */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <primitive
          object={
            new THREE.Line(
              lineGeometry,
              new THREE.LineBasicMaterial({ color: xColor }),
            )
          }
        />
        <mesh geometry={coneGeometry} position={[0, AXIS_LENGTH, 0]}>
          <meshBasicMaterial color={xColor} />
        </mesh>
      </group>
      <Text
        position={[-AXIS_LENGTH - 0.4, 0, 0]} // X축 음수 방향 끝
        fontSize={0.4}
        color={xColor}
        anchorX="center"
        anchorY="middle"
      >
        X
      </Text>
      {/* X축 점수 라벨 */}
      {highlightAxis === "X" && highlightScore !== undefined && (
        <Text
          position={[-highlightScore, 0.4, 0]}
          fontSize={0.35}
          color={xColor}
          anchorX="center"
          anchorY="bottom"
        >
          {highlightScore.toFixed(1)}
        </Text>
      )}

      {/* Z축 */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <primitive
          object={
            new THREE.Line(
              lineGeometry,
              new THREE.LineBasicMaterial({ color: zColor }),
            )
          }
        />
        <mesh geometry={coneGeometry} position={[0, AXIS_LENGTH, 0]}>
          <meshBasicMaterial color={zColor} />
        </mesh>
      </group>
      <Text
        position={[0, 0, -AXIS_LENGTH - 0.4]} // Z축 양수 방향 끝
        fontSize={0.4}
        color={zColor}
        anchorX="center"
        anchorY="middle"
      >
        Z
      </Text>
      {/* Z축 점수 라벨 */}
      {highlightAxis === "Z" && highlightScore !== undefined && (
        <Text
          position={[0.4, 0, -highlightScore]}
          fontSize={0.35}
          color={zColor}
          anchorX="left"
          anchorY="middle"
        >
          {highlightScore.toFixed(1)}
        </Text>
      )}
    </group>
  );
}

interface UserPlanProps {
  zoom?: number;
  position?: number;
  userX: number | undefined;
  userY: number | undefined;
  userZ: number | undefined;
  highlightAxis?: "X" | "Y" | "Z";
}

export default function ReportGraph({
  zoom,
  position,
  userX,
  userY,
  userZ,
  highlightAxis,
}: UserPlanProps) {
  const highlightScore =
    highlightAxis === "X"
      ? userX
      : highlightAxis === "Y"
        ? userY
        : highlightAxis === "Z"
          ? userZ
          : undefined;
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
          <Axis highlightAxis={highlightAxis} highlightScore={highlightScore} />
          <Plan x={userX || 2} y={userY || 2} z={userZ || 2} color="#2876F1" />
          <Plan x={3} y={3} z={3} color="#C1D9FF4D" lineColor="#AEB4BC" />
          {highlightAxis && (
            <AxisScoreLine
              highlightAxis={highlightAxis}
              userX={userX || 2}
              userY={userY || 2}
              userZ={userZ || 2}
            />
          )}
        </group>

        <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          rotateSpeed={-1}
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
