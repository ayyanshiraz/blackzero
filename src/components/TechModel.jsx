"use client";
import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const TechModel = () => {
  const { scene } = useGLTF(`/bg-tech.glb`);
  const { viewport } = useThree();
  
  const modelRef = useRef();
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  
  // FIX: Smart scaling logic. 
  // If in portrait mode (mobile), scale based on height so it doesn't shrink into oblivion.
  const isMobile = viewport.width < viewport.height;
  const responsiveScale = isMobile ? viewport.height * 0.35 : viewport.width * 0.2; 

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
      const scrollOffset = window.scrollY;
      
      // The Y position animation will now look correct because the scale is consistent
      modelRef.current.position.y = (scrollOffset * 0.002) % 6 - 3; 
      modelRef.current.rotation.z = scrollOffset * 0.0005; 
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={copiedScene} 
      scale={responsiveScale} 
      position={[0, 0, 0]} 
    />
  );
};

export default TechModel;