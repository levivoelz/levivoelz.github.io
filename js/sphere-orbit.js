// Three.js 3D Sphere with Orbiting Sphere (+ optional Rapier Physics)
const ORTHO_FRUSTUM = 6; // orthographic half-height in world units
const MAIN_RADIUS = 3.0;
const ORBIT_RADIUS = 0.48;
const ORBIT_PATH_RADIUS = 4.5; // distance from center for small sphere
const ORBIT_START_ANGLE = -Math.PI / 4; // bottom-right
const SHADOW_MAP_SIZE = 1024;
const MAX_DT = 0.03;
const BASE_GRAVITY = 9.81;
const TILT_LERP = 0.15;

let scene, camera, renderer, mainSphere, orbitSphere, orbitGroup, orbitHitTarget;
let groundBody = null;
let animationId;
let isHovering = false;
let raycaster, mouse;
let world, bodies = [];
let physicsEnabled = false;
let groundY = -ORTHO_FRUSTUM;
let mainVelocity = new THREE.Vector3(0, 0, 0);
let orbitVelocity = new THREE.Vector3(0, 0, 0);
let tiltGravity = new THREE.Vector3(0, -BASE_GRAVITY, 0);
let lastTime = null;
let isTouchDevice = false;
let mobileOrbitActive = false;

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    camera = new THREE.OrthographicCamera(
        -ORTHO_FRUSTUM, ORTHO_FRUSTUM,
        ORTHO_FRUSTUM, -ORTHO_FRUSTUM,
        0.1, 1000
    );
    camera.position.z = 5;
    
    // Create renderer
    const canvas = document.getElementById('sphere-canvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true,
        antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    const pixelRatio = window.devicePixelRatio || 1;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(330, 300);
    
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    renderer.setSize(w * 2, h * 2);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    const updateCameraForSize = (width, height) => {
        const aspect = width / Math.max(1, height);
        const halfH = ORTHO_FRUSTUM;
        const halfW = ORTHO_FRUSTUM * aspect;
        camera.left = -halfW;
        camera.right = halfW;
        camera.top = halfH;
        camera.bottom = -halfH;
        camera.updateProjectionMatrix();
        const worldPerPixel = (camera.top - camera.bottom) / Math.max(1, height);
        groundY = camera.bottom + worldPerPixel; // lift by ~1px in world units
        if (groundBody && typeof groundBody.setTranslation === 'function') {
            groundBody.setTranslation({ x: 0, y: groundY - 0.25, z: 0 }, true);
        }
    };
    updateCameraForSize(w, h);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Create main sphere (20% bigger)
    const mainGeometry = new THREE.SphereGeometry(MAIN_RADIUS, 128, 128);
    const mainMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x7BA7D1, // Same blue color as CSS variable --primary
        shininess: 10
    });
    mainSphere = new THREE.Mesh(mainGeometry, mainMaterial);
    mainSphere.castShadow = true;
    mainSphere.receiveShadow = true;
    scene.add(mainSphere);
    
    // Create orbit group for the smaller sphere
    orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    
    // Create smaller orbiting sphere (20% bigger)
    const orbitGeometry = new THREE.SphereGeometry(ORBIT_RADIUS, 64, 64);
    const orbitMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x7BA7D1, // Same blue color
        shininess: 10
    });
    orbitSphere = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitSphere.position.z = 0.1;
    orbitSphere.receiveShadow = true;
    
    // Position the smaller sphere at the orbit radius (wider orbit)
    // Start at bottom right corner (45 degrees from positive X axis)
    orbitSphere.position.x = ORBIT_PATH_RADIUS * Math.cos(ORBIT_START_ANGLE);
    orbitSphere.position.y = ORBIT_PATH_RADIUS * Math.sin(ORBIT_START_ANGLE);
    orbitGroup.add(orbitSphere);

    const hitGeom = new THREE.SphereGeometry(0.62, 16, 16); // ~30% larger
    const hitMat = new THREE.MeshBasicMaterial({ color: 0xff00ff, visible: false });
    orbitHitTarget = new THREE.Mesh(hitGeom, hitMat);
    orbitHitTarget.position.copy(orbitSphere.position);
    orbitGroup.add(orbitHitTarget);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = SHADOW_MAP_SIZE;
    directionalLight.shadow.mapSize.height = SHADOW_MAP_SIZE;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);
    
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Initialize Rapier physics world (world is created after RAPIER.init() in DOMContentLoaded)
    if (typeof RAPIER !== 'undefined' && !world) {
        try {
            world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });

            // Add a fixed ground aligned to bottom of the current camera frustum
            groundBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
            const groundColliderDesc = RAPIER.ColliderDesc.cuboid(50, 0.25, 50)
                .setTranslation(0, groundY - 0.25, 0)
                .setRestitution(0.02)
                .setFriction(0.9);
            world.createCollider(groundColliderDesc, groundBody);

            
        } catch (error) {
            console.error('Failed to initialize physics world:', error);
        }
    }
    
    const onResize = () => {
        // Use container's computed size so CSS 16:9 & max-height are respected
        const r2 = container.getBoundingClientRect();
        const cw = Math.max(1, r2.width);
        const ch = Math.max(1, r2.height);
        renderer.setSize(cw * 2, ch * 2);
        canvas.style.width = cw + 'px';
        canvas.style.height = ch + 'px';
        updateCameraForSize(cw, ch);
    };
    window.addEventListener('resize', onResize);

    // Start animation
    animate();
}

