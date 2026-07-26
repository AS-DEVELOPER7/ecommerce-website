"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground3D({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Tiny Floating 3D Gem Sparkle Objects (Scaled down to 0.06 to match small subtle particles)
    const smallGems = [];
    const smallGemGeo = new THREE.OctahedronGeometry(0.15, 0);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0x443300,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.75,
    });
    const pinkMat = new THREE.MeshStandardMaterial({
      color: 0xee2b8c,
      emissive: 0x330015,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.75,
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    for (let i = 0; i < 18; i++) {
      const mat = i % 2 === 0 ? goldMat : pinkMat;
      const gem = new THREE.Mesh(smallGemGeo, mat);

      // Position around edges away from central text
      let x = (Math.random() - 0.5) * 28;
      if (Math.abs(x) < 4) {
        x += x >= 0 ? 4 : -4;
      }
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 8;

      gem.position.set(x, y, z);
      gem.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mainGroup.add(gem);
      smallGems.push({
        mesh: gem,
        rotSpeed: 0.01 + Math.random() * 0.015,
        yOffset: Math.random() * Math.PI * 2,
      });
    }

    // 2. Floating Sparkle Particle Cloud
    const count = 120;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPink = new THREE.Color(0xee2b8c);
    const colorGold = new THREE.Color(0xffd700);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const mixColor = Math.random() > 0.5 ? colorPink : colorGold;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let reqId;
    let clock = new THREE.Clock();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      particles.rotation.y = time * 0.025;
      particles.rotation.x = Math.sin(time * 0.015) * 0.04;

      smallGems.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed;
        item.mesh.rotation.y += item.rotSpeed;
        item.mesh.position.y += Math.sin(time * 1.5 + item.yOffset) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      smallGemGeo.dispose();
      goldMat.dispose();
      pinkMat.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    />
  );
}
