import {EventEmitter} from "events";

export default class Sizes extends EventEmitter {
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.pixelRatio = window.devicePixelRatio;//Math.min(window.devicePixelRatio, 2);
        this.frustrum = 5;
        window.addEventListener("resize", () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = (this.width / this.height);
            this.pixelRatio = window.devicePixelRatio;//Math.min(window.devicePixelRatio, 2);
            this.emit("resize");
        });
        this.onScrollDown();
    }
    onScrollDown() {        
        const statusElem = document.querySelector('.status');

        const onScreen = new Set();
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                onScreen.add(entry.target);
                } else {
                onScreen.delete(entry.target);
                }
            });
            // Stop render the model when user don't see it
            if(!onScreen.size) { 
                this.pixelRatio = window.devicePixelRatio / 100;
                this.emit("resize");
            }
            else {
                this.pixelRatio = window.devicePixelRatio;
                this.emit("resize");
            }
        });
        document.querySelectorAll('.experience').forEach(elem => {
            intersectionObserver.observe(elem);
          });
    }
}