function enableTiltControls() {
    if (!isTouchDevice) return;
    const handleOrientation = (e) => {
        // gamma: left-right tilt (-90..90), beta: front-back tilt (-180..180)
        const gamma = (e.gamma || 0); // x-axis
        const beta = (e.beta || 0);   // y-axis
        // Map to gravity vector; clamp and scale down for stability
        const gx = THREE.MathUtils.clamp(gamma / 45, -1, 1) * BASE_GRAVITY;
        const gy = -BASE_GRAVITY; // keep downward gravity constant baseline
        const gz = THREE.MathUtils.clamp(beta / 45, -1, 1) * BASE_GRAVITY;
        // Smooth changes
        tiltGravity.x = THREE.MathUtils.lerp(tiltGravity.x, gx, TILT_LERP);
        tiltGravity.y = THREE.MathUtils.lerp(tiltGravity.y, gy, TILT_LERP);
        tiltGravity.z = THREE.MathUtils.lerp(tiltGravity.z, gz, TILT_LERP);
    };
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS permission flow
        DeviceOrientationEvent.requestPermission().then((state) => {
            if (state === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
            }
        }).catch(() => {});
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

function animate() {
    animationId = requestAnimationFrame(animate);

    if (physicsEnabled) {
        const now = performance.now();
        let dt = lastTime ? (now - lastTime) / 1000 : 0;
        lastTime = now;
        // Clamp large timesteps (e.g., when tab regains focus) to avoid explosive motion
        dt = Math.min(dt, MAX_DT);

        if (world && bodies.length >= 2) {
            // Use Rapier if available (handles sphere-sphere collisions)
            // Apply tilt gravity (x/z from device, y upward is negative)
            world.gravity = { x: tiltGravity.x, y: tiltGravity.y, z: tiltGravity.z };
            world.step();
            const mainPos = bodies[0].translation();
            const orbitPos = bodies[1].translation();
            mainSphere.position.set(mainPos.x, mainPos.y, mainPos.z);
            orbitSphere.position.set(orbitPos.x, orbitPos.y, orbitPos.z);
        } else {
            // Fallback simple physics + naive sphere-sphere collision
            // Fallback uses tiltGravity
            mainVelocity.x += tiltGravity.x * dt;
            mainVelocity.y += tiltGravity.y * dt;
            mainVelocity.z += tiltGravity.z * dt;
            orbitVelocity.x += tiltGravity.x * dt;
            orbitVelocity.y += tiltGravity.y * dt;
            orbitVelocity.z += tiltGravity.z * dt;

            // Integrate
            mainSphere.position.addScaledVector(mainVelocity, dt);
            orbitSphere.position.addScaledVector(orbitVelocity, dt);

        // Ground collision (bottom of canvas)
        if (mainSphere.position.y <= groundY + 3.0) {
            mainSphere.position.y = groundY + 3.0;
                mainVelocity.y *= -0.5;
            }
        if (orbitSphere.position.y <= groundY + 0.48) {
            orbitSphere.position.y = groundY + 0.48;
                orbitVelocity.y *= -0.5;
            }

            // Sphere-sphere collision resolution (elastic-ish)
            const rMain = 3.0;
            const rOrbit = 0.48;
            const delta = new THREE.Vector3().subVectors(orbitSphere.position, mainSphere.position);
            const dist = delta.length();
            const minDist = rMain + rOrbit;
            if (dist > 0 && dist < minDist) {
                const n = delta.multiplyScalar(1 / dist); // collision normal
                const penetration = minDist - dist;
                // Separate
                mainSphere.position.addScaledVector(n, -penetration * 0.6);
                orbitSphere.position.addScaledVector(n, penetration * 0.4);
                // Relative velocity along normal
                const relVel = new THREE.Vector3().subVectors(orbitVelocity, mainVelocity);
                const relAlongN = relVel.dot(n);
                if (relAlongN < 0) {
            const e = 0.2; // restitution (heavy)
                    const j = -(1 + e) * relAlongN;
                    // Assume main sphere heavier
                    mainVelocity.addScaledVector(n, -j * 0.2);
                    orbitVelocity.addScaledVector(n, j * 0.8);
                }
            }
        }
    } else {
        const shouldOrbit = isTouchDevice ? mobileOrbitActive : isHovering;
        if (shouldOrbit) {
            orbitGroup.rotation.z += 0.01;
        }
    }
    
    renderer.render(scene, camera);
}

function onMouseMove(event) {
    const canvasEl = document.getElementById('sphere-canvas');
    const rect = canvasEl.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([orbitSphere, orbitHitTarget, mainSphere]);
    const hoveredSmall = intersects.some(i => i.object === orbitSphere || i.object === orbitHitTarget);
    const hoveredBig = intersects.some(i => i.object === mainSphere);

    // Only spin the orbit when hovering small sphere and physics not active
    isHovering = !physicsEnabled && hoveredSmall;

    // Cursor: before physics → pointer on either sphere; after physics → pointer only on big sphere
    const cursor = physicsEnabled ? (hoveredBig ? 'pointer' : 'default') : ((hoveredSmall || hoveredBig) ? 'pointer' : 'default');
    canvasEl.style.cursor = cursor;
}

function enablePhysics() {
    if (physicsEnabled) return;
    
    try {
        physicsEnabled = true;
        mobileOrbitActive = false;
        // Capture current world positions before changing hierarchy
        const mainWorldPos = new THREE.Vector3();
        const orbitWorldPos = new THREE.Vector3();
        mainSphere.getWorldPosition(mainWorldPos);
        orbitSphere.getWorldPosition(orbitWorldPos);

        // Reparent small sphere to scene while preserving world transform
        if (orbitSphere.parent !== scene) {
            scene.attach(orbitSphere);
        }
        // Stop orbit group updates
        scene.remove(orbitGroup);

        // Ensure objects are at their current world positions
        mainSphere.position.copy(mainWorldPos);
        orbitSphere.position.copy(orbitWorldPos);

        // Seed simple velocities (heavy objects: low initial velocity)
        mainVelocity.set((Math.random() - 0.5) * 0.6, 0.5 + Math.random() * 0.8, 0);
        orbitVelocity.set((Math.random() - 0.5) * 0.6, 0.5 + Math.random() * 0.8, 0);
        lastTime = performance.now();

        // If Rapier is available, also set up real physics bodies (handles ball-ball collisions)
        if (typeof RAPIER !== 'undefined' && world) {
            const mainColliderDesc = RAPIER.ColliderDesc.ball(3.0)
                .setRestitution(0.08)
                .setFriction(0.9);
            const orbitColliderDesc = RAPIER.ColliderDesc.ball(0.48)
                .setRestitution(0.1)
                .setFriction(0.9);
            const mainRigidBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic());
            const orbitRigidBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic());
            mainRigidBody.setTranslation({ x: mainWorldPos.x, y: mainWorldPos.y, z: mainWorldPos.z }, true);
            orbitRigidBody.setTranslation({ x: orbitWorldPos.x, y: orbitWorldPos.y, z: orbitWorldPos.z }, true);
            mainRigidBody.setLinvel({ x: mainVelocity.x, y: mainVelocity.y, z: mainVelocity.z }, true);
            orbitRigidBody.setLinvel({ x: orbitVelocity.x, y: orbitVelocity.y, z: orbitVelocity.z }, true);
            world.createCollider(mainColliderDesc, mainRigidBody);
            world.createCollider(orbitColliderDesc, orbitRigidBody);
            bodies = [mainRigidBody, orbitRigidBody];
            // Rapier physics enabled (hybrid)
        }
        enableTiltControls();
    } catch (error) {
        console.error('Failed to enable physics:', error);
    }
}

