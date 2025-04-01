import { useGLTF } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'

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
  const groupRef = useRef<THREE.Group>(null)
  
  useEffect(() => {
    console.log('GLTF Load result:', gltf)
    
    // Ensure all materials are configured to receive light
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Force materials to be receptive to lighting
          child.material.needsUpdate = true;
          
          // For meshes with standard materials
          if (child.material.type.includes('Standard') || child.material.type.includes('Physical')) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          
          console.log('Configured mesh:', child.name, 'with material:', child.material.type);
        }
      });
    }
  }, [gltf])

  // Animation to help debug visibility
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation to help see if model is rendering/updating
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  })

  try {
    const { nodes, materials } = gltf as GLTFResult
    
    if (!nodes || !materials) {
      console.error('Model data is incomplete:', { nodes, materials })
      return <LoadingBox />
    }

    return (
      <Suspense fallback={<LoadingBox />}>
        <group ref={groupRef} {...props} dispose={null}>
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
