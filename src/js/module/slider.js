jQuery(function ($) {
    if ($('.main-slider').length && $().slick) {
        var spead = $('.main-slider').data('spead')
        $('.main-slider').slick({
            autoplay: spead ? false : false,
            autoplaySpeed: spead,
            dots: true
        })
    }

    if ($().slick) {
        $('.item-slider-items').each(function () {
            var count = $(this).find('>*').length
            $(this).slick({
                dots: count > 3,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        dots: count > 2,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        dots: count > 1,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        })
    }

    if ($('.main-exhibition-slider').length && $().slick) {
        $('.main-exhibition-slider').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
        })
    }

    if ($('.main-gallery-slider').length && $().slick) {
        /*navigation*/
        $('.main-gallery-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.main-gallery-photo',
            dots: false,
            focusOnSelect: true,
            vertical: true,
            swipe: false,
        });

        $('.main-gallery-photo').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.main-gallery-slider',
            dots: false,
            // responsive: [
            //     {
            //         breakpoint: 1024,
            //         settings: {
            //             slidesToShow: 3,
            //             slidesToScroll: 3,
            //             infinite: true,
            //             dots: true
            //         }
            //     },
            //     {
            //         breakpoint: 600,
            //         settings: {
            //             slidesToShow: 2,
            //             slidesToScroll: 2
            //         }
            //     },
            //     {
            //         breakpoint: 480,
            //         settings: {
            //             slidesToShow: 1,
            //             slidesToScroll: 1
            //         }
            //     }
            //     // You can unslick at a given breakpoint now by adding:
            //     // settings: "unslick"
            //     // instead of a settings object
            // ]
        });

    }

})
