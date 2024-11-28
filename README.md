

# 极速分拣机器人小程序

## 项目简介

本小程序专为物联网极速分拣小车设计，提供高效的远程控制与实时监测功能。通过该小程序，用户可以：

- 实时查看小车状态信息  
- 快速访问小车3D模型  
- 生成配置用二维码  
- 优化设备调试与管理流程  

小程序通过集成 **Three.js** 展示3D模型，借助 **Grafana** 获取实时数据，并支持二维码快速配置，极大提升了分拣系统的智能化与可视化水平。

---

## 功能亮点

### 1. 实时监控
- 支持获取小车状态与传感器数据。
- 集成 **Grafana API**，展示五大监控面板与报警信息。

### 2. 3D模型展示
- 使用 **Three.js** 渲染小车3D模型，帮助用户直观了解设备结构。

### 3. 二维码生成
- 通过二维码模块简化小车调试流程。

### 4. 数据可视化
- 集成 **Towxml**，支持将 Markdown 转为小程序 WXML 格式，方便文档展示。

---

## 技术实现

### 前端技术栈
- **Three.js**: 用于渲染小车的3D模型。
- **Towxml**: 用于渲染 Markdown 和 HTML 文档。
- **微信小程序框架**: 提供简洁的交互界面与动画效果。

### 后端集成
- **Grafana API**: 实现实时监控数据与报警信息的展示。
- **局域网通信**: 与物联网小车交互，获取设备状态数据。

### 示例代码
#### Three.js 渲染代码
```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let scene, camera, renderer, controls;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const loader = new GLTFLoader();
  loader.load('/models/car.gltf', (gltf) => {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  });
}

init();
```

#### Grafana 数据获取
```javascript
wx.request({
  url: 'http://192.168.0.100:3000/api/v1/provisioning/alert-rules',
  method: 'GET',
  header: {
    'Authorization': 'Basic ' + wx.arrayBufferToBase64(this.stringToArrayBuffer('admin:password')),
  },
  success: (res) => console.log('预警数据加载成功:', res.data),
  fail: (err) => console.error('请求失败:', err),
});
```



---

## 截图展示

### 主界面
![image](https://github.com/user-attachments/assets/b01b05d0-a9af-43c7-b62d-9b9e377cf43c)



### 3D模型
![image](https://github.com/user-attachments/assets/c96fefd9-99d0-472d-86ee-6ff3f69ecfeb)


### 二维码生成
![image](https://github.com/user-attachments/assets/25532675-d45f-4337-8e5a-7dcecfee04cd)
### grafana内容获取
![image](https://github.com/user-attachments/assets/c08bd659-af5e-4445-b6f0-2bbff6113396)



