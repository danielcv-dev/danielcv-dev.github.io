import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App{
	constructor(){
		alert("Entro");
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
    //init the scene
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
		this.camera.position.set(0,0,4);
		
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xaaaaaa );
		
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(this.renderer.domElement);
		
		this.renderer.setAnimationLoop(this.render.bind(this));

	//cerate cube
		const geometry = new THREE.BoxBufferGeometry();
		const materialBox = new THREE.MeshStandardMaterial({color : 0xff0000});
		
		this.mesh = new THREE.Mesh(geometry, materialBox);
	//cerate light
		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
		
		const light = new THREE.DirectionalLight();
		light.position.set(0.2,1,1);
		
	//add elements to the scene
		this.scene.add(ambient);
		this.scene.add(light);
	
		this.scene.add(this.mesh);
	//controls
		const controls = new OrbitControls(this.camera, this.renderer.domElement);
		
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
        this.camera.aspect = window.innerWidth/window-innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
	render( ) {  
		this.mesh.rotateY(0.01);
        this.renderer.render(this.scene, this.camera);
    }
}

export { App };