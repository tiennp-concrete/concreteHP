var jwsThemeModule;
(function($) {
    "use strict";
    jwsThemeModule = (function() {
        return {
            init: function() {
                this.video_popup();
                this.menu_mobile();
                this.login_form();
                this.menu_nav();
                this.mobile_pcbuilder();
                this.post_format();
                this.scrollTop();
                this.menu_offsets();
                this.handleGallery();
                this.mobile_default();
                this.post_share();
                this.header_sticky();
                this.menu_level();

            },
            
     		header_sticky: function() {
     		     
                  $('.header-notes-top .icon-cross').on('click', function(){
                       var parents = $(this).parents('.header-notes-top'); 
                        parents.slideUp();
               });  
            
					if($('.cafe-row-sticky')[0]) {
				
						$('.cafe-row-sticky').each(function() {
							var $this = $(this);
							var $sidebar = $('.jws_sticky_move');
							var $parent = $(this).parent();
							var current_width = 0;
                            
							$(window).on("load resize",function(){
								if(current_width != $(window).width()) {
									current_width = $(window).outerWidth();
									$parent.height('');
									if(current_width > 1024.98 && $this.hasClass('desktop-sticky')) {
										$parent.height($this.outerHeight());
									} else if(current_width < 1024.98 && current_width > 768.98 && $this.hasClass('tablet-sticky')) {
										$parent.height($this.outerHeight());
									} else if(current_width < 768.98 && $this.hasClass('mobile-sticky')) {
										$parent.height($this.outerHeight());
									} else {
										$this.removeClass('is-sticky');
										$this.find('.elementor-widget-clever-site-logo').removeClass('header-is-sticky');
									}
                                    $parent.addClass('installed') 
                                    
								}
							});
							var HeaderTop = $parent.offset().top - $('body').offset().top;
							var old_top_position = 0;
                           
                                
                                $(window).on('scroll', function() {
                                    if($parent.hasClass('installed')) {
        								var top = $(window).scrollTop();
        								if($this.hasClass('cafe-scroll-up-sticky')) {
        									top = top - $parent.outerHeight();
        									if(old_top_position > top && top > $parent.outerHeight() * 3) {
        										$this.not('.active-sticky').addClass('active-sticky');
        										$this.removeClass('no-active-sticky');
        										$sidebar.removeClass('no-active-sticky');
        									} else {
        										$this.removeClass('active-sticky');
        										if($this.hasClass('is-sticky')) {
        											$this.addClass('no-active-sticky');
        											$sidebar.addClass('no-active-sticky');
        										}
        									}
        									old_top_position = top;
        								}
        								if(current_width > 1024.98 && $this.hasClass('desktop-sticky')) {
        									if(HeaderTop < top) {
        										$this.not('.is-sticky').addClass('is-sticky');
        										$this.find('.elementor-widget-clever-site-logo:not(.header-is-sticky)').addClass('header-is-sticky');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').removeClass('toggle-active');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideUp();
        									} else {
        										$this.removeClass('is-sticky');
        										$this.removeClass('no-active-sticky');
        										$sidebar.removeClass('no-active-sticky');
        										$this.find('.elementor-widget-clever-site-logo').removeClass('header-is-sticky');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').addClass('toggle-active');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideDown();
        									}
        								} else if(current_width < 1024.98 && current_width > 768.98 && $this.hasClass('tablet-sticky')) {
        									if(HeaderTop < top) {
        										$this.not('.is-sticky').addClass('is-sticky');
        										$this.find('.elementor-widget-clever-site-logo').addClass('header-is-sticky');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').removeClass('toggle-active');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideUp();
        									} else {
        										$this.removeClass('is-sticky');
        										$this.removeClass('no-active-sticky');
        										$sidebar.removeClass('no-active-sticky');
        										$this.find('.elementor-widget-clever-site-logo').removeClass('header-is-sticky');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').addClass('toggle-active');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideDown();
        									}
        								} else if(current_width < 768.98 && $this.hasClass('mobile-sticky')) {
        									if(HeaderTop < top) {
        										$this.not('.is-sticky').addClass('is-sticky');
        										$this.find('.elementor-widget-clever-site-logo:not(.header-is-sticky)').addClass('header-is-sticky');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').removeClass('toggle-active');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideUp();
        									} else {
        										$this.removeClass('is-sticky');
        										$this.removeClass('no-active-sticky');
        										$sidebar.removeClass('no-active-sticky');
        										$this.find('.elementor-widget-clever-site-logo.header-is-sticky').removeClass('header-is-sticky');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').addClass('toggle-active');
        										$('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideDown();
        									}
        								}
                                         }
        							});    
                               
                              
			
						});
				
				}
			},       
     post_share: function() { 
        $('.post-share .social_label').on('click', function(){
               var parents = $(this).parents('.post-share'); 
               parents.toggleClass('opened'); 
               if(parents.hasClass('opened')) {
                    parents.find("a").delay(100).each(function(i) {
                    $(this).delay(100 * i).queue(function() {
                      $(this).addClass("show");
                      $(this).dequeue();
                    })
                  });
               }else {
                    parents.find("a").removeClass('show');
               }
       }); 
    }  ,         
    /* ## Theme popup */
   mobile_default: function(data) {
       $('body').on('click', '.jws-tiger-mobile,.overlay', function (e) {
            $(this).parents('.elemetor-menu-mobile').toggleClass('active');
        })
    },       
           
            /* ## Theme popup */
   handlePopup: function(data) {
        $(data).each(function(){
            // Activate popup
            $(this).addClass('visible');
            $(this).find('.btn-loading-disabled').addClass('btn-loading');
        });
    },

    /* ## Gallery */

    handleGallery: function() {
   
        if(typeof(lightGallery) == 'undefined') return;
   
        $('.jws_gallery,.jws_project_layout3 , .model_ajax_wapper').each(function() {
            
            var $light_id = $(this).attr('id');
            
            lightGallery(document.getElementById($light_id), {
              selector: '.jws-image-gl',
                speed: 500,
                mode: 'lg-fade',
                plugins: [lgThumbnail,lgFullscreen,lgRotate,lgShare,lgHash,lgAutoplay,lgZoom ],
            });
            
        });
   
    } ,
                    
            
           menu_offsets: function () {
                var mainMenu = $('.elementor_jws_menu_layout_menu_horizontal').find('.nav'),
                    lis = mainMenu.find(' > li.menu-item-has-children');
                   $( window ).resize(function() {
                           lis.find('.sub-menu').removeAttr('style');
                    });
                     mainMenu.on('hover', ' > li.menu-item-has-children', function(e) {
                    setOffset($(this));
                });
                  var setOffset = function(li) {
                        var clientWidth = document.body.clientWidth;
                    var dropdown = li.find('> .sub-menu').outerWidth(),
                    dropdown2 = li.find('> .sub-menu .sub-menu').outerWidth(),
                    dropdown3 = li.find('> .sub-menu .sub-menu .sub-menu').outerWidth(),
                        styleID = 'arrow-offset';
                       
                
                    var
                        dropdownOffset = li.find('> .sub-menu').offset(),
                        screenWidth = $(window).width(),
                     
                        viewportWidth = screenWidth,
                        extraSpace = 10;
             

                    if (!dropdown || !dropdownOffset) {
                        return false;
                    };

                    if (dropdown + dropdown2 + dropdown3 + dropdownOffset.left>= clientWidth & li.hasClass('menu-item-has-children')) {
                    
                   
                        li.find('> .sub-menu').css({
                            right: 0
                        });
                        li.find('> .sub-menu .sub-menu').css({
                            left: -dropdown2
                        });
                        li.find('.sub-menu .sub-menu  .sub-menu').css({
                            left: -dropdown3
                        });
                    
                    }
                };
                 lis.each(function() {
            
                    setOffset($(this));
                    $(this).addClass('with-offsets');
                                    
                });
             
                
               
            },

            
            scrollTop: function() {
                //Check to see if the window is top if not then display button
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 100) {
                        $('.backToTop').addClass('totop-show');
                    } else {
                        $('.backToTop').removeClass('totop-show');
                    }
                });
                //Click event to scroll to top
                $('.backToTop').on("click", function() {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * video popup
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            video_popup: function() {
                $('.video_format').eq(0).each(function() {
                    $('.video_format').magnificPopup({
                        delegate: 'a',
                        type: 'image',
                        removalDelay: 500, //delay removal by X to allow out-animation
                        callbacks: {
                            beforeOpen: function() {
                                this.st.mainClass = 'mfp-zoom-in';
                            },
                            elementParse: function(item) {
                                item.type = 'iframe',
                                    item.iframe = {
                                        patterns: {
                                            youtube: {
                                                index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
                                                id: 'v=', // String that splits URL in a two parts, second part should be %id%
                                                // Or null - full URL will be returned
                                                // Or a function that should return %id%, for example:
                                                // id: function(url) { return 'parsed id'; } 
                                                src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
                                            },
                                            vimeo: {
                                                index: 'vimeo.com/',
                                                id: '/',
                                                src: '//player.vimeo.com/video/%id%?autoplay=1'
                                            }
                                        }
                                    }
                            }
                        },
                    });
                })
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * post fomart
             *--------o-----------------------------------------------------------------------------------------------------------------------------------
             */
            post_format: function() {
                $('.jws-post-gallery').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                });
            },

            menu_mobile: function() {
                var body = $("body"),
                    dropDownCat = $(".elementor_jws_menu_layout_menu_vertical .menu-item-has-children ,.elementor_jws_menu_layout_menu_vertical .menu_has_shortcode"),
                    elementIcon = '<button class="btn-sub-menu icon-chevron-right"></button>',
                    butOpener = $(".btn-sub-menu");
                $(elementIcon).insertAfter(dropDownCat.find('> a'));
                if (dropDownCat.hasClass("active")) {
                    dropDownCat.addClass("active");
                }
                $(document).on("click", ".elementor_jws_menu_layout_menu_vertical .btn-sub-menu", function(e) {
                    e.preventDefault();

                    if ($(this).parent().hasClass("active")) {
                        $(this).parent().removeClass("active").find("> ul").slideUp(320);
                        $(this).parent().removeClass("active").find(".sub-menu-dropdown").slideUp(320);
                    } else {
                        $(this).parent().addClass("active").find("> ul").slideDown(320);
                        $(this).parent().addClass("active").find(".sub-menu-dropdown").slideDown(320);
                    }
                })
            },
            
            menu_level: function() {
                var body = $("body"),
                    dropDownCat = $(".elementor_jws_menu_layout_menu_level .menu-item-has-children ,.elementor_jws_menu_layout_menu_level .menu_has_shortcode"),
                    elementIcon = '<button class="btn-sub-menu icon-chevron-right"></button>',
                    elementbutton_submenu = '<li><span class="btn-sub-menu-back"><i class="icon-arrow-left"></i>'+jws_script.back+'</span></li>',
                    butOpener = $(".btn-sub-menu");
                dropDownCat.find('> a').append(elementIcon);
                $(elementbutton_submenu).prependTo(dropDownCat.find('> .sub-menu'));
                if (dropDownCat.hasClass("active")) {
                    dropDownCat.addClass("active");
                }
                $(document).on("click", ".elementor_jws_menu_layout_menu_level .btn-sub-menu , .elementor_jws_menu_layout_menu_level a[href='#btn-sub-menu']", function(e) {
                    e.preventDefault();
                 
                    var $parent = $(this).closest('li').find('> .sub-menu');
                    $(this).parents('.jws_main_menu_inner').height($parent.height());
                    $parent.addClass("active"); 
                    $parent.parent().parent().find('> li > a').css({"opacity": "0"});
                      //$(this).parent().css({"margin-top": "0"});  
                      $parent.find("> li > a").delay(0).each(function(i) {
                        $(this).delay(100 * i).queue(function() {
                          $(this).addClass('show');  
                          $(this).css({"transform": "translate3d(0, 0, 0)", "opacity": "1"});
                          $(this).dequeue();
                        })
                      });
                  
                });
     
                $(document).on("click", ".elementor_jws_menu_layout_menu_level .btn-sub-menu-back", function(e) {
                    e.preventDefault();
                    var $parent = $(this).parent().parent();
                     var $this = $(this);
                    $($parent.find("> li > a").get().reverse()).delay(0).each(function(i) {
                        $(this).delay(100 * i).queue(function() {
                          $(this).removeClass('show');   
                          $(this).css({"transform": "translate3d(0, 25px, 0)", "opacity": "0"});
                            if($parent.find('.show').length < 1) {
                            setTimeout(function() {
                                $parent.removeClass("active");
                                if($parent.parent().parent().hasClass('nav')) {
                                                 
                                  $this.parents('.jws_main_menu_inner').height($this.parents('.nav').height());
                                                                                                  
                                }else{
                                  $this.parents('.jws_main_menu_inner').height($parent.parent().parent().height());  
                                }
                           
                                $parent.parent().parent().find('> li > a').css({"opacity": "1"});
                            }, 500);  
                         }
                          $(this).dequeue();
                        });
                       
                       
                    });
                  
                   
                });
            },

            login_form: function() {
                
                $(".toggle-password").click(function() {
                      $(this).toggleClass("fa-eye fa-eye-slash");
                      if ($('.toggle-pass').attr("type") == "password") {
                        $('.toggle-pass').attr("type", "text");
                      } else {
                        $('.toggle-pass').attr("type", "password");
                      }
                });
                
                $(".toggle-password2").click(function() {
                      $(this).toggleClass("fa-eye fa-eye-slash");
                      if ($('.toggle-pass2').attr("type") == "password") {
                        $('.toggle-pass2').attr("type", "text");
                      } else {
                        $('.toggle-pass2').attr("type", "password");
                      }
                });
                
                $('#jws-login-form').eq(0).each(function() {
                    $(this).find('form[name=loginpopopform]').on('submit', function(event) {
                        event.preventDefault();
                        var valid = true,
                            email_valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                        $(this).find('input.required').each(function() {
                            // Check empty value
                            if (!$(this).val()) {
                                $(this).addClass('invalid');
                                valid = false;
                            }
                            // Uncheck
                            if ($(this).is(':checkbox') && !$(this).is(':checked')) {
                                $(this).addClass('invalid');
                                valid = false;
                            }
                            // Check email format
                            if ('email' === $(this).attr('type')) {
                                if (!email_valid.test($(this).val())) {
                                    $(this).addClass('invalid');
                                    valid = false;
                                }
                            }
                        });
                        $(this).find('input.required').on('focus', function() {
                            $(this).removeClass('invalid');
                        });
                        if (!valid) {
                            return valid;
                        }
                        var form = $(this),
                            $elem = $('#jws-login-form .jws-login-container'),
                            wp_submit = $elem.find('input[type=submit]').val();
                        $elem.addClass('loading');
                        $elem.find('.message').slideDown().remove();
                        var data = {
                            action: 'jws_login_ajax',
                            data: form.serialize() + '&wp-submit=' + wp_submit,
                        };
                        $.post(jws_script.ajax_url, data, function(response) {
                         
                            try {
                                response = JSON.parse(response);
                                $elem.find('.jws-login').append(response.message);
                                if (response.code == '1') {
                                    if (response.redirect) {
                                        if (window.location.href == response.redirect) {
                                            location.reload();
                                        } else {
                                            window.location.href = response.redirect;
                                        }
                                    } else {
                                        location.reload();
                                    }
                                } else {
                                    var $captchaIframe = $('#jws-login-form .gglcptch iframe');
                                    if ($captchaIframe.length > 0) {
                                        $captchaIframe.attr('src', $captchaIframe.attr('src')); // reload iframe
                                    }
                                }
                            } catch (e) {
                                return false;
                            }
                            $elem.removeClass('loading');
                        });
                        return false;
                    });
                    $(this).find('form[name=registerformpopup]').on('submit', function(e) {
                        e.preventDefault();
                        var valid = true,
                            email_valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                        $(this).find('input.required').each(function() {
                            // Check empty value
                            if (!$(this).val()) {
                                $(this).addClass('invalid');
                                valid = false;
                            }
                            // Uncheck
                            if ($(this).is(':checkbox') && !$(this).is(':checked')) {
                                $(this).addClass('invalid');
                                valid = false;
                            }
                            // Check email format
                            if ('email' === $(this).attr('type')) {
                                if (!email_valid.test($(this).val())) {
                                    $(this).addClass('invalid');
                                    valid = false;
                                }
                            }
     
                        });
                        $(this).find('input.required').on('focus', function() {
                            $(this).removeClass('invalid');
                        });
                        if (!valid) {
                            return valid;
                        }
                        var $form = $(this),
                            data = {
                                action: 'jws_register_ajax',
                                data: $form.serialize() + '&wp-submit=' +
                                    $form.find('input[type=submit]').val(),
                                register_security: $form.find('#register_security').
                                val(),
                            },
                            redirect_url = $form.find('input[name=redirect_to]').val(),
                            $elem = $('#jws-login-form .jws-login-container');
                        $elem.addClass('loading');
                        $elem.find('.message').slideDown().remove();
                        $.ajax({
                            type: 'POST',
                            url: jws_script.ajax_url,
                            data: data,
                            success: function(response) {
                        
                                
                                $elem.removeClass('loading');
                
                                if (response.data.code == '1') {
                     
                                    if (response.data.redirect) {
                                   
                                        if (window.location.href == response.data.redirect) {
                                        
                                            location.reload();
                                            
                                        } else {
                                   
                                            window.location.href = response.data.redirect;
                                        }
                                    } else {
                              
                                        location.reload();
                                    }
                                } 
                                $elem.find('.popup-message').html(response.data.message);

                            },
                        });
                    });
                    
                    /* Check Strong Passwoed */
                    $(this).find('.jws-register input[name="password"]').keyup(function(){
                      checkpassword($(this).val());
                    });
                     
                    function checkpassword(password) {
                      var strength = 0,
                      meter = $('.meter'),
                      meter_text = $('.text-meter'),
                      password_hint = $('.jws-password-hint'),
                      btn_submit = $('input[name="wp-submit"]');
                       
                       
                     
                       
                      if (password.match(/[a-z]+/)) {
                        strength += 1;
                      }
                      if (password.match(/[A-Z]+/) && password.length >= 8) {
                        strength += 1;
                      }
                      if (password.match(/[0-9]+/) && password.length >= 12) {
                        strength += 1;
                      }
                      if (password.match(/[$@#&!]+/) && password.length >= 14) {
                        strength += 1;
                    
                      }

                      
                      if (password.length > 0) { 
                        meter.show();
                        password_hint.show();
                        btn_submit.attr("disabled", "disabled");
                      }else {
                        meter.hide();
                        password_hint.hide();
                      }
 
                    
                      switch (strength) {
                        case 0:
                          meter_text.html("");
                          meter.attr("meter", "0");
                          break;
                    
                        case 1:
                          meter_text.html(jws_script.metera);
                          meter.attr("meter", "1"); 
                          break;
                    
                        case 2:
                          meter_text.html(jws_script.meterb);
                          meter.attr("meter", "2"); 
                          btn_submit.removeAttr( "disabled" );  
                          break;
                    
                        case 3:
                          meter_text.html(jws_script.meterc);
                          meter.attr("meter", "3");
                          btn_submit.removeAttr( "disabled" );    
                          password_hint.hide(); 
                          break;
                    
                        case 4:
                          meter_text.html(jws_script.meterd);
                          meter.attr("meter", "4");
                          btn_submit.removeAttr( "disabled" );  
                          password_hint.hide();   
                          break;
                      }
                    }
                    
                    
                    $('#jws-login-form .link-bottom a.login').on('click', function(e) {
                        e.preventDefault();
                        $('.jws-login').addClass('active');
                        $('.jws-register').removeClass('active');
                    });
                    $('#jws-login-form .link-bottom a.register').on('click', function(e) {
                        e.preventDefault();
                        $('.jws-register').addClass('active');
                        $('.jws-login').removeClass('active');
                    });
                });
            },
            menu_nav: function() {
                var mainMenu = $('.elementor_jws_menu_layout_menu_horizontal').find('.nav'),
                    lis = mainMenu.find(' > li.menu-item-design-mega_menu');
                mainMenu.on('hover', ' > li.menu-item-design-mega_menu', function(e) {
                    setOffset($(this));
                });
                var setOffset = function(li) {
                    var dropdown = li.find(' > .sub-menu-dropdown'),
                        styleID = 'arrow-offset',
                        siteWrapper = $('.website-wrapper');
                    dropdown.attr('style', '');
                    var dropdownWidth = dropdown.outerWidth(),
                        dropdownOffset = dropdown.offset(),
                        screenWidth = $(window).width(),
                        //bodyRight = siteWrapper.outerWidth() + siteWrapper.offset().left,
                        viewportWidth = screenWidth,
                        extraSpace = 10;
                    if (!dropdownWidth || !dropdownOffset) return;
                    if (dropdownOffset.left + dropdownWidth >= viewportWidth && li.hasClass('menu-item-design-mega_menu')) {
                        // If right point is not in the viewport
                        var toRight = dropdownOffset.left + dropdownWidth - viewportWidth;
                        dropdown.css({
                            left: -toRight - extraSpace
                        });
                    }
                };
                lis.each(function() {
                    setOffset($(this));
                    $(this).addClass('with-offsets');
                });


                //mega menu  
                var mega_item = mainMenu.find(' > li.menu-item-design-mega_menu_full_width');
                
                if (mega_item.length > 0) {
                    $('.jws_header').addClass('has-mega-full');
                }
                if ($('.elementor_jws_menu_layout_menu_horizontal').hasClass('elementor-jws-menu-change-background-yes')) {
                     mega_item.mouseenter(function() {
                        $('.jws_header.has-mega-full').addClass('mega-has-hover');
                    });
    
                    mega_item.mouseleave(function() {
                        $('.jws_header.has-mega-full').removeClass('mega-has-hover');
                    });
                }
               
            },
            footer_parallax: function() {
                if ($('.site-footer').hasClass('footer-parallax')) {
                    $('.site-content').addClass('content-margin');
                    var siteContent = $('.content-margin')
                    var siteContentHeight = siteContent.height();
                    var siteContentWidth = siteContent.width();

                    var siteFooter = $('.site-footer');
                    var siteFooterHeight = siteFooter.height();
                    var siteFooterWidth = siteFooter.width();

                    siteContent.css({
                        "margin-bottom": siteFooterHeight
                    });
                }
            },
            mobile_pcbuilder: function() {
                $('.nav-mobile a').magnificPopup({
                    type: 'inline',
                    mainClass: '',
                    midClick: true,
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function() {
                            this.st.mainClass = 'pc_bulder_popup woo_product_builder sidebar-mobile-wap';
                        },
                        afterClose: function() {
                            $('.woocommerce-product-builder-sidebar,.woopb-steps').removeClass('mfp-hide');
                        }
                    },
                });

            },
        }
    }())
    $(document).ready(function() {
        jwsThemeModule.init();
        jwsThemeModule.footer_parallax();
        $(document).on("scroll", onScroll);
    });

  
    function onScroll() {
        var scrollPos = $(document).scrollTop();
        $('.custom_nav .nav li.menu_scroll a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if(refElement.length > 0) {
                if (refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos + 100) {
                    $('.custom_nav .nav ul li.menu_scroll a').parent().removeClass("current-menu-item");
                    currLink.parent().addClass("current-menu-item");
                } else {
                    currLink.parent().removeClass("current-menu-item");
                }  
            }
        });
        
    }

    $.fn.isInViewport = function() {
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();

        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).resize(function() {
        jwsThemeModule.footer_parallax();
    });

    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();

        // Assign active class to nav links while scolling
        $('.elementor-menu-anchor').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                $('.menu-item-type-custom a.active').removeClass('active');
                $('.menu-item-type-custom a').eq(i).addClass('active');
            }
        });
    }).scroll();


    $.fn.texteffect1 = function(option) {
        // Wrap every letter in a span

        var textWrapper = $(option).find('.text-effect1'),
            letter = $(option).find('.text-effect1 .letter');

        textWrapper.html(textWrapper.text().replace(/\S/g, "<span class='letter'>$&</span>"));


    };

    $.fn.gallery_popup = function(option, item) {
        option.find('a.jws-popup-global').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            removalDelay: 500, //delay removal by X to allow out-animation
            mainClass: 'gallery-global mfp-zoom-in mfp-img-mobile',
            callbacks: {
                open: function() {
                    //overwrite default prev + next function. Add timeout for css3 crossfade animation
                    $.magnificPopup.instance.next = function() {
                        var self = this;
                        self.wrap.removeClass('mfp-image-loaded');
                        setTimeout(function() {
                            $.magnificPopup.proto.next.call(self);
                        }, 120);
                    };
                    $.magnificPopup.instance.prev = function() {
                        var self = this;
                        self.wrap.removeClass('mfp-image-loaded');
                        setTimeout(function() {
                            $.magnificPopup.proto.prev.call(self);
                        }, 120);
                    };
                },
                imageLoadComplete: function() {
                    var self = this;
                    setTimeout(function() {
                        self.wrap.addClass('mfp-image-loaded');
                    }, 16);
                },
            },

        });
    };

})(jQuery);

