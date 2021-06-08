
$(() => {
    $( ".cart" ).on('click', () => {
        $( ".full-cart" ).slideToggle(500);
        $(".full-cart .order__button").fadeToggle(500);
      });

    $(".header__order__button, .footer__order__button").on('click', scrollToMakeBouquetSection)

    $(document).on('scroll', () => {
        $('.header').toggleClass('solid', $(this).scrollTop() > $('.header').height());
    });

    $(".footer__arrow-up").on('click', function(event) {
        event.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".baner").offset().top
        }, 1000);
    })

    $('.bouquet__carusel').slick({
        dots: true,
        customPaging: function(slider, i) {
            return '<span class="button page-indicator"></span>';
        },
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000
    });

    $('.instagram__carusel').slick({
        dots: true,
        customPaging: function(slider, i) {
            return '<span class="button page-indicator"></span>';
        },
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000
    })
});

function scrollToMakeBouquetSection(event) {
    event.preventDefault();
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".make-your-bouquet__section").offset().top - 100
    }, 1000);
}