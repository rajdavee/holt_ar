import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import { Suspense, useEffect } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    wood: THREE.Mesh
    color: THREE.Mesh
    black: THREE.Mesh
  }
  materials: {
    wood: THREE.Material
    color: THREE.Material
    black: THREE.Material
  }
}

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export function Model(props: GroupProps) {
  const gltf = useGLTF('/aqua.glb')
  
  useEffect(() => {
    console.log('GLTF Load result:', gltf)
  }, [gltf])

  try {
    const { nodes, materials } = gltf as GLTFResult
    
    if (!nodes || !materials) {
      console.error('Model data is incomplete:', { nodes, materials })
      return <LoadingBox />
    }

    return (
      <Suspense fallback={<LoadingBox />}>
        <group {...props} dispose={null}>
          <primitive object={gltf.scene} />
        </group>
      </Suspense>
    )
  } catch (error) {
    console.error('Error in Model component:', error)
    return <LoadingBox />
  }
}

useGLTF.preload('/aqua.glb')
