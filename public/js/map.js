import ShowData from './my_sweet.js';

// координати Києву
var calcCoordX = 50.462017; 
var calcCoordY = 30.557486;

var speedN = 60; // середня швидкість авто.
var calcTarifDistance = 10; // км, відстань, яка входить в тариф за умовчуванням.
var calcTarifRatio = 3; // коеф. множення тарифу.

var directionsDisplayy;
var directionsServicee = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();
var map;
// Яка тема ввімкнена
var is_dark = 0;

// Ініціалізація карти
function initialize() {
    directionsDisplayy = new google.maps.DirectionsRenderer();
    var kyiv = new google.maps.LatLng(calcCoordX, calcCoordY);
    var myOptions = {
        zoom:10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: kyiv
    }
    map = new google.maps.Map(document.getElementById("mapa"), myOptions);
    directionsDisplayy.setMap(map);
    let checker = document.getElementById('dark-mode-switch');
    // Який пресет теми для карти ввімкнути
    //if(checker.checked){
    //    dark_map();
    //}
    //else {
    //    light_mode();
    //}
}

document.getElementById('final_check_and_order').addEventListener("click", function(e) {
    var tonn = document.getElementById("cars_list").getAttribute("value");
    // Вид транспорту із value (основне значення)
    //var vesValueA = document.getElementById("ves").value.split('|');
    
    // Вид транспорту із select
    var tonn = document.getElementById("weight").options [document.getElementById("weight").selectedIndex].text;
    // Вид транспорту із value (основне значення)
    var vesValueA = document.getElementById("weight").value.split('|');
    var calcTarifCost = parseFloat(vesValueA[0]); // вартість тарифу із першого параметру
    var costKmN = parseFloat(vesValueA[1]); // вартість за 1 км із другого параметру

    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    var request = {
        origin:from,
        destination:to,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsServicee.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplayy.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById("results");
            function removeSpaces(str) {
                var res = str.replace(/\s/g, "");
                return res;
            }
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i+1;
                // Відставнь в форматі "xx,x км"
                var distanceS = route.legs[i].distance.text;
                distanceS = removeSpaces(distanceS);
                distanceS = parseFloat(distanceS.replace(/,/,'.')); // Преобразуємо до типу хх.х
                if(distanceS<=calcTarifDistance){
                    var costDostavkaN = calcTarifCost*calcTarifRatio;
                }else{
                    // Вартість доставки = відстань між А та Б * ціна за 1 км. (значення value із випадаючого списку).
                    var costDostavkaN = calcTarifCost*calcTarifRatio + (distanceS-calcTarifDistance)*costKmN;
                }
                costDostavkaN = Math.round(costDostavkaN);
                // Вставка пробілу між чисячами
                var costDostavkaS = costDostavkaN.toString().replace(/(\d{3})$/, " $1");
                // Час - км\час
                var timeN = distanceS/speedN;
                var timeN = Math.ceil(timeN);

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
                res_str += "<span class=\"text\">~ Час: <span class=\"float-end\" id=\"result_time\">" + (timeN) + " годин зі швидкістю " + speedN + " км/ч</span></span>";
                res_str += "</li>";
                res_str += "<li class=\"py-1\">";
                res_str += "<span class=\"text\" id=\"price\" name=\"price\">Ціна: <span class=\"float-end\" id=\"result_price\">" + costDostavkaS + " &#x20B4;</span></span>";
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
                
                successMessage();
            }
        } else {
            errorMessage();
        }

    });
    
});
/*
document.getElementById('dark-mode-switch').addEventListener('change', function (event){
    event.target.checked ? dark_map() : initialize();
});
document.getElementById('light-mode-switch').addEventListener('change', function (event){
    event.target.checked ? light_mode() : initialize();
});*/
function dark_map() {
    var myOptions = {
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
    map.setOptions(myOptions);

}
function light_mode() {
    var myOptions = {
        styles: []
    };
    map.setOptions(myOptions);
}

function successMessage(){
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
function errorMessage(){
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
function addHandler(ev, handler){
    try{
        window.addEventListener(ev, handler, false);
    }catch(e){
        window.attachEvent('on'+ev, handler);
    }
}
addHandler('load', initialize);
