$(function () {
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
	if (width < 768) {
        $('nav').hide();
    }
    $('.hamburger').click(function(){
        $(this).toggleClass('active');
        $('nav').slideToggle();
    })
    $('#county-tooltip-close').on("click", function(){
        $('#tooltip').hide();
    })
    $('.accordion-item').each(function(){
        $(this).children('.accordion-head').click(function(){
            $(this).parent('.accordion-item').siblings().children('.accordion-head').removeClass('active');
            $(this).parent('.accordion-item').siblings().children('.accordion-body').slideUp();
            $(this).toggleClass('active');
            $(this).siblings('.accordion-body').slideToggle();
        })
    })
});
