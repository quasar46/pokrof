jQuery(function($) {

    $('.main-menu-item--parent').on('mouseenter', function() {
        if ($(window).width() > 992)
            $(this).find('.main-menu-sub').fadeIn(300)
    })

    $('.main-menu-item--parent').on('mouseleave', function() {
        if ($(window).width() > 992)
            $(this).find('.main-menu-sub').fadeOut(300)
    })

    $('.main-menu-sub-switch').on('click', function() {
        $(this).next().stop().slideToggle(300)
        $(this).toggleClass('main-menu-sub-switch--active')
    })

    $('.main-menu-btn').on('click', function() {
        $('.main-menu').stop().slideToggle(300)
    })

})
