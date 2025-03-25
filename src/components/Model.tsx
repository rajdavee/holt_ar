import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/microfridge.glb')
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
