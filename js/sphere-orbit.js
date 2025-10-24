// Three.js 3D Sphere with Orbiting Sphere
let scene, camera, renderer, mainSphere, orbitSphere, orbitGroup;
let animationId;
let isHovering = false;
let raycaster, mouse;

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const canvas = document.getElementById('sphere-canvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true,
        antialias: true
    });
    
    // Set proper resolution for crisp rendering
    const pixelRatio = window.devicePixelRatio || 1;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(330, 300);
    
    // Increase render resolution for even sharper spheres
    renderer.setSize(330 * 2, 300 * 2);
    canvas.style.width = '330px';
    canvas.style.height = '300px';
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Create main sphere (20% bigger than original: 220px -> 264px diameter)
    const mainGeometry = new THREE.SphereGeometry(1.32, 128, 128);
    const mainMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x7BA7D1, // Same blue color as CSS variable --primary
        shininess: 10
    });
    mainSphere = new THREE.Mesh(mainGeometry, mainMaterial);
    scene.add(mainSphere);
    
    // Create orbit group for the smaller sphere
    orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    
    // Create smaller orbiting sphere (20% bigger than original: 30px -> 36px diameter)
    const orbitGeometry = new THREE.SphereGeometry(0.18, 64, 64);
    const orbitMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x7BA7D1, // Same blue color
        shininess: 10
    });
    orbitSphere = new THREE.Mesh(orbitGeometry, orbitMaterial);
    
    // Position the smaller sphere at the orbit radius (increased to accommodate larger spheres)
    // Start at bottom right corner (45 degrees from positive X axis)
    orbitSphere.position.x = 2 * Math.cos(-Math.PI / 4); // -45 degrees
    orbitSphere.position.y = 2 * Math.sin(-Math.PI / 4); // -45 degrees
    orbitGroup.add(orbitSphere);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Initialize raycaster for mouse interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Start animation
    animate();
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Only rotate the orbit group when hovering
    if (isHovering) {
        orbitGroup.rotation.z += 0.01;
    }
    
    // Main sphere stays stationary - no rotation
    
    renderer.render(scene, camera);
}

function onMouseMove(event) {
    const canvas = document.getElementById('sphere-canvas');
    const rect = canvas.getBoundingClientRect();
    
    // Calculate mouse position in normalized device coordinates
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([orbitSphere]);
    
    // Check if mouse is over the orbiting sphere
    if (intersects.length > 0) {
        isHovering = true;
    } else {
        isHovering = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Three.js to load
    if (typeof THREE !== 'undefined') {
        init();
        
        // Add mouse interaction
        const canvas = document.getElementById('sphere-canvas');
        canvas.addEventListener('mousemove', onMouseMove);
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
