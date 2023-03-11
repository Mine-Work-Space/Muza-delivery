$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:false,
        rewind:true,
      margin:10,
      nav:true,
      center: true,
      startPosition: 1,
      navText: [
          "<img src=\"/img/features/back_arrow.svg\" style=\"width:40px;\"\>",
          "<img src=\"/img/features/forward_arrow.svg\" style=\"width:40px; margin-right:-11px !important;\"\>"
      ],
      responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1000:{
              items:3
          }
      }
    });
  });