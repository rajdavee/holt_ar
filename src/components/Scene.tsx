import { Environment, OrbitControls } from '@react-three/drei'
import { Model } from './Model'

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
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} castShadow />
      <Model />
    </>
  )
}

export default Scene
