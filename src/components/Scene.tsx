import { Environment, OrbitControls } from '@react-three/drei'
import { Model } from './Model'

const FEET_TO_METERS = 0.3048
const HEIGHT_IN_FEET = 3.5
const MODEL_SCALE = HEIGHT_IN_FEET * FEET_TO_METERS

interface SceneProps {
  isAR: boolean
}

const Scene = ({ isAR }: SceneProps) => {
  return (
    <>
      {!isAR && (
        <>
          <OrbitControls />
          <Environment preset="apartment" />
        </>
      )}
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
      <Model scale={[MODEL_SCALE, MODEL_SCALE, MODEL_SCALE]} />
    </>
  )
}

export default Scene