(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'liquidHover3d';
    var defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.build();
    }

    Plugin.prototype = {
        build: function build() {
            this.$icon = $(this.element);

            if (!this.$icon.length) {
                return;
            }

            this.width = this.$icon.outerWidth();
            this.height = this.$icon.outerHeight();
            this.maxRotation = 8;
            this.maxTranslation = 4;
            this.init();
            $(window).on('load resize', this.onWindowLoad.bind(this));
            this.$icon.addClass('hover-3d-applied');
        },
        init: function init() {
            this.eventHandlers();
        },
        onWindowLoad: function onWindowLoad() {
            this.width = this.$icon.outerWidth();
            this.height = this.$icon.outerHeight();
        },
        eventHandlers: function eventHandlers() {
            var self = this;
            self.$icon.on('mousemove', function(e) {
                self.hover.call(self, e);
            }).on('mouseleave', function(e) {
                self.leave.call(self, e);
            });
        },
        appleTvAnimate: function appleTvAnimate(element, config) {
            var rotate = "rotateX(" + config.xRotationPercentage * -1 * config.maxRotationX + "deg)" + " rotateY(" + config.yRotationPercentage * -1 * config.maxRotationY + "deg)";
            var translate = " translate3d(" + config.xTranslationPercentage * -1 * config.maxTranslationX + "px," + config.yTranslationPercentage * -1 * config.maxTranslationY + "px, 0px)";
            anime.remove(element.get(0)); // causing move issues 

            element.css({
                transition: 'all 0.25s ease-out',
                transform: rotate + translate
            });
        },
        calculateRotationPercentage: function calculateRotationPercentage(offset, dimension) {
            return -2 / dimension * offset + 1;
        },
        calculateTranslationPercentage: function calculateTranslationPercentage(offset, dimension) {
            return -2 / dimension * offset + 1;
        },
        hover: function hover(e) {
            var that = this;
            var mouseOffsetInside = {
                x: e.pageX - this.$icon.offset().left,
                y: e.pageY - this.$icon.offset().top
            };
            that.$icon.addClass('mouse-in');
            var xRotationPercentage = this.calculateRotationPercentage(mouseOffsetInside.y, this.height);
            var yRotationPercentage = this.calculateRotationPercentage(mouseOffsetInside.x, this.width) * -1;
            var xTranslationPercentage = this.calculateTranslationPercentage(mouseOffsetInside.x, this.width);
            var yTranslationPercentage = this.calculateTranslationPercentage(mouseOffsetInside.y, this.height);
            this.$icon.find('[data-stacking-factor]').each(function(index, element) {
                var stackingFactor = $(element).attr('data-stacking-factor');
                that.appleTvAnimate($(element), {
                    maxTranslationX: that.maxTranslation * stackingFactor,
                    maxTranslationY: that.maxTranslation * stackingFactor,
                    maxRotationX: that.maxRotation * stackingFactor,
                    maxRotationY: that.maxRotation * stackingFactor,
                    xRotationPercentage: xRotationPercentage,
                    yRotationPercentage: yRotationPercentage,
                    xTranslationPercentage: xTranslationPercentage,
                    yTranslationPercentage: yTranslationPercentage
                });
            });
        },
        leave: function leave(e) {
            var that = this;
            that.$icon.removeClass('mouse-in');
            this.$icon.find('[data-stacking-factor]').each(function(index, element) {
                anime.remove(element);
                that.appleTvAnimate($(element), {
                    maxTranslationX: 0,
                    maxTranslationY: 0,
                    maxRotationX: 0,
                    maxRotationY: 0,
                    xRotationPercentage: 0,
                    yRotationPercentage: 0,
                    xTranslationPercentage: 0,
                    yTranslationPercentage: 0
                });
            });
        }
    };
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            var pluginOptions = $(this).data('hover3d-options');
            var opts = null;

            if (pluginOptions) {
                opts = $.extend(true, {}, options, pluginOptions);
            }

            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, opts));
            }
        });
    };
})(jQuery, window, document);


