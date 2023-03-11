/*
import ShowData from './MySweet';

export default class MyMapInit {
    // координати Києву
    //static calcCoordX = 50.4019514; static calcCoordY = 30.3926095;

    static speed_60 = 60; // середня швидкість авто.
    static calcTarifDistance = 10; // км, відстань, яка входить в тариф за умовчуванням.
    static calcTarifRatio = 3; // коеф. множення тарифу.

    static directionsDisplay;
    static geocoder = new google.maps.Geocoder();
    static map;
    // Яка тема ввімкнена
    static is_dark = 0;

    // Ініціалізація карти
    initialize() {
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        let chicagot = new google.maps.LatLng(50.4019514, 30.3926095);
        let myOptions = {
            zoom:10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: chicagot
        }
        this.map = new google.maps.Map(document.getElementById("mapa"), myOptions);
        this.directionsDisplay.setMap(this.map);
        let checker = document.getElementById('dark-mode-switch');
        // Який пресет теми для карти ввімкнути
        //if(checker.checked){
        //    dark_map();
        //}
        //else {
        //    light_mode();
        //}
    }
    constructor() {
        let directionsService = new google.maps.DirectionsService();
        document.getElementById('final_check_and_order').addEventListener("click", () => {
            let selected_car = document.getElementById("cars_list").getAttribute("value");
            // Вид транспорту із value (основне значення)
            //this.weightValues = document.getElementById("ves").value.split('|');
            
            // Вид транспорту із select
            selected_car = document.getElementById("weight").options [document.getElementById("weight").selectedIndex].text;
            // Вид транспорту із value (основне значення)
            let weightValues = document.getElementById("weight").value.split('|');
            let delivery_cost = parseFloat(weightValues[0]); // вартість тарифу із першого параметру
            let cost_per_km = parseFloat(weightValues[1]); // вартість за 1 км із другого параметру

            let from = document.getElementById("from").value;
            let to = document.getElementById("to").value;

            let request = {
                origin:from,
                destination:to,
                travelMode: google.maps.TravelMode.DRIVING
            };
            new google.maps.DirectionsService().route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    this.directionsDisplay.setDirections(response);
                    console.log("1!");
                    let route = response.routes[0];
                    console.log("2!");
                    this.summaryPanel = document.getElementById("results");
                    function removeSpaces(str) {
                        return str.replace(/\s/g, "");
                    }
                    for (let i = 0; i < route.legs.length; i++) {
                        // Відставнь в форматі "xx,x км"
                        let dist_s = route.legs[i].distance.text;
                        dist_s = removeSpaces(dist_s);
                        dist_s = parseFloat(dist_s.replace(/,/,'.')); // Преобразуємо до типу хх.х
                        if(dist_s <= this.calcTarifDistance){
                            let cost_delivery = delivery_cost*this.calcTarifRatio;
                        }else{
                            // Вартість доставки = відстань між А та Б * ціна за 1 км. (значення value із випадаючого списку).
                            let cost_delivery = delivery_cost*this.calcTarifRatio + (dist_s-calcTarifDistance)*cost_per_km;
                        }
                        cost_delivery = Math.round(cost_delivery);
                        // Вставка пробілу між чисячами
                        let cost_result = cost_delivery.toString().replace(/(\d{3})$/, " $1");
                        // Час - км\час
                        let time_result = dist_s/this.speed_60;
                        time_result = Math.ceil(time_result);

                        let res_str = "<hr class=\"my-4\">";
                        res_str +="<h5 class=\"text mb-3 text-uppercase fw-semibold\">Результат</h5>";
                        res_str += "<ol class=\"ps-3 text\">";
                        res_str += "<li class=\"py-1\">";
                        res_str += "<span class=\"text\">Звідки: <span class=\"float-end\" id=\"result_start_address\">" + (route.legs[i].start_address) + "</span></span>";
                        res_str += "</li>";
                        res_str += "<li class=\"py-1\">";
                        res_str += "<span class=\"text\">Куди: <span class=\"float-end\" id=\"result_end_address\">" + (route.legs[i].end_address) + "</span></span>";
                        res_str += "</li>";
                        res_str += "<li class=\"py-1\">";
                        res_str += "<span class=\"text\">Відстань: <span class=\"float-end\" id=\"result_distance\">" + (route.legs[i].distance.text) + "</span></span>";
                        res_str += "</li>";
                        res_str += "<li class=\"py-1\">";
                        res_str += "<span class=\"text\">Машиною: <span class=\"float-end\" id=\"result_car\">" + (tonn) + "</span></span>";
                        res_str += "</li>";
                        res_str += "<li class=\"py-1\">";
                        res_str += "<span class=\"text\">~ Час: <span class=\"float-end\" id=\"result_time\">" + (time_result) + " годин зі швидкістю " + speed_60 + " км/ч</span></span>";
                        res_str += "</li>";
                        res_str += "<li class=\"py-1\">";
                        res_str += "<span class=\"text\" id=\"price\" name=\"price\">Ціна: <span class=\"float-end\" id=\"result_price\">" + cost_result + " &#x20B4;</span></span>";
                        res_str += "</li>";
                        res_str += "</ol>";
                        res_str += "<div class=\"container\">";
                        res_str += "<div class=\"row\">";
                        res_str += "<div class=\"col text-center\">";
                        res_str += "<a href=\"#results\" id=\"checkout\" class=\"btn btn-sm btn-success\">Оформити замовлення</a>";
                        res_str += "</div>";
                        res_str += "</div>";
                        res_str += "</div>";
                        summaryPanel.innerHTML = res_str;

                        
                        document.getElementById('checkout').addEventListener('click', () => {ShowData();}); // Display Data
                        
                        this.successMessage();
                    }
                } else {
                    this.errorMessage();
                }

            });
            
        });
        //this.addHandler('load', initialize);
    }
    document.getElementById('dark-mode-switch').addEventListener('change', function (event){
        event.target.checked ? dark_map() : initialize();
    });
    document.getElementById('light-mode-switch').addEventListener('change', function (event){
        event.target.checked ? light_mode() : initialize();
    });
    dark_map() {
        this.myOptions = {
            styles: [
                {elementType: "geometry", stylers: [{color: "#242f3e"}]},
                {elementType: "labels.text.stroke", stylers: [{color: "#242f3e"}]},
                {elementType: "labels.text.fill", stylers: [{color: "#746855"}]},
                {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{color: "#d59563"}],
                },
                {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{color: "#d59563"}],
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{color: "#263c3f"}],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{color: "#6b9a76"}],
                },
                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{color: "#38414e"}],
                },
                {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{color: "#212a37"}],
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{color: "#9ca5b3"}],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{color: "#746855"}],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{color: "#1f2835"}],
                },
                {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{color: "#f3d19c"}],
                },
                {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{color: "#2f3948"}],
                },
                {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{color: "#d59563"}],
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{color: "#17263c"}],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{color: "#515c6d"}],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{color: "#17263c"}],
                }
            ]
        };
        this.map.setOptions(myOptions);
    }
    light_mode() {
        this.myOptions = {
            styles: []
        };
        this.map.setOptions(myOptions);
    }

    successMessage(){
        Command: toastr["success"]("Шлях прокладено, перевірте результат!", "Успішно")

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 1500,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
    errorMessage(){
        Command: toastr["error"]("Упс! Не вдається знайти таку адресу... Спробуйте знову.", "Помилка")

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 1500,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
    //window.onload = initialize;
    addHandler(ev, handler){
        try{
            window.addEventListener(ev, handler, false);
        }catch(e){
            window.attachEvent('on'+ev, handler);
        }
    }
}
*/