import { useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// components
import UserPlan from './UserPlan';

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 0, 20);
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);
const RETURN_SPEED = 3; // 초당 복귀 속도

type GraphProps = {
  showZ: boolean;
};

function Graph({ showZ }: GraphProps) {
  return (
    <>
      {/* X축 */}
      <Line
        points={[[0, 0, 0], [-5, 0, 0]]}
        color="black"
        lineWidth={2}
      />
      <Text position={[-5.5, 0, 0]} fontSize={0.3} color="black">
        X
      </Text>

      {/* Y축 */}
      <Line
        points={[[0, 0, 0], [0, 5, 0]]}
        color="black"
        lineWidth={2}
      />
      <Text position={[0, 5.5, 0]} fontSize={0.3} color="black">
        Y
      </Text>

      {!showZ && (
        <>
          {/* 파란 영역 */}
          <mesh position={[-2.8 / 2, 3.1 / 2, 0]}>
            <planeGeometry args={[2.8, 3.1]} />
            <meshBasicMaterial color="#6699ff" transparent opacity={0.7} />
          </mesh>

          {/* 회색 영역 */}
          <mesh position={[-(2.2 + 2.8) / 2, (3.1 + 4.6) / 2, 0]}>
            <planeGeometry args={[2.8 - 2.2, 4.6 - 3.1]} />
            <meshBasicMaterial color="#d9d9d9" transparent opacity={0.7} />
          </mesh>

          {/* 세로 점선들 */}
          <Line
            points={[[-2.8, 0, 0], [-2.8, 3.1, 0]]}
            color="black"
            lineWidth={1}
            dashed
            dashSize={0.1}
            gapSize={0.1}
          />
          <Line
            points={[[-2.8, 0, 0], [-2.8, 4.6, 0]]}
            color="grey"
            lineWidth={1}
            dashed
            dashSize={0.1}
            gapSize={0.1}
          />

          {/* 가로 점선들 */}
          <Line
            points={[[0, 3.1, 0], [-2.8, 3.1, 0]]}
            color="black"
            lineWidth={1}
            dashed
            dashSize={0.1}
            gapSize={0.1}
          />
          <Line
            points={[[0, 4.6, 0], [-2.8, 4.6, 0]]}
            color="grey"
            lineWidth={1}
            dashed
            dashSize={0.1}
            gapSize={0.1}
          />

          {/* 숫자 레이블 */}
          <Text position={[-2.2, -0.4, 0]} fontSize={0.3} color="black">
            2.2
          </Text>
          <Text position={[-2.8, -0.4, 0]} fontSize={0.3} color="black">
            2.8
          </Text>
          <Text position={[-5.3, 3.1, 0]} fontSize={0.3} color="black">
            3.1
          </Text>
          <Text position={[-5.3, 4.6, 0]} fontSize={0.3} color="black">
            4.6
          </Text>
        </>
      )}

      {showZ && (
        <>
          {/* Z축 */}
          <Line
            points={[[0, 0, 0], [0, 0, -5]]}
            color="black"
            lineWidth={2}
          />
          <Text position={[0, 0, -5.5]} fontSize={0.3} color="black">
            Z
          </Text>
        </>
      )}
    </>
  );
}

function DimensionLabels() {
  return (
    <>
      <Text position={[0, 0, -5.2]} fontSize={0.3} color="blue">
        5
      </Text>
    </>
  );
}

function ReturnToDefaultControls() {
  const { camera, gl } = useThree();
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    const el = gl.domElement;

    const handlePointerUp = () => {
      setReturning(true);
    };

    el.addEventListener('pointerup', handlePointerUp);
    return () => el.removeEventListener('pointerup', handlePointerUp);
  }, [gl.domElement]);

  useFrame((_, delta) => {
    if (!returning) return;

    const pos = camera.position;
    const dist = pos.distanceTo(DEFAULT_CAMERA_POS);

    if (dist < 0.01) {
      camera.position.copy(DEFAULT_CAMERA_POS);
      camera.lookAt(DEFAULT_TARGET);
      setReturning(false);
      return;
    }

    camera.position.lerp(DEFAULT_CAMERA_POS, Math.min(1, RETURN_SPEED * delta));
    camera.lookAt(DEFAULT_TARGET);
  });

  return (
    <OrbitControls
      enabled={!returning}
      target={[0, 0, 0]}
    />
  );
}

function AnimatedGraphScene() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.5, 0, -2.5]} receiveShadow>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.12}
        />
      </mesh>
      {/* 축 + 3D 그래프 */}
      <Graph showZ={true} />
      <UserPlan />
      <DimensionLabels />
    </group>
  );
}

function ReportGraph() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 19], fov: 40 }} shadows> 
        <color attach="background" args={['#f0f0f0']} />
        
        {/* 조명 */}
        <ambientLight intensity={0.5} />
        <pointLight
          position={[10, 10, 10]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* 그래프 + 파란 면 + 라벨 */}
        <AnimatedGraphScene />

        {/* 드래그 시 회전, 손 떼면 정면으로 복귀 */}
        <ReturnToDefaultControls />
      </Canvas>
    </div>
  );
}

export default ReportGraph;