function onCanvasClick(event) {
    const canvas = document.getElementById('sphere-canvas');
    const rect = canvas.getBoundingClientRect();
    
    // Calculate mouse position in normalized device coordinates
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Primary: raycast
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects([mainSphere, orbitSphere, orbitHitTarget]);

    let hitSmall = intersects.some(i => i.object === orbitSphere || i.object === orbitHitTarget);
    let hitBig = intersects.some(i => i.object === mainSphere);

    // Fallback: screen-space proximity test to small sphere center
    if (!hitSmall && !physicsEnabled) {
        const worldPos = new THREE.Vector3();
        orbitSphere.getWorldPosition(worldPos);
        const ndc = worldPos.project(camera);
        const sx = ((ndc.x + 1) / 2) * rect.width + rect.left;
        const sy = ((-ndc.y + 1) / 2) * rect.height + rect.top;
        const dx = event.clientX - sx;
        const dy = event.clientY - sy;
        const distPx = Math.hypot(dx, dy);
        if (distPx <= 24) hitSmall = true;
    }

    if (hitSmall) {
        if (isTouchDevice && !physicsEnabled) {
            // Toggle orbit on first tap; drop on second tap while orbiting
            if (!mobileOrbitActive) {
                mobileOrbitActive = true;
                return;
            }
        }
        enablePhysics();
    } else if (hitBig) {
        window.location.href = '/';
    }
}

