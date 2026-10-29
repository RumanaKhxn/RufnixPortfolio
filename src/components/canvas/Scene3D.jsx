import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D({ scrollProgress = 0, onProjectSelect, activeProjectId }) {
  const containerRef = useRef(null);
  const sceneStateRef = useRef({
    scrollProgress: 0,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    activeProject: null,
  });

  useEffect(() => {
    sceneStateRef.current.scrollProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    sceneStateRef.current.activeProject = activeProjectId;
  }, [activeProjectId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Fog & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030504, 0.022);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0x08150d, 2.8);
    scene.add(ambientLight);

    const emeraldKeyLight = new THREE.DirectionalLight(0x00e676, 3.5);
    emeraldKeyLight.position.set(6, 8, 6);
    scene.add(emeraldKeyLight);

    const limeRimLight = new THREE.DirectionalLight(0xa3ff12, 2.2);
    limeRimLight.position.set(-6, -4, -4);
    scene.add(limeRimLight);

    // Dynamic Pointer Light following cursor in 3D
    const pointerLight = new THREE.PointLight(0x00e676, 5, 16);
    pointerLight.position.set(0, 0, 4);
    scene.add(pointerLight);

    // 3. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const projectTextures = {
      'fr-studio': textureLoader.load('/assets/projects/fr-beauty-studio.png'),
      'lifepilot': textureLoader.load('/assets/projects/lifepilot.png'),
      'bytemind': textureLoader.load('/assets/projects/bytemind.png'),
    };

    // -------------------------------------------------------------
    // 4. HERO SCENE: 3D RF MONOGRAM & CONVERGENT FILAMENT PARTICLE FIELD
    // -------------------------------------------------------------
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Materials
    const monogramMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05180e,
      emissive: 0x00e676,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    const wireMat = new THREE.LineBasicMaterial({
      color: 0xa3ff12,
      transparent: true,
      opacity: 0.85,
    });

    // Procedural Extruded 3D 'R' Glyph
    const rShape = new THREE.Shape();
    // Stem
    rShape.moveTo(-1.6, -1.2);
    rShape.lineTo(-1.1, -1.2);
    rShape.lineTo(-1.1, 0.1);
    rShape.lineTo(-0.7, 0.1);
    // Loop
    rShape.bezierCurveTo(-0.2, 0.1, -0.2, 1.2, -0.7, 1.2);
    rShape.lineTo(-1.6, 1.2);
    rShape.lineTo(-1.6, -1.2);

    // Inner hole for R loop
    const rHole = new THREE.Path();
    rHole.moveTo(-1.1, 0.45);
    rHole.lineTo(-0.7, 0.45);
    rHole.bezierCurveTo(-0.45, 0.45, -0.45, 0.85, -0.7, 0.85);
    rHole.lineTo(-1.1, 0.85);
    rHole.lineTo(-1.1, 0.45);
    rShape.holes.push(rHole);

    // R Leg
    const rLegShape = new THREE.Shape();
    rLegShape.moveTo(-0.95, 0.15);
    rLegShape.lineTo(-0.4, -1.2);
    rLegShape.lineTo(0.1, -1.2);
    rLegShape.lineTo(-0.45, 0.15);
    rLegShape.lineTo(-0.95, 0.15);

    // Procedural Extruded 3D 'F' Glyph
    const fShape = new THREE.Shape();
    fShape.moveTo(0.3, -1.2);
    fShape.lineTo(0.8, -1.2);
    fShape.lineTo(0.8, -0.05);
    fShape.lineTo(1.4, -0.05);
    fShape.lineTo(1.4, 0.35);
    fShape.lineTo(0.8, 0.35);
    fShape.lineTo(0.8, 0.8);
    fShape.lineTo(1.6, 0.8);
    fShape.lineTo(1.6, 1.2);
    fShape.lineTo(0.3, 1.2);
    fShape.lineTo(0.3, -1.2);

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.08,
    };

    const rMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(rShape, extrudeSettings), monogramMaterial);
    const rLegMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(rLegShape, extrudeSettings), monogramMaterial);
    const fMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(fShape, extrudeSettings), monogramMaterial);

    const rEdges = new THREE.LineSegments(new THREE.EdgesGeometry(rMesh.geometry), wireMat);
    const rLegEdges = new THREE.LineSegments(new THREE.EdgesGeometry(rLegMesh.geometry), wireMat);
    const fEdges = new THREE.LineSegments(new THREE.EdgesGeometry(fMesh.geometry), wireMat);

    heroGroup.add(rMesh);
    heroGroup.add(rLegMesh);
    heroGroup.add(fMesh);
    heroGroup.add(rEdges);
    heroGroup.add(rLegEdges);
    heroGroup.add(fEdges);

    // Orbiting Geometric Energy Rings
    const ringGeo1 = new THREE.TorusGeometry(2.5, 0.035, 16, 72);
    const ringMesh1 = new THREE.Mesh(
      ringGeo1,
      new THREE.MeshStandardMaterial({
        color: 0x00e676,
        emissive: 0x00e676,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      })
    );
    ringMesh1.rotation.x = Math.PI / 3;
    heroGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(3.0, 0.03, 16, 72);
    const ringMesh2 = new THREE.Mesh(
      ringGeo2,
      new THREE.MeshStandardMaterial({
        color: 0xa3ff12,
        emissive: 0xa3ff12,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      })
    );
    ringMesh2.rotation.y = Math.PI / 3.5;
    heroGroup.add(ringMesh2);

    // 1,500 Instanced Particle Lattice
    const particleCount = 1500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOrigins = new Float32Array(particleCount * 3);
    const particleTargets = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cEmerald = new THREE.Color(0x00e676);
    const cLime = new THREE.Color(0xa3ff12);

    for (let i = 0; i < particleCount; i++) {
      // Origin scattered in sphere
      const r = 22 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const ox = r * Math.sin(phi) * Math.cos(theta);
      const oy = r * Math.sin(phi) * Math.sin(theta);
      const oz = r * Math.cos(phi);

      particleOrigins[i * 3] = ox;
      particleOrigins[i * 3 + 1] = oy;
      particleOrigins[i * 3 + 2] = oz;

      particlePositions[i * 3] = ox;
      particlePositions[i * 3 + 1] = oy;
      particlePositions[i * 3 + 2] = oz;

      // Target: Dual helix rings around monogram
      const u = (i / particleCount) * Math.PI * 8;
      const radius = 2.8 + Math.sin(i * 0.15) * 1.0;
      particleTargets[i * 3] = Math.cos(u) * radius;
      particleTargets[i * 3 + 1] = ((i / particleCount) - 0.5) * 6.5;
      particleTargets[i * 3 + 2] = Math.sin(u) * radius;

      const c = Math.random() > 0.4 ? cEmerald : cLime;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    pGrad.addColorStop(0.3, 'rgba(163, 255, 18, 0.85)');
    pGrad.addColorStop(1, 'rgba(0, 230, 118, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(pCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particleSystem);

    // -------------------------------------------------------------
    // 5. SCENE B: EXPLODED 5-LAYER STACK (ARCHITECTURAL LAYERS)
    // -------------------------------------------------------------
    const stackGroup = new THREE.Group();
    stackGroup.position.set(0, -18, 0);
    scene.add(stackGroup);

    const stackLayers = [];
    const layerGeom = new THREE.BoxGeometry(4.6, 0.16, 2.9);

    for (let i = 0; i < 5; i++) {
      const layerMat = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? 0x071a0f : 0x0a2416,
        emissive: 0x00e676,
        emissiveIntensity: 0.3,
        roughness: 0.18,
        metalness: 0.85,
        transparent: true,
        opacity: 0.92,
      });

      const layerMesh = new THREE.Mesh(layerGeom, layerMat);
      layerMesh.position.y = (i - 2) * 0.32;
      stackGroup.add(layerMesh);

      const edgeLine = new THREE.LineSegments(
        new THREE.EdgesGeometry(layerGeom),
        new THREE.LineBasicMaterial({
          color: i === 4 || i === 0 ? 0xa3ff12 : 0x00e676,
          linewidth: 2,
        })
      );
      layerMesh.add(edgeLine);

      stackLayers.push({
        mesh: layerMesh,
        defaultY: (i - 2) * 0.32,
        explodedY: (i - 2) * 1.45,
      });
    }

    // Glowing vertical connection columns
    const colGeo = new THREE.CylinderGeometry(0.04, 0.04, 7, 16);
    const colMat = new THREE.MeshBasicMaterial({ color: 0x00e676, transparent: true, opacity: 0.5 });
    [-1.9, 1.9].forEach(x => {
      [-1.2, 1.2].forEach(z => {
        const col = new THREE.Mesh(colGeo, colMat);
        col.position.set(x, 0, z);
        stackGroup.add(col);
      });
    });

    // -------------------------------------------------------------
    // 6. SCENE C: FOUNDERS DUAL CRYSTALLINE CORES
    // -------------------------------------------------------------
    const foundersGroup = new THREE.Group();
    foundersGroup.position.set(0, -36, 0);
    scene.add(foundersGroup);

    // Rumana Core
    const rumanaGeo = new THREE.OctahedronGeometry(1.5, 0);
    const rumanaMat = new THREE.MeshPhysicalMaterial({
      color: 0x071e13,
      emissive: 0x00e676,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.12,
      clearcoat: 1.0,
    });
    const rumanaMesh = new THREE.Mesh(rumanaGeo, rumanaMat);
    rumanaMesh.position.set(-3.0, 0, 0);
    foundersGroup.add(rumanaMesh);
    rumanaMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(rumanaGeo), new THREE.LineBasicMaterial({ color: 0xa3ff12, linewidth: 2 })));

    const rumanaRing = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.035, 16, 48), new THREE.MeshBasicMaterial({ color: 0x00e676, wireframe: true }));
    rumanaRing.rotation.x = Math.PI / 2.5;
    rumanaMesh.add(rumanaRing);

    // Farnaaz Core
    const farnaazGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const farnaazMat = new THREE.MeshPhysicalMaterial({
      color: 0x071e13,
      emissive: 0xa3ff12,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.12,
      clearcoat: 1.0,
    });
    const farnaazMesh = new THREE.Mesh(farnaazGeo, farnaazMat);
    farnaazMesh.position.set(3.0, 0, 0);
    foundersGroup.add(farnaazMesh);
    farnaazMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(farnaazGeo), new THREE.LineBasicMaterial({ color: 0x00e676, linewidth: 2 })));

    const farnaazRing = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.035, 16, 48), new THREE.MeshBasicMaterial({ color: 0xa3ff12, wireframe: true }));
    farnaazRing.rotation.y = Math.PI / 2.5;
    farnaazMesh.add(farnaazRing);

    // Connecting Helix Beam
    const helixPts = [];
    for (let t = -2.8; t <= 2.8; t += 0.08) {
      helixPts.push(new THREE.Vector3(t, Math.sin(t * 4.0) * 0.4, Math.cos(t * 4.0) * 0.4));
    }
    const helixLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(helixPts),
      new THREE.LineBasicMaterial({ color: 0x7cffb2, transparent: true, opacity: 0.75 })
    );
    foundersGroup.add(helixLine);

    // -------------------------------------------------------------
    // 7. SCENE D: PREMIER 3D PROJECTS GALLERY
    // -------------------------------------------------------------
    const projectsGroup = new THREE.Group();
    projectsGroup.position.set(0, -56, 0);
    scene.add(projectsGroup);

    const projectKeys = ['fr-studio', 'lifepilot', 'bytemind'];
    const projectMeshes = [];
    const panelGeo = new THREE.BoxGeometry(4.2, 2.65, 0.15);

    projectKeys.forEach((key, idx) => {
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }),
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }),
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }),
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }),
        new THREE.MeshBasicMaterial({ map: projectTextures[key] }),
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }),
      ];

      const mesh = new THREE.Mesh(panelGeo, materials);
      const angle = (idx - 1) * 0.65;
      const radius = 5.8;
      const targetX = Math.sin(angle) * radius;
      const targetZ = -Math.cos(angle) * radius + 4.8;
      const targetY = Math.sin(idx * 1.8) * 0.5;

      mesh.position.set(targetX, targetY, targetZ);
      mesh.rotation.y = -angle * 0.85;

      const frame = new THREE.LineSegments(
        new THREE.EdgesGeometry(panelGeo),
        new THREE.LineBasicMaterial({ color: 0x00e676, linewidth: 2.5 })
      );
      mesh.add(frame);

      mesh.userData = {
        projectId: key,
        basePos: new THREE.Vector3(targetX, targetY, targetZ),
        baseRotY: -angle * 0.85,
      };

      projectsGroup.add(mesh);
      projectMeshes.push(mesh);
    });

    // -------------------------------------------------------------
    // 8. SCENE E: F&R STUDIO DIMENSIONAL PRODUCT SHOWCASE
    // -------------------------------------------------------------
    const frShowcaseGroup = new THREE.Group();
    frShowcaseGroup.position.set(0, -78, 0);
    scene.add(frShowcaseGroup);

    const baseDisplayGeo = new THREE.BoxGeometry(6.6, 4.0, 0.16);
    const baseDisplayMat = new THREE.MeshBasicMaterial({
      map: projectTextures['fr-studio'],
    });
    const baseDisplayMesh = new THREE.Mesh(baseDisplayGeo, baseDisplayMat);
    frShowcaseGroup.add(baseDisplayMesh);

    baseDisplayMesh.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(baseDisplayGeo),
        new THREE.LineBasicMaterial({ color: 0x00e676, linewidth: 2.5 })
      )
    );

    // Floating VIP badge
    const badgeGeo = new THREE.PlaneGeometry(2.5, 1.25);
    const bCanvas = document.createElement('canvas');
    bCanvas.width = 512;
    bCanvas.height = 256;
    const bCtx = bCanvas.getContext('2d');
    bCtx.fillStyle = 'rgba(7, 16, 11, 0.94)';
    bCtx.fillRect(0, 0, 512, 256);
    bCtx.strokeStyle = '#a3ff12';
    bCtx.lineWidth = 4;
    bCtx.strokeRect(4, 4, 504, 248);
    bCtx.fillStyle = '#00e676';
    bCtx.beginPath();
    bCtx.arc(42, 52, 10, 0, Math.PI * 2);
    bCtx.fill();
    bCtx.fillStyle = '#a3ff12';
    bCtx.font = 'bold 22px monospace';
    bCtx.fillText('VERIFIED DEPOSIT', 68, 60);
    bCtx.fillStyle = '#f5f7f5';
    bCtx.font = 'bold 30px sans-serif';
    bCtx.fillText('Signature Balayage & Cut', 42, 122);
    bCtx.fillStyle = '#7cffb2';
    bCtx.font = '22px monospace';
    bCtx.fillText('Confirmed Booking // Multi-Tenant', 42, 185);

    const bTexture = new THREE.CanvasTexture(bCanvas);
    const bMesh = new THREE.Mesh(badgeGeo, new THREE.MeshBasicMaterial({ map: bTexture, transparent: true }));
    bMesh.position.set(2.6, 1.5, 0.95);
    frShowcaseGroup.add(bMesh);

    // Infinite ground grid helper
    const gridHelper = new THREE.GridHelper(16, 16, 0x00e676, 0x0a2214);
    gridHelper.position.set(0, -2.6, 0);
    frShowcaseGroup.add(gridHelper);

    // -------------------------------------------------------------
    // 9. SCENE F: CULMINATION CONSTELLATION
    // -------------------------------------------------------------
    const futureGroup = new THREE.Group();
    futureGroup.position.set(0, -98, 0);
    scene.add(futureGroup);

    for (let r = 0; r < 4; r++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.2 + r * 1.6, 0.045, 16, 80),
        new THREE.MeshBasicMaterial({
          color: r % 2 === 0 ? 0x00e676 : 0xa3ff12,
          wireframe: true,
          transparent: true,
          opacity: 0.7 - r * 0.12,
        })
      );
      ring.rotation.x = Math.PI / (r + 1.7);
      ring.rotation.y = Math.PI / (r + 2.1);
      futureGroup.add(ring);
    }

    // -------------------------------------------------------------
    // 10. ANIMATION & RENDER LOOP
    // -------------------------------------------------------------
    let animId;
    const clock = new THREE.Clock();

    const handleMouseMove = (e) => {
      sceneStateRef.current.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneStateRef.current.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const handleClick = (e) => {
      mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);

      const intersects = raycaster.intersectObjects(projectMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.projectId && onProjectSelect) {
          onProjectSelect(hit.userData.projectId);
        }
      }
    };
    window.addEventListener('click', handleClick);

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const p = sceneStateRef.current.scrollProgress;

      // Mouse lerp
      const mouse = sceneStateRef.current.mouse;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Pointer Light
      pointerLight.position.x = mouse.x * 6;
      pointerLight.position.y = mouse.y * 4 - p * 98;

      // Scene 1: Hero Monogram & Convergence
      if (p < 0.2) {
        const conv = Math.min(elapsed * 0.9, 1.0);
        const posAttr = particleGeo.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          const ox = particleOrigins[i * 3];
          const oy = particleOrigins[i * 3 + 1];
          const oz = particleOrigins[i * 3 + 2];

          const tx = particleTargets[i * 3];
          const ty = particleTargets[i * 3 + 1];
          const tz = particleTargets[i * 3 + 2];

          posAttr.array[i * 3] = THREE.MathUtils.lerp(ox, tx, conv) + Math.sin(elapsed + i) * 0.04;
          posAttr.array[i * 3 + 1] = THREE.MathUtils.lerp(oy, ty, conv) + Math.cos(elapsed + i) * 0.04;
          posAttr.array[i * 3 + 2] = THREE.MathUtils.lerp(oz, tz, conv);
        }
        posAttr.needsUpdate = true;

        heroGroup.rotation.y = elapsed * 0.45 + mouse.x * 0.4;
        heroGroup.rotation.x = Math.sin(elapsed * 0.6) * 0.12 + mouse.y * 0.3;
        ringMesh1.rotation.z = elapsed * 0.7;
        ringMesh2.rotation.z = -elapsed * 0.5;
      }

      // Scene 2: Exploded Stack
      if (p >= 0.15 && p <= 0.45) {
        const bProg = (p - 0.15) / 0.3;
        const explodeAmt = Math.sin(bProg * Math.PI);

        stackLayers.forEach((layer, idx) => {
          layer.mesh.position.y = THREE.MathUtils.lerp(layer.defaultY, layer.explodedY, explodeAmt);
          layer.mesh.rotation.y = Math.sin(elapsed * 0.6 + idx) * 0.08 + mouse.x * 0.2;
          layer.mesh.rotation.x = 0.16 + mouse.y * 0.16;
        });

        stackGroup.rotation.y = elapsed * 0.22;
      }

      // Scene 3: Founders
      if (p >= 0.35 && p <= 0.6) {
        rumanaMesh.rotation.y = elapsed * 0.9;
        rumanaMesh.rotation.x = elapsed * 0.6;
        farnaazMesh.rotation.y = -elapsed * 0.9;
        farnaazMesh.rotation.z = elapsed * 0.6;
        helixLine.rotation.x = elapsed * 2.2;
      }

      // Scene 4: Premier Projects Orbit
      if (p >= 0.5 && p <= 0.8) {
        const activeKey = sceneStateRef.current.activeProject;
        projectMeshes.forEach((mesh) => {
          const isSelected = activeKey === mesh.userData.projectId;
          if (isSelected) {
            mesh.position.lerp(new THREE.Vector3(0, 0, 3.4), 0.1);
            mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, mouse.x * 0.3, 0.1);
            mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, mouse.y * 0.2, 0.1);
          } else {
            mesh.position.lerp(mesh.userData.basePos, 0.1);
            mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, mesh.userData.baseRotY + mouse.x * 0.15, 0.1);
          }
        });
      }

      // Scene 5: F&R Studio
      if (p >= 0.7 && p <= 0.95) {
        frShowcaseGroup.rotation.y = Math.sin(elapsed * 0.45) * 0.15 + mouse.x * 0.3;
        bMesh.position.z = 0.95 + Math.sin(elapsed * 1.8) * 0.12;
      }

      // Scene 6: Culmination
      if (p >= 0.85) {
        futureGroup.rotation.y = elapsed * 0.35;
        futureGroup.rotation.z = elapsed * 0.25;
      }

      // Camera Trajectory
      const totalDepth = 98;
      const targetCamY = -p * totalDepth;
      const targetCamZ = p < 0.15 ? 7.8 : p > 0.85 ? 12.5 : 8.8;
      const targetCamX = Math.sin(p * Math.PI * 4) * 1.4 + mouse.x * 0.85;

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
      window.removeEventListener('click', handleClick);

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
      className="fixed inset-0 pointer-events-auto z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
