import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D({ scrollProgress = 0, onProjectSelect, activeProjectId }) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    scrollProgress: 0,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    activeProject: null,
  });

  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    stateRef.current.activeProject = activeProjectId;
  }, [activeProjectId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030504, 0.018);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0x07150c, 3.0);
    scene.add(ambientLight);

    const emeraldKeyLight = new THREE.DirectionalLight(0x00e676, 4.0);
    emeraldKeyLight.position.set(6, 10, 8);
    scene.add(emeraldKeyLight);

    const limeRimLight = new THREE.DirectionalLight(0xa3ff12, 2.8);
    limeRimLight.position.set(-8, -6, -6);
    scene.add(limeRimLight);

    // Dynamic Pointer Light
    const pointerLight = new THREE.PointLight(0x00e676, 6, 18);
    pointerLight.position.set(0, 0, 4);
    scene.add(pointerLight);

    // -------------------------------------------------------------
    // 3. MONUMENTAL 3D DIGITAL SCULPTURE (Rufnix Signature Geometry)
    // -------------------------------------------------------------
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Parametric Twisted Metallic Ribbon
    const ribbonGeo = new THREE.TorusKnotGeometry(2.5, 0.45, 220, 32, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x06190e,
      emissive: 0x00e676,
      emissiveIntensity: 0.38,
      metalness: 0.94,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.98,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    sculptureGroup.add(ribbonMesh);

    // Fine glowing wireframe filament cage
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xa3ff12,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.TorusKnotGeometry(2.52, 0.46, 70, 16, 2, 3)),
      wireMat
    );
    sculptureGroup.add(wireMesh);

    // Outer Orbital Concentric Quantum Rings
    const ringGroup = new THREE.Group();
    sculptureGroup.add(ringGroup);

    for (let r = 0; r < 3; r++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.6 + r * 0.9, 0.03, 16, 80),
        new THREE.MeshStandardMaterial({
          color: r % 2 === 0 ? 0x00e676 : 0xa3ff12,
          emissive: r % 2 === 0 ? 0x00e676 : 0xa3ff12,
          emissiveIntensity: 0.7,
          roughness: 0.2,
        })
      );
      ring.rotation.x = (r + 1) * (Math.PI / 4);
      ring.rotation.y = (r + 1) * (Math.PI / 5);
      ringGroup.add(ring);
    }

    // -------------------------------------------------------------
    // 4. 2,500 ORBITAL VECTOR FIELD PARTICLES & STREAM
    // -------------------------------------------------------------
    const particleCount = 2500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAngles = new Float32Array(particleCount);
    const particleRadii = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);

    const cEmerald = new THREE.Color(0x00e676);
    const cLime = new THREE.Color(0xa3ff12);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 18.0;
      const speed = (0.2 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1);

      particleAngles[i] = angle;
      particleRadii[i] = radius;
      particleSpeeds[i] = speed;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 110.0; // Span full scroll depth
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = Math.random() > 0.4 ? cEmerald : cLime;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Crisp round particle glow sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    pGrad.addColorStop(0.35, 'rgba(163, 255, 18, 0.9)');
    pGrad.addColorStop(1, 'rgba(0, 230, 118, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(pCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particleSystem);

    // -------------------------------------------------------------
    // 5. SECONDARY ARCHITECTURAL & FOUNDER CRYSTALLINE NODES
    // -------------------------------------------------------------
    // Deconstructed Architectural Planes (Scene 3)
    const archGroup = new THREE.Group();
    archGroup.position.set(0, -32, 0);
    scene.add(archGroup);

    const planeGeom = new THREE.BoxGeometry(4.8, 0.14, 3.0);
    for (let i = 0; i < 4; i++) {
      const planeMesh = new THREE.Mesh(
        planeGeom,
        new THREE.MeshPhysicalMaterial({
          color: 0x081e13,
          emissive: 0x00e676,
          emissiveIntensity: 0.3,
          metalness: 0.9,
          roughness: 0.15,
          clearcoat: 1.0,
        })
      );
      planeMesh.position.y = (i - 1.5) * 1.6;
      planeMesh.rotation.y = (i - 1.5) * 0.15;
      archGroup.add(planeMesh);

      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(planeGeom),
        new THREE.LineBasicMaterial({ color: i % 2 === 0 ? 0xa3ff12 : 0x00e676, linewidth: 2 })
      );
      planeMesh.add(edge);
    }

    // Founders Dual Crystalline Nodes (Scene 4)
    const foundersGroup = new THREE.Group();
    foundersGroup.position.set(0, -50, 0);
    scene.add(foundersGroup);

    const rumanaGeo = new THREE.OctahedronGeometry(1.6, 0);
    const rumanaMesh = new THREE.Mesh(
      rumanaGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0x071e13,
        emissive: 0x00e676,
        emissiveIntensity: 0.45,
        metalness: 0.9,
        roughness: 0.12,
        clearcoat: 1.0,
      })
    );
    rumanaMesh.position.set(-3.2, 0, 0);
    foundersGroup.add(rumanaMesh);
    rumanaMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(rumanaGeo), new THREE.LineBasicMaterial({ color: 0xa3ff12, linewidth: 2 })));

    const farnaazGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const farnaazMesh = new THREE.Mesh(
      farnaazGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0x071e13,
        emissive: 0xa3ff12,
        emissiveIntensity: 0.45,
        metalness: 0.9,
        roughness: 0.12,
        clearcoat: 1.0,
      })
    );
    farnaazMesh.position.set(3.2, 0, 0);
    foundersGroup.add(farnaazMesh);
    farnaazMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(farnaazGeo), new THREE.LineBasicMaterial({ color: 0x00e676, linewidth: 2 })));

    // Energy Conduit between founders
    const conduitPts = [];
    for (let t = -3.0; t <= 3.0; t += 0.08) {
      conduitPts.push(new THREE.Vector3(t, Math.sin(t * 3.5) * 0.4, Math.cos(t * 3.5) * 0.4));
    }
    const conduitLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(conduitPts),
      new THREE.LineBasicMaterial({ color: 0x7cffb2, transparent: true, opacity: 0.8 })
    );
    foundersGroup.add(conduitLine);

    // Dimension Portal Gateway (Scene 6)
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, -90, 0);
    scene.add(portalGroup);

    for (let p = 0; p < 4; p++) {
      const portalRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.6 + p * 1.5, 0.045, 16, 72),
        new THREE.MeshBasicMaterial({
          color: p % 2 === 0 ? 0x00e676 : 0xa3ff12,
          wireframe: true,
          transparent: true,
          opacity: 0.7 - p * 0.12,
        })
      );
      portalRing.rotation.x = Math.PI / (p + 1.8);
      portalRing.rotation.y = Math.PI / (p + 2.2);
      portalGroup.add(portalRing);
    }

    // -------------------------------------------------------------
    // 6. ANIMATION & CAMERA FLIGHT ENGINE
    // -------------------------------------------------------------
    let animId;
    const clock = new THREE.Clock();

    const handleMouseMove = (e) => {
      stateRef.current.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const p = stateRef.current.scrollProgress; // 0 to 1

      // Mouse Lerp
      const mouse = stateRef.current.mouse;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Pointer Light follows mouse & active scroll depth
      pointerLight.position.x = mouse.x * 6;
      pointerLight.position.y = mouse.y * 4 - p * 92;

      // 1. Animate Sculpture (Rotation & Morphing)
      sculptureGroup.rotation.y = elapsed * 0.25 + mouse.x * 0.35;
      sculptureGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.2 + mouse.y * 0.25;
      sculptureGroup.position.y = -p * 20.0; // Gently descends with scroll

      ringGroup.children.forEach((r, idx) => {
        r.rotation.z = elapsed * (0.4 + idx * 0.2) * (idx % 2 === 0 ? 1 : -1);
      });

      // 2. Animate Orbital Vector Field Particles
      const posArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += particleSpeeds[i] * 0.008;
        const ang = particleAngles[i];
        const rad = particleRadii[i];

        posArr[i * 3] = Math.cos(ang) * rad + Math.sin(elapsed + i) * 0.15;
        posArr[i * 3 + 2] = Math.sin(ang) * rad + Math.cos(elapsed + i) * 0.15;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // 3. Animate Secondary Nodes
      archGroup.rotation.y = elapsed * 0.18;
      rumanaMesh.rotation.y = elapsed * 0.8;
      farnaazMesh.rotation.y = -elapsed * 0.8;
      conduitLine.rotation.x = elapsed * 2.0;

      portalGroup.children.forEach((pr, idx) => {
        pr.rotation.z = elapsed * (0.3 + idx * 0.15);
      });

      // 4. CONTINUOUS CAMERA FLIGHT TRAJECTORY
      // Total trajectory depth = 92 units
      const targetCamY = -p * 92.0;
      const targetCamZ = p < 0.15 ? 8.0 : p > 0.85 ? 12.0 : 9.0;
      const targetCamX = Math.sin(p * Math.PI * 3.5) * 2.0 + mouse.x * 0.75;

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;

      camera.lookAt(0, camera.position.y, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
