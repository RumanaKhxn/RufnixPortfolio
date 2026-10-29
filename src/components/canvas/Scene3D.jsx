import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D({ scrollProgress = 0, onProjectSelect, activeProjectId }) {
  const containerRef = useRef(null);
  const sceneStateRef = useRef({
    scrollProgress: 0,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    activeProject: null,
  });

  // Keep ref synchronized with prop
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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030504, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0x0a1710, 2.5);
    scene.add(ambientLight);

    const emeraldDirLight = new THREE.DirectionalLight(0x00e676, 3.0);
    emeraldDirLight.position.set(5, 8, 5);
    scene.add(emeraldDirLight);

    const limeRimLight = new THREE.DirectionalLight(0xa3ff12, 2.0);
    limeRimLight.position.set(-5, -3, -4);
    scene.add(limeRimLight);

    // Interactive pointer light
    const pointerLight = new THREE.PointLight(0x00e676, 4, 14);
    pointerLight.position.set(0, 0, 4);
    scene.add(pointerLight);

    // Texture Loader with fallbacks
    const textureLoader = new THREE.TextureLoader();
    const createPlaceholderTexture = (title, subtitle, accentColor) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 640;
      const ctx = canvas.getContext('2d');

      // Dark background
      ctx.fillStyle = '#080d0a';
      ctx.fillRect(0, 0, 1024, 640);

      // Grid
      ctx.strokeStyle = 'rgba(0, 230, 118, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 1024; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 640);
        ctx.stroke();
      }
      for (let y = 0; y < 640; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }

      // Border glow
      ctx.strokeStyle = accentColor || '#00e676';
      ctx.lineWidth = 6;
      ctx.strokeRect(10, 10, 1004, 620);

      // HUD Header
      ctx.fillStyle = '#0a1710';
      ctx.fillRect(10, 10, 1004, 60);
      ctx.fillStyle = '#a3ff12';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('RUFNIX STUDIO // ARCHITECTURE SYSTEM', 30, 48);

      // Title & Subtitle
      ctx.fillStyle = '#f5f7f5';
      ctx.font = 'bold 54px sans-serif';
      ctx.fillText(title, 50, 260);

      ctx.fillStyle = '#9ca8a0';
      ctx.font = '28px monospace';
      ctx.fillText(subtitle, 50, 320);

      // Circuit graphic
      ctx.strokeStyle = '#00e676';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 420);
      ctx.lineTo(250, 420);
      ctx.lineTo(320, 480);
      ctx.lineTo(600, 480);
      ctx.stroke();

      ctx.fillStyle = '#a3ff12';
      ctx.beginPath();
      ctx.arc(600, 480, 8, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    };

    // Load project screenshots into textures
    const projectTextures = {
      'fr-studio': textureLoader.load('/assets/projects/fr-beauty-studio.png'),
      'lifepilot': textureLoader.load('/assets/projects/lifepilot.png'),
      'bytemind': textureLoader.load('/assets/projects/bytemind.png'),
      'nutriroute': createPlaceholderTexture('NutriRoute', 'Geofenced Meal Logistics & Tiffin Ecosystem', '#a3ff12'),
      'umbrella-invoice': createPlaceholderTexture('Umbrella Invoice', 'Financial Ledger & Automated Tax Reconciliation', '#00e676'),
    };

    // -------------------------------------------------------------
    // 3. OBJECT GROUP 1: HERO RF MONOGRAM & CONVERGENT PARTICLES
    // -------------------------------------------------------------
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Procedural 3D RF Monogram Object:
    // Compound futuristic geometric structure composed of faceted emerald prisms
    const monogramMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x06180e,
      emissive: 0x00e676,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xa3ff12,
      transparent: true,
      opacity: 0.75,
    });

    // Central Monogram Geometric Core: Dodecahedral crystal flanked by angular wings
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const coreMesh = new THREE.Mesh(coreGeo, monogramMaterial);
    heroGroup.add(coreMesh);

    const coreWire = new THREE.LineSegments(new THREE.WireframeGeometry(coreGeo), wireframeMaterial);
    heroGroup.add(coreWire);

    // Orbiting Geometric Rings
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.04, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00e676,
      emissive: 0x00e676,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    heroGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.03, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa3ff12,
      emissive: 0xa3ff12,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    heroGroup.add(ringMesh2);

    // Instanced Particles (1,200 nodes converging into a matrix)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginPositions = new Float32Array(particleCount * 3);
    const particleTargetPositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color(0x00e676);
    const limeColor = new THREE.Color(0xa3ff12);

    for (let i = 0; i < particleCount; i++) {
      // Origin scattered in sphere
      const r = 18 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const ox = r * Math.sin(phi) * Math.cos(theta);
      const oy = r * Math.sin(phi) * Math.sin(theta);
      const oz = r * Math.cos(phi);

      particleOriginPositions[i * 3] = ox;
      particleOriginPositions[i * 3 + 1] = oy;
      particleOriginPositions[i * 3 + 2] = oz;

      // Current pos starts at origin
      particlePositions[i * 3] = ox;
      particlePositions[i * 3 + 1] = oy;
      particlePositions[i * 3 + 2] = oz;

      // Target convergent structure: Rings and spiral lattice
      const u = (i / particleCount) * Math.PI * 8;
      const rad = 2.5 + Math.sin(i * 0.2) * 1.2;
      particleTargetPositions[i * 3] = Math.cos(u) * rad;
      particleTargetPositions[i * 3 + 1] = ((i / particleCount) - 0.5) * 5.0;
      particleTargetPositions[i * 3 + 2] = Math.sin(u) * rad;

      // Alternating emerald and lime
      const col = Math.random() > 0.4 ? emeraldColor : limeColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle Material with round texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pCtx = particleCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    pGrad.addColorStop(0.3, 'rgba(163, 255, 18, 0.8)');
    pGrad.addColorStop(1, 'rgba(0, 230, 118, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(particleCanvas);
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
    // 4. OBJECT GROUP 2: SCENE B — THE EXPLODED 5-LAYER STACK
    // -------------------------------------------------------------
    const stackGroup = new THREE.Group();
    stackGroup.position.set(0, -18, 0); // Positioned along scroll timeline
    scene.add(stackGroup);

    const stackLayers = [];
    const layerNames = ['Data Architecture', 'Backend & APIs', 'Integration Mesh', 'Frontend Systems', 'Design & UI/UX'];
    const layerGeom = new THREE.BoxGeometry(4.4, 0.16, 2.8);

    for (let i = 0; i < 5; i++) {
      const layerMat = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? 0x081b10 : 0x0c2517,
        emissive: 0x00e676,
        emissiveIntensity: 0.25,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9,
      });

      const layerMesh = new THREE.Mesh(layerGeom, layerMat);
      layerMesh.position.y = (i - 2) * 0.3; // Default compact
      stackGroup.add(layerMesh);

      // Glowing edges
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
        defaultY: (i - 2) * 0.3,
        explodedY: (i - 2) * 1.35,
        name: layerNames[i],
      });
    }

    // Vertical light conduits connecting the exploded layers
    const conduitGeo = new THREE.CylinderGeometry(0.04, 0.04, 6, 16);
    const conduitMat = new THREE.MeshBasicMaterial({
      color: 0x00e676,
      transparent: true,
      opacity: 0.45,
    });
    const conduitMesh1 = new THREE.Mesh(conduitGeo, conduitMat);
    conduitMesh1.position.set(-1.8, 0, -1.1);
    stackGroup.add(conduitMesh1);

    const conduitMesh2 = new THREE.Mesh(conduitGeo, conduitMat);
    conduitMesh2.position.set(1.8, 0, -1.1);
    stackGroup.add(conduitMesh2);

    const conduitMesh3 = new THREE.Mesh(conduitGeo, conduitMat);
    conduitMesh3.position.set(0, 0, 1.1);
    stackGroup.add(conduitMesh3);

    // -------------------------------------------------------------
    // 5. OBJECT GROUP 3: SCENE C — THE FOUNDERS (DUAL CRYSTALLINE CORES)
    // -------------------------------------------------------------
    const foundersGroup = new THREE.Group();
    foundersGroup.position.set(0, -36, 0);
    scene.add(foundersGroup);

    // Founder 1: Rumana Khan Node
    const rumanaGeo = new THREE.OctahedronGeometry(1.4, 0);
    const rumanaMat = new THREE.MeshPhysicalMaterial({
      color: 0x081e13,
      emissive: 0x00e676,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
    });
    const rumanaMesh = new THREE.Mesh(rumanaGeo, rumanaMat);
    rumanaMesh.position.set(-2.8, 0, 0);
    foundersGroup.add(rumanaMesh);

    const rumanaEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(rumanaGeo),
      new THREE.LineBasicMaterial({ color: 0xa3ff12, linewidth: 2 })
    );
    rumanaMesh.add(rumanaEdges);

    const rumanaRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.03, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0x00e676, wireframe: true })
    );
    rumanaRing.rotation.x = Math.PI / 2.5;
    rumanaMesh.add(rumanaRing);

    // Founder 2: Sayyeda Farnaaz Node
    const farnaazGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const farnaazMat = new THREE.MeshPhysicalMaterial({
      color: 0x081e13,
      emissive: 0xa3ff12,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
    });
    const farnaazMesh = new THREE.Mesh(farnaazGeo, farnaazMat);
    farnaazMesh.position.set(2.8, 0, 0);
    foundersGroup.add(farnaazMesh);

    const farnaazEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(farnaazGeo),
      new THREE.LineBasicMaterial({ color: 0x00e676, linewidth: 2 })
    );
    farnaazMesh.add(farnaazEdges);

    const farnaazRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.03, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0xa3ff12, wireframe: true })
    );
    farnaazRing.rotation.y = Math.PI / 2.5;
    farnaazMesh.add(farnaazRing);

    // Connecting Energy Helix
    const helixPoints = [];
    for (let t = -2.5; t <= 2.5; t += 0.1) {
      helixPoints.push(new THREE.Vector3(t, Math.sin(t * 3.5) * 0.45, Math.cos(t * 3.5) * 0.45));
    }
    const helixGeo = new THREE.BufferGeometry().setFromPoints(helixPoints);
    const helixLine = new THREE.Line(
      helixGeo,
      new THREE.LineBasicMaterial({ color: 0x7cffb2, transparent: true, opacity: 0.65 })
    );
    foundersGroup.add(helixLine);

    // -------------------------------------------------------------
    // 6. OBJECT GROUP 4: SCENE D — PROJECTS IN 3D ORBIT
    // -------------------------------------------------------------
    const projectsGroup = new THREE.Group();
    projectsGroup.position.set(0, -56, 0);
    scene.add(projectsGroup);

    const projectKeys = ['fr-studio', 'lifepilot', 'bytemind', 'nutriroute', 'umbrella-invoice'];
    const projectMeshes = [];
    const panelGeo = new THREE.BoxGeometry(3.6, 2.25, 0.12);

    projectKeys.forEach((key, idx) => {
      // Texture on front face, dark metallic chassis on sides
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }), // right
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }), // left
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }), // top
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }), // bottom
        new THREE.MeshBasicMaterial({ map: projectTextures[key] }), // front (screenshot)
        new THREE.MeshStandardMaterial({ color: 0x08150e, roughness: 0.3, metalness: 0.8 }), // back
      ];

      const mesh = new THREE.Mesh(panelGeo, materials);
      // Orbital layout in an arc
      const angle = (idx - 2) * 0.55;
      const radius = 6.2;
      const targetX = Math.sin(angle) * radius;
      const targetZ = -Math.cos(angle) * radius + 5.0;
      const targetY = Math.sin(idx * 1.5) * 0.8;

      mesh.position.set(targetX, targetY, targetZ);
      mesh.rotation.y = -angle * 0.85;

      // Glowing border frame
      const frameLine = new THREE.LineSegments(
        new THREE.EdgesGeometry(panelGeo),
        new THREE.LineBasicMaterial({ color: 0x00e676, linewidth: 2 })
      );
      mesh.add(frameLine);

      mesh.userData = {
        projectId: key,
        basePos: new THREE.Vector3(targetX, targetY, targetZ),
        baseRotY: -angle * 0.85,
      };

      projectsGroup.add(mesh);
      projectMeshes.push(mesh);
    });

    // -------------------------------------------------------------
    // 7. OBJECT GROUP 5: SCENE E — F&R STUDIO 3D DEVICE SHOWCASE
    // -------------------------------------------------------------
    const frShowcaseGroup = new THREE.Group();
    frShowcaseGroup.position.set(0, -78, 0);
    scene.add(frShowcaseGroup);

    // Multi-tier dimensional UI display
    // Base platform
    const baseDisplayGeo = new THREE.BoxGeometry(6.4, 3.8, 0.15);
    const baseDisplayMat = new THREE.MeshBasicMaterial({
      map: projectTextures['fr-studio'],
    });
    const baseDisplayMesh = new THREE.Mesh(baseDisplayGeo, baseDisplayMat);
    frShowcaseGroup.add(baseDisplayMesh);

    const baseFrame = new THREE.LineSegments(
      new THREE.EdgesGeometry(baseDisplayGeo),
      new THREE.LineBasicMaterial({ color: 0x00e676, linewidth: 2.5 })
    );
    baseDisplayMesh.add(baseFrame);

    // Foreground Floating Booking Badge Plane
    const badgeGeo = new THREE.PlaneGeometry(2.4, 1.2);
    const badgeCanvas = document.createElement('canvas');
    badgeCanvas.width = 512;
    badgeCanvas.height = 256;
    const bCtx = badgeCanvas.getContext('2d');
    bCtx.fillStyle = 'rgba(8, 18, 12, 0.92)';
    bCtx.fillRect(0, 0, 512, 256);
    bCtx.strokeStyle = '#a3ff12';
    bCtx.lineWidth = 4;
    bCtx.strokeRect(4, 4, 504, 248);
    bCtx.fillStyle = '#00e676';
    bCtx.beginPath();
    bCtx.arc(40, 50, 10, 0, Math.PI * 2);
    bCtx.fill();
    bCtx.fillStyle = '#a3ff12';
    bCtx.font = 'bold 22px monospace';
    bCtx.fillText('CONFIRMED BOOKING', 65, 58);
    bCtx.fillStyle = '#f5f7f5';
    bCtx.font = 'bold 30px sans-serif';
    bCtx.fillText('Signature Balayage & Cut', 40, 120);
    bCtx.fillStyle = '#7cffb2';
    bCtx.font = '22px monospace';
    bCtx.fillText('Deposit Verified // Multi-Tenant', 40, 180);

    const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
    const badgeMesh = new THREE.Mesh(
      badgeGeo,
      new THREE.MeshBasicMaterial({ map: badgeTexture, transparent: true })
    );
    badgeMesh.position.set(2.4, 1.4, 0.9);
    frShowcaseGroup.add(badgeMesh);

    // Background Volumetric Light Grid
    const gridPlane = new THREE.GridHelper(14, 14, 0x00e676, 0x0a2012);
    gridPlane.position.set(0, -2.5, 0);
    frShowcaseGroup.add(gridPlane);

    // -------------------------------------------------------------
    // 8. OBJECT GROUP 6: SCENE F — FUTURE CONVERGENCE CONSTELLATION
    // -------------------------------------------------------------
    const futureGroup = new THREE.Group();
    futureGroup.position.set(0, -98, 0);
    scene.add(futureGroup);

    // Hyper-dimensional Ring Constellation
    for (let r = 0; r < 4; r++) {
      const futureRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.0 + r * 1.5, 0.04, 16, 72),
        new THREE.MeshBasicMaterial({
          color: r % 2 === 0 ? 0x00e676 : 0xa3ff12,
          wireframe: true,
          transparent: true,
          opacity: 0.65 - r * 0.1,
        })
      );
      futureRing.rotation.x = Math.PI / (r + 1.8);
      futureRing.rotation.y = Math.PI / (r + 2.2);
      futureGroup.add(futureRing);
    }

    const futureCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.0, 1),
      new THREE.MeshStandardMaterial({
        color: 0x0a1f14,
        emissive: 0x00e676,
        emissiveIntensity: 0.5,
        wireframe: true,
      })
    );
    futureGroup.add(futureCore);

    // -------------------------------------------------------------
    // 9. ANIMATION, SCROLL & INTERACTION LOOP
    // -------------------------------------------------------------
    let animationFrameId;
    let clock = new THREE.Clock();

    // Mouse coordinates tracking
    const handleMouseMove = (e) => {
      sceneStateRef.current.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneStateRef.current.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Raycaster for 3D project interaction
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleClick = (e) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVector, camera);

      const intersects = raycaster.intersectObjects(projectMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.projectId && onProjectSelect) {
          onProjectSelect(hit.userData.projectId);
        }
      }
    };
    window.addEventListener('click', handleClick);

    // Master Render Loop
    const render = () => {
      const elapsed = clock.getElapsedTime();
      const p = sceneStateRef.current.scrollProgress; // 0.0 to 1.0

      // Damped mouse movement (lerp)
      const mouse = sceneStateRef.current.mouse;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Update pointer light
      pointerLight.position.x = mouse.x * 6;
      pointerLight.position.y = mouse.y * 4 - p * 98;
      pointerLight.position.z = 4;

      // SCENE ANIMATION LOGIC:
      // A. Hero Monogram rotations & convergence
      if (p < 0.2) {
        const convergenceFactor = Math.min(elapsed * 0.8, 1.0);
        // Morph particles from origin to target
        const posAttr = particleGeo.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          const ox = particleOriginPositions[i * 3];
          const oy = particleOriginPositions[i * 3 + 1];
          const oz = particleOriginPositions[i * 3 + 2];

          const tx = particleTargetPositions[i * 3];
          const ty = particleTargetPositions[i * 3 + 1];
          const tz = particleTargetPositions[i * 3 + 2];

          posAttr.array[i * 3] = THREE.MathUtils.lerp(ox, tx, convergenceFactor) + Math.sin(elapsed + i) * 0.04;
          posAttr.array[i * 3 + 1] = THREE.MathUtils.lerp(oy, ty, convergenceFactor) + Math.cos(elapsed + i) * 0.04;
          posAttr.array[i * 3 + 2] = THREE.MathUtils.lerp(oz, tz, convergenceFactor);
        }
        posAttr.needsUpdate = true;

        heroGroup.rotation.y = elapsed * 0.4 + mouse.x * 0.4;
        heroGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.15 + mouse.y * 0.3;
        ringMesh1.rotation.z = elapsed * 0.6;
        ringMesh2.rotation.z = -elapsed * 0.4;
      }

      // B. Scene B — Exploded Stack animation
      if (p >= 0.15 && p <= 0.45) {
        // Calculate explosion progress within Scene B
        const bProgress = (p - 0.15) / 0.3; // 0 to 1
        const explodeAmt = Math.sin(bProgress * Math.PI); // 0 -> 1 -> 0

        stackLayers.forEach((layer, idx) => {
          layer.mesh.position.y = THREE.MathUtils.lerp(layer.defaultY, layer.explodedY, explodeAmt);
          layer.mesh.rotation.y = Math.sin(elapsed * 0.5 + idx) * 0.08 + mouse.x * 0.2;
          layer.mesh.rotation.x = 0.15 + mouse.y * 0.15;
        });

        stackGroup.rotation.y = elapsed * 0.2;
      }

      // C. Scene C — The Founders dual nodes
      if (p >= 0.35 && p <= 0.6) {
        rumanaMesh.rotation.y = elapsed * 0.8;
        rumanaMesh.rotation.x = elapsed * 0.5;
        farnaazMesh.rotation.y = -elapsed * 0.8;
        farnaazMesh.rotation.z = elapsed * 0.5;
        helixLine.rotation.x = elapsed * 2.0;
        foundersGroup.position.x = mouse.x * 0.4;
      }

      // D. Scene D — 3D Projects Orbit
      if (p >= 0.5 && p <= 0.8) {
        const activeKey = sceneStateRef.current.activeProject;
        projectMeshes.forEach((mesh) => {
          const isSelected = activeKey === mesh.userData.projectId;
          if (isSelected) {
            // Glide forward to center
            mesh.position.lerp(new THREE.Vector3(0, 0, 3.2), 0.1);
            mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, mouse.x * 0.3, 0.1);
            mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, mouse.y * 0.2, 0.1);
          } else {
            // Orbit position
            mesh.position.lerp(mesh.userData.basePos, 0.1);
            mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, mesh.userData.baseRotY + mouse.x * 0.15, 0.1);
          }
        });
      }

      // E. Scene E — F&R Studio Showcase
      if (p >= 0.7 && p <= 0.95) {
        frShowcaseGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.15 + mouse.x * 0.3;
        frShowcaseGroup.rotation.x = 0.08 - mouse.y * 0.2;
        badgeMesh.position.z = 0.9 + Math.sin(elapsed * 1.5) * 0.1;
      }

      // F. Scene F — Future Convergence
      if (p >= 0.85) {
        futureGroup.rotation.y = elapsed * 0.3;
        futureGroup.rotation.z = elapsed * 0.2;
      }

      // CAMERA TRAJECTORY & SPLINE INTERPOLATION ALONG SCROLL
      // Spline coordinates from 0 to 1
      const totalDepth = 98;
      const targetCamY = -p * totalDepth;
      const targetCamZ = p < 0.15 ? 7.5 : p > 0.85 ? 12.0 : 8.5;
      const targetCamX = Math.sin(p * Math.PI * 4) * 1.2 + mouse.x * 0.8;

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;

      camera.lookAt(0, camera.position.y, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);

      // Clean GPU memory
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
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
