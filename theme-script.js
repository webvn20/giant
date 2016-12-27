(function($){
	"use strict"; // Start of use strict
	/* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */

	$(window).load(function() {
		// auto width megamenu
		auto_width_megamenu();
		resizeTopmenu();
		js_height_full();
	});
	/* ---------------------------------------------
     Scripts ready
     --------------------------------------------- */
	$(document).ready(function() {
		t.init();
		js_height_full();

		if($('.parallax').length >0){
			$('.parallax').each(function(){
				$(this).parallax("50%",0.1);
			})  
		}
		$('[data-toggle="tooltip"]').tooltip();
		/* Resize top menu*/
		resizeTopmenu();
		$('.user-info .current-open').click(function(){
			$(this).parent().toggleClass('open');			
		});
		/* Zoom image */
		if($('#product-zoom').length >0){
			$('#product-zoom').elevateZoom({
				zoomType: "inner",
				cursor: "crosshair",
				zoomWindowFadeIn: 500,
				zoomWindowFadeOut: 750,
				gallery:'gallery_01'
			}); 
		}

		/* Popup sizechart */
		if($('#size_chart').length >0){
			$('#size_chart').fancybox();
		}

		/** OWL CAROUSEL**/
		$(".owl-carousel").each(function(index, el) {
			var config = $(this).data();
			config.navText = ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'];
			config.smartSpeed="300";
			if($(this).hasClass('owl-style2')){
				config.animateOut="fadeOut";
				config.animateIn="fadeIn";    
			}
			$(this).owlCarousel(config);
		});

		$(".owl-carousel-vertical").each(function(index, el) {
			var config = $(this).data();
			config.navText = ['<span class="icon-up"></spam>','<span class="icon-down"></span>'];
			config.smartSpeed="900";
			config.animateOut="";
			config.animateIn="fadeInUp";
			$(this).owlCarousel(config);
		});

		/* Close top banner*/
		$(document).on('click','.btn-close',function(){
			$(this).closest('.top-banner').animate({ height: 0, opacity: 0 },1000);
			return false;
		})
		/** SELECT CATEGORY **/
		$('.select-category').select2();
		/* Toggle nav menu*/
		$('.toggle-menu').on('click',function(){
			$(this).closest('.nav-menu').find('.navbar-collapse').toggle();
			return false;
		})
		/** HOME SLIDE**/
		if($('#home-slider').length >0 && $('#contenhomeslider').length >0){
			var slider = $('#contenhomeslider').bxSlider(
				{
					nextText:'<i class="fa fa-angle-right"></i>',
					prevText:'<i class="fa fa-angle-left"></i>',
					auto: true,
				}

			);
		}
		/** Custom page sider**/
		if($('#home-slider').length >0 && $('#contenhomeslider-customPage').length >0){
			var slider = $('#contenhomeslider-customPage').bxSlider(
				{
					nextText:'<i class="fa fa-angle-right"></i>',
					prevText:'<i class="fa fa-angle-left"></i>',
					auto: true,
					pagerCustom: '#bx-pager',
					nextSelector: '#bx-next',
					prevSelector: '#bx-prev',
				}

			);
		}

		if($('#home-slider').length >0 && $('#slide-background').length >0){
			var slider = $('#slide-background').bxSlider(
				{
					nextText:'<i class="fa fa-angle-right"></i>',
					prevText:'<i class="fa fa-angle-left"></i>',
					auto: true,
					onSlideNext: function ($slideElement, oldIndex, newIndex) {
						var corlor = $($slideElement).data('background');   
						$('#home-slider').css('background',corlor);     
					},
					onSlidePrev: function ($slideElement, oldIndex, newIndex) {
						var corlor = $($slideElement).data('background');   
						$('#home-slider').css('background',corlor);     
					}
				}

			);
			//slider.goToNextSlide();
		}

		/* elevator click*/ 
		$(document).on('click','a.btn-elevator',function(e){
			e.preventDefault();
			var target = this.hash;
			if($(document).find(target).length <=0){
				return false;
			}
			var $target = $(target);
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top-50
			}, 500);
			return false;
		})
		/* scroll top */ 
		$(document).on('click','.scroll_top',function(){
			$('body,html').animate({scrollTop:0},400);
			return false;
		})
		/** #brand-showcase */
		$(document).on('click','.brand-showcase-logo li',function(){
			var id = $(this).data('tab');
			$(this).closest('.brand-showcase-logo').find('li').each(function(){
				$(this).removeClass('active');
			});
			$(this).closest('li').addClass('active');
			$('.brand-showcase-content').find('.brand-showcase-content-tab').each(function(){
				$(this).removeClass('active');
			})
			$('#'+id).addClass('active');
			return false;
		})

		/** ALL CAT **/
		$(document).on('click','.open-cate',function(){
			$(this).closest('.vertical-menu-content').find('li.cat-link-orther').each(function(){
				$(this).slideDown();
			});
			$(this).addClass('colse-cate').removeClass('open-cate').html('Close');
		})
		/* Close category */
		$(document).on('click','.colse-cate',function(){
			$(this).closest('.vertical-menu-content').find('li.cat-link-orther').each(function(){
				$(this).slideUp();
			});
			$(this).addClass('open-cate').removeClass('colse-cate').html('All Categories');
			return false;
		})
		// bar ontop click
		$(document).on('click','.vertical-megamenus-ontop-bar',function(){
			$('#vertical-megamenus-ontop').find('.box-vertical-megamenus').slideToggle();
			$('#vertical-megamenus-ontop').toggleClass('active');
			return false;
		})
		// View grid list product 
		$(document).on('click','.display-product-option .view-as-grid',function(){
			$(this).closest('.display-product-option').find('li').removeClass('selected');
			$(this).addClass('selected');
			$(this).closest('#view-product-list').find('.product-list').removeClass('list').addClass('grid');
			return false;
		})
		// View list list product 
		$(document).on('click','.display-product-option .view-as-list',function(){
			$(this).closest('.display-product-option').find('li').removeClass('selected');
			$(this).addClass('selected');
			$(this).closest('#view-product-list').find('.product-list').removeClass('grid').addClass('list');
			return false;
		})
		/// tre menu category
		$("ul.tree-menu, .main-nav-mobile").accordion({
			accordion: false,
			speed: 300

		});


		
		/* Open menu on mobile */
		$(document).on('click','.btn-open-mobile',function(){
			/*console.log('click');
            var width = $(window).width();
            if(width >1024){
                if($('body').hasClass('home')){
                    if($('#nav-top-menu').hasClass('nav-ontop')){

                    }else{

                        return false;
                    }
                }
            }*/
			$(this).closest('.box-vertical-megamenus').find('.vertical-menu-content').slideToggle();
			$(this).closest('.title').toggleClass('active');
			return false;
		})

		/* Close vertical */
		$(document).on('click','*',function(e){
			var container = $("#box-vertical-megamenus");
			if (!container.is(e.target) && container.has(e.target).length === 0){
				if($('body').hasClass('home')){
					if($('#nav-top-menu').hasClass('nav-ontop')){
					}else{
						return;
					}
				}
				container.find('.vertical-menu-content').hide();
				container.find('.title').removeClass('active');
			}
		})




		// Poppup video
		if( $('.video-btn').length > 0){
			$('.video-btn').fancybox();
		}
		// Open form search in header 10
		$(document).on('click','.form-search .icon',function(){
			$(this).closest('.form-search').find('.form-search-inner').fadeIn(600);
			$(this).closest('.form-search').find('.form-search-inner .input-serach input').focus();
		})
		/* Close form search in header 10*/
		$(document).on('click','*',function(e){
			var container = $(".form-search");
			var icon = $(".form-search .icon");
			if (!container.is(e.target) && container.has(e.target).length === 0 && !icon.is(e.target) && icon.has(e.target).length === 0){
				container.find('.form-search-inner').fadeOut(600);
			}
		})

		//SLIDE FULL SCREEN
		var slideSection = $(".slide-fullscreen .item-slide");
		slideSection.each(function(){
			if ($(this).attr("data-background")){
				$(this).css("background-image", "url(" + $(this).data("background") + ")");
			}
		});
	});
	/* ---------------------------------------------
     Scripts resize
     --------------------------------------------- */
	$(window).resize(function(){
		// auto width megamenu
		auto_width_megamenu();
		// Remove menu ontop
		remove_menu_ontop();
		// resize top menu
		resizeTopmenu();
		js_height_full();
	});
	/* ---------------------------------------------
     Scripts scroll
     --------------------------------------------- */
	$(window).scroll(function(){
		resizeTopmenu();
		/* Show hide scrolltop button */
		if( $(window).scrollTop() == 0 ) {
			$('.scroll_top').stop(false,true).fadeOut(600);
		}else{
			$('.scroll_top').stop(false,true).fadeIn(600);
		}
		/* Main menu on top */
		var h = $(window).scrollTop();
		var max_h = $('#header').height() + $('#top-banner').height();
		var width = $(window).width();
		if(width > 767){
			if( h > (max_h + vertical_menu_height)-50){
				// fix top menu
				$('#nav-top-menu').addClass('nav-ontop');
				//$('#nav-top-menu').find('.vertical-menu-content').hide();
				//$('#nav-top-menu').find('.title').removeClass('active');
				// add cart box on top menu
				$('#cart-block .cart-block').appendTo('#shopping-cart-box-ontop .shopping-cart-box-ontop-content');
				$('#shopping-cart-box-ontop').fadeIn();
				$('#user-info-top').appendTo('#user-info-opntop');
				$('#header .header-search-box form').appendTo('#form-search-opntop');
			}else{
				$('#nav-top-menu').removeClass('nav-ontop');
				if($('body').hasClass('home')){
					$('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
					if(width > 1024)
						$('#nav-top-menu').find('.vertical-menu-content').show();
					else{
						$('#nav-top-menu').find('.vertical-menu-content').hide();
					}
					$('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
				}
				///
				$('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
				$('#shopping-cart-box-ontop').fadeOut();
				$('#user-info-opntop #user-info-top').appendTo('.top-header .container');
				$('#form-search-opntop form').appendTo('#header .header-search-box');
			}
		}
	});
	var vertical_menu_height = $('#box-vertical-megamenus .box-vertical-megamenus').innerHeight();
	/**==============================
    ***  Auto width megamenu
    ===============================**/

	function auto_width_megamenu(){
		var full_width = parseInt($('.container').innerWidth());
		//full_width = $( document ).width();
		var menu_width = parseInt($('.vertical-menu-content').actual('width'));
		$('.vertical-menu-content').find('.vertical-dropdown-menu').each(function(){
			$(this).width((full_width - menu_width)-2);
		});
	}
	/**==============================
    ***  Remove menu on top
    ===============================**/
	function remove_menu_ontop(){
		var width = parseInt($(window).width());
		if(width < 768){
			$('#nav-top-menu').removeClass('nav-ontop');
			if($('body').hasClass('home')){
				if(width > 1024)
					$('#nav-top-menu').find('.vertical-menu-content').show();
				else{
					$('#nav-top-menu').find('.vertical-menu-content').hide();
				}
			}
			///
			$('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
			$('#shopping-cart-box-ontop').fadeOut();
			$('#user-info-opntop #user-info-top').appendTo('.top-header .container');
			$('#form-search-opntop form').appendTo('#header .header-search-box');
		}
	}
	/* Top menu*/
	function scrollCompensate(){
		var inner = document.createElement('p');
		inner.style.width = "100%";
		inner.style.height = "200px";
		var outer = document.createElement('div');
		outer.style.position = "absolute";
		outer.style.top = "0px";
		outer.style.left = "0px";
		outer.style.visibility = "hidden";
		outer.style.width = "200px";
		outer.style.height = "150px";
		outer.style.overflow = "hidden";
		outer.appendChild(inner);
		document.body.appendChild(outer);
		var w1 = parseInt(inner.offsetWidth);
		outer.style.overflow = 'scroll';
		var w2 = parseInt(inner.offsetWidth);
		if (w1 == w2) w2 = outer.clientWidth;
		document.body.removeChild(outer);
		return (w1 - w2);
	}

	function resizeTopmenu(){
		if($(window).width() + scrollCompensate() >= 768){
			var main_menu_w = $('#main-menu .navbar').innerWidth();

			if($('#main-menu').hasClass('menu-option9') || $('#main-menu').hasClass('menu-option10') || $('#main-menu').hasClass('menu-option11')){
				return false;
			}

			$("#main-menu ul.mega_dropdown").each(function(){
				var menu_width = $(this).innerWidth();
				var offset_left = $(this).position().left;
				if(menu_width > main_menu_w){
					$(this).css('width',main_menu_w+'px');
					$(this).css('left','0');
				}else{
					if((menu_width + offset_left) > main_menu_w){
						var t = main_menu_w-menu_width;
						var left = parseInt((t/2));
						$(this).css('left',left);
					}
				}
			});
		}

		if($(window).width()+scrollCompensate() >= 1025){
			$("#main-menu li.dropdown >a").removeAttr('data-toggle');        
		}
	}
	/* ---------------------------------------------
     Height Full
     --------------------------------------------- */
	function js_height_full(){
		(function($){
			var heightSlide = $(window).outerHeight();
			$(".full-height").css("height",heightSlide);
		})(jQuery);
	}
	var t = {
		timeout: null,
		init: function() {
			this.initAddToCart();
			this.initDropDownCart();

		},

		initAddToCart: function() {
			if ($(".add-to-cart-btn").length > 0) {
				$(".add-to-cart-btn").click(function(n) {
					n.preventDefault();
					if ($(this).attr("disabled") != "disabled") {
						var r = $(this).parents(".product-container");
						var i = $(r).attr("id");
						i = i.match(/\d+/g);		

						var s = $("#product-actions-" + i + " select[name=id]").val();
						if (!s) {
							s = $("#product-actions-" + i + " input[name=id]").val();
						}

						var o = $("#product-actions-" + i + " input[name=quantity]").val();
						if (!o) {
							o = 1
						}

						var u = $(r).find(".product-name").text();
						var a = $(r).find(".left-block .img-responsive").attr("src");
						t.doAjaxAddToCart(s, o, u, a)					
					}
					return false
				})
			}
		},
		doAjaxAddToCart: function(n, r, i, s) {
			$.ajax({
				type: "post",
				url: "/cart/add.js",
				data: "quantity=" + r + "&variantId=" + n,
				dataType: "json",			
				success: function(n) {
					$(".ajax-success-modal").find(".ajax-product-title").text(i);
					$(".ajax-success-modal").find(".ajax-product-image").attr("src", s);

					$(".ajax-success-modal").find(".btn-go-to-cart").show();
					$(".ajax-success-modal").fadeIn(300);
					t.timeout = setTimeout(function() {
						$(".ajax-success-modal").fadeOut(300)
					}, 5e3);
					t.CloseAjaxModal(".ajax-success-modal");
					t.updateDropdownCart()
				},
				error: function(n, r) {
					console.log('FAIL');
					$(".ajax-error-message").text($.parseJSON(n.responseText).description);

				}
			})
		},
		CloseAjaxModal: function(n) {
			$(".close-modal, .overlay").click(function() {
				clearTimeout(t.timeout);
				$(n).fadeOut(500)
			});	
		},
		updateDropdownCart: function() {
			Bizweb.getCart(function(e) {
				t.doUpdateDropdownCart(e)
			})
		},
		doUpdateDropdownCart: function(n) {
			var r = '<li class="product-info" id="cart-{ID}"><div class="p-left"><a href="javascript:;" class="remove_link"></a><a href="{URL}"><img class="img-responsive" src="{IMAGE}" alt="{TITLE}"></a></div><div class="p-right"><p class="p-name">{TITLE}</p><p class="p-rice">{PRICE}</p><p>SL: {QUANTITY}</p></div></li>';

			$(".cartCount").text(n.item_count);			
			$("#header .toal-cart .toal-price, #dropcart_total_price").html(Bizweb.formatMoney(n.total_price, window.money_format));

			$(".cart-block-list ul").html("");
			if (n.item_count > 0) {
				for (var i = 0; i < n.items.length; i++) {
					var s = r;
					s = s.replace(/\{ID\}/g, n.items[i].variant_id);
					s = s.replace(/\{URL\}/g, n.items[i].url);
					s = s.replace(/\{TITLE\}/g, n.items[i].name);			
					s = s.replace(/\{QUANTITY\}/g, n.items[i].quantity);
					s = s.replace(/\{IMAGE\}/g, Bizweb.resizeImage(n.items[i].image, "small"));
					s = s.replace(/\{PRICE\}/g, Bizweb.formatMoney(n.items[i].price, window.money_format));
					console.log(s);
					$(".cart-block-list ul").append(s)
				}
				$(".product-info .remove_link").click(function(n) {
					n.preventDefault();
					var r = $(this).parents(".product-info").attr("id");
					r = r.match(/\d+/g);
					Bizweb.removeItem(r, function(e) {
						t.doUpdateDropdownCart(e)
					})
				});

			}
			t.checkItemsInDropdownCart()
		},
		checkItemsInDropdownCart: function() {
			if ($(".cart-block-list ul").children().length > 0) {
				$(".cart-block .no-item").hide();
				$(".cart-block .has-item").show()
			} else {
				$(".cart-block .has-item").hide();
				$(".cart-block .no-item").show()
			}
		},
		initDropDownCart: function() {
			t.checkItemsInDropdownCart();           
			$(".product-info .remove_link").click(function(n) {
				n.preventDefault();
				var r = $(this).parents(".product-info").attr("id");
				r = r.match(/\d+/g);
				Bizweb.removeItem(r, function(e) {
					t.doUpdateDropdownCart(e)
				})
			})
		}

	}
	})(jQuery); // End of use strict