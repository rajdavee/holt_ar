import { Interactive, useHitTest } from '@react-three/xr'
import { useState, useEffect } from 'react'
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

  // Debug log to check when AR scene renders
  useEffect(() => {
    console.log("AR Scene mounted with position:", position)
  }, [position])

  return (
    <>
      {/* Global scene lighting */}
      <ambientLight intensity={2.0} />
      <pointLight position={[0, 2, 0]} intensity={1.5} />
      
      <Interactive onSelect={() => setPlaced(true)}>
        <group position={position}>
          {!placed ? (
            <mesh>
              <ringGeometry args={[0.1, 0.2, 32]} />
              <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
            </mesh>
          ) : (
            <>
              {/* Local lights that move with the model */}
              <pointLight position={[0, 1, 0]} intensity={1.0} distance={2} color="#ffffff" />
              <spotLight 
                position={[0.5, 1.5, 0.5]} 
                angle={0.6} 
                penumbra={0.5} 
                intensity={1.5} 
                castShadow 
                distance={5}
                target-position={[0, 0, 0]}
              />
              <Model 
                scale={[MODEL_SCALE, MODEL_SCALE, MODEL_SCALE]} 
              />
            </>
          )}
        </group>
      </Interactive>
    </>
  )
}

export default ARScene
