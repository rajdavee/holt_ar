import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

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

export function Model(props: GroupProps) {
  const { nodes, materials } = useGLTF('/microfridge.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wood.geometry}
        material={materials.wood}
        position={[0.2, 0.497, -0.069]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.color.geometry}
        material={materials.color}
        position={[0.2, 0.497, -0.069]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.black.geometry}
        material={materials.black}
        position={[0.2, 0.497, -0.069]}
      />
    </group>
  )
}

useGLTF.preload('/microfridge.glb')
