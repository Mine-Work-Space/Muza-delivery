import * as THREE from "three";
import { Scene } from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { on } from "events";

export default class Car {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.car = this.resources.items.car; // key value
        this.actualCar = this.car.scene;
        this.sizes = this.experience.sizes;
        
        this.lerp =  {
            current: 0,
            target: 0,
            ease: 0.1
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

        window.addEventListener("resize", () => {
            if(window.innerWidth > 900)
                this.actualCar.scale.set(0.19,0.19,0.19);
            if(window.innerWidth < 800)
                this.actualCar.scale.set(0.1,0.1,0.1);
            if(window.innerWidth < 900)
                this.actualCar.scale.set(0.16,0.16,0.16);
            if(window.innerWidth < 600)
                this.actualCar.scale.set(0.09,0.09,0.09);
            if(window.innerWidth < 500)
                this.actualCar.scale.set(0.08,0.08,0.08);
        });
        
    }
    setModel() {
        this.actualCar.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group) {
                child.children.forEach((groupChild)=> {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
            }
        })
        this.scene.add(this.actualCar);
        this.actualCar.scale.set(0.19,0.19,0.19);
        this.actualCar.position.x = -0.08;
        this.actualCar.position.y = -0.15;
    }
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualCar);
        this.startEngine = this.mixer.clipAction(this.car.animations[0]);
        this.sky1 = this.mixer.clipAction(this.car.animations[1]);
        this.sky2 = this.mixer.clipAction(this.car.animations[2]);
        this.startEngine.play();
        this.sky1.play();
        this.sky2.play();
    }
    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation*0.4;
        });
    }  
    resize() {
        
    }
    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease  
        );
        this.actualCar.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta * 0.0009);
    }
 }