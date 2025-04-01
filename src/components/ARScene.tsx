import { Interactive, useHitTest } from '@react-three/xr'
import { useState } from 'react'
import { Model } from './Model'
import * as THREE from 'three'
import { MODEL_SCALE } from '../constants'

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
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} castShadow />
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
