import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../types';

interface ProjectCarouselProps {
  projects: ProjectItem[];
}

const RADIUS = 2.5;
const CARD_WIDTH = 3;
const CARD_HEIGHT = 1.8;

const CarouselItem = ({ project, count, index, radius }: { project: ProjectItem; count: number; index: number; radius: number }) => {
  const ref = useRef<THREE.Group>(null);
  
  // Calculate position on the cylinder
  // We want vertical rotation, so we distribute along the angle around X axis
  const angle = (index / count) * Math.PI * 2;
  
  return (
    <group
      ref={ref}
      position={[
        0, 
        Math.cos(angle) * radius, 
        Math.sin(angle) * radius
      ]}
      rotation={[
        -angle, // Rotate to face outward from center
        0, 
        0
      ]}
    >
      <Image 
        url={project.image} 
        transparent 
        side={THREE.DoubleSide}
        scale={[CARD_WIDTH, CARD_HEIGHT, 1]}
        toneMapped={false}
      />
      {/* Optional: Add Title below/above card */}
      {/* <Text
        position={[0, -1.2, 0.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text> */}
    </group>
  );
};

const Carousel = ({ projects }: { projects: ProjectItem[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current && !isHovered) {
      // Rotate the entire group around X axis
      groupRef.current.rotation.x += delta * 0.2; 
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {projects.map((project, i) => (
        <CarouselItem 
          key={i} 
          project={project} 
          count={projects.length} 
          index={i} 
          radius={RADIUS} 
        />
      ))}
    </group>
  );
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  return (
    <div className="w-full h-[600px] relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
           <Carousel projects={projects} />
        </Float>
      </Canvas>
    </div>
  );
};

export default ProjectCarousel;
