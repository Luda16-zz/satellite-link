/*
$(document).ready(function () {
            //Menú responsivo
            $(".button-collapse").sideNav();

            //Animaciones
            var options = [
                {
                    selector: '.portfolio-holder img',
                    offset: 0,
                    callback: 'fadeInImage(".portfolio-holder img")'
                },
                {
                    selector: '.habilidades li',
                    offset: 0,
                    callback: 'showStaggeredList(".habilidades ul")'
                }
                       ];
            scrollFire(options);

            //Parallax
            $('.parallax').parallax();

            //Scroll
            $('section').scrollSpy();
        });
*/

// Initialize collapse button
$(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
//$('.collapsible').collapsible();