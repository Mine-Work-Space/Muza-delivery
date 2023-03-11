import * as THREE from "three";
import Experience from "../Experience";
import Car from "./Car";
import Floor from "./Floor";
import Environment from "./Environment";
import Controls from "./Controls";
import MyFirebase from "./MyFirebase";

export default class World {
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.car = new Car();
            this.floor = new Floor();
            this.controls = new Controls();
            let my_firebase = new MyFirebase();
            my_firebase.init();
            if(window.innerWidth > 800)
                this.car.actualCar.scale.set(0.19,0.19,0.19);
            if(window.innerWidth < 800)
                this.car.actualCar.scale.set(0.1,0.1,0.1);
            if(window.innerWidth < 900)
                this.car.actualCar.scale.set(0.1,0.1,0.1);
        })
    }
    resize() {
    }
    update() {
        if(this.car) {
            this.car.update();
        }
        if(this.controls) {
            this.controls.update();
        }
    }
 }