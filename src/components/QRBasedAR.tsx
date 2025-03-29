import { MindARViewer } from "@mind-ar/react";
import { useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const QRBasedAR = () => {
  const sceneRef = useRef<THREE.Scene>();

  const onSceneReady = (scene: THREE.Scene) => {
    sceneRef.current = scene;
    const loader = new GLTFLoader();
    loader.load('/aqua.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      model.position.set(0, 0, 0);
      scene.add(model);
    });
  };

  return (
    <MindARViewer
      imageTargetSrc="/targets.mind"
      maxTrack={1}
      filterMinCF={1}
      filterBeta={1000}
      onSceneReady={onSceneReady}
    />
  );
};

export default QRBasedAR;