jQuery(document).ready(function($) {
    $('.hover-3d').liquidHover3d();
});

(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'liquidHoverPosition';
    var defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.build();
    }

    Plugin.prototype = {
        build: function build() {
            this.$icon = $(this.element);

            if (!this.$icon.length) {
                return;
            }

            this.width = this.$icon.outerWidth();
            this.height = this.$icon.outerHeight();
            this.maxRotation = 8;
            this.maxTranslation = 4;
            this.init();
            $(window).on('load resize', this.onWindowLoad.bind(this));
            this.$icon.addClass('hover-3d-applied');
        },
        init: function init() {
            this.eventHandlers();
        },
        onWindowLoad: function onWindowLoad() {
            this.width = this.$icon.outerWidth();
            this.height = this.$icon.outerHeight();
        },
        eventHandlers: function eventHandlers() {
            var self = this;
            self.$icon.on('mousemove', function(e) {
                self.hover.call(self, e);
            }).on('mouseleave', function(e) {
                self.leave.call(self, e);
            });
        },
        appleTvAnimate: function appleTvAnimate(element, config) {
            var rotate = "rotateX(" + config.xRotationPercentage * -1 * config.maxRotationX + "deg)" + " rotateY(" + config.yRotationPercentage * -1 * config.maxRotationY + "deg)";
            var translate = " translate(" + config.xTranslationPercentage * -1 * config.maxTranslationX + "px," + config.yTranslationPercentage * -1 * config.maxTranslationY + "px)";
            anime.remove(element.get(0)); // causing move issues 

            element.css({
                transition: 'all 0.25s ease-out',
                transform: translate
            });
        },
        calculateRotationPercentage: function calculateRotationPercentage(offset, dimension) {
            return -2 / dimension * offset + 1;
        },
        calculateTranslationPercentage: function calculateTranslationPercentage(offset, dimension) {
            return -2 / dimension * offset + 1;
        },
        hover: function hover(e) {
            var that = this;
            var mouseOffsetInside = {
                x: e.pageX - this.$icon.offset().left,
                y: e.pageY - this.$icon.offset().top
            };
            that.$icon.addClass('mouse-in');
            var xRotationPercentage = this.calculateRotationPercentage(mouseOffsetInside.y, this.height);
            var yRotationPercentage = this.calculateRotationPercentage(mouseOffsetInside.x, this.width) * -1;
            var xTranslationPercentage = this.calculateTranslationPercentage(mouseOffsetInside.x, this.width);
            var yTranslationPercentage = this.calculateTranslationPercentage(mouseOffsetInside.y, this.height);
            this.$icon.find('[data-stacking-factor]').each(function(index, element) {
                var stackingFactor = $(element).attr('data-stacking-factor');
                that.appleTvAnimate($(element), {
                    maxTranslationX: that.maxTranslation * stackingFactor,
                    maxTranslationY: that.maxTranslation * stackingFactor,
                    maxRotationX: that.maxRotation * stackingFactor,
                    maxRotationY: that.maxRotation * stackingFactor,
                    xRotationPercentage: xRotationPercentage,
                    yRotationPercentage: yRotationPercentage,
                    xTranslationPercentage: xTranslationPercentage,
                    yTranslationPercentage: yTranslationPercentage
                });
            });
        },
        leave: function leave(e) {
            var that = this;
            that.$icon.removeClass('mouse-in');
            this.$icon.find('[data-stacking-factor]').each(function(index, element) {
                that.appleTvAnimate($(element), {
                    maxTranslationX: 0,
                    maxTranslationY: 0,
                    maxRotationX: 0,
                    maxRotationY: 0,
                    xRotationPercentage: 0,
                    yRotationPercentage: 0,
                    xTranslationPercentage: 0,
                    yTranslationPercentage: 0
                });
            });
        }
    };
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            var pluginOptions = $(this).data('hover3d-options');
            var opts = null;

            if (pluginOptions) {
                opts = $.extend(true, {}, options, pluginOptions);
            }

            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, opts));
            }
        });
    };
})(jQuery, window, document);


