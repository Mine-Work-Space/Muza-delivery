import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.scene = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.car = this.experience.world.car.actualCar;
    }
    
    setScrollTrigger() {
    }
    resize() {} 
    update() {
    }
}