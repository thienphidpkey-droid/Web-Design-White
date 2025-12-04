import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../types';

interface ProjectCarouselProps {
  projects: ProjectItem[];
}

const RADIUS = 3.5; // Radius of the circular carousel
const CARD_WIDTH = 2.8;
const CARD_HEIGHT = 1.8;

const CarouselItem = ({
  project,
  index,
  total
}: {
  project: ProjectItem;
  index: number;
  total: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Card dimensions with padding for white background
  const PADDING = 0.12;
  const CARD_BG_WIDTH = CARD_WIDTH + PADDING * 2;
  const CARD_BG_HEIGHT = CARD_HEIGHT + PADDING * 2;

  // Calculate position in circle (vertical - like ferris wheel)
  const angle = (index / total) * Math.PI * 2;
  const y = Math.cos(angle) * RADIUS; // Y for vertical
  const z = Math.sin(angle) * RADIUS; // Z for depth

  useFrame(() => {
    if (ref.current) {
      // Smooth scale animation on hover
      const targetScale = hovered ? 1.15 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Cards face outward (away from center)
      const lookAtPoint = new THREE.Vector3(0, y * 2, z * 2);
      ref.current.lookAt(lookAtPoint);
    }
  });

  return (
    <group
      ref={ref}
      position={[0, y, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* White background card */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[CARD_BG_WIDTH, CARD_BG_HEIGHT]} />
        <meshStandardMaterial
          color="white"
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Shadow plane */}
      <mesh position={[0.06, -0.06, -0.03]}>
        <planeGeometry args={[CARD_BG_WIDTH, CARD_BG_HEIGHT]} />
        <meshBasicMaterial
          color="black"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Image */}
      <Image
        url={project.image}
        transparent
        side={THREE.DoubleSide}
        scale={[CARD_WIDTH, CARD_HEIGHT, 1]}
        toneMapped={false}
      />
    </group>
  );
};

const CircularCarousel = ({ projects, scrollDelta }: { projects: ProjectItem[]; scrollDelta: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate based on scroll delta
      // Positive scroll = rotate forward, negative = rotate backward
      groupRef.current.rotation.x += scrollDelta * 0.001;

      // Also add subtle automatic rotation when not scrolling
      if (Math.abs(scrollDelta) < 0.1) {
        groupRef.current.rotation.x += delta * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => (
        <CarouselItem
          key={i}
          project={project}
          index={i}
          total={projects.length}
        />
      ))}
    </group>
  );
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [scrollDelta, setScrollDelta] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setScrollDelta(e.deltaY);

      // Reset scroll delta after a short delay
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollDelta(0);
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-[600px] relative z-10 cursor-pointer">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={1.2} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.8} />
        <pointLight position={[-10, 5, -5]} intensity={0.4} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <Environment preset="city" />

        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <CircularCarousel projects={projects} scrollDelta={scrollDelta} />
        </Float>
      </Canvas>
    </div>
  );
};

export default ProjectCarousel;
