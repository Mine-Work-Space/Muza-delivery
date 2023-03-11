$(document).ready(function() {
    // When the user clicks the button, open the modal 
    $('#car_details_1').click(function () {
        let content = "<table class=\"fl-table\"><thead><tr><th>Характеристики</th><th>Дані</th></tr></thead><tbody>";

        content += "<tr><td>Довжина</td>";
        content += `<td>1.7 м</td>`;
        content += "</tr>";

        content += "<tr><td>Ширина</td>";
        content += `<td>1.5 м</td>`;
        content += "</tr>";

        content += "<tr><td>Висота</td>";
        content += `<td>1.2 м</td>`;
        content += "</tr>";

        content += "<tr><td>Об'єм</td>";
        content += `<td>3 м³</td>`;
        content += "</tr>";

        content += "<tr><td>Вантажопідйомність</td>";
        content += `<td>до 800 кг</td>`;
        content += "</tr>";

        content += "</tbody></table>";
        $('#offcanvasBottomLabel').html("Volkswagen Transporter T5");
        $('.details-table').html(content);

        // Set src to images
        $("#image_1").attr("src", "/img/cars/car1/1.webp");
        $("#image_2").attr("src", "/img/cars/car1/2.webp");
        $("#image_3").attr("src", "/img/cars/car1/3.webp");
        $("#image_4").attr("src", "/img/cars/car1/4.webp");
    });
    $('#car_details_2').click(function () {
        let content = "<table class=\"fl-table\"><thead><tr><th>Характеристики</th><th>Дані</th></tr></thead><tbody>";

        content += "<tr><td>Довжина</td>";
        content += `<td>3.5 м</td>`;
        content += "</tr>";

        content += "<tr><td>Ширина</td>";
        content += `<td>1.7 м</td>`;
        content += "</tr>";

        content += "<tr><td>Висота</td>";
        content += `<td>2 м</td>`;
        content += "</tr>";

        content += "<tr><td>Об'єм</td>";
        content += `<td>12 м³</td>`;
        content += "</tr>";

        content += "<tr><td>Вантажопідйомність</td>";
        content += `<td>до 1500 кг</td>`;
        content += "</tr>";

        content += "</tbody></table>";
        $('#offcanvasBottomLabel').html("Reno Master 2016 (метал)");
        $('.details-table').html(content);

        // Set src to images
        $("#image_1").attr("src", "/img/cars/car2/1.webp");
        $("#image_2").attr("src", "/img/cars/car2/2.webp");
        $("#image_3").attr("src", "/img/cars/car2/3.webp");
        $("#image_4").attr("src", "/img/cars/car2/4.webp");
    });
    $('#car_details_3').click(function () {
        let content = "<table class=\"fl-table\"><thead><tr><th>Характеристики</th><th>Дані</th></tr></thead><tbody>";

        content += "<tr><td>Довжина</td>";
        content += `<td>3.5 м</td>`;
        content += "</tr>";

        content += "<tr><td>Ширина</td>";
        content += `<td>1.7 м</td>`;
        content += "</tr>";

        content += "<tr><td>Висота</td>";
        content += `<td>2 м</td>`;
        content += "</tr>";

        content += "<tr><td>Об'єм</td>";
        content += `<td>12 м³</td>`;
        content += "</tr>";

        content += "<tr><td>Вантажопідйомність</td>";
        content += `<td>до 2000 кг</td>`;
        content += "</tr>";

        content += "</tbody></table>";
        $('#offcanvasBottomLabel').html("Reno Master 2016 (тентована)");
        $('.details-table').html(content);
        // Set src to images
        $("#image_1").attr("src", "/img/cars/car3/1.webp");
        $("#image_2").attr("src", "/img/cars/car3/2.webp");
        $("#image_3").attr("src", "/img/cars/car3/3.webp");
        $("#image_4").attr("src", "/img/cars/car3/4.webp");
    });
    $('#car_details_4').click(function () {
        let content = "<table class=\"fl-table\"><thead><tr><th>Характеристики</th><th>Дані</th></tr></thead><tbody>";

        content += "<tr><td>Довжина</td>";
        content += `<td>4.8 м</td>`;
        content += "</tr>";

        content += "<tr><td>Ширина</td>";
        content += `<td>2.2 м</td>`;
        content += "</tr>";

        content += "<tr><td>Висота</td>";
        content += `<td>2.2 м</td>`;
        content += "</tr>";

        content += "<tr><td>Об'єм</td>";
        content += `<td>23 м³</td>`;
        content += "</tr>";

        content += "<tr><td>Вантажопідйомність</td>";
        content += `<td>до 3000 кг</td>`;
        content += "</tr>";

        content += "</tbody></table>";
        // Set src to images
        $('#offcanvasBottomLabel').html("Reno Master 2016 (метал + гідроборд)");
        $('.details-table').html(content);
        $("#image_1").attr("src", "/img/cars/car4/1.webp");
        $("#image_2").attr("src", "/img/cars/car4/2.webp");
        $("#image_3").attr("src", "/img/cars/car4/3.webp");
        $("#image_4").attr("src", "/img/cars/car4/4.webp");
    });
});