let slickConfig = {
    dots: true,
    customPaging: function (slider, i) {
        return '<span class="button page-indicator"></span>';
    },
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    // speed: 500,
    // autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }
    ]
}

$(() => {
    $(document).on('scroll', () => {
        $('.header').toggleClass('solid', $(this).scrollTop() > $('.header').height());
    });

    $(".header__navigation-icon").on('click', () => {
        toggleNavigationMenu();

        if ($(".full-cart").is(':visible')) {
            toggleCart();
        }
    })

    $(".cart").on('click', () => {
        toggleCart();

        if ($(".navigation-menu").is(':visible')) {
            toggleNavigationMenu();
        }
    });

    $(".header__order__button, .footer__order__button").on('click', scrollToMakeBouquetSection)

    $(".footer__arrow-up").on('click', function (event) {
        event.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".baner").offset().top
        }, 1000);
    })

    $('.bouquet__carusel').slick(slickConfig);

    $('.instagram__carusel').slick(slickConfig);

    $('.catalog__grid').slick(slickConfig)
})

function toggleNavigationMenu() {
    $('.navigation-menu').slideToggle(500);
}

function toggleCart() {
    $(".full-cart").slideToggle(500);
    $(".full-cart .order__button").fadeToggle(500);
}

function scrollToMakeBouquetSection(event) {
    event.preventDefault();
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".make-your-bouquet__section").offset().top - 100
    }, 1000);
}