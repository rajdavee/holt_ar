import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

declare global {
  interface Window {
    MindARThree: any;
  }
}

const QRBasedAR = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const mindarThree = new window.MindARThree({
      container: containerRef.current,
      imageTargetSrc: '/targets.mind'
    });

    const { renderer, scene, camera } = mindarThree;

    const loader = new GLTFLoader();
    loader.load('/aqua.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      model.position.set(0, 0, 0);
      scene.add(model);
    });

    mindarThree.start();

    return () => {
      mindarThree.stop();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
  );
};

export default QRBasedAR;
