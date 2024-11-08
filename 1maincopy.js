import * as GaussianSplats3D from './src/node_modules/@mkkellogg/gaussian-splats-3d/build/gaussian-splats-3d.module.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderWidth = 800;
const renderHeight = 600;

const rootElement = document.createElement('div');
rootElement.style.width = renderWidth + 'px';
rootElement.style.height = renderHeight + 'px';
document.body.appendChild(rootElement);

const renderer = new THREE.WebGLRenderer({
    antialias: false
});
renderer.setSize(renderWidth, renderHeight);
rootElement.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
camera.position.copy(new THREE.Vector3().fromArray([-1, -4, 6]));
camera.up = new THREE.Vector3().fromArray([0, -1, 0]).normalize();
camera.lookAt(new THREE.Vector3().fromArray([0, 4, -0]));

const viewer = new GaussianSplats3D.Viewer({
    'selfDrivenMode': false,
    'renderer': renderer,
    'camera': camera,
    'useBuiltInControls': false,
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Raycaster для определения точки клика
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

viewer.addSplatScene('https://huggingface.co/spaces/Vision70s/GaussianVision70s/resolve/main/archViz_compressed.ply')
.then(() => {
    requestAnimationFrame(update);
});

// Функция для обработки клика мыши
function onMouseClick(event) {
    // Получаем координаты клика и преобразуем их в нормализованные координаты устройства
    mouse.x = (event.clientX / renderWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderHeight) * 2 + 1;

    // Обновляем raycaster и находим пересечения
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(viewer.scene.children, true);

    if (intersects.length > 0) {
        // Берем первую точку пересечения
        const intersectionPoint = intersects[0].point;

        // Устанавливаем центр управления на точку пересечения
        controls.target.copy(intersectionPoint);
        controls.update();  // Обновляем OrbitControls для новой точки центра
    }
}

// Добавляем обработчик события клика
window.addEventListener('click', onMouseClick);

function update() {
    requestAnimationFrame(update);
    controls.update();
    viewer.update();
    viewer.render();
}
