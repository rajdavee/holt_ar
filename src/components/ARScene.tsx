import { Interactive, useHitTest } from '@react-three/xr'
import { useState } from 'react'
import { Model } from './Model'
import * as THREE from 'three'

const FEET_TO_METERS = 0.3048
const HEIGHT_IN_FEET = 3.5
const MODEL_SCALE = HEIGHT_IN_FEET * FEET_TO_METERS

const ARScene = () => {
  const [placed, setPlaced] = useState(false)
  const [position, setPosition] = useState<[number, number, number]>([0, 0, -1])

  useHitTest((hitMatrix) => {
    if (!placed) {
      const pos = new THREE.Vector3()
      hitMatrix.decompose(
        pos,
        new THREE.Quaternion(),
        new THREE.Vector3()
      )
      setPosition([pos.x, pos.y, pos.z])
    }
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      <hemisphereLight intensity={0.5} groundColor="#555555" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.4}
        castShadow={false}
      />
      <Interactive onSelect={() => setPlaced(true)}>
        <group position={position}>
          {!placed ? (
            <mesh>
              <ringGeometry args={[0.1, 0.2, 32]} />
              <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
            </mesh>
          ) : (
            <Model scale={[MODEL_SCALE, MODEL_SCALE, MODEL_SCALE]} />
          )}
        </group>
      </Interactive>
    </>
  )
}

export default ARScene
