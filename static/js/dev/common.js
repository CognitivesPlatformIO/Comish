(function ($) {
    $(document).ready(function() {
        $('.show-comments').on('click', function(){
            var disqus_shortname = 'cognitives-io'; // Replace this value with *your* username.

            // ajax request to load the disqus javascript
            $.ajax({
                type: "GET",
                url: "http://" + disqus_shortname + ".disqus.com/embed.js",
                dataType: "script",
                cache: true
            });
            // hide the button once comments load
            $(this).fadeOut();
        });

        $('.static-page img, .article img').each(function () {
            if (!$(this).hasClass('share-popup__close')) {
                $(this).attr('data-action','zoom');
            }
        });

        window.onload = function(){
            var hash = (window.location.hash).replace('#', '');
            if (hash === 'sign-up') {
                $('a[href="#signUp"]').tab('show');
            } else if (hash === 'login') {
                $('a[href="#login"]').tab('show');
            }
        }

        $('.sign-up__link').on('click', function () {
            var target = this.href.split('#');
            $('a[href="#signUp"]').tab('show');
        })

        $('.login__link').on('click', function () {
            $('a[href="#signIn"]').tab('show');
        })

        var overiFrame = -1;
        $('iframe').hover( function() {
            overiFrame = $(this).closest('.video-overlay');
        }, function() {
            overiFrame = -1
        });

      $('.shops-slider').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              infinite: true
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });

        $(window).blur( function() {
            if( overiFrame != -1 ) {
                $('.slick-slider').slick('slickPause');
                $('.article').toggleClass('video-play');
            }
        });

        $('.slick-dots').on('click', function () {
            $('.slick-slider').slick('slickPlay');
            $('.article').removeClass('video-play');
        })
    });

    function draggable() {
        if ($(".banner__container").width() > $(".banner").width()) {
            console.log('working');
            $(".banner__container").draggable({
                cursor: "move",
                containment: "banner",
                axis: 'x',
                drag: function( event, ui ) {
                    ui.position.left = Math.min( 0,
                      ($(".banner").width() - $(".banner__container").width()) < ui.position.left ?
                        ui.position.left : ($(".banner").width() - $(".banner__container").width())
                    );
                }
            });
        }
    }
    draggable();

      $(window).resize(function(){
        if ($('.side-navigation').is(':visible')) {
            var currentWidth = $('.side-navigation').width();
            var windowWidth = $(window).width();
            if (currentWidth > windowWidth && windowWidth > 300) {
                var newWidth = windowWidth - 20;
                $('.side-navigation').css('width', newWidth + 'px');
            }
        }
        draggable();
    });

    $('.card--social a').on('click', function (e) {
        e.preventDefault();
        var dataSlug = $(e.target).closest('a').attr('data-slug')
        $( '.modal .modal-content' ).load('/posts/' + dataSlug);
        $('.modal').modal('show');
    });

    $('.modal').on('hidden.bs.modal', function () {
        $( '.modal .modal-content *' ).remove();
    });



    $(document).on('click', '.social-modal', function (e) {
        $('.modal').modal('hide');
    });

    $(document).on('click', '.social-modal__content', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.social-modal__video_wrap', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.social-modal__image_image', function (e) {
        e.stopPropagation();
    });

    // Share popup on click and exit function
    $(document).on('click', '.button__share, .header_actions__share, .event__panel--share, .article__tab--share', function (e) {
        if ($('.button__share, .header_actions__share').hasClass('close-popup')) {
            $('.button__share, .header_actions__share').removeClass('close-popup');
            $('.share-popup').removeClass('active');
        } else {
            $('.share-popup').addClass('active');
            $('.button__share, .header_actions__share').addClass('close-popup')
            $(document).one('click', '.modal, .share-popup__close, .article, .blog, .social-modal__content, .modal-content, #content', '.channel', function (e) {
                $('.share-popup').removeClass('active');
                if(!$(e.target).hasClass('button__share') && !$(e.target).hasClass('header_actions__share')) {
                    $('.button__share, .header_actions__share').removeClass('close-popup');
                }
            });
        }
    });

    // Share popup positioning relative to the button position on screen (so it doesnt appear off screen).
    if ($('.button__share').length) {
      var widowWidth = $(window).width();
      var shareLeft = $('.button__share').offset().left;
      if ((widowWidth / 2) > shareLeft) {
        $('.share-popup').css('right', '-212px');
      } else {
        $('.share-popup').css('right', '0px');
      }
    }


    $(document).on('click', '.share-popup', function (e) {
        e.stopPropagation();
    });

    $(document).on("focus", '.share-link', function() {
        $(this).select();
    });
    $(document).on("mouseup", '.share-link', function(e){
        e.preventDefault();
    });

    $(document).on("click", '.share-popup__copy-text', function(e){
        var shareLinkBox = $('.share-popup__share-link');
        shareLinkBox.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });

    if ($('.dropdown-toggle')) {
        $('.dropdown-toggle').dropdown()
    }

    // $('.forceLoginModal').loginModal({
    //     onLoad: function () {
    //         $("#loginForm").validateLoginForm();
    //         $("#signupForm").validateSignupForm();
    //     }
    // });
    //
    // /*
    //  * Follow Blog on article page
    //  */
    // $('.followArticleBtn').followBlog({
    //     onSuccess: function (data, obj) {
    //        ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
    //         var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
    //         $.fn.General_ShowNotification({message: message + " blog successfully."});
    //     },
    //     beforeSend: function (obj) {
    //         $(obj).html('please wait...');
    //     }
    // });

    // $('.shareIcons').SocialShare({
    //     onLoad: function (obj) {
    //         var title = obj.parents('div.article').find('.card__news-category').text();
    //         var url = obj.parents('div.article').find('a').attr('href');
    //         var content = obj.parents('div.article').find('.card__news-description').text();
    //         $('.rrssb-buttons').rrssb({
    //             title: title,
    //             url: url,
    //             description: content
    //         });
    //         setTimeout(function () {
    //             rrssbInit();
    //         }, 10);
    //     }
    // });

    $("#owl-thumbnails").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: true,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        navigationText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ]
    });

    //Contact form validation
    $('#contactForm').validate({
        rules: {
            name: "required",
            email: "required",
            message: "required"
        },
       // errorElement: "span",
        messages: {
            name: "Name cannot be blank.",
            email: "Email cannot be blank.",
            message: "Message cannot be blank."
        }
    });

     /************************************************************************************
     *                  USER EDIT PROFILE PAGE JS
     ************************************************************************************/

    // $('.uploadFileBtn').uploadFile({
    //        onSuccess: function(data, obj){
    //             var resultJsonStr = JSON.stringify(data);
    //
    //             var imgClass = $(obj).data('imgcls');
    //             $('.' + imgClass).css('background-image', 'url(' + data.url + ')');
    //
    //             var fieldId = $(obj).data('id');
    //             $('#' + fieldId).val(resultJsonStr);
    //
    //             $().General_ShowNotification({message: 'Image added successfully' });
    //         },
    //        onError: function(obj, errorMessage) {
    //             $().General_ShowErrorMessage({message: errorMessage});
    //         }
    // });

    // /**
    //  * Update Social Post From Listing
    //  */
    // $('.editSocialPost').on('click', function (e) {
    //     e.preventDefault();
    //     var elem = $(this);
    //     var url = elem.data('url');
    //     var popup = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=false,width=360,height=450');
    //     popup.focus();
    //
    //     var intervalId = setInterval(function () {
    //         if (popup.closed) {
    //             clearInterval(intervalId);
    //             var socialId = elem.parents('a').data('id');
    //             if($('#updateSocial'+socialId).data('update') == '1') {
    //                 $().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
    //             }
    //         }
    //     }, 50);
    //
    //     return;
    // });

  // User dropdown
  $('#container').on('click', function(e){
    if ($(e.target).is('.header__heading-link--profile, .header__heading-link--profile svg')) {
          if ($('.user-dropdown').hasClass('active')) {
            $(e.target).one('click', function(e) {
              $('.user-dropdown').removeClass('active');
              return;
            });
          } else {
            $('.user-dropdown').addClass('active');
            return;
          }
        } else if ($(e.target).is('.active')) {
          return;
        }
        $('.user-dropdown').removeClass('active');
    });

    // Popup overlay

    $('#popup-overlay').on('click', function () {
        $('.header__user_popup-container, .header__navigation_more-box-container, .header-mobile__user_popup, .header-mobile__navigation_more-box, .footer__navigation_more-box').removeClass('active');
        $(this).removeClass('active');
    });

    // Header popups
    $('.header__navigation_more').on('click', function (e) {
        if ($(e.target).hasClass('header__navigation_more')) {
            $(this).find('.header__navigation_more-box-container').first().toggleClass('active');
            $('#popup-overlay').toggleClass('active');
        } else {
            $(this).find('.header__navigation_more-box-container').first().addClass('active');
            $('#popup-overlay').addClass('active');
        }
    });

    $('.header__navigation_more--secondary').on('click', function () {
      $(this).find('.header__navigation_more-box-container').first().toggleClass('active');
      $('#popup-overlay').addClass('active');
    });

    $('.header__user').on('click', function () {
      $('.header__user_popup-container').toggleClass('active');
      $('#popup-overlay').addClass('active');
    });

    // Moile header popups
    $('.header-mobile__navigation_more').on('click', function () {
      $('.header-mobile__navigation_more-box').toggleClass('active');
      $('#popup-overlay').addClass('active');
    });

    $('.header-mobile__user').on('click', function () {
      $('.header-mobile__user_popup').toggleClass('active');
      $('#popup-overlay').addClass('active');
    });

    // Header Search
    $('.header__search-button, .header__search-form_close').on('click', function () {
      $('.header__search-form_container').toggleClass('active');
    });

    // Header mobile toggle
    $('.header__toggle').on('click', function () {
      $('.header-mobile').toggleClass('active');
      $('.header__toggle-close').toggleClass('active');
      $(this).toggleClass('active');
    });

    $('.header__toggle-close').on('click', function () {
      $('.header-mobile').toggleClass('active');
      $('.header__toggle').toggleClass('active');
      $(this).toggleClass('active');
    });

    // Header search focus.
    $('.header__search-form_input').on('focus', function () {
      $('.header__search-form').addClass('active');
    });

    $('.header__search-form_input').on('blur', function () {
      $('.header__search-form').removeClass('active');
    });

    $('.header-mobile__search_input').on('focus', function () {
      $('.header-mobile__search').addClass('active');
    });

    $('.header-mobile__search_input').on('blur', function () {
      $('.header-mobile__search').removeClass('active');
    });

    // Footer popup
    $('.footer__navigation_more').on('click', function () {
        $('.footer__navigation_more-box').toggleClass('active');
        $('#popup-overlay').addClass('active');
    });

    // Product Page
    $('.product__item_tab').on('click', function () {
      $('.product__item_tab').removeClass('active');
      $('.product__item_tab-content').removeClass('active');
      $(this).addClass('active');
      if ($(this).hasClass('product__item_tab--details')) {
          $('.product__item_tab-content--details').addClass('active');
      } else if ($(this).hasClass('product__item_tab--sizes')) {
          $('.product__item_tab-content--sizes').addClass('active');
      } else if ($(this).hasClass('product__item_tab--shipping')) {
          $('.product__item_tab-content--shipping').addClass('active');
      }
    });

    $('.product__image-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.product__image-slider-nav'
    });

    $('.product__image-slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.product__image-slider',
      dots: true,
      centerMode: true,
      focusOnSelect: true
    });

    // Product List Page

    $('.product-list__header_dropdown, .product-list__header_dropdown-text').on('click', function () {
      $(this).find('.product-list__header_dropdown-list').toggleClass('active');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).hasClass('product-list__header_dropdown') && !$(e.target).hasClass('product-list__header_dropdown-text')) {
            $('.product-list__header_dropdown-list').removeClass('active');
        }
    });

    if (localStorage.getItem('product-category')) {
        $('.product-list__header_dropdown-text').html(localStorage.getItem('product-category'));
    }

    $('.product-list__header_dropdown-item').on('click', function () {
        var lastClass = $(this).attr('class').split(' ').pop();
        localStorage.setItem('product-category', $(this).html());
        window.location = location.protocol + '//' + location.host + '/product-list?slug=' + lastClass;
    });

    // Article comments link scroll
    $('.article__info_tab--comments').on('click', function (e) {
        e.preventDefault();
      $('html, body').animate({
        scrollTop: $("#disqus_thread").offset().top
      }, 500);
    });

    // Article social links fixed position on scroll.
    var width = $(window).width();
    if (width >= 768) {
        if ($('.article__social-links').length) {
            var socialLinks = $('.article__social-links');
            var headerLeft = $('.header__content').offset().left;
            socialLinks.css({
                left: headerLeft
            });
        }
    }

    if ($('.article__social-links').length) {
        $(window).resize(function () {
            var socialLinks = $('.article__social-links');
            var width = $(window).width();
            var headerLeft = $('.header__content').offset().left;
            if (width <= 768) {
                socialLinks.css({
                  position: "static"
                });
            } else {
                socialLinks.css({
                  position: "absolute",
                  left: headerLeft
              });
            }
        });
    }

    if ($('.article__social-links').length) {
        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var scrollBottom = $(window).scrollTop() + $(window).height();
          var socialLinks = $('.article__social-links');
          var socialLinksHeight = $('.article__social-links').height();
          var articleTop = $('.article__info_container').offset().top;
          var articleBottom = $('.article__related-title_container').offset().top - 120;
          var headerLeft = $('.header__content').offset().left;
          var width = $(window).width();


          if (width >= 900) {
              if ($(window).scrollTop() >= articleTop) {
                  if (articleBottom - scroll < socialLinksHeight) {
                      var comp = articleBottom - scroll - socialLinksHeight;
                      socialLinks.css({
                          position: "fixed",
                          top: Math.round(-Math.abs(comp)) + 50 + "px"
                      });
                  } else {
                      socialLinks.css({
                          position: "fixed",
                          top: "50px",
                          left: headerLeft
                      });
                  }
              } else {
                  socialLinks.css({
                    position: "absolute",
                    top: "-110px",
                    left: headerLeft
                });
              }
          } else if (width <= 768) {
              socialLinks.css({
                position: "static",
              });
          }
        });
    }

    // Product Modal
    $('.product-modal__container').on('click', function (e) {
      if (!$(e.target).hasClass('product-modal')) {
        $(this).removeClass('active');
        $('body').removeClass('active');
      }
    });

    $('.product__image-slider_image').on('click', function () {
        var lastClass = $(this).attr('class').split(' ')[1];
        console.log(lastClass);
        $('.product-modal').each(function () {
            if ($(this).hasClass(lastClass)) {
                $(this).addClass('active')
                $('.product-modal__container').addClass('active');
                $('body').addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });


    // Account modal
    $('.account-modal__navigation_item').on('click', function () {
      $('.account-modal__navigation_item').removeClass('active');
      $(this).addClass('active');
      if ($(this).hasClass('account-modal__navigation_item--following')) {
        $('.account-modal__content_section').removeClass('active');
        $('.account-modal__content_section--following').addClass('active');
      } else if ($(this).hasClass('account-modal__navigation_item--profile')) {
        $('.account-modal__content_section').removeClass('active');
        $('.account-modal__content_section--profile').addClass('active');
      } else if ($(this).hasClass('account-modal__navigation_item--account')) {
        $('.account-modal__content_section').removeClass('active');
        $('.account-modal__content_section--account').addClass('active');
      } else if ($(this).hasClass('account-modal__navigation_item--login')) {
        $('.account-modal__content_section').removeClass('active');
        $('.account-modal__content_section--login').addClass('active');
      } else if ($(this).hasClass('account-modal__navigation_item--signup')) {
        $('.account-modal__content_section').removeClass('active');
        $('.account-modal__content_section--signup').addClass('active');
      }
    });

    // Account modal select
    $('.account-modal__select_selected-item-container').each(function() {
        if (!($(this).html().length === 0)) {
            $(this).closest('.account-modal__select').addClass('selected');
        }
    });

    $('.account-modal__select').on('click', function (e) {
      if ($(this).hasClass('account-modal__select--multiple')) {
        if ($(e.target).hasClass('account-modal__select_list-item')) {
        } else if ($(e.target).hasClass('account-modal__select_selected-item-multi')) {
          var selectContainer = $(this);
          var selectedItem = $(e.target).html();
          var selectItems = $(this).find('.account-modal__select_selected-item-multi');
          var selectItemsList = [];
          var selectList = $(this).find('.account-modal__select_list-item');
          selectList.each(function () {
              if ($(this).html() == selectedItem) {
                  $(this).removeClass('active');
              }
          });
          selectItems.each(function () {
            var selectClass = $(this).attr('class').split(' ').pop();
            selectItemsList.push(selectClass);
          });
          selectItemsList.splice(selectItemsList.indexOf(selectedItem),1);
          $(this).find('.account-modal__select_selected-item-container').html(' ');
          if (selectItemsList.length) {
            $.each( selectItemsList, function( index, value ){
              selectContainer.find('.account-modal__select_selected-item-container').append('<div class="account-modal__select_selected-item-multi selectedItem ' + value + '">' + value + '</div>');
            });
          } else {
            $(this).removeClass('selected');
          }
        } else {
          $(this).toggleClass('active');
        }
      } else {
        $(this).toggleClass('active');
      }
    });

    $('.account-modal__select_list-item').on('click', function () {
      var selectedItem = $(this).html();
      var selectedItemClass = String(selectedItem);
      var selectContainer = $(this).closest('.account-modal__select');
      var selectItems = selectContainer.find('.account-modal__select_selected-item-multi');
      selectContainer.addClass('selected');
      selectContainer.addClass('changed');

      var selectItemsList = [];
      selectItems.each(function () {
        var selectClass = $(this).attr('class').split(' ').pop();
        selectItemsList.push(selectClass);
      });

      if (!(selectItemsList.indexOf(selectedItem) > -1)) {
        selectItemsList.push(selectedItem);
      }

      if (selectContainer.hasClass('account-modal__select--multiple')) {
        selectContainer.find('.account-modal__select_selected-item-container').html(' ');
        $.each( selectItemsList, function( index, value ){
          selectContainer.find('.account-modal__select_selected-item-container').append('<div class="account-modal__select_selected-item-multi selectedItem ' + value + '">' + value + '</div>');
        });
        $(this).addClass('active');
      } else {
        selectContainer.find('.account-modal__select_selected-item-container').html(' ');
        selectContainer.find('.account-modal__select_selected-item-container').append('<div class="account-modal__select_selected-item ' + selectedItem + '">' + selectedItem + '</div>');
        selectContainer.find('.account-modal__select_list-item').removeClass('active');
        $(this).addClass('active');
      }
    });

    // Account modal input
    $('.account-modal__input').each(function() {
        if (!($(this).val().length === 0)) {
            $(this).closest('.account-modal__input-container').addClass('active');
            $(this).closest('.account-modal__input-container').addClass('unchanged');
        }
    });

    $('.account-modal__input').on('focus', function () {
        $(this).closest('.account-modal__input-container').addClass('active');
        $(this).closest('.account-modal__input-container').removeClass('answered');
        $(this).closest('.account-modal__input-container').removeClass('error');
        $(this).closest('.account-modal__input-container').removeClass('unchanged');
    });

    $('.account-modal__input_label').on('click', function () {
        $(this).closest('.account-modal__input-container').find($('.account-modal__input')).focus();
    });

    $('.account-modal__input--text').on('blur', function () {
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if (true) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__input--email').on('blur', function () {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if (testEmail.test(this.value)) {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__input--username').on('blur', function () {
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if ($(this).val().length > 3 && $(this).val().length < 33) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
            $(this).closest('.account-modal__input-container').find('.account-modal__input_requirement--error').html('Incorrect Length.');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__input--password').on('blur', function () {
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if ($(this).val().length > 3 && $(this).val().length < 33) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
            $(this).closest('.account-modal__input-container').find('.account-modal__input_requirement--error').html('Incorrect Length.');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__input--verify-password').on('blur', function () {
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if ($(this).closest('.account-modal__content_section').find('.account-modal__input--password').val() == $(this).val()) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__image_button, .account-modal__image_upload').on('click', function () {
        $('.account-modal__image_input').click();
    });

    // Upload image JS
    if (document.getElementById('account-modal__image_input--profile')) {
        document.getElementById('account-modal__image_input--profile').addEventListener('change', readURL, true);
    }
    function readURL() {
        console.log('hello');
        var file = document.getElementById("account-modal__image_input--profile").files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            document.getElementById('account-modal__image_upload--profile').style.backgroundImage = "url(" + reader.result + ")";
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
        }
    }

    $('.account-modal__image_input').on('change', function () {
        if ($(this).val().length > 0) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__image').removeClass('error');
            $(this).closest('.account-modal__image').addClass('active');
            $(this).prev().addClass('active');
            $(this).prev().removeClass('error');
            $(this).prev().html($(this).val().replace(/.*[\/\\]/, ''));
        } else {
            $(this).closest('.account-modal__image').removeClass('active');
            $(this).closest('.account-modal__image').addClass('error');
            $(this).prev().removeClass('active');
            $(this).prev().addClass('error');
            $(this).prev().html('Browse...');
        }
    });

    // Account modal toggle
    $('.account-modal__container').on('click', function (e) {
        if ($(e.target).hasClass('account-modal__container') || $(e.target).hasClass('account-modal__content_cross')) {
            $(this).removeClass('active');
            $('body').removeClass('active');
        }
    });

    $('.account-modal__content').on('click', function (e) {
        // If the user clicks on the account modal content but doesnt click on the account modal select it removes the active class.
        if (!($(e.target).parents('.account-modal__select').length) && !($(e.target).hasClass('account-modal__select_selected-item-multi'))) {
            $('.account-modal__select').removeClass('active');
        }
    });

    $('.header__user_image, .header__user_text').on('click', function (e) {
        e.preventDefault();
        $('.account-modal__container').addClass('active');
        $('body').addClass('active');
    });

    $('.header__login__link').on('click', function (e) {
        $('.account-modal__input').each(function () {
            if (!($(this).val().length === 0) && !$(this).closest('.account-modal__input-container').hasClass('error')) {
                $(this).closest('.account-modal__input-container').addClass('active');
                $(this).closest('.account-modal__input-container').addClass('unchanged');
            }
        });
        $('body').addClass('active');
        $('.account-modal__container').addClass('active');
        $('.account-modal__navigation_item').removeClass('active');
        $('.account-modal__content_section').removeClass('active');
        if ($(this).hasClass('header__login__link--signup')) {
            $('.account-modal__navigation_item--signup').addClass('active');
            $('.account-modal__content_section--signup').addClass('active');
        } else {
            $('.account-modal__content_section--login').addClass('active');
            $('.account-modal__navigation_item--login').addClass('active');
        }
    });

    $('.side-navigation__link--login').on('click', function () {
        $('.account-modal__input').each(function () {
            if (!($(this).val().length === 0) && !$(this).closest('.account-modal__input-container').hasClass('error')) {
                $(this).closest('.account-modal__input-container').addClass('active');
                $(this).closest('.account-modal__input-container').addClass('unchanged');
            }
        });
        console.log('hello');
        $('body').addClass('active');
        $('.account-modal__container').addClass('active');
        $('.account-modal__navigation_item').removeClass('active');
        $('.account-modal__content_section').removeClass('active');
        $('.header__heading-container').click();
        if ($(this).hasClass('side-navigation__link--signup')) {
            $('.account-modal__content_section--signup').addClass('active');
            $('.account-modal__navigation_item--signup').addClass('active');
        } else {
            $('.account-modal__content_section--login').addClass('active');
            $('.account-modal__navigation_item--login').addClass('active');
        }
    });

    // Forgotten Password Modal
    $('.forgotten-password-modal__submit').on('click', function () {
        if ($('.forgotten-password-modal__content--forgotten').find('.account-modal__input').val().length === 0) {
            $('.forgotten-password-modal__content--forgotten').find('.account-modal__input-container').addClass('error');
        } else if (!$('.forgotten-password-modal__content--forgotten').find('.account-modal__input-container').hasClass('error')) {
            $('.forgotten-password-modal__content').removeClass('active');
            $('.forgotten-password-modal__content--email-sent').addClass('active');
            $('.forgotten-password-modal__container').addClass('success');
        }
    });

    $('.forgotten-password-modal__container').on('click', function (e) {
        if ($(e.target).hasClass('forgotten-password-modal__container') || $(e.target).hasClass('forgotten-password-modal__cross')) {
            $(this).removeClass('active');
            $('body').removeClass('active');
        }
    });

    $('.account-modal__forgotten-password-link').on('click', function (e) {
        $('.forgotten-password-modal__container').addClass('active');
        $('.forgotten-password-modal__container').removeClass('success');
        $('.forgotten-password-modal__container').removeClass('delete');
        $('.account-modal__container').removeClass('active');
        $('.forgotten-password-modal__content').removeClass('active');
        $('.forgotten-password-modal__content--forgotten').addClass('active');
    });

    // Submit Errors
    $('.account-modal__buttons_login').on('click', function (e) {
        if (true) { // Add in condition for login

        } else {
            e.preventDefault();
            $(this).prev().addClass('active');
        }
    });

    $('.account-modal__buttons_signup').on('click', function (e) {
        e.preventDefault();
        $('.account-modal__content_section--signup').find('.account-modal__input').each(function () {
            if ($(this).val().length === 0) {
                $(this).closest('.account-modal__input-container').addClass('error');
            }
        });
        var verifyPass = $('.account-modal__content_section--signup').find('.account-modal__input--password').val() === $('.account-modal__content_section--signup').find('.account-modal__input--verify-password').val();
        var verifyInputs = !$('.account-modal__content_section--signup').find('.account-modal__input-container').hasClass('error');
        if (verifyInputs && verifyPass) { // Add in condition for signup
            $(this).prev().removeClass('active');
        } else {
            if (!verifyPass) {
                $('.account-modal__content_section--signup').find('.account-modal__input--verify-password').closest('.account-modal__input-container').addClass('error').removeClass('answered');
            }
            $(this).prev().addClass('active');
        }
    });

    $('.account-modal__content_section--account').find('.account-modal__input').on('focus', function () {
        $('.account-modal__buttons_account').removeClass('active');
        $('.account-modal__buttons_account').html('Save');
    });

    $('.account-modal__buttons_account').on('click', function (e) {
        e.preventDefault();
        var verifyPass = $('.account-modal__content_section--account').find('.account-modal__input--password').val() === $('.account-modal__content_section--account').find('.account-modal__input--verify-password').val();
        var verifyInputs = !$('.account-modal__content_section--account').find('.account-modal__input-container').hasClass('error');
        if (verifyPass && verifyInputs) { // Add in condition for error
            $(this).html('Saved');
            $(this).addClass('active');
            $(this).prev().removeClass('active');
            $('.account-modal__content_section--account').find('.account-modal__input-container').removeClass('answered');
            $('.account-modal__content_section--account').find('.account-modal__input-container').each(function () {
                if ($(this).find('.account-modal__input').val().length > 0) {
                    $(this).addClass('active');
                    $(this).addClass('unchanged');
                }
            });
        } else {
            if (!verifyPass) {
                $('.account-modal__content_section--account').find('.account-modal__input--verify-password').closest('.account-modal__input-container').addClass('error').removeClass('answered').removeClass('unchanged');
            }
            $(this).prev().addClass('active');
            $(this).removeClass('active');
            $(this).html('Save');
        }
    });

    $('.account-modal__content_section--profile').find('.account-modal__input').on('focus', function () {
        $('.account-modal__buttons_profile').removeClass('active');
        $('.account-modal__buttons_profile').html('Save');
    });

    $('.account-modal__content_section--profile').find('.account-modal__select').on('click', function () {
        $('.account-modal__buttons_profile').removeClass('active');
        $('.account-modal__buttons_profile').html('Save');
    });

    $('.account-modal__buttons_profile').on('click', function (e) {
        e.preventDefault();
        // Declare variables and check if they have length on submit.
        var firstName = $('.account-modal__content_section--profile').find('input[name="firstName"]').val().length > 0;
        var lastName = $('.account-modal__content_section--profile').find('input[name="lastName"]').val().length > 0;
        var Bio = $('.account-modal__content_section--profile').find('textarea[name="bio"]').val().length > 0;
        var checkList = {firstname: firstName, lastname: lastName, bio: Bio};
        var checkText = '';
        if (!checkList.firstname) {
            checkText += 'First Name, ';
            $('.account-modal__content_section--profile').find('input[name="firstName"]').closest('.account-modal__input-container').addClass('error');
        }
        if (!checkList.lastname) {
            checkText += 'Last Name, ';
            $('.account-modal__content_section--profile').find('input[name="lastName"]').closest('.account-modal__input-container').addClass('error');
        }
        if (!checkList.bio) {
            checkText += 'Bio, ';
            $('.account-modal__content_section--profile').find('textarea[name="bio"]').closest('.account-modal__input-container').addClass('error');
        }
        checkText = checkText.replace(/,\s*$/, "");

        if (firstName && lastName && Bio) {
            $(this).html('Saved');
            $(this).addClass('active');
            $(this).prev().removeClass('active');
            $('.account-modal__content_section--profile').find('.account-modal__select').removeClass('changed');
            $('.account-modal__content_section--profile').find('.account-modal__input-container').removeClass('answered');
            $('.account-modal__content_section--profile').find('.account-modal__input-container').each(function () {
                if ($(this).find('.account-modal__input').val().length > 0) {
                    $(this).addClass('active');
                    $(this).addClass('unchanged');
                }
            });
        } else {
            $(this).prev().addClass('active');
            $(this).prev().html('<div class="account-modal__error_text">Error: ' + checkText + ' is required.</div>');
            $(this).removeClass('active');
            $(this).html('Save');
        }
    });

    $('.account-modal__content_section--following').find('.account-modal__select').on('click', function () {
        $('.account-modal__buttons_following').removeClass('active');
        $('.account-modal__buttons_following').html('Save');
    });

    $('.account-modal__buttons_following').on('click', function (e) {
        e.preventDefault();
        if (true) { // Add in condition for error
            $(this).html('Saved');
            $(this).toggleClass('active');
            $('.account-modal__content_section--following').find('.account-modal__select').removeClass('changed');
            $(this).prev().removeClass('active');
        } else {
            $(this).prev().addClass('active');
        }
    });

    $('.account-modal__delete-account_checkbox').change(function () {
        if(this.checked) {
            $(this).closest('.account-modal__delete-account').addClass('active');
        } else {
            $(this).closest('.account-modal__delete-account').removeClass('active');
        }
    });

    $('.account-modal__buttons_delete-account').on('click', function (e) {
        e.preventDefault();
    });

}(jQuery));


