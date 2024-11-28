
# Rapid Sorting Robot Mini Program

[English](./README.md) | [简体中文](./README.zh-CN.md)


## Project Overview

This mini program is designed for IoT-enabled rapid sorting vehicles, providing efficient remote control and real-time monitoring capabilities. With this mini program, users can:

- View vehicle status information in real time  
- Access 3D models of the vehicle effortlessly  
- Generate QR codes for configuration  
- Simplify debugging and management processes  

By integrating **Three.js** for 3D model rendering, **Grafana** for real-time data visualization, and a QR code module for quick configuration, the mini program significantly enhances the intelligence and visualization of the sorting system.

---

## Key Features

### 1. Real-Time Monitoring
- Supports retrieval of vehicle status and sensor data.
- Integrates **Grafana API** to display key monitoring panels and alerts.

### 2. 3D Model Rendering
- Utilizes **Three.js** to render 3D models of the vehicle, providing a clear view of its structure.

### 3. QR Code Generation
- Simplifies the debugging process with built-in QR code functionality.

### 4. Data Visualization
- Leverages **Towxml** to render Markdown into WeChat Mini Program's WXML format for easy document display.

---

## Technical Implementation

### Frontend Tech Stack
- **Three.js**: For rendering 3D vehicle models.
- **Towxml**: For rendering Markdown and HTML documents.
- **WeChat Mini Program Framework**: Ensures a clean and intuitive user interface with animations.

### Backend Integration
- **Grafana API**: Enables access to real-time monitoring data and alerts.
- **Local Network Communication**: Connects with IoT sorting vehicles to retrieve and display operational data.

### Example Code
#### Three.js Rendering
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

#### Grafana Data Fetching
```javascript
wx.request({
  url: 'http://192.168.0.100:3000/api/v1/provisioning/alert-rules',
  method: 'GET',
  header: {
    'Authorization': 'Basic ' + wx.arrayBufferToBase64(this.stringToArrayBuffer('admin:password')),
  },
  success: (res) => console.log('Alert data loaded successfully:', res.data),
  fail: (err) => console.error('Request failed:', err),
});
```

---

## Screenshots

### Home Screen
![Home Screen](https://github.com/user-attachments/assets/b01b05d0-a9af-43c7-b62d-9b9e377cf43c)

### 3D Model
![3D Model](https://github.com/user-attachments/assets/c96fefd9-99d0-472d-86ee-6ff3f69ecfeb)

### QR Code Generation
![QR Code](https://github.com/user-attachments/assets/25532675-d45f-4337-8e5a-7dcecfee04cd)

### Grafana Data Integration
![Grafana Data](https://github.com/user-attachments/assets/c08bd659-af5e-4445-b6f0-2bbff6113396)

