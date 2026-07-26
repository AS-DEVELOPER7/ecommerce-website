"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RiCloseLine, RiSparklingLine, RiRefreshLine } from "react-icons/ri";

export default function ProductViewer3D({ isOpen, onClose, productTitle = "Handcrafted Luxury Item" }) {
  const mountRef = useRef(null);
  const [activeMaterial, setActiveMaterial] = useState("gold"); // gold, roseGold, silver, ruby
  const sceneRef = useRef(null);
  const meshRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xee2b8c, 1.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Create 3D Ring/Pendant Complex Geometry
    const group = new THREE.Group();
    scene.add(group);
    meshRef.current = group;

    // Outer Ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.25, 32, 100);
    const ringMat = getMaterial("gold");
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    group.add(ringMesh);

    // Gem Crown Mount
    const gemGeo = new THREE.OctahedronGeometry(0.7, 2);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xee2b8c,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      metalness: 0.1,
      ior: 2.4,
      thickness: 1.2,
      clearcoat: 1,
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.set(0, 0.4, 1.5);
    group.add(gemMesh);

    // Orbit Controls via Mouse Drag
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging || !meshRef.current) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      meshRef.current.rotation.y += deltaMove.x * 0.01;
      meshRef.current.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || !meshRef.current || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      };
      meshRef.current.rotation.y += deltaMove.x * 0.01;
      meshRef.current.rotation.x += deltaMove.y * 0.01;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    container.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onMouseUp);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging && meshRef.current) {
        meshRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);

      ringGeo.dispose();
      ringMat.dispose();
      gemGeo.dispose();
      gemMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen]);

  const getMaterial = (type) => {
    switch (type) {
      case "roseGold":
        return new THREE.MeshStandardMaterial({
          color: 0xb76e79,
          metalness: 0.9,
          roughness: 0.1,
        });
      case "silver":
        return new THREE.MeshStandardMaterial({
          color: 0xe5e4e2,
          metalness: 0.95,
          roughness: 0.05,
        });
      case "ruby":
        return new THREE.MeshStandardMaterial({
          color: 0xee2b8c,
          metalness: 0.7,
          roughness: 0.2,
        });
      case "gold":
      default:
        return new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.9,
          roughness: 0.1,
        });
    }
  };

  const handleMaterialChange = (matType) => {
    setActiveMaterial(matType);
    if (meshRef.current && meshRef.current.children[0]) {
      const ringMesh = meshRef.current.children[0];
      ringMesh.material.dispose();
      ringMesh.material = getMaterial(matType);
    }
  };

  const handleResetRotation = () => {
    if (meshRef.current) {
      meshRef.current.rotation.set(0, 0, 0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <RiSparklingLine className="text-xl text-primary" />
            <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
              3D Interactive View: {productTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
          >
            <RiCloseLine className="text-2xl" />
          </button>
        </div>

        {/* 3D Canvas Mount */}
        <div className="relative h-[380px] sm:h-[450px] w-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 cursor-grab active:cursor-grabbing">
          <div ref={mountRef} className="w-full h-full" />

          {/* Controls Badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/80 pointer-events-none">
            🖱️ Drag to rotate 360°
          </div>

          {/* Reset Rotation Button */}
          <button
            onClick={handleResetRotation}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-105"
            title="Reset 3D View"
          >
            <RiRefreshLine className="text-lg" />
          </button>
        </div>

        {/* Material Selector Footer */}
        <div className="p-6 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-widest text-white/60 font-medium">
            3D Finish Material:
          </span>
          <div className="flex items-center gap-3">
            {[
              { id: "gold", name: "24K Gold", color: "#FFD700" },
              { id: "roseGold", name: "Rose Gold", color: "#B76E79" },
              { id: "silver", name: "Sterling Silver", color: "#E5E4E2" },
              { id: "ruby", name: "Ruby Metallic", color: "#EE2B8C" },
            ].map((mat) => (
              <button
                key={mat.id}
                onClick={() => handleMaterialChange(mat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                  activeMaterial === mat.id
                    ? "border-primary bg-primary/20 text-white font-semibold shadow-[0_0_15px_rgba(238,43,140,0.5)]"
                    : "border-white/20 hover:border-white/50 text-white/70"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-sm"
                  style={{ backgroundColor: mat.color }}
                />
                {mat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
