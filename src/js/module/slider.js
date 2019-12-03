jQuery(function($) {
    if ($('.main-slider').length && $().slick) {
        var spead = $('.main-slider').data('spead')
        $('.main-slider').slick({
            autoplay: spead ? true : false,
            autoplaySpeed: spead,
        })
    }

    if ($().slick) {
        $('.item-slider-items').each(function() {
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
})
