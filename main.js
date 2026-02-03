// js/main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 获取挂载点
const container = document.getElementById('container3d');

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1.5, 3);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// 添加光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambient);

// 创建 OrbitControls（鼠标旋转/缩放/平移）
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// GLTF 模型加载
const loader = new GLTFLoader();
loader.load(
    'model/dodoco.glb', // 把你的模型放在项目文件夹里
    function(gltf){
        scene.add(gltf.scene);
        gltf.scene.position.set(0,0,0);
    },
    undefined,
    function(error){
        console.error('模型加载失败:', error);
    }
);

// 自适应窗口大小
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 渲染循环
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();