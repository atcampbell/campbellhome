$(document).ready(function(){

  // ajax get request for html of clicked button's id
  $(".contentButton").click(function() {
    // get id from class (element id is the slug)
    var id = this.id;
    $('#mainSketch').fadeOut('fast');
    // call get_main_content in views.py
    $.get('/get_main_content', {
      contentWanted: id,
    }, function(data) {
      // mainContent div is returned html
      $('.mainContent').fadeOut('fast', function() {
        $('.mainContent').html(data);

        // put margin at top of main content
        $('.mainContent').css("margin-top", "30px");
        $('body').css("overflow", "visible");

        // initialise masonry
        var $grid = $('.grid').masonry({
          itemSelector: '.grid-item',
          isFitWidth: true,
        });

        // wait until images are loaded before layout
        $grid.imagesLoaded().progress( function() {
          $grid.masonry('layout');
        });

        // change text colour dependant on background
        $('a').css({"color":"#000000"});

        $('.mainContent').fadeIn('fast');
      });
    });
    return false;
  });

  // show the main sketch when returning from other page
  $(".showSketch").click(function() {
    // fade out main content
    $('.mainContent').fadeOut('fast', function() {
      // remove margins and overflow
      $('.mainContent').css("margin-top", "0px");
      $('body').css("overflow", "hidden");
      // change text colour
      $('a').css({"color":"#FFFFFF"});
      // fade in sketch
      $('#mainSketch').fadeIn('fast');
    });
  });

  // get work wanted when clicking image
  $(".contentWrapper").on("click", ".grid-item", function() {
    // id will be slug of work wanted
    var id = this.id;
    // ajax get request
    $.ajax({
      url: "/get_main_content",
      type: "get",
      data: { contentWanted: id },
      success: function(response) {
        // fade out main content, update and fade in
        $('.mainContent').fadeOut('fast', function() {
          $('.mainContent').html(response);
          $('.mainContent').css("margin-top", "30px");
          $('.mainContent').fadeIn('fast');
        });
      }
    });

  });

  // CSRF token code from https://github.com/realpython/django-form-fun/blob/master/part1/main.js
  // This function gets cookie with a given name
  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

  /*
  The functions below will create a header with csrftoken
  */
  function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
  function sameOrigin(url) {
      // test that a given url is a same-origin URL
      // url could be relative or scheme relative or absolute
      var host = document.location.host; // host + port
      var protocol = document.location.protocol;
      var sr_origin = '//' + host;
      var origin = protocol + sr_origin;
      // Allow absolute or scheme relative URLs to same origin
      return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
          (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
          // or any other URL that isn't scheme relative or absolute i.e relative.
          !(/^(\/\/|http:|https:).*/.test(url));
  }

  $.ajaxSetup({
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
              // Send the token to same-origin, relative URLs only.
              // Send the token only if the method warrants CSRF protection
              // Using the CSRFToken value acquired earlier
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
  });



});
