$(document).ready(function () {
    $('.sticky').pushpin({
        top: 0,
        bottom: 1500,
        offset: 0
    });

    $('.carousel.carousel-slider').carousel({
        //fullWidth: true,
        //duration: 200
    });

    $('.carousel').carousel();

    // Next slide
    $('.carousel').carousel('next');
    $('.carousel').carousel('next', 3); // Move next n times.
    // Previous slide
    $('.carousel').carousel('prev');
    $('.carousel').carousel('prev', 4); // Move prev n times.
    // Set to nth slide
    $('.carousel').carousel('set', 4);

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });

    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    });

    $('.tap-target').tapTarget('open');
    $('.tap-target').tapTarget('close');

    $('.slider').slider();

    $('.parallax').parallax();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'right', // Choose the horizontal origin
        //closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        //draggable: true // Choose whether you can drag to open on touch screens
    });
    
    $('select').material_select();

    $('#sideNav-button').on('click', function() {
        $('.button-collapse').sideNav('hide');
    })

    // if (window.performance) {
    //     console.info("window.performance work's fine on this browser");
    // }
    // if (performance.navigation.type == 1) {
    //     console.info( "This page is reloaded" );
    // } else {
    //     console.info( "This page is not reloaded");
    // }
    
    // $(window).on('beforeunload', function(){
    //     console.log("beforeunload");
    //     alert("window before load occurred!");
    // });
   

    // window.onbeforeunload = function(e) {
    //     console.log("beforeunload");
    //     alert("window before load occurred!");
    // };

       
});