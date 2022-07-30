import $ from 'cash-dom'
import * as feather from 'feather-icons'

$(document).ready(() => {
    feather.replace()
    var landingColors = [
        // 'is-dark',
        'is-primary',
        // 'is-link',
        'is-info',
        // 'is-warning',
        'is-danger',
    ];
    // set landing hero to a random background color
    $('#landing').each(function() {
        $(this).addClass(
            landingColors[~~(Math.random()*landingColors.length)]
        );
    });
});

window.onscroll = function() {updateNav()};

var navHeight = 50;
// Add the sticky class to the navbar when you reach its scroll position.
// Remove 'sticky' when you leave the scroll position
function updateNav() {
    if (window.pageYOffset >= window.innerHeight - navHeight) {
        $('nav').addClass('sticky')
        $('nav > .tabs').removeClass('is-boxed');
        $('nav li').each(function() {
            $(this).removeClass('is-active');
        });
    } else {
        $('nav').removeClass('sticky')
        $('nav > .tabs').addClass('is-boxed')
    }
    // REFACTOR THIS - lots of repeated code here
    if (window.pageYOffset >= window.innerHeight) {
        $('nav li').each(function() {
            $(this).removeClass('is-active is-underlined');
        });
        $('#nav1').addClass('is-active is-underlined');
    }
    if (window.pageYOffset >= (window.innerHeight * 2)) {
        $('nav li').each(function() {
            $(this).removeClass('is-active is-underlined');
        });
        $('#nav2').addClass('is-active is-underlined');
    }
    if (window.pageYOffset >= (window.innerHeight * 3)) {
        $('nav li').each(function() {
            $(this).removeClass('is-active is-underlined');
        });
        $('#nav3').addClass('is-active is-underlined');
    }
    if (window.pageYOffset >= (window.innerHeight * 4)) {
        console.log('2');
        $('nav li').each(function() {
            $(this).removeClass('is-active is-underlined');
        });
        $('#nav4').addClass('is-active is-underlined');
    }
}

$('nav li').on('click', function(){
    $('nav li').each(function() {
        $(this).removeClass('is-active');
    });
    $(this).addClass('is-active');
});
