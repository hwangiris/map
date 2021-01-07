var width = document.body.clientWidth;
$(function () {
	if (width < 768) {
        $('nav').hide();
    }
    $('.hamburger').click(function(){
        $(this).toggleClass('active');
        $('nav').slideToggle();
    });
});

function openShare() {
    if ( width <= 1024 ) {
        $('.county-share > span').click(function(){
            $('.share-wrapper').fadeIn();
        })
    }
}
function closeShare() {
    if ( width <= 1024 ) {
        $('.county-share-close').click(function(){
            $('.share-wrapper').fadeOut();
        })
    }
}
function accordion() {
    $('.accordion-item').each(function(){
        $(this).children('.accordion-head').click(function(){
            $(this).parent('.accordion-item').siblings().children('.accordion-head').removeClass('active');
            $(this).parent('.accordion-item').siblings().children('.accordion-body').slideUp();
            $(this).toggleClass('active');
            $(this).siblings('.accordion-body').slideToggle();
        });
    });
};
