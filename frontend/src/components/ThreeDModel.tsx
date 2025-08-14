
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDModelProps {
  className?: string;
}

const ThreeDModel: React.FC<ThreeDModelProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 3;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 2);
    scene.add(directionalLight);
    
    // Create a mannequin-like figure using primitives
    const group = new THREE.Group();
    
    // Torso
    const torsoGeometry = new THREE.CylinderGeometry(0.5, 0.4, 1.2, 32);
    const torsoMaterial = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    group.add(torso);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.8;
    group.add(head);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 32);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0, 0);
    leftArm.rotation.z = Math.PI / 4;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.6, 0, 0);
    rightArm.rotation.z = -Math.PI / 4;
    group.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.15, 0.1, 1, 32);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -1, 0);
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -1, 0);
    group.add(rightLeg);
    
    // Add clothing
    // Dress/shirt (simplified)
    const fabricGeometry = new THREE.ConeGeometry(0.6, 1.4, 32);
    const fabricMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9b87f5,
      shininess: 30,
      specular: 0x444444
    });
    const dress = new THREE.Mesh(fabricGeometry, fabricMaterial);
    dress.position.y = -0.2;
    dress.scale.y = 0.8;
    group.add(dress);
    
    scene.add(group);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle rotation
      group.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={containerRef} className={className} />;
};

export default ThreeDModel;