(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'liquidCarouselV3d';
    var defaults = {
        itemsSelector: '.carousel-item'
    };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.build();
    }

    Plugin.prototype = {
        build: function build() {
            this.init();
        },
        init: function init() {
            var self = this;
            var element = $(self.element);
            var items = self.options.itemsSelector;
            self.prepareitems();
            var activeItem = $(items, element).first();
            var bottomItem = activeItem.next();
            var topItem = bottomItem.next();
            self.dragX = 0;
            self.startX = 0;
            self.currentX = 0;
            self.setActive(activeItem, element);
            self.initAnim(element, activeItem, topItem, bottomItem);
            self.initDrag();

            self.initClicks();
            element.addClass('carousel-initialized');
            return self;
        },
        prepareitems: function prepareitems() {
            var self = this;
            var items = $(self.options.itemsSelector, self.element);

            if (items.length <= 2 && items.length >= 1) {
                var firstItem = items[0];

                for (var i = items.length; i <= 2; i++) {
                    $(firstItem).clone(true).appendTo($(self.element).find('.carousel-items'));
                }
            }
        },
        setActive: function setActive(activeItem, element) {
            var self = this;
            var currentTopItem = $('.is-top', element);
            var currentActiveItem = $('.is-active', element);
            var currentBottomItem = $('.is-bottom', element);

            if (currentTopItem.length) {
                currentTopItem.addClass('was-top');
            }

            if (currentActiveItem.length) {
                currentActiveItem.addClass('was-active');
            }

            if (currentBottomItem.length) {
                currentBottomItem.addClass('was-bottom');
            }

            activeItem.addClass('is-active').removeClass('is-top is-bottom').siblings().removeClass('is-active');
            self.setBottom(activeItem);
            self.setTop(activeItem);
        },
        // Bottom Item will be based on the active item
        setBottom: function setBottom(activeItem) {
            var self = this;
            var element = $(self.element);
            var items = self.options.itemsSelector;
            var firstItem = $(items, element).first();
            var bottomItem = activeItem.next();

            if (!bottomItem.length && activeItem.is(':last-child')) {
                bottomItem = firstItem;
            }

            bottomItem.addClass('is-bottom').removeClass('is-active is-top was-active').siblings().removeClass('is-bottom');
        },
        // Top Item will be based on the active item		
        setTop: function setTop(activeItem) {
            var self = this;
            var element = $(self.element);
            var items = self.options.itemsSelector;
            var lastItem = $(items, element).last();
            var topItem = activeItem.prev();

            if (!topItem.length && activeItem.is(':first-child')) {
                topItem = lastItem;
            }

            topItem.addClass('is-top').removeClass('is-active is-bottom was-active').siblings().removeClass('is-top');
        },
        initAnim: function initAnim(element, activeItem, topItem, bottomItem) {
            var self = this;
            self.animInited = false;

            if (!self.animInited) {
                var animeTimeline = anime.timeline({
                    duration: 0,
                    easing: 'linear'
                });
                animeTimeline.add({
                    targets: element.get(0).querySelectorAll('.carousel-item:not(.is-active):not(.is-bottom)'),
                    translateX: '-50%',
                    translateZ: 0,
                    scale: 0.8,
                    offse: 0
                }).add({
                    targets: activeItem.get(0),
                    translateX: '0%',
                    translateZ: 30,
                    scale: 1,
                    offse: 0
                }).add({
                    targets: bottomItem.get(0),
                    translateX: '50%',
                    translateZ: 0,
                    scale: 0.8,
                    offse: 0
                });
                self.animInited = true;
            }
        },
        initClicks: function initClicks() {
            $(this.element).on('click', '.is-top', this.moveItems.bind(this, 'prev'));
            $(this.element).on('click', '.is-bottom', this.moveItems.bind(this, 'next'));
        },
        initDrag: function initDrag() {
            var self = this;
            var element = $(self.element);
            element.on('mousedown touchstart', self.pointerStart.bind(self));
            element.on('mousemove touchmove', self.pointerMove.bind(self));
            element.on('mouseup touchend', self.pointerEnd.bind(self));
        },

        pointerStart: function pointerStart(event) {
            var self = this;
            var element = $(self.element);
            self.startX = event.pageX || event.originalEvent.touches[0].pageX;
            self.currentX = self.startX;
            element.addClass('pointer-down');
        },
        pointerMove: function pointerMove(event) {
            var self = this;
            self.currentX = event.pageX || event.originalEvent.touches[0].pageX;
            self.dragX = parseInt(self.startX - self.currentX, 10);
        },
        pointerEnd: function pointerEnd(event) {
            var self = this;
            var element = $(self.element);
            self.dragX = parseInt(self.startX - self.currentX, 10);

            if (self.dragX >= 20) {
                self.moveItems('next');
            } else if (self.dragX <= -20) {
                self.moveItems('prev');
            }

            element.removeClass('pointer-down');
        },
        moveItems: function moveItems(dir) {
            var _this = this;

            if ($(this.element).hasClass('items-moving')) return;
            var self = this;
            var element = $(self.element);
            var items = $(self.options.itemsSelector);
            var bottomItem = $('.is-bottom', element);
            var topItem = $('.is-top', element);
            var animationTimeline = anime.timeline({
                duration: 650,
                easing: 'easeInOutQuad',
                run: function run() {
                    $(items, element).addClass('is-moving');
                },
                complete: function complete() {
                    $(items, element).removeClass('is-moving was-top was-active was-bottom');
                    $(_this.element).removeClass('items-moving');
                }
            });
            if (dir == 'next') self.setActive(bottomItem, element);
            else if (dir == 'prev') self.setActive(topItem, element);
            var newActiveItem = $('.is-active', element);
            var newBottomItem = $('.is-bottom', element);
            var newTopItem = $('.is-top', element);

            if (dir == 'next') {
                self.moveNext(animationTimeline, newActiveItem, newBottomItem, newTopItem);
            } else if (dir == 'prev') {
                self.movePrev(animationTimeline, newActiveItem, newBottomItem, newTopItem);
            }
        },
        moveNext: function moveNext(animationTimeline, newActiveItem, newBottomItem, newTopItem) {
            $(this.element).addClass('items-moving');
            animationTimeline.add({
                targets: newTopItem.get(0),
                translateX: [{
                    value: '-55%'
                }, {
                    value: '-50%',
                    easing: 'linear'
                }],
                translateZ: 0,
                rotateX: [{
                    value: 12
                }, {
                    value: 0
                }],
                scale: 0.8
            }, 0).add({
                targets: newActiveItem.get(0),
                translateX: '0%',
                translateZ: [{
                    value: 100
                }, {
                    value: 30
                }],
                rotateX: [{
                    value: 12
                }, {
                    value: 0
                }],
                scale: 1
            }, 0).add({
                targets: newBottomItem.get(0),
                translateX: [{
                    value: '55%'
                }, {
                    value: '50%',
                    easing: 'linear'
                }],
                translateZ: 0,
                rotateX: [{
                    value: 12
                }, {
                    value: 0
                }],
                scale: 0.8
            }, 0);
        },
        movePrev: function movePrev(animationTimeline, newActiveItem, newBottomItem, newTopItem) {
            $(this.element).addClass('items-moving');
            animationTimeline.add({
                targets: newTopItem.get(0),
                translateX: [{
                    value: '-55%'
                }, {
                    value: '-50%',
                    easing: 'linear'
                }],
                translateZ: 0,
                rotateX: [{
                    value: 12
                }, {
                    value: 0
                }],
                scale: 0.8
            }, 0).add({
                targets: newActiveItem.get(0),
                translateX: '0%',
                translateZ: [{
                    value: 100
                }, {
                    value: 30
                }],
                rotateX: [{
                    value: 12
                }, {
                    value: 0
                }],
                scale: 1
            }, 0).add({
                targets: newBottomItem.get(0),
                translateX: [{
                    value: '55%'
                }, {
                    value: '50%',
                    easing: 'linear'
                }],
                translateZ: 0,
                rotateX: [{
                    value: 12
                }, {
                    value: 0
                }],
                scale: 0.8
            }, 0);
        }
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            var pluginOptions = $(this).data('plugin-options');
            var opts = null;

            if (pluginOptions) {
                opts = $.extend(true, {}, options, pluginOptions);
            }

            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, opts));
            }
        });
    };
})(jQuery, window, document);