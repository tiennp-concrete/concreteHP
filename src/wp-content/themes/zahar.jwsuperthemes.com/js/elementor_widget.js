(function($) {
  	var product_tabs_filter = function($scope, $) {
		$scope.find('.jws-wrap').eq(0).each(function() {
			var wrap = $(this);
            var container =  wrap.find('.products-tab');
            loadmore_btn(wrap);            
			wrap.find('.jws-ajax-load a.ajax-load').on('click', function(e) {
				e.preventDefault();
				var $this = $(this) , intervalID;
				var key = $this.data('value');
				if($this.hasClass('active')) {
					return;
				}
                clearInterval(intervalID);
                wrap.addClass('jws-animated-products');
				$this.parents('.jws-ajax-load').find('a').removeClass('active');
				$this.addClass('active');
				if($this.hasClass('opened')) {
					container.html(container.data(key));
					if(wrap.hasClass('jws-carousel')) {
						jws_carousel($scope, $);
					}
                     var iter = 0;
                    intervalID = setInterval(function() {
                            wrap.find('.product-item').eq(iter).addClass('jws-animated');
                            iter++;
                     }, 100);
					return;
				}
				$this.addClass('opened');
				wrap.addClass('loading');
                if(!wrap.find('.jws_loading').length) {    
                        wrap.append('<div class="jws_loading"></div>');    
                }
				var data = wrap.data('args');
				data.action = 'jws_ajax_product_filter';
				if($this.data('type') == 'product_cat') {
					data.filter_categories = $this.data('value');
				}
				if($this.data('type') == 'asset_type') {
					data.asset_type = $this.data('value');
				}
				$.ajax({
					url: wrap.data('url'),
					data: data,
					type: 'POST',
                    dataType: 'json',
				}).success(function(response) {
					wrap.removeClass('loading');
					let content = response.items;
					container.html(content);
					container.data(key, content);
					if(wrap.hasClass('jws-carousel')) {
						jws_carousel($scope, $);
					}
                    var iter = 0;
                    intervalID = setInterval(function() {
                            wrap.find('.product-item').eq(iter).addClass('jws-animated');
                            iter++;
                     }, 100);
				}).error(function(ex) {
					console.log(ex);
				});
			});
            if(!$('body').hasClass('elementor-editor-active')) {
               $(window).on("load resize", function () { 
                  container.isotope({
                    itemSelector: ".product-item",
                    layoutMode: "fitRows",
                    transitionDuration: "0.7s"
                  });
                });   
              }
             if(wrap.hasClass('cate_isotope')){
               
                    wrap.find('.jws-ajax-load a.isotope-load').on("click touchstart", function (e) {
                        var $t = $(this),
                            selector = '.'+$t.data("value");
                            if($t.data("value")  == '*' )  {
                                selector = '*';
                            }
                        // Don't proceed if already selected
                        if ($t.hasClass("active"))
                            return false;

                        wrap.find('.jws-ajax-load a.isotope-load').removeClass("active");
                        $t.addClass("active");
                         container.isotope({filter: selector});

                        e.stopPropagation();
                        e.preventDefault();
                    });
               
                }  
		});
	} 
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Count Down
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
  var countdown = function($scope, $) {
    $scope.find('.jws-countdown-animation').eq(0).each(function() {
            var date_time = $(this).data('time-now');
            console.log(date_time);
            $(this).timeTo({
                timeTo: new Date(new Date(date_time)),
                displayCaptions: true,
                fontSize: 30,
            });  
    })
  }
                                        
   /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * video popup
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
  var demo_filter = function($scope, $) {
    $scope.find('.jws_demo_element').eq(0).each(function() {
         //Check to see if the window is top if not then display button
        $scope.find('.jws_demo_element .jws_demo_item').each(function() {
           var btn = $(this).find('.jws_image_content_inner'); 
            $(this).find('.jws_image a').scroll(function() {
                if ($(this).scrollTop() > 100) {
                    btn.fadeOut( "slow" );
                }else{
                    btn.fadeIn( "slow" );
                }
            });
            //Click event to scroll to top
            $(this).find('.jws_column_content').on( "mouseleave", function() {
                $(this).find('.jws_image a').animate({
                    scrollTop: 0
                }, 800);
                return false;
            }); 
        });    
        
    })
  }
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * video popup
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
  var video_popup = function($scope, $) {
    $scope.find('.jws_video_popup').eq(0).each(function() {
      $(this).find('.jws_video_popup_inner').magnificPopup({
        delegate: 'a',
        type: 'image',
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
          beforeOpen: function() {
            this.st.mainClass = 'mfp-zoom-in';
          },
          imageLoadComplete: function() {
                      var self = this;
                      setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
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
  }
  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * testimonials_slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  var testimonials_slider = function($scope, $) {
      $scope.find('.jws_testimonials_slider_wrap').eq(0).each(function() {
           if($(this).find('.testimonials_slider').hasClass('slider_layout_layout12')) {  
                     var slickPrimarySecondary = {
                       slidesToShow: 1,
                       slidesToScroll: 1,
                       arrows: false,
                       fade: false,
                       infinite: false
                     };
                     var slickNavigator = {
                       slidesToShow: 3,
                       slidesToScroll: 1,
                       asNavFor: '.slider_layout_layout12',
                       speed: 500,
                       dots: false,
                       focusOnSelect:true,
                       centerMode: false,
                       infinite: true,
                       arrows: false,
                       centerMode: true,
                        centerPadding: '0',
                     };
                    
                     $('.testimonials_slider').slick(slickPrimarySecondary);
                     $('.avatar-info-bottom').slick(slickPrimarySecondary);
                     
                     $('.avatar-button').slick(slickNavigator)
            
            
           }else{
                    
                   
                    $(this).find('.testimonials_slider').not('.slick-initialized').slick({
                      appendDots:$(this).find('.custom_dots'),
                      prevArrow: $(this).find('.nav_left'),
                      nextArrow: $(this).find('.nav_right'),
                    }).on( 'afterChange', function( event, slick, currentSlide ) {
                      $(this).addClass('slider_running');   
                       $(this).removeClass('slider_top');  
                      if($(this).find('.custom_dots').length > 0) {
                         slick.$dots.each( function(i, el) {
                            $(el).find('li').eq(currentSlide).addClass('slick-active').find('button');
                          })
                      }  
                    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                         $(this).addClass('slider_top');   
                         $(this).removeClass('slider_running'); 
                    }).on('init', function(event, slick){
                      slick.addClass('slider_running');
                    });
            
           };
      })
    } 
    
      /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * nft_artists
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  var nft_artists = function($scope, $) {
      $scope.find('.jws_nft_artists_slider_wrap').eq(0).each(function() {          
        $(this).find('.nft_artists_slider').not('.slick-initialized').slick({
          appendDots:$(this).find('.custom_dots'),
          prevArrow: $(this).find('.nav_left'),
          nextArrow: $(this).find('.nav_right'),
          swipeToSlide: true,
        }); 
      });
      $(".nft_artists_next").on("click", function (e) {
         e.preventDefault();   
         $('.nft_artists_slider').slick('slickNext');
      });
      $(".nft_artists_prev").on("click", function (e) {
         e.preventDefault();
         $('.nft_artists_slider').slick('slickPrev');  
      });
    } 
    
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * space location
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
    
      var space_location_slider = function($scope, $) {
      $scope.find('.jws-space_location-element').eq(0).each(function() {
        $(this).find('.jws_space_location_slider').not('.slick-initialized').slick({
          prevArrow: $(this).find('.nav_left'),
          nextArrow: $(this).find('.nav_right'),
          swipeToSlide: true,
        }); 
      })
    } 
    
    
    
     /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Blog Filter
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var blog_filter = function($scope, $) {
    
                $scope.find('.jws-blog-element').eq(0).each(function() {
                    var $this = $(this);
                    var $container = $this.find('.blog_content'),
                        $filter = $this.find(".post_nav");

                    if(!$container.hasClass('jws_blog_slider')) { 
                     
                             if($container.hasClass('has-masonry')) {
                                $container.isotope({
                                    itemSelector: ".jws_blog_item",
                                    layoutMode: 'masonry',
                               
                                });  
                            }else {
                                $container.isotope({
                                    itemSelector: ".jws_blog_item",
                                    layoutMode: 'fitRows',
                              
                                }); 
                            }
    
                            $filter.find("a").on("click touchstart", function (e) {
                                var $t = $(this),
                                    selector = $t.data("filter");
                                // Don't proceed if already selected
                                if ($t.hasClass("filter-active"))
                                    return false;
    
                                $filter.find("a").removeClass("filter-active");
                                $t.addClass("filter-active");
                                $container.isotope({filter: selector});
                                
                                e.stopPropagation();
                                e.preventDefault();
                                
                            });
                       
                    }
                    
      
                    
                    // set vars
                   function postslider() {
                       $container.not('.slick-initialized').slick({
                          prevArrow: $this.find('.nav_left'),
                          nextArrow: $this.find('.nav_right'),
                          swipeToSlide: true,
                       });
                      
                    }

                    
                    function filtersInit() {
                          $filter.find("a").on("click touchstart", function (e) {
                                var $t = $(this),
                                    selector = $t.data("filter");
                                // Don't proceed if already selected
                                if ($t.hasClass("filter-active"))
                                    return false;
    
                                $filter.find("a").removeClass("filter-active");
                                $t.addClass("filter-active");
                               filterAnimateStart(selector);
                                e.stopPropagation();
                                e.preventDefault();
                                
                            });
                     
                    }
                  
                    function filterAnimateStart(filterValue) {
                      anime.remove('.jws_blog_item');
                      anime({
                        targets: '.jws_blog_item',
                        translateX: -30,
                        opacity: 0,
                        easing: 'easeInOutQuint',
                        duration: 500,
                        delay: function delay(el, i, l) {
                          return i * 60;
                        },
                        begin: function begin(anime) {

                          $(anime.animatables).each(function (i, el) {
                            var $element = $(el.target);
                            $element.css({
                              transition: 'none'
                            });
                          });
                        },
                        complete: function complete(anim) {
                                 if(filterValue !== '*'){

                                  $container.slick('slickUnfilter');
                        
                                  $container.find('.jws_blog_item').each(function(){
                                    $(this).removeClass('slide-shown');
                                  });
                        
                                  $(filterValue).addClass('slide-shown');
                        
                                  $container.slick('slickFilter', '.slide-shown');
                                }
                            
                                else{
                                  $container.find('.jws_blog_item').each(function(){
                                    $(this).removeClass('slide-shown');
                                  });
                                  $container.slick('slickUnfilter');
                                  console.log('loc2');
                                }
                             
                            filterItems(filterValue);
                          
                        }
                      });
                    }
                    function filterItems(filterValue) {
                              //use data-filter attribute & class for filtering 
                          var slider = $container;    
                          var btn = filterValue;
                          var slide = slider.find('.jws_blog_item');
                         
                          if (filterValue == '*') {
                            // if all show all
                            slide.removeClass('hidden');
                            slide.addClass('flickity');
                          } else {
                            //set active slide
                            var active = $(filterValue).removeClass('hidden');
                            // show only slide with the same class as the button "attr('data-filter')"
                            slide.addClass('flickity');
                            slide.not(active).removeClass('flickity');
                            slide.not(active).addClass('hidden');
                            // destroy slider so we can rebuild with new filters
                           
                            
                      }
                      filterAnimateComplete();
                    }
                    function filterAnimateComplete() {
          
                      anime.remove('.jws_blog_item');
                      anime({
                        targets: '.jws_blog_item',
                        translateX: 0,
                        opacity: 1,
                        easing: 'easeOutQuint',
                        delay: function delay(el, i, l) {
                          return i * 60;
                        },
                        complete: function complete(anime) {
                          $(anime.animatables).each(function (i, el) {
                            var element = $(el.target);
                            element.css({
                              transition: '',
                              transform: '',
                              opacity: ''
                            });
                          });
                        }
                      });
                    }
                    
                    if($container.hasClass('jws_blog_slider')) { 
                         filtersInit();   
                         postslider();
                    
                    }  
                });
    } 
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * studies_slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
   var studies_slider = function($scope, $) {
      $scope.find('.jws-studies-element').eq(0).each(function() {
        $(this).find('.jws_studies_slider').not('.slick-initialized').slick({
          prevArrow: $(this).find('.nav_left'),
          nextArrow: $(this).find('.nav_right'),
        });
      });
    } 
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * services_slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
   var services_slider = function($scope, $) {
      $scope.find('.jws-services-element').eq(0).each(function() {
          $container = $(this).find('.jws-service-content');  
           $(window).on("load resize", function () {
            if(!$container.hasClass('jws_services_slider')) {  
                  if($container.hasClass('jws_services_masonry')) {
                $container.isotope({
                    itemSelector: ".jws_services_item",
                    layoutMode: 'masonry',
                    transitionDuration: "0.3s",
                });  
                }else {
                    $container.isotope({
                        itemSelector: ".jws_services_item",
                        layoutMode: 'fitRows',
                        transitionDuration: "0.3s",
                    }); 
            }  
                
            }  
         
        });            
        $(this).find('.jws_services_slider').not('.slick-initialized').slick();
      });
    } 
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Job Filter
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var job_filter = function($scope, $) {
    
                $scope.find('.jws-job-element').eq(0).each(function() {
                    var $this = $(this);
                    var $container = $this.find('.job_filter_content'),
                        $filter = $this.find(".job_nav");

                    var layout = 'fitRows';

                 
                        $container.isotope({
                            itemSelector: ".jws_job_item",
                            layoutMode: layout,
                            transitionDuration: "0.7s"
                        });

                        $filter.find("a").on("click touchstart", function (e) {
                            var $t = $(this),
                                selector = $t.data("filter");
                            // Don't proceed if already selected
                            if ($t.hasClass("filter-active"))
                                return false;

                            $filter.find("a").removeClass("filter-active");
                            $t.addClass("filter-active");
                            $container.isotope({filter: selector});

                            e.stopPropagation();
                            e.preventDefault();
                        });
                   
                });
    }
    
       /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Doctor Filter
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var doctor_filter = function($scope, $) {
    
                $scope.find('.jws-expert_doctors-element').eq(0).each(function() {
                    var $this = $(this);
                    var $container = $this.find('.jws-expert_doctors-content'),
                        $filter = $this.find(".doctor_nav");

                    var layout = 'fitRows';
                    
                    if(!$container.hasClass('jws_expert_doctors_slider')) {
                       $(window).on("load resize", function () {
                        $container.isotope({
                                itemSelector: ".jws_expert_doctors_item",
                                layoutMode: layout,
                                transitionDuration: "0.7s"
                            });
    
                            $filter.find("a").on("click touchstart", function (e) {
                                var $t = $(this),
                                    selector = $t.data("filter");
                                // Don't proceed if already selected
                                if ($t.hasClass("filter-active"))
                                    return false;
    
                                $filter.find("a").removeClass("filter-active");
                                $t.addClass("filter-active");
                                $container.isotope({filter: selector});
    
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        });
                        doctor_pagination_ajax($(this));
                        check_docter_filter($this); 
                    }
                    

                    $this.find('.jws_expert_doctors_slider').not('.slick-initialized').slick({
                        prevArrow: $(this).find('.nav_left'),
                        nextArrow: $(this).find('.nav_right'),
                        appendDots:$(this).find('.custom_dots'),
                    });
                    
                  
                    
                    
                    
                });
    }
    
    
  var  check_docter_filter = function($this) {
        $this.find('.doctor_nav li').each(function() { 
            
            var item = $(this).find('a').data('filter');
            var item2 = $('.jws_expert_doctors_item'+item+'');
            $(this).find('a').removeClass('hide');  
            if(item2.length < 1) {
               
               $('[data-filter="'+item+'"]').addClass('hide'); 
            }
            
        });     
    }
  

      /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Load more button for blog
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
   
   var doctor_pagination_ajax = function($scope) {
      
          var __this = $scope;  
          var $element = $scope.find('.jws-pagination-number');  
          var options = $element.parents('.doctor_pagination').data('ajaxify-options'); 
          var observer = null; 
          init();  
  

        function init() {
        var trigger = 'click';
            trigger == 'inview' && setupIntersectionObserver();
            trigger == 'click' && onClick();
        }
        
          
          function onClick() {  

            $(document).on("click", '.page-numbers a' , function(event) { 
                 parents = $(this).parents('.doctor_pagination').siblings('.row');
                event.preventDefault();    
                loadItems(parents, $(this));
            });
     
        
          }
        function setupIntersectionObserver() { 

            observer = new IntersectionObserver(function (enteries) {
              enteries.forEach(function (entery) {
                if (entery.isIntersecting) {
                  loadItems();
                }
              });
            }, {
              threshold: [1]
            });
            observer.observe(this.element);
          }
          function loadItems($wrapper,$button) {
                var target = $button.attr('href'); // Loading State
                $element.addClass('items-loading'); // Load Items
                $.ajax({
                  type: 'GET',
                  url: target,
                  error: function error(MLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                  },
                  success: function success(data) {
                    var $data = $(data);
                    var pagination = options.nav_wap;
                    var $newItemsWrapper = $data.find(options.wrapper);
                    var $newItems = $newItemsWrapper.find(options.items);
                    var $paginationItems = $data.find(options.nav_wap).find('ul.page-numbers');
      
                      $(pagination).find('.jws-pagination-number').html($paginationItems);
                      $wrapper.html($newItems);
                      $wrapper.isotope('insert', $newItems); // Calling function for the new items
                      onSuccess($wrapper);
                      check_docter_filter($scope);
                    var position = $wrapper.offset().top - 200;
        			$('html, body').stop().animate({
        					scrollTop: position
        				},
        				1200
        			);   
                   
                  }
               });
               
              
               
          };
          function onSuccess($wrapper) { 


            $element.removeClass('items-loading');
    
                                
            
         }
     
      }
    
    /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * gallery Filter
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var jws_gallery = function($scope, $) {
      $scope.find('.jws_gallery_element').eq(0).each(function() {
         var $this = $(this),
         $container = $this.find('.jws_gallery');
         $item = $container.find('.jws_gallery_item').not( ".slick-cloned" );
              //init flickity
              var full = false,
              pageDots = false;
              if($container.hasClass('has-dots')) {
                    pageDots = true;
              } 
              
              if($container.hasClass('layout_hover_water')) {
                $(window).on("load resize", function () {  
                 initPixi();
                }); 
              } 
              
              
              if($container.hasClass('slider')) { 
                    $container.not('.slick-initialized').slick({
                          prevArrow: $this.find('.nav_left'),
                          nextArrow: $this.find('.nav_right'),
                          swipeToSlide: true,
                   });
                   $container.on('swipe', function() {
            			$('html').addClass('lg-on');
            		}).on('afterChange', function() {
            			$('html').removeClass('lg-on');
            		});
              }
              if(!$container.hasClass('slider')) { 
            
                  if($container.hasClass('metro') || $container.hasClass('metro_2') || $container.hasClass('metro_3')) {
                                    $container.isotope({
                                        itemSelector: ".jws_gallery_item",
                                        layoutMode: 'masonry',
                                        transitionDuration: "0.3s",
                                        masonry: {
                                            // use outer width of grid-sizer for columnWidth
                                            columnWidth: '.grid-sizer',
                                          //  horizontalOrder: true
                                           
                                        }
                                    });  
                   }else {
                    
                               $container.isotope({
                                itemSelector: ".jws_gallery_item",
                                layoutMode: 'masonry',
                                transitionDuration: "0.3s",
                              
                              }); 

                  }
               
              }
              
           
              function initPixi() {

                   const aliens = [];
                   var e = document.querySelectorAll(".jws_gallery_item .jws_gallery_image a ");
                   if (e.length)
                   for (var o = 0; o < e.length; o++) {
                           
                            var t = e[o].querySelector("img");

                              let preloader = e[o];  
                           
                              //app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight , view: Canvas});
                              let w = t.width, h = t.height, // 370/600
                              app = new PIXI.Application({ 
                                  width: w,
                                  height: h,  
                                  transparent: false, 
                                  antialias: true, // ???
                                  preserveDrawingBuffer: true, // toDataURL
                                  background: 'rgba(100,0,0,1)' ,
                             
                                });
                              
                        
                              preloader.appendChild(app.view);
                              var image = new PIXI.Sprite.from(t.getAttribute("src"));
                              image.width = t.width;
                              image.height = t.height;
                              app.stage.addChild(image);
                              displacementSprite = new PIXI.Sprite.from("/wp-content/themes/zahar/assets/image/portfolio-hover-pattern.jpg");
                                 displacementSprite.alpha = 0;displacementSprite.renderable = false;
                              displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
                              displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                            
                              app.stage.addChild(displacementSprite);
                              displacementSprite.scale.x = 1;
                              displacementSprite.scale.y = 1;
                              app.stage.filters = [displacementFilter];  
                            
                              app.renderer.view.style.transform = 'scale(1)';
                           
                              aliens.push(displacementSprite);
                              //animate();
                                            
                                
                            app.ticker.add(() => {
                                    // let's rotate the aliens a little bit
                                   
                                    for (var i = 0; i < e.length; i++) {    
                                        const alien = aliens[i];
                                        alien.x += 0.05;
                                        alien.y += 0.05;
                                    
                                    }
                             
                              });
    
                            preloader.addEventListener('mousemove', e => {
                             
                            });

                   }

                  
                }
                
              
              
                
                
          
 
             
        });
           function animate() {
                           
              displacementSprite.x += 1;
              displacementSprite.y += 1;
              requestAnimationFrame(animate);
            }
    }
    
    
  /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Brand Slder
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var jws_brand = function($scope, $) {
      $scope.find('.jws_brand_slider_element').eq(0).each(function() {
         var $this = $(this),
         $container = $this.find('.jws_brand_slider');

            $container.not('.slick-initialized').slick({
                prevArrow: '<span class="jws-carousel-btn prev-item"><i class="icon-chevron-left"></i></span>',
				nextArrow: '<span class="jws-carousel-btn next-item "><i class="icon-chevron-right"></i></span>',
           });
   
        });
    }
    
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Instagram
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */ 
   var instagram = function($scope, $) {
		$scope.find('.jws-instagram').eq(0).each(function() {
			var taget = $(this).find('ul').attr('id');
			var limit = $(this).find('ul').data('limit');
			var userFeed = new Instafeed({
				target: taget,
				accessToken: jws_script.instaram_tk,
				limit: limit,
				template: '<li><a target="_blank" href="{{link}}"><img src="{{image}}" alt="image-ins"></li>',
			});
			userFeed.run();
		});
	};
    
     
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Project Filter
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */

   var project_filter = function($scope, $) {
    
                $scope.find('.jws-project-element').eq(0).each(function() {
                     var $this = $(this);
                    var $container = $this.find('.project_content'),    
                        $filter = $this.find(".project_nav");
                        $item = $container.find('.jws_project_item');
                    $('.jws_project_layout4 .jws_project_image').liquidHoverPosition();
                    
                    
                    if($container.hasClass('jws_project_layout10')) { 
                        var moveForce = 20; // max popup movement in pixels
                      
                        
                        $('.jws_project_layout10 .jws_project_wap').mousemove(function(e) {
                            var docX = $(this).width();
                            var docY = $(this).height();
                   
                            
                            var moveX = (e.pageX - $(this).find('.jws_project_content_inner').offset().left)  / 12  * -1 + moveForce;
                            var moveY = (e.pageY - $(this).find('.jws_project_content_inner').offset().top) / 12 * -1 ;
                
                            
                            $('.jws_project_content_inner').css({"transform": "translate("+moveX+'px'+", "+moveY+'px'+")"});

                                
                        });  
                        
                    }
  
                    loadmore_btn($this);

                     /** Line magic tabs filter **/
                    var  $magicLine;
                    if ($filter.length) {
                        $filter.append("<li id='magic_line'></li>");
                        $magicLine = $this.find('#magic_line');
                        $magicLine
                        .width($this.find('.filter-active').parent().width())
                        .css('left', $this.find('a.filter-active').position().left)
                        .data('origLeft', $magicLine.position().left)
                        .data('origWidth', $magicLine.width())
                        
                        /*Magicline hover animation*/
                        
                        $this.find('.project_nav li').find('a').hover(function () {
                            var $thisBar = $(this);
                            leftPos = $thisBar.position().left;
                            newWidth = $thisBar.parent().width();
                            $magicLine.css({
                                "left": leftPos,
                                "width": newWidth,
                            });
                        }, function () {
                            $magicLine.css({
                                "left": $this.find('a.filter-active').position().left,
                                "width": $this.find('.filter-active').parent().width(),
                            });
                        });
                    }

                    if(!$container.hasClass('slider') && !$('body').hasClass('elementor-editor-preview')) { 
                  
                      
                       
                            if($container.hasClass('masonry')||$container.hasClass('masonry3')||$container.hasClass('masonry4')) {
                                
                                $container.isotope({
                                    itemSelector: ".jws_project_item",
                                    layoutMode: 'masonry',
                                    transitionDuration: "0.7s",
                                     masonry: {
                                        // use outer width of grid-sizer for columnWidth
                                        columnWidth: '.grid-sizer'
                                      }
                                   
                                });  

                              
                            }else {
                                $container.isotope({
                                    itemSelector: ".jws_project_item",
                                    layoutMode: 'masonry',
                                    transitionDuration: "0.7s",
                                }); 
                            }
                         
                       
                            $filter.find("a").on("click touchstart", function (e) {
                                var $t = $(this),
                                    selector = $t.data("filter");
                                // Don't proceed if already selected
                                if ($t.hasClass("filter-active"))
                                    return false;
    
                                $filter.find("a").removeClass("filter-active");
                                $t.addClass("filter-active");
                                $container.isotope({filter: selector});
                                
                                e.stopPropagation();
                                e.preventDefault();
                                
                            });
                            $container.on( 'layoutComplete',
                              function( event, laidOutItems ) {
                                    var $items = $container.find('.jws_project_item');
                                    var time = 0;
                                    $items.each(function() {
                                        var item = jQuery(this);
                                        setTimeout(function() {
                                            item.addClass('fadeIn');
                                        }, time);
                                        time += 200;
                                    });
                              }
                            );
                       
                       //$().gallery_popup($container,$item);   
                    }
                    
      
                    
                    // set vars
                   function flicitySlider() {
                      //init flickity
                      var full = false;
                      if($container.hasClass('has_wrap')) {
                        full = true;
                      }
                      $container.not('.slick-initialized').slick({
                         prevArrow: $this.find('.nav_left'),
                         nextArrow: $this.find('.nav_right'),
                      });
                      
                    }
                    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
                    function fullwidthSide() {
                      if(!$container.hasClass('has_wrap') || $(window).width() < 767) return ;  
                      var _viewportElWrap$css, _viewportElWrap$css2;
                
                      var self = this;
                      var element = $(self.element);
                      var viewportEl = $container.find('.slick-list');
                      var elementWidth = viewportEl.width();
                      var viewportElOffset = viewportEl.offset();
                      var viewportElOffsetRight = $(window).width() - (elementWidth + viewportElOffset.left);
                      var margin = !this.isRTL ? 'marginRight' : 'marginLeft';
                      var padding = !this.isRTL ? 'paddingRight' : 'paddingLeft';;
                
                
                      viewportElWrap = viewportEl.parent();
                      viewportElWrap.css((_viewportElWrap$css = {}, _defineProperty(_viewportElWrap$css, margin, ''), _defineProperty(_viewportElWrap$css, padding, ''), _viewportElWrap$css));
                      viewportElWrap.css((_viewportElWrap$css2 = {}, _defineProperty(_viewportElWrap$css2, margin, viewportElOffsetRight >= 0 ? (viewportElOffsetRight - 1) * -1 : viewportElOffsetRight - 1), _defineProperty(_viewportElWrap$css2, padding, Math.abs(viewportElOffsetRight - 1)), _defineProperty(_viewportElWrap$css2, "overflow", 'hidden'), _viewportElWrap$css2));
                      viewportEl.css('overflow', 'visible');
                    }
                    
                    function filtersInit() {
                          $filter.find("a").on("click touchstart", function (e) {
                                var $t = $(this),
                                    selector = $t.data("filter");
                                // Don't proceed if already selected
                                if ($t.hasClass("filter-active"))
                                    return false;
    
                                $filter.find("a").removeClass("filter-active");
                                $t.addClass("filter-active");
                               filterAnimateStart(selector);
                                e.stopPropagation();
                                e.preventDefault();
                                
                            });
                     
                    }
                  
                    function filterAnimateStart(filterValue) {
                      anime.remove('.jws_project_item');
                      anime({
                        targets: '.jws_project_item',
                        translateX: -30,
                        opacity: 0,
                        easing: 'easeInOutQuint',
                        duration: 300,
                        delay: function delay(el, i, l) {
                          return i * 60;
                        },
                        begin: function begin(anime) {

                          $(anime.animatables).each(function (i, el) {
                            var $element = $(el.target);
                            $element.css({
                              transition: 'none'
                            });
                          });
                        },
                        complete: function complete(anim) {
                                 if(filterValue !== '*'){

                                  $container.slick('slickUnfilter');
                     
                                  $container.find('.jws_project_item').each(function(){
                                    $(this).removeClass('slide-shown');
                                  });
                        
                                  $(filterValue).addClass('slide-shown');
                        
                                  $container.slick('slickFilter', '.slide-shown');
                                }
                            
                                else{
                                  $container.find('.jws_project_item').each(function(){
                                    $(this).removeClass('slide-shown');
                                  });
                                  $container.slick('slickUnfilter');

                                }
                             
                            filterItems(filterValue);
                          
                        }
                      });
                    }
                    function filterItems(filterValue) {
                              //use data-filter attribute & class for filtering 
                          var slider = $container;    
                          var btn = filterValue;
                          var slide = slider.find('.jws_project_item');
                         
                          if (filterValue == '*') {
                            // if all show all
                            slide.removeClass('hidden');
                            slide.addClass('flickity');
                          } else {
                            //set active slide
                            var active = $(filterValue).removeClass('hidden');
                            // show only slide with the same class as the button "attr('data-filter')"
                            slide.addClass('flickity');
                            slide.not(active).removeClass('flickity');
                            slide.not(active).addClass('hidden');
                            // destroy slider so we can rebuild with new filters
                           
                            
                      }
                      filterAnimateComplete();
                    }
                    function filterAnimateComplete() {
          
                      anime.remove('.jws_project_item');
                      anime({
                        targets: '.jws_project_item',
                        translateX: 0,
                        opacity: 1,
                        easing: 'easeOutQuint',
                        delay: function delay(el, i, l) {
                          return i * 60;
                        },
                        complete: function complete(anime) {
                          $(anime.animatables).each(function (i, el) {
                            var element = $(el.target);
                            element.css({
                              transition: '',
                              transform: '',
                              opacity: ''
                            });
                          });
                        }
                      });
             
                    }
                    
                    if($container.hasClass('slider')) { 
                         filtersInit();   
                         flicitySlider();
                         fullwidthSide();
                        
                    }  
 
 
                    
                });
    }
  
       /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Studies Filter
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var studies_filter = function($scope, $) {
    
                $scope.find('.jws-studies-element').eq(0).each(function() {
                    var $this = $(this);
                    var $container = $this.find('.jws_studies_grid'),
                        $filter = $this.find(".studies_nav");



                    $(window).on("load resize", function () {
                        if($container.hasClass('masonry')) {
                            $container.isotope({
                                itemSelector: ".jws_studies_item",
                                layoutMode: 'masonry',
                                transitionDuration: "0.7s",
                                masonry: {
                                    // use outer width of grid-sizer for columnWidth
                                    columnWidth: '.grid-sizer'
                                }
                            });  
                        }else {
                            $container.isotope({
                                itemSelector: ".jws_studies_item",
                                layoutMode: 'fitRows',
                                transitionDuration: "0.7s",
                            }); 
                        }
                        

                        $filter.find("a").on("click touchstart", function (e) {
                            var $t = $(this),
                                selector = $t.data("filter");
                            // Don't proceed if already selected
                            if ($t.hasClass("filter-active"))
                                return false;

                            $filter.find("a").removeClass("filter-active");
                            $t.addClass("filter-active");
                            $container.isotope({filter: selector});

                            e.stopPropagation();
                            e.preventDefault();
                        });
                    })
                });
    }
    
    
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Album
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var album = function($scope, $) {
        $scope.find('.jws-album-element').eq(0).each(function() {
            var $this = $(this);
            var $container = $this.find('.jws-album-content');
            var layoutmode = 'fitRows';
            var ltr = false;
            if($container.hasClass('jws_album_masonry')) { 
                layoutmode = 'masonry'; 
            }
            
            if($container.hasClass('jws_masonry_ltr')) { 
                ltr = true;
            }
            
            
            function ok() {
                   if(!$container.hasClass('jws_album_slider')) {
                    $container.isotope({
                        itemSelector: ".jws_album_item",
                        layoutMode: layoutmode,
                        masonry: {
                          horizontalOrder: ltr
                        }
                    });   
                }else {
                    $container.not('.slick-initialized').slick({
                       swipeToSlide: true,
                    });
                    
                     $container.on('wheel', (function(e) {
                      e.preventDefault();

                      if (e.originalEvent.deltaY < 0) {
                        $(this).slick('slickPrev');
                      } else {
                        $(this).slick('slickNext');
                      }
                    }));
                    
                    var $footer = $('.site-footer'),
                        $header = $('.jws_header'),
                        $footerContent = $footer,
                        footerHeight = $footer.outerHeight(),
                        $window = $(window),
                        $sliderheight = $('.album-image img');
                  
        
                    var footerOffset = function() {
                        $sliderheight.css({
                            height: $window.outerHeight() - $footer.outerHeight() - $header.outerHeight()
                        });
         
                    };
                    $window.on('resize', footerOffset);
                    
                     footerOffset();
                   
                }
            };
            ok();
            

            $(window).on("load resize", function () {
             ok();
            });
        });
    }

      /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Load more button for album shortcode
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
      var albumLoadMore = function($scope, $) {
        $scope.find('.jws-album-element').eq(0).each(function() {
            loadmore_btn($(this));
              
        })
      } 
    
    
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Tabs
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var jws_tabs = function($scope, $) {
 
       $scope.find('.jws_tab_wrap').eq(0).each(function() {
                     var $this = $(this);

                    /** Line magic tabs filter **/
                    var leftPos, newWidth, $magicLine;
                    if ($this.find('.tab_nav').length) {
                        $this.find('.tab_nav').append("<li id='magic_line'></li>");
                        $magicLine = $this.find('#magic_line');
                        $magicLine
                        .width($this.find('.current').width())
                        .height($this.find('.current').height())
                        .css('left', $this.find('.current a').position().left)
                        .data('origLeft', $magicLine.position().left)
                        .data('origWidth', $magicLine.width())
                        .data('origHeight', $magicLine.height())
                        if($this.find(".tab_nav_container").hasClass('layout_layout2')) {
                            $magicLine
                            .css('top', $this.find('.current a').position().top + $this.find('.current').height() - $magicLine.height())
                            .data('origBottom', $magicLine.position().top)
                        }else {
                            $magicLine
                            .css('top', $this.find('.current a').position().top)
                            .data('origTop', $magicLine.position().top)
                        }
                       	$(window).resize(function() {
                         $magicLine
                            .width($this.find('.current').width())
                            .height($this.find('.current').height())
                            .css('left', $this.find('.current a').position().left)
                            .data('origLeft', $magicLine.position().left)
                            .data('origWidth', $magicLine.width())
                            .data('origHeight', $magicLine.height())
                            if($this.find(".tab_nav_container").hasClass('layout_layout2')) {
                                $magicLine
                                .css('top', $this.find('.current a').position().top + $this.find('.current').height() - $magicLine.height())
                                .data('origBottom', $magicLine.position().top + $this.find('.current').height() - $magicLine.height())
                            }else {
                                $magicLine
                                .css('top', $this.find('.current a').position().top)
                                .data('origTop', $magicLine.position().top)
                            }
                    	}); 
                       $this.find('.tab_nav li a').on("click", function() {  
                            $(document).trigger('resize');
                            $magicLine
                                .data('origLeft', $(this).position().left)
                                .data('origWidth', $(this).parent().width())
                                .data('origHeight', $(this).parent().height())
                                if($this.find(".tab_nav_container").hasClass('layout_layout2')) {
                                $magicLine
                                    .data('origBottom', $(this).position().top + $this.find('.current').height() - $magicLine.height())
                                }else {
                                    $magicLine
                                    .data('origTop', $(this).position().top)
                                }
                            return false;
                        });

                        /*Magicline hover animation*/
                        $this.find('.tab_nav li').find('a').click(function () {
                             
                            if($this.find(".tab_nav_container").hasClass('layout_layout2')) {
                                  $magicLine.css({
                                    "left": $magicLine.data('origLeft'),
                                    "top": $magicLine.data('origBottom'),
                                    "width": $magicLine.data('origWidth'),
                                    "height": $magicLine.data('origHeight'),
                                });
                            }else {
                                  $magicLine.css({
                                    "left": $magicLine.data('origLeft'),
                                    "top": $magicLine.data('origTop'),
                                    "width": $magicLine.data('origWidth'),
                                    "height": $magicLine.data('origHeight'),
                                });
                            }
                        });
                    }


                    $this.find('.tab_nav li a').click(function(e){
                        e.preventDefault();
                		var tab_id = $(this).attr('data-tab');
                
                		$this.find('.tab_nav li a').parent().removeClass('current');
                		$this.find('.jws_tab_item').removeClass('current');
                
                		$(this).parent().addClass('current');
                		$this.find("#"+tab_id).addClass('current');
                	})  

        });
    }
    /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Process Tabs
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var jws_process_tabs = function($scope, $) {
 
       $scope.find('.jws_progress.layout_tab').eq(0).each(function() {
                     var $this = $(this);


                    $('.process_nav .progress_item a').click(function(e){
                        e.preventDefault();
                		var tab_id = $(this).attr('data-tab');
                
                		$('.process_nav .progress_item a').parent().removeClass('current');
                		$('.process_content .progress_item').removeClass('current');
                
                		$(this).parent().addClass('current');
                		$("#"+tab_id).addClass('current');
                	})  

        });
    }
      /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Process Hover
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var jws_process_hover = function($scope, $) {
 
       $scope.find('.jws_progress').eq(0).each(function() {
            var $this = $(this);
            if($this.hasClass('layout_list_hover') || $this.hasClass('layout_grid_animation')) {
                 $this.find('.progress_item').hover(function() {
                  $('.progress_item').removeClass('active');
                  $(this).addClass('active');
                   
                }); 
            }  
        });
    }
     /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Process Slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var jws_process_slider = function($scope, $) {
 
       $scope.find('.jws_progress.layout_slider').eq(0).each(function() {
                     var $this = $(this),
                     nav = $this.find('.slider-nav');

                    $this.find('.process_slider').not('.slick-initialized').slick({
                        slide: '.progress_item', 
                        arrows: true, dots: true, 
                        prevArrow: '<span class="slick-prev lnr lnr-chevron-left"></span>', 
                        nextArrow: '<span class="slick-next lnr lnr-chevron-right"></span>', 
                        appendArrows: nav, 
                        appendDots: nav,
                        dotsClass: 'custom_paging',
                        customPaging: function (slider, i) {
                            var slideNumber = (i + 1),
                                totalSlides = slider.slideCount;
                                if(slideNumber < 10) {
                                  beforeslideNumber = '0'+slideNumber; 
                                }else {
                                  beforeslideNumber = slideNumber;
                                }
                                
                                if(totalSlides < 10) {
                                  beforetotalSlides = '0'+totalSlides;
                                }else {
                                  beforetotalSlides = totalSlides;
                                }
                            return '<a class="custom-dot" role="button"><span class="string">' + beforeslideNumber + '</span>/<span class="total">' + beforetotalSlides + '</span></a>';
                        }
                    });
        });
    }
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Team Social Show
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
  
   var jws_team = function($scope, $) {
        $('.team-3d-slider').liquidCarouselV3d(); 
        $('.layout7 .jws_team_image').liquidHover3d();

       $scope.find('.jws_team_element').eq(0).each(function() {
          $container = $(this).find('.jws_team');
          if(!$container.hasClass('team-no-masonry') && !$('body').hasClass('elementor-editor-active')) {
            $(window).on("load resize", function () {
             $container.isotope({
                itemSelector: ".jws_team_item",
                layoutMode: 'masonry',
                transitionDuration: "0.3s",
            }); 
            });
          } 
         
        
         $(this).find('.jws_team_slider').not('.slick-initialized').slick({
                  prevArrow: $(this).find('.nav_left'),
                  nextArrow: $(this).find('.nav_right'),
         });
       }); 
       $scope.find('.jws_team .jws_team_item').each(function() {
                var $this = $(this);
                
                $this.find('.team_show_social').on('click', function(){
                   $(this).toggleClass('opened');
                   $this.find(".team_icon").toggleClass('opened'); 
                   if($this.find(".team_icon").hasClass('opened')) {
                        $this.find(".team_icon li").delay(0).each(function(i) {
                        $(this).delay(100 * i).queue(function() {
                          $(this).addClass("show");
                          $(this).dequeue();
                        })
                      });
                   }else {
                        $this.find(".team_icon li").removeClass('show');
                   }
                });   
        });
    }    

    /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Load more button for projects shortcode
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
   
        function project_hover() { 
                        $( ".hover-3d" ).mouseenter(function() {
                           anime({
                               scale: 1.1,
                               targets: this,
                                
                          });
                        });
               
                        $( ".hover-3d" ).mouseleave(function() {
                           anime({
                               scale: 1.0,
                               targets: this,
                                
                          });
                        });
                   
                            
                           
                       $( '.jws_project_wap' ).mouseenter(function() {
                            var textWrapper = $(this).find('.text-effect1');

                           if (!textWrapper.hasClass('has_hover')) {
                              textWrapper.html(function (i, html) {
                                  return '<span  class="text-effect2">' + html.trim().replace(/(\s+)/g, '</span>$1<span class="text-effect2" style="display:inline-block">') + '</span>'
                              }) 
                              textWrapper.find('.text-effect2').html(function (i, html) {
                                  return html.replace(/\S/g, "<span class='letter'>$&</span>")
                              })          
                      
                            }         
                            $(this).find('.text-effect1').addClass('has_hover'); 
                            anime({
                                
                                targets:this.getElementsByClassName('letter'),
                                translateX: [40,0],
                                translateZ: 0,
                                opacity: [0,1],
                                easing: "easeOutExpo",
                                duration: 700,
                                delay: (el, i) => 200 + 20 * i
                            })
                        });
                        
                    
                     $( ".jws_project_layout9 .jws_project_image" ).mousemove(function( event ) {
                        var parent = $(this).parents('.jws_project_wap');
                         var e = event.pageX - parent.find(".jws_project_image").offset().left,
                         n = event.pageY - parent.find(".jws_project_image").offset().top;
                         parent.find(".visit_move_container").addClass('show');
                          parent.find(".visit_move").fadeIn();
                         parent.find(".visit_move").css({
                            transform: "translate3d(" + e + "px, " + n + "px, 0)"
                        })
                    });
                    $( ".jws_project_layout9 .jws_project_image" ).mouseleave(function( event ) {
                        var parent = $(this).parents('.jws_project_wap');
                         var e = event.pageX - parent.find(".jws_project_image").offset().left,
                         n = event.pageY - parent.find(".jws_project_image").offset().top;
                         parent.find(".visit_move_container").removeClass('show');
                         parent.find(".visit_move").fadeOut();
                    });
                   
                  
                        
  
    }
    project_hover();

      var blogLoadMore  = function($scope, $) {

        $scope.find('.jws-blog-element').eq(0).each(function() {
            loadmore_btn($(this));
              
        })
      }
      
    
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Load more button for blog shortcode
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
      var studiesLoadMore = function($scope, $) {
        $scope.find('.jws-studies-element').eq(0).each(function() {
            loadmore_btn($(this));
              
        })
      }
      
      
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Load more button for blog shortcode
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
      var destinationLoadMore = function($scope, $) {
        $scope.find('.jws-destination-element').eq(0).each(function() {
            loadmore_btn($(this));
            var $container = $(this).find('.jws-isotope');
             $container.isotope({
                itemSelector: ".jws_destination_item",
                layoutMode: 'fitRows',
                transitionDuration: "0.3s",
            }); 
              
        })
      }   
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Load more button for blog
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
   var loadmore_btn = function($scope) {
      
          var __this = $scope;  
          var $element = $scope.find('[data-ajaxify=true]');  
          var options = $element.data('ajaxify-options'); 
          var observer = null; 
          init();  
  

        function init() {
        var trigger = 'click';
            trigger == 'inview' && setupIntersectionObserver();
            trigger == 'click' && onClick();
        }
          
          function onClick() {  
            $element.on('click', function(event) { 
                parents = $(this).parent('.jws_pagination').siblings('.row');
                event.preventDefault();    
                loadItems(parents,$(this));
            });

            $(document).on("click", '.page-numbers a' , function(event) { 
                 parents = $(this).parents('.jws-pagination-number').siblings('.row');
                 $(this).parents('.jws-pagination-number').addClass('items-loading');
                event.preventDefault();    
                loadItems(parents,$(this));
            });
     
        
          }
        function setupIntersectionObserver() { 

            observer = new IntersectionObserver(function (enteries) {
              enteries.forEach(function (entery) {
                if (entery.isIntersecting) {
                  loadItems();
                }
              });
            }, {
              threshold: [1]
            });
            observer.observe(this.element);
          }
          function loadItems($wrapper,$button) {
        
                var $button_url = $button.attr('href'); // Loading State
                $button.addClass('items-loading'); // Load Items
                $.ajax({
                  type: 'GET',
                  url: $button_url,
                  error: function error(MLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                  },
                  success: function success(data) {
                    var $data = $(data);
                    var $newItemsWrapper = $data.find(options.wrapper);
                    var $newItems = $newItemsWrapper.find(options.items);
             
                    var nextPageUrl = $data.find('[data-ajaxify=true]').attr('href'); // Add New Items on imagesLoaded
                      if((nextPageUrl && nextPageUrl != '?ajaxify=1') && $button_url != nextPageUrl) {
						$element.attr('href', nextPageUrl);
					} else {
						if(observer) {
							observer.unobserve($element);
						}
						$element.removeClass('items-loading').addClass('all-items-loaded');
					} // Append new items
                          
                          if($button.parents('.jws-pagination-number').length) {
                                
                                 var $paginationItems = $data.find('ul.page-numbers');
      
                      $button.parents('.jws-pagination-number').html($paginationItems);
                      $wrapper.html($newItems);
                      $wrapper.isotope('insert', $newItems); // Calling function for the new items
         
                    var position = $wrapper.offset().top - 200;
        			$('html, body').stop().animate({
        					scrollTop: position
        				},
        				1200
        			); 
                    $wrapper.prev().find('.post_nav li').each(function() { 
            
                        var item = $(this).find('a').data('filter');
                        var item2 = $wrapper.find('.jws_blog_item'+item+'');
                        $(this).find('a').removeClass('hide');  
                        if(item2.length < 1) {
                           
                           $('[data-filter="'+item+'"]').addClass('hide'); 
                        }
                    
                    }); 
                                
                                
                      }else {
                          $newItems.appendTo($wrapper);
                          if(!$wrapper.hasClass('jws_blog_slider') && $wrapper.hasClass('jws-isotope')) {
                             $wrapper.isotope('appended', $newItems); // Calling function for the new items
                          }
                      }  
                      onSuccess($wrapper);
                  }
               });
          };
          function onSuccess($wrapper) { 
            jwsThemeModule.video_popup();
            project_hover();
            $('.hover-3d').liquidHover3d();
            $('.jws_project_layout4 .jws_project_image').liquidHoverPosition();
            $element.removeClass('items-loading');
            $wrapper.next('.jws-pagination-number').removeClass('items-loading');
             $(".has-animation .jws-ani-item").addClass('hiden-ani'); 
                           
                                
            
         }
     
      }
       /**
       *-------------------------------------------------------------------------------------------------------------------------------------------
       * Search
       *-------------------------------------------------------------------------------------------------------------------------------------------
       */
        var search = function ( $scope, $ ) {      
            if ( 'undefined' == typeof $scope )
			return;
            
            $scope.find('.jws_search').eq(0).each(function() {
                var wglSearch = {}, s = $(this);
                var openClass = 'open',
                button = s.find('> button');

                
                s.find(button).on('click', function(e) {
                e.preventDefault();
                   if (!s.hasClass(openClass)) {
                         s.addClass(openClass);
                        setTimeout(function(){
                            s.find('input.search-field').focus();
                        }, 100);
                        console.log('open');
                        return false;;
                    }else{
                        s.removeClass(openClass);
                    }
                   if(!$(e.target).closest('.search-form').length){
                        if (s.hasClass(openClass)) {
                           s.removeClass(openClass);
                        }                        
                    }
                });
                
                $('body').on('click', function(e) {
                   if(!$(e.target).closest('.search-form').length){
                        if (s.hasClass(openClass)) {
                           s.removeClass(openClass);
                        }                        
                    }
                });
                
            });

        }
       /**
       *-------------------------------------------------------------------------------------------------------------------------------------------
       * Time Line
       *-------------------------------------------------------------------------------------------------------------------------------------------
       */
        var timeline = function ( $scope, $ ) {      
            if ( 'undefined' == typeof $scope )
			return;
            
            $scope.find('.jws_timeline').eq(0).each(function() {
                var $this = $(this),
                    field = $this.find('.jws_timeline_field'),
                    line = $this.find('.jws_timeline_line'),
                    circle = $this.find('.jws_timeline_circle'),
                    timeline_start_icon = circle.first().position();
                    line.css('top', timeline_start_icon.top );
                    field.each(function() { 
                        $(this).appear(function() {
            	               $(this).addClass('animation_show');
                        });  
                    });          
            });

        }
      
       /**
       *-------------------------------------------------------------------------------------------------------------------------------------------
       * Google Map
       *-------------------------------------------------------------------------------------------------------------------------------------------
       */
      var WidgetjwsGoogleMapHandler = function ( $scope, $ ) {

		if ( 'undefined' == typeof $scope )
			return;

		var selector                = $scope.find( '.jws-google-map' ).eq(0),
			locations               = selector.data( 'locations' ),
			map_style               = ( selector.data( 'custom-style' ) != '' ) ? selector.data( 'custom-style' ) : '',
			predefined_style 		= ( selector.data( 'predefined-style' ) != '' ) ? selector.data( 'predefined-style' ) : '',
			info_window_size        = ( selector.data( 'max-width' ) != '' ) ? selector.data( 'max-width' ) : '',
			m_cluster            	= ( selector.data( 'cluster' ) == 'yes' ) ? true : false,
			animate            		= selector.data( 'animate' ),
			auto_center				= selector.data( 'auto-center' ),
			map_options             = selector.data( 'map_options' ),
			i                       = '',
			bounds 					= new google.maps.LatLngBounds(),
			marker_cluster 			= [],
			device_size 			= elementorFrontend.getCurrentDeviceMode(),
            className = 'map_pin_jws';

		if( 'drop' == animate ) {
			var animation = google.maps.Animation.DROP;
		} else if( 'bounce' == animate ) {
			var animation = google.maps.Animation.BOUNCE;
		}
        
        function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
        function CustomMarker(latlng, map, className) {
            this.latlng_ = latlng;
            this.className = className; // Once the LatLng and text are set, add the overlay to the map.  This will
            // trigger a call to panes_changed which should in turn call draw.
        
            this.setMap(map);
          }
        
          if ((typeof google === "undefined" ? "undefined" : _typeof(google)) !== _typeof(undefined) && _typeof(google.maps) !== _typeof(undefined)) {
            CustomMarker.prototype = new google.maps.OverlayView();
        
            CustomMarker.prototype.draw = function () {
              var me = this; // Check if the div has been created.
        
              var div = this.div_,
                  divChild,
                  divChild2;
        
              if (!div) {
                // Create a overlay text DIV
                div = this.div_ = document.createElement('DIV');
                div.className = this.className;
                divChild = document.createElement("div");
                div.appendChild(divChild);
                divChild2 = document.createElement("div");
                div.appendChild(divChild2);
                google.maps.event.addDomListener(div, "click", function (event) {
                  google.maps.event.trigger(me, "click");
                }); // Then add the overlay to the DOM
        
                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
              } // Position the overlay
        
        
              var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
        
              if (point) {
                div.style.left = point.x + 'px';
                div.style.top = point.y + 'px';
              }
            };
        
            CustomMarker.prototype.remove = function () {
              // Check if the overlay was on the map and needs to be removed.
              if (this.div_) {
                this.div_.parentNode.removeChild(this.div_);
                this.div_ = null;
              }
            };
        
            CustomMarker.prototype.getPosition = function () {
              return this.latlng_;
            };
          }
        
        
        
        
        

		var skins = {
			"silver" : "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f5f5f5\"}]},{\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#616161\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#f5f5f5\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#bdbdbd\"}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#eeeeee\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e5e5e5\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9e9e9e\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#ffffff\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dadada\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#616161\"}]},{\"featureType\":\"road.local\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9e9e9e\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e5e5e5\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#eeeeee\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#c9c9c9\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9e9e9e\"}]}]",

			"retro" : "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#ebe3cd\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#523735\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#f5f1e6\"}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#c9b2a6\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#dcd2be\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#ae9e90\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dfd2ae\"}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dfd2ae\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#93817c\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#a5b076\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#447530\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f5f1e6\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#fdfcf8\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f8c967\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#e9bc62\"}]},{\"featureType\":\"road.highway.controlled_access\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e98d58\"}]},{\"featureType\":\"road.highway.controlled_access\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#db8555\"}]},{\"featureType\":\"road.local\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#806b63\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dfd2ae\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#8f7d77\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#ebe3cd\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dfd2ae\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#b9d3c2\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#92998d\"}]}]",

			"dark" : "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#212121\"}]},{\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#212121\"}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"administrative.country\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9e9e9e\"}]},{\"featureType\":\"administrative.land_parcel\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"administrative.locality\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#bdbdbd\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#181818\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#616161\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1b1b1b\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#2c2c2c\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#8a8a8a\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#373737\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#3c3c3c\"}]},{\"featureType\":\"road.highway.controlled_access\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#4e4e4e\"}]},{\"featureType\":\"road.local\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#616161\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#000000\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#3d3d3d\"}]}]",

			"night" : "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#242f3e\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#746855\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#242f3e\"}]},{\"featureType\":\"administrative.locality\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#d59563\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#d59563\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#263c3f\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#6b9a76\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#38414e\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#212a37\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9ca5b3\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#746855\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#1f2835\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#f3d19c\"}]},{\"featureType\":\"transit\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#2f3948\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#d59563\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#17263c\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#515c6d\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#17263c\"}]}]",

			"aubergine" : "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#1d2c4d\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#8ec3b9\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1a3646\"}]},{\"featureType\":\"administrative.country\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#4b6878\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#64779e\"}]},{\"featureType\":\"administrative.province\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#4b6878\"}]},{\"featureType\":\"landscape.man_made\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#334e87\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#023e58\"}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#283d6a\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#6f9ba5\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1d2c4d\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#023e58\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#3C7680\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#304a7d\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#98a5be\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1d2c4d\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#2c6675\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#255763\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#b0d5ce\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#023e58\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#98a5be\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1d2c4d\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#283d6a\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#3a4762\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#0e1626\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#4e6d70\"}]}]",

			"magnesium" : "[{\"featureType\":\"all\",\"stylers\":[{\"saturation\":0},{\"hue\":\"#e7ecf0\"}]},{\"featureType\":\"road\",\"stylers\":[{\"saturation\":-70}]},{\"featureType\":\"transit\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"water\",\"stylers\":[{\"visibility\":\"simplified\"},{\"saturation\":-60}]}]",

			"classic_blue" : "[{\"featureType\":\"all\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.country\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.country\",\"elementType\":\"labels.text\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.province\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.province\",\"elementType\":\"labels.text\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.locality\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.neighborhood\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"landscape\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#FFBB00\"},{\"saturation\":43.400000000000006},{\"lightness\":37.599999999999994},{\"gamma\":1}]},{\"featureType\":\"landscape\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"saturation\":\"-40\"},{\"lightness\":\"36\"}]},{\"featureType\":\"landscape.man_made\",\"elementType\":\"geometry\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"saturation\":\"-77\"},{\"lightness\":\"28\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#00FF6A\"},{\"saturation\":-1.0989010989011234},{\"lightness\":11.200000000000017},{\"gamma\":1}]},{\"featureType\":\"poi\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi.attraction\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"saturation\":\"-24\"},{\"lightness\":\"61\"}]},{\"featureType\":\"road\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#FFC200\"},{\"saturation\":-61.8},{\"lightness\":45.599999999999994},{\"gamma\":1}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road.highway.controlled_access\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#FF0300\"},{\"saturation\":-100},{\"lightness\":51.19999999999999},{\"gamma\":1}]},{\"featureType\":\"road.local\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#ff0300\"},{\"saturation\":-100},{\"lightness\":52},{\"gamma\":1}]},{\"featureType\":\"road.local\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"geometry\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"water\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#0078FF\"},{\"saturation\":-13.200000000000003},{\"lightness\":2.4000000000000057},{\"gamma\":1}]},{\"featureType\":\"water\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]}]",

			"aqua" : "[{\"featureType\":\"administrative\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#444444\"}]},{\"featureType\":\"landscape\",\"elementType\":\"all\",\"stylers\":[{\"color\":\"#f2f2f2\"}]},{\"featureType\":\"poi\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road\",\"elementType\":\"all\",\"stylers\":[{\"saturation\":-100},{\"lightness\":45}]},{\"featureType\":\"road.highway\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"simplified\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"water\",\"elementType\":\"all\",\"stylers\":[{\"color\":\"#46bcec\"},{\"visibility\":\"on\"}]}]",

			"earth" : "[{\"featureType\":\"landscape.man_made\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f7f1df\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#d0e3b4\"}]},{\"featureType\":\"landscape.natural.terrain\",\"elementType\":\"geometry\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi.business\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi.medical\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#fbd3da\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#bde6ab\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#ffe15f\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#efd151\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#ffffff\"}]},{\"featureType\":\"road.local\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"black\"}]},{\"featureType\":\"transit.station.airport\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#cfb2db\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#a2daf2\"}]}]"
		};

		if( 'undefined' != typeof skins[predefined_style] ) {
			map_style = JSON.parse( skins[predefined_style] );
		}


		( function initMap () {

			var latlng = new google.maps.LatLng( locations[0][0], locations[0][1] );

			map_options.center = latlng;
			map_options.styles = map_style;

			if( false == map_options.gestureHandling ){
				map_options.gestureHandling = 'none';
			}

			var map = new google.maps.Map( $scope.find( '.jws-google-map' )[0], map_options );
			var infowindow = new google.maps.InfoWindow();

			for ( i = 0; i < locations.length; i++ ) {

				var title = locations[i][3];
				var description = locations[i][4];
				var icon_size = parseInt( locations[i][7] );
				var icon_type = locations[i][5];
				var icon = '';
				var icon_url = locations[i][6];
				var enable_iw = locations[i][2];
				var click_open = locations[i][8];
				var lat = locations[i][0];
				var lng = locations[i][1];
                var infoWindow_opened = false;
				if( 'undefined' === typeof locations[i] ) {
					return;
				}

				if ( '' != lat.length && '' != lng.length ) {

                    

					if ( 'custom' == icon_type) {

						icon = {
							url: icon_url,
						};
						if( ! isNaN( icon_size ) ) {

							icon.scaledSize = new google.maps.Size( icon_size, icon_size );
							icon.origin = new google.maps.Point( 0, 0 );
							icon.anchor = new google.maps.Point( icon_size/2, icon_size );

						}
                        var marker = new google.maps.Marker( {
    						position:       new google.maps.LatLng( lat, lng ),
    						map:            map,
    						title:          title,
    						icon:           icon,
    						animation: 		animation
    					});
					}else if('html' == icon_type){
					   marker = new CustomMarker(new google.maps.LatLng( lat, lng ), map, className);
					}else {
					   var marker = new google.maps.Marker( {
    						position:       new google.maps.LatLng( lat, lng ),
    						map:            map,
    						title:          title,
    						icon:           icon,
    						animation: 		animation
    					});
					}
                    
                    
        
                    
				

					if( locations.length > 1 ) {

						// Extend the bounds to include each marker's position
						bounds.extend( marker.position );
					}

					marker_cluster[i] = marker;

					if ( enable_iw && 'iw_open' == click_open ) {
                        infoWindow_opened = true; 
						var content_string = '<div class="jws-infowindow-content"><div class="jws-infowindow-title">' + title + '</div>';

						if ( '' != description.length ) {
							content_string += '<div class="jws-infowindow-description">' + description + '</div>';
						}
						content_string += '</div>';

						if ( '' != info_window_size  ) {
							var width_val = parseInt( info_window_size );
							var infowindow = new google.maps.InfoWindow( {
								content: content_string,
								maxWidth: width_val
							} );
						} else {
							var infowindow = new google.maps.InfoWindow( {
								content: content_string,
							} );
						}


						infowindow.open( map, marker );
					}

					// Adding close event for info window
					google.maps.event.addListener( map, 'click', ( function ( infowindow ) {

						return function() {
							infowindow.close();
						}
					})( infowindow ));
                    infowindow.addListener('closeclick', ()=>{
                         infoWindow_opened = false; 
                    });
					if ( enable_iw && '' != locations[i][3] ) {

						google.maps.event.addListener( marker, 'click', ( function( marker, i ) {
						  	var infowindow = new google.maps.InfoWindow();
								var content_string = '<div class="jws-infowindow-content"><div class="jws-infowindow-title">' + locations[i][3] + '</div>';

								if ( '' != locations[i][4].length ) {
									content_string += '<div class="jws-infowindow-description">' + locations[i][4] + '</div>';
								}

								content_string += '</div>';
							return function() {
							

								infowindow.setContent( content_string );

								if ( '' != info_window_size ) {
									var width_val = parseInt( info_window_size );
									var InfoWindowOptions = { maxWidth : width_val };
									infowindow.setOptions( { options:InfoWindowOptions } );
								}
                             
								if(!infoWindow_opened) {
                                       infowindow.open(map, marker);   
                                }
							}
						})( marker, i ));
					}
				}
			}

			if( locations.length > 1 ) {

				if ( 'center' == auto_center ) {

					// Now fit the map to the newly inclusive bounds.
					map.fitBounds( bounds );
				}

				// Restore the zoom level after the map is done scaling.
				var listener = google.maps.event.addListener( map, "idle", function () {
					map.setZoom( map_options.zoom );
					google.maps.event.removeListener( listener );
				});
			}

			var cluster_listener = google.maps.event.addListener( map, "idle", function () {

				if( 0 < marker_cluster.length && m_cluster ) {

					var markerCluster = new MarkerClusterer(
						map,
						marker_cluster,
						{
							imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
						}
					);
				}
				google.maps.event.removeListener( cluster_listener );
			});


		})(); 
	}
	/**
	 * Table handler Function.
	 *
	 */
	var jws_table = function( $scope, $ ) {
		if ( 'undefined' == typeof $scope ) {
			return;
		}
		// Define variables.
		var $this                = $scope.find( '.jws-table-wrapper' );
		var node_id              = $scope.data( 'id' );
		var jws_table           = $scope.find( '.jws-table' );
		var jws_table_id        = $scope.find( '#jws-table-id-' + node_id );
		var searchable 			 = false;
		var showentries 		 = false;
		var sortable 			 = false;

		if ( 0 == jws_table_id.length )
			return;

		//Search entries
		var search_entry = $( '.elementor-element-' + node_id + ' #' + jws_table_id[0].id ).data( 'searchable' );

		if ( 'yes' == search_entry ) {
			searchable = true;
		}

		//Show entries select
		var show_entry = $( '.elementor-element-' + node_id + ' #' + jws_table_id[0].id ).data( 'show-entry' );

		if ( 'yes' == show_entry ) {
			showentries = true;
		}

		//Sort entries
		var sort_table = $( '.elementor-element-' + node_id + ' #' + jws_table_id[0].id ).data( 'sort-table' );

		if ( 'yes' == sort_table ) {
			$( '.elementor-element-' + node_id + ' #' + jws_table_id[0].id + ' th' ).css({'cursor': 'pointer'});

			sortable = true;
		}

		var search_string = jws_script.search_str;
		var length_string = jws_script.table_length_string;

		if( searchable || showentries || sortable ) {
			$( '#' + jws_table_id[0].id ).DataTable( {
				"paging": showentries, 
				"searching": searchable, 
				"ordering": sortable,
				"info": false,
				"oLanguage": {
					"sSearch": search_string,
					"sLengthMenu": length_string,
				},
			});

			var	div_entries = $scope.find('.dataTables_length');
			div_entries.addClass('jws-tbl-entry-wrapper jws-table-info');

			var	div_search = $scope.find('.dataTables_filter');
			div_search.addClass('jws-tbl-search-wrapper jws-table-info');

			$scope.find( '.jws-table-info').wrapAll( '<div class="jws-advance-heading"></div>' );

		}


		function coloumn_rules() {
			if($(window).width() > 767) {
				$(jws_table).addClass('jws-column-rules');
				$(jws_table).removeClass('jws-no-column-rules');
			}else{
				$(jws_table).removeClass('jws-column-rules');
				$(jws_table).addClass('jws-no-column-rules');
			}
		}

		// Listen for events.
		window.addEventListener("load", coloumn_rules);
		window.addEventListener("resize", coloumn_rules);
	}
     /**
	 * Menu Style.
	 *
	 */
	var jws_menu_style = function( $scope, $ ) {
		if ( 'undefined' == typeof $scope ) {
			return;
		}
	    $scope.find('.jws_main_menu').eq(0).each(function() {
              var $this = $(this);
                $(this).find('.elementor-icon-list-item.active').parents('.nav > li').addClass('current-menu-item');
       
                    if($this.closest( '.elementor-widget-jws_menu_nav' ).hasClass('elementor-before-menu-skin-square')) {
                           var main = $this.find(".jws_main_menu_inner"),
                                curent_item = main.find('> ul > li.current-menu-item , > ul > li.current-menu-ancestor'),
                                curent_item_sub = main.find('ul li.current-menu-item , .elementor-icon-list-item.active');
                            if (main.find('> ul > li.current-menu-item').length == 0) {
                                if (curent_item_sub.length > 0) {
                                    curent_item = curent_item_sub.parents('.nav > li');
                                }else {
                                    curent_item = main.find('> ul > li:first-child');  
                                }    
                     
                            }
                            
                             /** Line magic tabs filter **/
                            var  $magicLine;
                            if (main.length) {
                                main.append("<span id='magic_line'></span>");
                                $magicLine = $this.find('#magic_line');
                                $magicLine
                                .css('left', curent_item.position().left)
                                .data('origLeft', $magicLine.position().left)
                                
                                /*Magicline hover animation*/
                                
                                $this.find('.nav').find('> li').hover(function () {
                                    var $thisBar = $(this);
                                    leftPos = $thisBar.position().left;
                                    $magicLine.css({
                                        "left": leftPos,
                                    });
                                }, function () {
                                    $magicLine.css({
                                        "left": curent_item.position().left,
                                    });
                                });
                            }         
                     } 
              
                            
        });
	}
    
    /**
	* Wishlist Count.
	*
	*/
	var jws_wishlist = function( $scope, $ ) {
		if ( 'undefined' == typeof $scope ) {
			return;
		}
      
	    $scope.find('.jws_wishlist').eq(0).each(function() {
                $(document).on( 'added_to_cart added_to_wishlist removed_from_wishlist', function(){
                var counter = $('.jws_wishlist_count');
                
                $.ajax({
                url: yith_wcwl_l10n.ajax_url,
                data: {
                action: 'yith_wcwl_update_wishlist_count'
                },
                dataType: 'json',
                success: function( data ){
                counter.html( data.count );
                },
                beforeSend: function(){
                counter.block();
                },
                complete: function(){
                counter.unblock();
                }
                })
                } )
                         
        });
	}
    var event = function($scope, $) {
          $scope.find('.jws-events-element').eq(0).each(function() {
            var wap_this = $(this);
            wap_this.find('.jws-ajax-load a.ajax-load').on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			var key = $this.data('value');
			wrap = $this.parents('.jws-events-element');
			if($this.hasClass('active')) {
				return;
			}
			$this.parents('.jws-ajax-load ').find('a').removeClass('active');
			$this.addClass('active');
			if($this.hasClass('opened')) {
				wrap.find('.events_content').html(wrap.find('.events_content').data(key));
				console.log(wrap.find('.events_content').data(key));
				if(wrap.hasClass('jws_events_slider')) {
					wrap.find('.events_content').removeClass('slick-initialized slick-slider slick-dotted');
					jws_events_slider();
				}
				return;
			}
			$this.addClass('opened');
			wrap.addClass('loading');
			var data = wrap.data('args');
			data.action = 'jws_ajax_events_filter';
			if($this.data('type') == 'events_cat') {
				data.filter_categories = $this.data('value');
			}
			wrap.data('args', data);
			$.ajax({
				url: wrap.data('url'),
				data: data,
				type: 'POST',
			}).success(function(response) {
				wrap.removeClass('loading');
				let content = $(response).html();
				wrap.find('.events_content').html(content);
				wrap.find('.events_content').data(key, content);
				if(wrap.hasClass('jws_events_slider')) {
					wrap.find('.events_content').removeClass('slick-initialized slick-slider slick-dotted');
					jws_events_slider();
				}
			}).error(function(ex) {
				console.log(ex);
			});
		});
            
            
         function jws_events_slider() {
               wap_this.find('.jws_events_slider').not('.slick-initialized').slick({
                    prevArrow: $(this).find('.nav_left'),
                    nextArrow: $(this).find('.nav_right'),
               });    
         }   
         jws_events_slider();
             
               
               
                
            })
    } 
    
    
      var model_idol = function($scope, $) {
          $scope.find('.jws-model-element').eq(0).each(function() {
            var wap_this = $(this);
            wap_this.find('.jws-ajax-load a.ajax-load').on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			var key = $this.data('value');
			wrap = $this.parents('.jws-model-element');
			if($this.hasClass('active')) {
				return;
			}
			$this.parents('.jws-ajax-load ').find('a').removeClass('active');
			$this.addClass('active');
			if($this.hasClass('opened')) {
			 console.log(wrap.find('.model_content').data(key));
                wrap.find('.model_content').replaceWith(wrap.data(key));
                wrap.find('.model_content').isotope({
                            itemSelector: ".jws_model_item",
                            layoutMode: 'masonry',
                            transitionDuration: "0.3s",
                    });  
				if(wrap.hasClass('jws_model_slider')) {
					wrap.find('.model_content').removeClass('slick-initialized slick-slider slick-dotted');
					jws_model_slider();
				}
				return;
			}
			$this.addClass('opened');
			wrap.addClass('loading');
			var data = wrap.data('args');
			data.action = 'jws_ajax_model_idol_filter';
			if($this.data('type') == 'model_cat') {
				data.filter_categories = $this.data('value');
			}
			wrap.data('args', data);
			$.ajax({
				url: wrap.data('url'),
				data: data,
				type: 'POST',
			}).success(function(response) {
				wrap.removeClass('loading');
				let content = $(response).html();
                wrap.find('.model_content').replaceWith(content);
				wrap.data(key, content);
				if(wrap.hasClass('jws_model_slider')) {
					wrap.find('.model_content').removeClass('slick-initialized slick-slider slick-dotted');
					jws_model_slider();
				}else {
				    wrap.find('.model_content').isotope({
                            itemSelector: ".jws_model_item",
                            layoutMode: 'masonry',
                            transitionDuration: "0.3s",
                    });  
                    console.log('ok');
				}
			}).error(function(ex) {
				console.log(ex);
			});
		});
        
        
        

            
            
         function jws_model_slider() {
               wap_this.find('.jws_model_slider').not('.slick-initialized').slick({
                    prevArrow: wap_this.find('.nav_left'),
                    nextArrow: wap_this.find('.nav_right'),
               }).on( 'afterChange', function( event, slick, currentSlide ) {
                      wap_this.find('.jws_model_slider').addClass('slider_running'); 
                      wap_this.find('.jws_model_slider').removeClass('slider_top');   
                    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){  
                         wap_this.find('.jws_model_slider').removeClass('slider_running'); 
                         wap_this.find('.jws_model_slider').addClass('slider_top'); 
                    }).on('init', function(event, slick){
                      slick.addClass('slider_running');
                    });;    
         }   
         jws_model_slider();
         
         
        function jws_model_mansonry() { 
            
           var $container = wap_this.find('.model_content');
         
            if(!$container.hasClass('jws_model_slider')) { 
                $( document ).ready(function() {
                     if($container.hasClass('has-masonry')) {
                        $container.isotope({
                            itemSelector: ".jws_model_item",
                            layoutMode: 'masonry',
                            transitionDuration: "0.3s",
                        });  
                    }else {
                        $container.isotope({
                            itemSelector: ".jws_model_item",
                            layoutMode: 'fitRows',
                            transitionDuration: "0.3s",
                        }); 
                    }
    
                })
            } 
            
        } 
        
        jws_model_mansonry();
        
             
               
               
                
       })
  }    
    
    
  var destination_tabs = function($scope, $) { 
    
     $scope.find('.jws-destination_tabs').eq(0).each(function() { 
            
            var wap_this = $(this);
            wap_this.find('.destination_item > a').on('click', function(e) {
            e.preventDefault();
            $(this).next('.destination_location').slideToggle();     
            });
            
            wap_this.find('.destination-value').on('click', function(e) {
                e.preventDefault();
                $(this).next('ul').slideToggle();     
            });
            
            wap_this.find('.destination-select ul li a').on('click', function(e) {
                var select = $(this).parents('.destination-select');
                select.find('.destination-value span').html($(this).text()); 
                select.find('ul').slideToggle();   
            });
            
            
            
     });
    
  } 

  // Charts Handler
  var jwsChartHandler = function($scope, $) {
    var jwsChart = $scope.find(".jws-chart-container"),
      jwsChartSettings = jwsChart.data("settings"),
      type = jwsChartSettings["type"],
      eventsArray = [
        "mousemove",
        "mouseout",
        "click",
        "touchstart",
        "touchmove"
      ],
      printVal = jwsChartSettings["printVal"],
      event =
        ("pie" == type || "doughnut" == type) && printVal ? false : eventsArray,
      jwsChartData = jwsChart.data("chart"),
      data = {
        labels: jwsChartSettings["xlabels"],
        datasets: []
      };
    function renderChart() {
      var ctx = document
          .getElementById(jwsChartSettings["chartId"])
          .getContext("2d");
        

        var globalOptions = {
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: type == "polarArea" ? 6 : 0
            }
          },
          events: event,
          animation: {
            duration: 500,
            easing: jwsChartSettings["easing"],
            onComplete: function() {
              if (!event) {
                this.defaultFontSize = 16;
                ctx.font =
                  '15px "Helvetica Neue", "Helvetica", "Arial", sans-serif';

                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";

                this.data.datasets.forEach(function(dataset) {
                  for (var i = 0; i < dataset.data.length; i++) {
                    var model =
                        dataset._meta[Object.keys(dataset._meta)[0]].data[i]
                          ._model,
                      total =
                        dataset._meta[Object.keys(dataset._meta)[0]].total,
                      mid_radius =
                        model.innerRadius +
                        (model.outerRadius - model.innerRadius) / 2,
                      start_angle = model.startAngle,
                      end_angle = model.endAngle,
                      mid_angle = start_angle + (end_angle - start_angle) / 2;

                    var x = mid_radius * Math.cos(mid_angle);
                    var y = mid_radius * Math.sin(mid_angle);

                    ctx.fillStyle = jwsChartSettings["yTicksCol"];
                    
                    var percent =
                      String(Math.round((dataset.data[i] / total) * 100)) + "%";

                    ctx.fillText(percent, model.x + x, model.y + y + 15);
                  }
                });
              }
            }
          },
          tooltips: {
            enabled: jwsChartSettings["enTooltips"],
            mode: jwsChartSettings["modTooltips"],
            callbacks: {
              label: function(tooltipItem, data) {
                var prefixString = "";
                if (
                  "pie" == type ||
                  "doughnut" == type ||
                  "polarArea" == type
                ) {
                  prefixString = data.labels[tooltipItem.index] + ": ";
                }
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(
                  previousValue,
                  currentValue
                ) {
                  return parseFloat(previousValue) + parseFloat(currentValue);
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = ((currentValue / total) * 100).toPrecision(3);
                return (
                  prefixString +
                  (jwsChartSettings["percentage"]
                    ? percentage + "%"
                    : currentValue)
                );
              }
            }
          },
          legend: {
            display: jwsChartSettings["legDis"],
            position: jwsChartSettings["legPos"],
            reverse: jwsChartSettings["legRev"],
            onClick: null,
            labels: {
              boxWidth: parseInt(jwsChartSettings["itemWid"]),
              fontColor: jwsChartSettings["legCol"],
              fontSize: parseInt(jwsChartSettings["legSize"]),
              fontFamily:jwsChartSettings["legFamily"],
              padding:20,
            }
          }
          
        };
        
        var multiScaleOptions = {
            scales: {
            xAxes: [
              {
                barPercentage: jwsChartSettings["xwidth"],
                display:
                  type == "radar" ||
                  type == "pie" ||
                  type == "polarArea" ||
                  type == "doughnut"
                    ? false
                    : true,
                gridLines: {
                  display: jwsChartSettings["xGrid"],
                  color: jwsChartSettings["xGridCol"],
                  lineWidth: jwsChartSettings["xGridWidth"],
                  drawBorder: true
                },
                scaleLabel: {
                  display: jwsChartSettings["xlabeldis"],
                  labelString: jwsChartSettings["xlabel"],
                  fontColor: jwsChartSettings["xlabelcol"],
                  fontSize: jwsChartSettings["xlabelsize"]
                },
                ticks: {
                  fontSize: jwsChartSettings["xTicksSize"],
                  fontColor: jwsChartSettings["xTicksCol"],
                  stepSize: jwsChartSettings["stepSize"],
                  maxRotation: jwsChartSettings["xTicksRot"],
                  minRotation: jwsChartSettings["xTicksRot"],
                  beginAtZero: jwsChartSettings["xTicksBeg"],
                  callback: function(tick) {
                    return tick.toLocaleString();
                  }
                }
              }
            ],
            yAxes: [
              {
                display:
                  type == "radar" ||
                  type == "pie" ||
                  type == "polarArea" ||
                  type == "doughnut"
                    ? false
                    : true,
                type: jwsChartSettings["yAxis"],
                gridLines: {
                  display: jwsChartSettings["yGrid"],
                  color: jwsChartSettings["yGridCol"],
                  lineWidth: jwsChartSettings["yGridWidth"],
                },
                scaleLabel: {
                  display: jwsChartSettings["ylabeldis"],
                  labelString: jwsChartSettings["ylabel"],
                  fontColor: jwsChartSettings["ylabelcol"],
                  fontSize: jwsChartSettings["ylabelsize"]
                },
                ticks: {
                    suggestedMin: jwsChartSettings["suggestedMin"],
                    suggestedMax: jwsChartSettings["suggestedMax"],
                    fontSize: jwsChartSettings["yTicksSize"],
                    fontColor: jwsChartSettings["yTicksCol"],
                    beginAtZero: jwsChartSettings["yTicksBeg"],
                    stepSize: jwsChartSettings["stepSize"],
                    callback: function(tick) {
                        return tick.toLocaleString();
                    }
                }
              }
            ]
          }
      };
      
        var singleScaleOptions = {
            scale: {
                ticks: {
                    beginAtZero: jwsChartSettings["yTicksBeg"],
                    stepSize: jwsChartSettings["stepSize"],
                    suggestedMax: jwsChartSettings["suggestedMax"]
                }
            }
        };

      var myChart = new Chart(ctx, {
        type: type,
        data: data,
        options: Object.assign( globalOptions, ( "radar" !== type && "polarArea" !== type ) ? multiScaleOptions : singleScaleOptions )
      });


      jwsChartData.forEach(function(element) {
        if (type !== "pie" && type !== "doughnut") {
          var gradient = ctx.createLinearGradient(0, 0, 0, 600),
            secondColor = element.backgroundColor[1]
              ? element.backgroundColor[1]
              : element.backgroundColor[0];
          gradient.addColorStop(0, element.backgroundColor[0]);
          gradient.addColorStop(1, secondColor);
          element.backgroundColor = gradient;
          element.hoverBackgroundColor = gradient;
        }
        data.datasets.push(element);
        myChart.update();
      });

      $("#" + jwsChartSettings["chartId"]).on("click", function(evt) {
        var activePoint = myChart.getElementAtEvent(evt);
        if (activePoint[0]) {
          var URL =
            myChart.data.datasets[activePoint[0]._datasetIndex].links[
              activePoint[0]._index
            ];
          if (URL != null && URL != "") {
            window.open(URL, jwsChartSettings["target"]);
          }
        }
      });
    }
    var $checkModal = $(jwsChart).closest(".jws-modal-box-modal");

    if ($checkModal.length) {
      renderChart();
    }
    var waypoint = new Waypoint({
      element: $( "#" + jwsChartSettings["chartId"] ),
      offset: Waypoint.viewportHeight() - 250,
      triggerOnce: true,
      handler: function() {
        renderChart();
        this.destroy();
      }
    });
  };
   /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * research_slider
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
   var research_slider = function($scope, $) {
      $scope.find('.jws-research_admissions-element').eq(0).each(function() {
        $(this).find('.jws_research_admissions_slider').not('.slick-initialized').slick({
          prevArrow: $(this).find('.nav_left'),
          nextArrow: $(this).find('.nav_right'),
        });
      });
    }   
    
    /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * before after
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */
   var before_after = function($scope, $) {
      $scope.find('.elementor-before_after').eq(0).each(function() {
          $(this).twentytwenty();  
      });
    }  
    
    
    
    var heading_svg = function($scope, $) {
      $scope.eq(0).each(function() {
        var $this = $(this);  
         $( document ).ready(function() {
            if($this.find('.svg-animation').length) {
           
                $this.find('.svg-animation').append('<svg class="animation_start" xmlns:svgjs="http://svgjs.com/svgjs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="SvgjsSvg1001" x="0px" y="0px" viewBox="0 0 288 288" style="enable-background:new 0 0 288 288;" xml:space="preserve"><style type="text/css">	.st0{fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-miterlimit:10;}</style><path class="st0" d="M233,70.2c-24.6-5.2-97.8-14.1-181.3,30.5c-20.8,11.1-52.3,37.5-48.5,63.7c6.5,44.4,121.3,74.7,210.3,40.2 c27.7-10.7,79.2-46.4,70.4-79.7c-8.2-31-72-52.4-151.7-45.2"></path></svg>');  
            }
 
        });
        
      });
    }  
    
    var scroll_add_class = function($scope, $) {
      $scope.eq(0).each(function() {
          var $this = $(this);  
          var svg = $(this).find('svg');  
          $(window).on('scroll load', function() {
            if($this.hasClass('svg-animation')) {
                $this.find('.svg_view').append('<h3>alo</h3>');
                
                if (svg.length && svg.isInViewport()) {
                    if(!svg.hasClass('animation_start')) {
                       svg.addClass('animation_start'); 
                    }
                }   
            } 
        });
        
        if($this.hasClass('svg-animation')) { 
            console.log(svg);
            window.clearTimeout();
               setTimeout(function(){svg.addClass("animation_hide");}, 4000);
               setTimeout(function(){svg.removeClass("animation_hide");}, 5000);
        }
        
      });
    }  
    
      var initSection = function ($obj) {
         var $container = $obj.children('.elementor-container'),
            dot_class =  $container.find('.slider-dots-box'),
            $events,
            current_side;
         if($container.hasClass('jws_section_slider')) {
            var item_length = $container.find('.elementor-top-column').length - 1;
            let blocked = false;
    		let blockTimeout = null;
    		let prevDeltaY = 0;
            $container.eq(0).each(function() {
                var $this = $(this);
                var verticalSwiping = false;
                var window_offset;
                if($container.hasClass('slick_wheel') ) {
                        slider_wheel();
                        $(window).scroll(function() {
                            window_offset = $container.offset().top - $(window).scrollTop();   
                            if(window_offset == 0){
                                $this.css('pointer-events','auto');
                            }
                        });  
                    
                    verticalSwiping = true;
                }
                
                var data_slick = $container.data('slick');
                
    			$this.not('.slick-initialized').slick({
    				prevArrow: $(this).find('.nav_left'),
                    nextArrow: $(this).find('.nav_right'),
    				swipeToSlide: true,
                    fade: false,
                    slide: '.elementor-element',
                    appendDots: dot_class,
    	            dotsClass: 'slider-dots',
                    verticalSwiping:verticalSwiping,
    			}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    current_side = $this.find("[data-slick-index='" +nextSlide+ "']");
                    $events = 'no';
                  section_change(current_side,$events);
                }).on('afterChange', function(event, slick, currentSlide){
                  current_side = $this.find("[data-slick-index='" +currentSlide+ "']");
                $events = 'next';
                section_change(current_side,$events);
                 if( item_length == currentSlide && $container.hasClass('slick_wheel') ){
                    if(!data_slick.infinite) {
                        $this.css('pointer-events','none');
                    }  
                };
   
                }).trigger('afterChange');  
                
                function slider_wheel() {
                    $this.on('mousewheel DOMMouseScroll wheel', (function(e) {
                       let deltaY = e.originalEvent.deltaY;
						e.preventDefault();
						e.stopPropagation();

						clearTimeout(blockTimeout);
						blockTimeout = setTimeout(function(){
							blocked = false;
						}, 50);
                    
                      if (deltaY > 0 && deltaY > prevDeltaY || deltaY < 0 && deltaY < prevDeltaY || !blocked) {
						blocked = true;
						prevDeltaY = deltaY;

						if (deltaY > 0) {
							$this.slick('slickNext');
						} else {
							$this.slick('slickPrev');
						}
					}
                    }));   
                }
    		}); 
            function section_change($slick,$events) {
                $slick.find('[data-element_type="widget"]').each(function() { 
                	var data = $(this).data('settings');
                    var $this = $(this);
                    if(data !== undefined) {
                        $this.addClass('has_animated'); 
                    }
                    if(data !== undefined && data._animation_delay !== undefined) {
                       if($events == 'next') {
                        setTimeout(function(){
                           $this.addClass('animated');
                          $this.addClass(data._animation);
                       },data._animation_delay);  ;   
                       }else {
                             $this.removeClass('animated');
                             $this.removeClass(data._animation);
                       } 
                    }else if(data !== undefined) {
                       if($events == 'next') {
                        setTimeout(function(){
                           $this.addClass('animated');
                          $this.addClass(data._animation);
                       },0);  
                       }else {
                             $this.removeClass('animated');
                             $this.removeClass(data._animation);
                       }  
                    }
            	});
            }
         }
    }
    
    
    
    // Make sure you run this code under Elementor..
    
    $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction( 'frontend/element_ready/section', function( $element ) {
       initSection($element);
    });    
    var widgets = {
      'jws_video_popup.default': video_popup,
      'jws_testimonial_slider.default': testimonials_slider,
      'jws_blog.default': [blogLoadMore,blog_filter],
      'jws_job.default': job_filter,
      'jws_tab.default': jws_tabs,
      'jws_map.default': WidgetjwsGoogleMapHandler,
      'jws_services.default': services_slider,
      'jws_team.default': jws_team,
      'jws_project.default' :[project_filter] ,
      'jws_search.default' :search,
      'jws_progress.default' :[jws_process_slider,jws_process_tabs,jws_process_hover], 
      'jws_studies.default' :[studies_filter,studies_slider,studiesLoadMore],
      'jws_timeline.default' :timeline,
      'jws_table.default' : jws_table,
      'jws_menu_nav.default' : jws_menu_style, 
      'jws_wishlist.default' : jws_wishlist, 
      'jws-avenchart.default': [jwsChartHandler], 
      'jws_gallery.default' : jws_gallery,
      'jws_events.default' : event,
      'jws_research_admissions.default': [research_slider],
      'jws_demo.default': [demo_filter],
      'jws_album.default': [album,albumLoadMore],
      'jws_brand_slider.default': [jws_brand],
      'jws_instagram.default': [instagram],
      'jws_before_after.default': [before_after],
      'jws_expert_doctors.default': [doctor_filter],
      'jws_space_location.default': [space_location_slider], 
      'jws_destination_tabs.default': [destination_tabs], 
      'jws_destination.default': [destinationLoadMore], 
      'jws_model.default': [model_idol], 
      'heading.default':[heading_svg],
      'jws_widget_countdown.default':[countdown], 
      'jws_nft_artists.default':[nft_artists], 
      'jws-product-advanced.default': [product_tabs_filter],
      
    };
    $.each(widgets, function(widget, callback) {
      if ('object' === typeof callback) {
        $.each(callback, function(index, cb) {
          elementorFrontend.hooks.addAction('frontend/element_ready/' + widget, cb);
        });
      } else {
        elementorFrontend.hooks.addAction('frontend/element_ready/' + widget, callback);
      }
    });
  });
})(jQuery);