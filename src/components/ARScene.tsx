import { Interactive, useHitTest, useXR } from '@react-three/xr'
import { useState } from 'react'
import { Model } from './Model'
import * as THREE from 'three'

const ARScene = () => {
  const [placed, setPlaced] = useState(false)
  const [position, setPosition] = useState([0, 0, -1])

  useHitTest((hitMatrix) => {
    if (!placed) {
      hitMatrix.decompose(
        new THREE.Vector3(),
        new THREE.Quaternion(),
        new THREE.Vector3()
      )
      setPosition([hitMatrix.elements[12], hitMatrix.elements[13], hitMatrix.elements[14]])
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
            <Model scale={[0.5, 0.5, 0.5]} />
          )}
        </group>
      </Interactive>
    </>
  )
}

export default ARScene
