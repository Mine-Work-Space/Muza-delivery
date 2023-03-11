import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

export default class MyFirebase {
    constructor() {}
    init() {
        const firebaseConfig = {
          apiKey: "AIzaSyBJXllKX2hOsbetq_lJS0M2tkkUKSMdYGc",
          authDomain: "muzadeliveryvanillajs.firebaseapp.com",
          databaseURL: "https://muzadeliveryvanillajs-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "muzadeliveryvanillajs",
          storageBucket: "muzadeliveryvanillajs.appspot.com",
          messagingSenderId: "803941056324",
          appId: "1:803941056324:web:519849f697c9076edda111",
          measurementId: "G-PPWR60P7VS"
        };
        const app = initializeApp(firebaseConfig);
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Cars`)).then((snapshot) => {
          if (snapshot.exists()) {
            
            var x = document.getElementById("weight");
        
            for(let i = 1; i <= 4; i++) {
              let name = "Car" + i;
        
              var option = document.createElement("option");
              option.value = snapshot.child(name).child("delivery").val() + "|" + snapshot.child(name).child("pricekm").val();
              option.text = snapshot.child(name).child("name").val();
              x.add(option);
              
            }
          } else {
            var option = document.createElement("option");
            option.value = "170|18";
            option.text = "Мініван (0,5 Т)";
            x.add(option);

            var option = document.createElement("option");
            option.value = "300|20";
            option.text = "Максі бус (2 Т)";
            x.add(option);
        
            var option = document.createElement("option");
            option.value = "500|35";
            option.text = "Вантажівка (3 Т)";
            x.add(option);
          }
        }).catch((error) => {
          console.error(error);
        });
    }
}
