$('.slick-container').slick({
	slidesToShow: 3,
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: false,
	responsive: [
		{
			breakpoint: 990,
			settings: {
				slidesToShow: 2
			}
		},

		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1
			}
		}		
	]

});

$('.slick-firms').slick({
	slidesToShow: 7,
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: false,
	responsive: [
		{
			breakpoint: 990,
			settings: {
				slidesToShow: 6
			}
		},

		{
			breakpoint: 600,
			settings: {
				slidesToShow: 4
			}
		},

		{
			breakpoint: 600,
			settings: {
				slidesToShow: 3
			}
		}
	]	
});


$('.entry').click(function(){
	$('.pop-up').show();
});

$('.close').click(function(){
	$(this).parent().parent().hide();
});