import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }
    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xF1c7c8,
            side: THREE.DoubleSide
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane2 = new THREE.Mesh(this.geometry, this.material); // back

        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.99;
        this.plane.receiveShadow = true;
        //
        this.plane2.rotation.x = Math.PI;
        this.plane2.rotation.y = Math.PI/1.25;
        this.plane2.position.z = -10;
    }
    resize() {
    }
    update() {
    }
 }