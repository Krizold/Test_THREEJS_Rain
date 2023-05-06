// Configuration de base de Three.js
const canvasContainer = document.querySelector('#canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);

// Position de la caméra
camera.position.z = 50;

// Ajout d'une lumière
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 0, 50);
scene.add(light);

// Vitesse de pluie
const rainSpeed = 0.01; // Ajustez cette valeur pour contrôler la vitesse de la pluie

// Création d'un système de particules pour simuler la pluie
const rainDropCount = 1000; // Nombre de gouttes de pluie
const rainDropGeometry = new THREE.BufferGeometry(); // Géométrie des gouttes de pluie
const rainDropPositions = new Float32Array(rainDropCount * 3); // Positions initiales des gouttes de pluie

// Remplir le tableau des positions des gouttes de pluie avec des coordonnées aléatoires
for (let i = 0; i < rainDropCount * 3; i++) {
    rainDropPositions[i] = (Math.random() - 0.5) * 100;
}

// Attribuer les positions des gouttes de pluie à la géométrie
rainDropGeometry.setAttribute('position', new THREE.BufferAttribute(rainDropPositions, 3));

// Créer un matériau pour les gouttes de pluie
const rainDropMaterial = new THREE.PointsMaterial({ color: 0x88ccff, size: 0.01 });

// Créer les gouttes de pluie en utilisant la géométrie et le matériau définis
const rainDrops = new THREE.Points(rainDropGeometry, rainDropMaterial);

// Ajouter les gouttes de pluie à la scène
scene.add(rainDrops);

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate); // Demander une nouvelle animation

    // Faire tomber les gouttes de pluie
    const positions = rainDrops.geometry.attributes.position.array; // Récupérer les positions des gouttes de pluie

    // Parcourir les positions des gouttes de pluie et mettre à jour leur position en Y (hauteur)
    for (let i = 1; i < rainDropCount * 3; i += 3) {
        positions[i] -= rainSpeed; // Faire descendre la goutte de pluie en fonction de la vitesse définie
    
        // Si la goutte de pluie est tombée en dessous de la limite inférieure, la remettre en haut
        if (positions[i] < -50) {
            positions[i] = 50;
        }
    }
    

    // Indiquer que les positions des gouttes de pluie ont été mises à jour
    rainDrops.geometry.attributes.position.needsUpdate = true;

    // Rendre la scène avec la caméra
    renderer.render(scene, camera);
}

// Lancer l'animation
animate();
