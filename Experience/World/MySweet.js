
/*import Swal from 'sweetalert2/src/sweetalert2.js'

export default async function ShowData()
{
  const steps = ['1', '2']
  const swalQueueStep = Swal.mixin({
    confirmButtonText: 'Далі',
    cancelButtonText: 'Назад',
    progressSteps: steps,
    reverseButtons: true,
    validationMessage: 'Це поле обов\'язкове',
    
  })

  const values = []
  let currentStep

  for (currentStep = 0; currentStep < steps.length;) {
    if(currentStep === 0) {
      const result = await swalQueueStep.fire({
          html: 
          '<h5>Ім\'я</h5>' + 
          '<input id="sweet_name" class="swal2-input" required>' +
          '<h5>Телефон:</h5>' +
          '<input id="sweet_phone" class="swal2-input" required>',
          showCancelButton: currentStep > 0,
          currentProgressStep: currentStep,
          preConfirm: () => {
            if (!document.getElementById('sweet_name').value) {
              swalQueueStep.showValidationMessage(
                'Введіть ім\'я!'
              )
            }
            let regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
            if (!document.getElementById('sweet_phone').value) {
              swalQueueStep.showValidationMessage(
                'Введіть номер телефону!'
              )
            }
            
          }
      })
  
      currentStep++
    }
    if(currentStep === 1) {
      let name_buff = $('#sweet_name').val();
      let phone_buff = $('#sweet_phone').val();
      const result = await swalQueueStep.fire({
          title: `Кінцевий перегляд`,
          html: 
          '<div>' +

              '<h6 style=\"font-size: 15pt !important;\">Ім\'я:</h6>' + $('#sweet_name').val() +

              '<h6 style=\"font-size: 15pt !important;\">Телефон:</h6>' + $('#sweet_phone').val() +

              '<h6 style=\"font-size: 15pt !important;\">Звідки:</h6>' + $('#result_start_address').text() +

              '<h6 style=\"font-size: 15pt !important;\">Куди:</h6>' + $('#result_end_address').text() +

              '<h6 style=\"font-size: 15pt !important;\">Відстань:</h6>' + $('#result_distance').text() +

              '<h6 style=\"font-size: 15pt !important;\">Машина:</h6>' + $('#result_car').text() +

              '<h6 style=\"font-size: 15pt !important;\">Ціна:</h6>' + $('#result_price').text() +

          '</div>',
          confirmButtonText: 'Підтвердити',
          showCancelButton: currentStep > 0,
          currentProgressStep: currentStep
      })
  
      if (result.dismiss === Swal.DismissReason.cancel) {
          currentStep--
      } else {
        $("#sweet_name_result").val(name_buff);
        $("#sweet_phone_result").val(phone_buff);
        currentStep++
      }
    }
  }

  if (currentStep === steps.length) {
    // Telegramm & success message
    let bot = {
      TOKEN: "5798001514:AAEQIAQ7he_3z5AMAiqkJhDs1Nml8MXegIU",
      chatID: "-601882959"
    }
    let message = encodeURIComponent(
    `Нове замовлення!\n
    Ім'я: ${$('#sweet_name_result').val()}\n
    Телефон: ${$('#sweet_phone_result').val()}\n
    Звідки: ${$('#result_start_address').text()}\n
    Куди: ${$('#result_end_address').text()}\n
    Відстань: ${$('#result_distance').text()}\n
    Машиною: ${$('#result_car').text()}\n
    ~ Час: ${$('#result_time').text()}\n
    Ціна: ${$('#result_price').text()}\n
    `);


    fetch(`https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${message}`, {
      method: "GET"
    })
    .then(success => {
      Swal.fire({
        icon: 'success',
        title: 'Замовлення прийнято!',
        text: 'Дякуємо що вибрали саме нас! Очікуйте на дзвінок.',
      })
    });
  }
}
*/