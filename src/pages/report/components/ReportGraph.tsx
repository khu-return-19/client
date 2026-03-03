import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';

// components
import UserPlan from './UserPlan';

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

type AnimatedGraphSceneProps = {
  animationKey: number;
};

// easing 함수
const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

const easeInCubic = (x: number): number => {
  return x * x * x;
};

function AnimatedGraphScene({ animationKey }: AnimatedGraphSceneProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const { camera } = useThree();
  const [t, setT] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 초기 카메라 위치 저장
  const initialCameraPos = useRef(new THREE.Vector3(0, 0, 20));
  const targetCameraPos = useRef(new THREE.Vector3(0, 10, 20));

  useEffect(() => {
    // 클릭될 때마다 0 -> 1 -> 0으로 가는 애니메이션 시작
    setT(0);
    setIsAnimating(true);
    // 카메라 초기 위치로 리셋
    camera.position.copy(initialCameraPos.current);
    camera.lookAt(0, 0, 0);
  }, [animationKey, camera]);

  useFrame((_, delta) => {
    if (!groupRef.current || !isAnimating) return;

    const DURATION = 4; // 전체 시간: 1초 회전 + 2초 정지 + 1초 복구
    const nextT = Math.min(t + delta / DURATION, 1);

    let progress = 0;

    if (nextT <= 0.25) {
      // 0 ~ 0.25 (1초)
      const normalized = nextT / 0.25;
      progress = easeOutCubic(normalized);
    } else if (nextT <= 0.75) {
      // 0.25 ~ 0.75 (2초): 정지 상태
      progress = 1;
    } else {
      // 0.75 ~ 1.0 (1초)
      const normalized = (nextT - 0.75) / 0.25;
      progress = 1 - easeInCubic(normalized);
    }

    // 회전량
    const targetEuler = new THREE.Euler(0, -Math.PI / 3, 0);
    const { rotation } = groupRef.current;

    rotation.x = 0;
    rotation.y = targetEuler.y * progress;
    rotation.z = 0;

    // 카메라 위치 애니메이션 (위에서 내려다보는 각도로)
    camera.position.lerpVectors(
      initialCameraPos.current,
      targetCameraPos.current,
      progress
    );
    camera.lookAt(0, 0, 0);

    setT(nextT);

    if (nextT >= 1) {
      setIsAnimating(false);
      // 최종적으로 완전한 2D 상태로 정리
      rotation.x = 0;
      rotation.y = 0;
      rotation.z = 0;
      camera.position.copy(initialCameraPos.current);
      camera.lookAt(0, 0, 0);
      setT(0);
    }
  });

  const showZ = t > 0;

  return (
    <group ref={groupRef}>
       {/* 바닥 그림자: X-Z 평면 */}
    {showZ && (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.5, 0, -2.5]} receiveShadow>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.12}
        />
      </mesh>
    )}

    {/* 축 + 2D/3D 그래프 */}
    <Graph showZ={showZ} />
    {showZ && (
      <>
        <UserPlan />
        <DimensionLabels />
      </>
    )}
  </group>
  );
}

function ReportGraph() {
  const [animationKey, setAnimationKey] = useState(0);

  const handleClick = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }} onClick={handleClick}>
      <Canvas camera={{ position: [0, 0, 15], fov: 40 }} shadows> 
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

        {/* 그래프 + 파란 면 + 라벨 (클릭 시 2D -> 3D -> 2D 왕복) */}
        <AnimatedGraphScene animationKey={animationKey} />
      </Canvas>
    </div>
  );
}

export default ReportGraph;