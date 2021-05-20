$(function() {
   

    /* Photo Slider */

    let slider = $("#photoSlider");
    slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        fade: true,
        autoplaySpeed: 3000,
        swipe: false,
        draggable: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        easing: 'linear',

    });

});
