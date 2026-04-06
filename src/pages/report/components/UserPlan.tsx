import * as THREE from 'three';

export default function UserPlan() {
        // 파란 면 좌표
        const vertices = new Float32Array([
          -2.8, 0, -5,      // 원점
          -2.8, 3.1, -5,      // Y축 위
          0, 3.1, -5,    // Y-Z 평면
          0, 0, -5,    // Z축
        ]);
      
        const indices = [
          0, 1, 2,
          0, 2, 3
        ];
      
        return (
          <mesh castShadow>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[vertices, 3]}
              />
              <bufferAttribute
                attach="index"
                args={[new Uint16Array(indices), 1]}
              />
            </bufferGeometry>
            <meshBasicMaterial 
              color="#6699ff" 
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      
}