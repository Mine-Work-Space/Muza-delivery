function initialize() {
    var input1 = document.getElementById('from');
    var input2 = document.getElementById('to');

    var options = {
    types: ['(cities)'],
    componentRestrictions: {country: 'ua'},
    };

    var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
    google.maps.event.addListener(autocomplete1, 'place_changed', function() {
        var place = autocomplete1.getPlace(); //получаем место
    });
    var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
    google.maps.event.addListener(autocomplete2, 'place_changed', function() {
        var place = autocomplete2.getPlace(); //получаем место
    });

}
google.maps.event.addDomListener(window, 'load', initialize);