function onTouchStart(event) {
    const canvas = document.getElementById('sphere-canvas');
    const rect = canvas.getBoundingClientRect();
    const t = event.touches && event.touches[0] ? event.touches[0] : (event.changedTouches ? event.changedTouches[0] : null);
    if (!t) return;

    mouse.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((t.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([mainSphere, orbitSphere, orbitHitTarget]);
    let hitSmall = intersects.some(i => i.object === orbitSphere || i.object === orbitHitTarget);
    let hitBig = intersects.some(i => i.object === mainSphere);

    if (!hitSmall && !physicsEnabled) {
        const worldPos = new THREE.Vector3();
        orbitSphere.getWorldPosition(worldPos);
        const ndc = worldPos.project(camera);
        const sx = ((ndc.x + 1) / 2) * rect.width + rect.left;
        const sy = ((-ndc.y + 1) / 2) * rect.height + rect.top;
        const dx = t.clientX - sx;
        const dy = t.clientY - sy;
        if (Math.hypot(dx, dy) <= 24) hitSmall = true;
    }

    if (hitSmall) {
        if (!physicsEnabled) {
            if (!mobileOrbitActive) {
                mobileOrbitActive = true;
                return;
            }
        }
        enablePhysics();
    } else if (hitBig) {
        window.location.href = '/';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Wait for Three.js to load
    if (typeof THREE !== 'undefined') {
        // If Rapier is present, ensure WASM is initialized before creating the world
        if (typeof RAPIER !== 'undefined' && typeof RAPIER.init === 'function') {
            try {
                await RAPIER.init();
                // Rapier WASM initialized
            } catch (e) {
                console.warn('Rapier init failed, continuing without physics', e);
            }
        }

        init();
        
        const canvas = document.getElementById('sphere-canvas');
        // Detect touch-capable device
        isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            canvas.addEventListener('touchstart', onTouchStart, { passive: true });
        } else {
            canvas.addEventListener('mousemove', onMouseMove);
            canvas.addEventListener('click', onCanvasClick);
        }

        // Prevent physics jumps when tab/window regains focus
        const resetTime = () => { lastTime = performance.now(); };
        window.addEventListener('focus', resetTime);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) resetTime();
        });
    } else {
        console.error('Three.js not loaded');
    }
});

// Cleanup function
function cleanup() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (renderer) {
        renderer.dispose();
    }
}
