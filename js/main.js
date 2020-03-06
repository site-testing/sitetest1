$(function(){

	var n=0;
	var count=3;

	setTimeout(function(){
		$(".keyvisual li").eq(n).addClass("current");
		$(".pagination li").eq(n).addClass("current");

		$("body, html").animate({scrollTop : 0}, 800);
	},150);

	// gnb hover
	$(".gnb > li").hover(
		function(){
			$(this).parent().addClass("active");
			$(".upper").addClass("active");
			$(".upper .logo a").addClass("active");
			$(".gnb > li > a").addClass("active");
		},
		function(){
			$(this).parent().removeClass("active");
			$(".upper").removeClass("active");
			$(".upper .logo a").removeClass("active");
			$(".gnb > li > a").removeClass("active");
		}
	);
	// gnb focus
	$(".gnb > li > a").focusin(function(){
		$(".gnb").addClass("active");
		$(".upper").addClass("active");
		$(".upper .logo a").addClass("active");
		$(".gnb > li > a").addClass("active");
	});
	$(".gnb li:last-child .lnb li:last-child a").focusout(function(){
		$(".gnb").removeClass("active");
		$(".upper").removeClass("active");
		$(".upper .logo a").removeClass("active");
		$(".gnb > li > a").removeClass("active");
	});

	// login_menu focus
	$(".login_menu li a").focusin(function(){
		$(".login_menu").addClass("active");
	});
	$(".login_menu li:last-child a").focusout(function(){
		$(".login_menu").removeClass("active");
	});


	// mobile_tab
	$(".mobile_tab").click(function(e){
		e.preventDefault();
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(".mobile_menu").removeClass("active");
			$(".mobile_dim").removeClass("on");
			$(".wrapper").off("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll");
		}else{
			$(this).addClass("on");
			$(".mobile_menu").addClass("active");
			$(".mobile_dim").addClass("on");
			fixedScroll();
		}
	});
	$(".mobile_dim").click(function(){
		$(".mobile_menu").removeClass("active");
		$(".mobile_tab").removeClass("on");
		$(this).removeClass("on");
		$(".wrapper").off("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll");
	});


	// mobile_gnb click
	$(".mobile_gnb > li > a").click(function(e){
		e.preventDefault();
			if($(this).next(".lnb").css("display") == "none"){
				$(".mobile_gnb .lnb").slideUp(300);
				$(this).next(".lnb").slideDown(300);
			}else{
				$(this).next(".lnb").slideUp(300);
			}
	});

	// // mobile_menu focus
	// $(".mobile_gnb > li > a").focusin(function(){
	// 	$(this).next(".lnb").slideDown(300);
	// });
	// $(".lnb li:last-child a").focusout(function(){
	// 	$(".lnb").slideUp(300);
	// });


	// gellery, pagination, direction navigation
	function intervalMoving(){
		if(n < (count-1)){
			n=n+1;
		}else{
			n=0;
		}
		$(".keyvisual li.current").removeClass("current");
		$(".keyvisual li").eq(n).addClass("current");
		$(".pagination li.current").removeClass("current");
		$(".pagination li").eq(n).addClass("current");
	}

	var id=setInterval(intervalMoving, 10000);

	$(".pagination a").click(function(e){
		e.preventDefault();
		var index=$(this).parent().index();
		console.log(index); // 0, 1, 2

		if(n !== index){ // 0 = 0, 0x=1, 2
			n=index;
			$(".keyvisual li.current").removeClass("current");
			$(".keyvisual li").eq(n).addClass("current");
			$(".pagination li.current").removeClass("current");
			$(".pagination li").eq(n).addClass("current");
		}
	});
	$(".direction_nav .btn_prev").click(function(e){
		e.preventDefault();

		if(n > 0){
			n=n-1;
			$(".keyvisual li.current").removeClass("current");
			$(".keyvisual li").eq(n).addClass("current");
			$(".pagination li.current").removeClass("current");
			$(".pagination li").eq(n).addClass("current");
		}
	});
	$(".direction_nav .btn_next").click(function(e){
		e.preventDefault();

		if(n < (count-1)){
			n=n+1;
			$(".keyvisual li.current").removeClass("current");
			$(".keyvisual li").eq(n).addClass("current");
			$(".pagination li.current").removeClass("current");
			$(".pagination li").eq(n).addClass("current");
		}
	});


	// clearInterval
	$(".pagination a").hover(
		function(){
			clearInterval(id);
		},
		function(){
			id=setInterval(intervalMoving, 10000)
		}
	);

	// fixedScroll function
	function fixedScroll(){
		$(".wrapper").on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e){
			e.preventDefault();
			return false;
		});
	}

	// popup
	$(".login_menu li, .mobile_login li").click(function(e){
		e.preventDefault();
		$(".popup").show();
		$(".dim").addClass("on");
		$(".login_menu").removeClass("active");
		fixedScroll();

	});
	$(".popup .pop_close").click(function(e){
		e.preventDefault();
		$(".popup").hide();
		$(".dim").removeClass("on");
		$(".wrapper").off("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll");
	});



	var d;
	var str="";

	// language select
	$(".lang_select dt a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).parent().next().slideToggle(300);
	});

	$(".lang_select dd a").click(function(e){
		e.preventDefault();

		d=$(this).parent().index();
		$(".lang_select select option").eq(d).prop("selected", true);

		str=$(this).text();
		$(".lang_select dt a").html('<span class="flag ' + str + '"></span>' + str + '<span class="toggle_arrow"></span>');
		$(this).parents("dd").slideUp(300);
		$(".lang_select dt a").removeClass("active");
	});

	var n1=0;
	var total;
	var w;
	var skinW;

	// skin_gallery
 	$(".skin_gallery_btn .btn_next").click(function(e){
		e.preventDefault();

		if(n1 < total){
			n1=n1+1;
		}
		distance=(skinW*n1)*(-1);
		$(".skin_gallery ul").css({left:distance});
	});
	$(".skin_gallery_btn .btn_prev").click(function(e){
		e.preventDefault();
		if(n1 > 0){
			n1=n1-1;
		}

		distance=(skinW*n1)*(-1);
		$(".skin_gallery ul").css({left:distance});
	});

	// resize : skin_gallery, mobile_gnb
	$(window).resize(function(){
		w=$(this).width();
		skinW=$(".skin_gallery li").width();
		// console.log("w:" + w);
		$(".skin_gallery ul").css({left:0});
		n1=0;

		if(w <= 570){
			total=8;
		}else if(w <= 820){
			total=7;
		}else if(w <= 970){
			total=6;
		}else if(w <= 1220){
			total=5;
		}else{
			total=4;
		}
		if(w <= 767){
			status="mobile";
			$(".skin_gallery_btn > .btn_prev").addClass("mobile");
			$(".skin_gallery_btn > .btn_next").addClass("mobile");
		}else if(w <= 1100) {
			status="tablet";
			$(".homme_list").addClass("mobile");
		}else{
			statue="pc";
			$(".skin_gallery_btn > .btn_prev").removeClass("mobile");
			$(".skin_gallery_btn > .btn_next").removeClass("mobile");
			$(".homme_list").removeClass("mobile");
			if($(".mobile_menu").hasClass("active") == true){
				$(".mobile_tab").removeClass("on");
				$(".mobile_menu").removeClass("active");
				$(".mobile_gnb .lnb").css({"display":"none"});
				$(".mobile_dim").removeClass("on");
			}
		}
	});
	$(window).trigger("resize");


	// brandstory
	$(".brandbox2").hover(
		function(){
			$(this).find("img").attr("src", "images/brand2_hover.jpg");
			$(this).find(".more").addClass("active");
		},
		function(){
			$(this).find("img").attr("src", "images/brand2.jpg");
			$(this).find(".more").removeClass("active");
		}
	);
	$(".brandbox3").hover(
		function(){
			$(this).find("img").attr("src", "images/brand3_hover.jpg");
			$(this).find(".more").addClass("active");
		},
		function(){
			$(this).find("img").attr("src", "images/brand3.jpg");
			$(this).find(".more").removeClass("active");
		}
	);

	var t;
	var topT;
	var h=0;
	var pos;

	// btn_bottom click
	$(".btn_bottom").click(function(e){
		e.preventDefault();
		h=h+1;
		if(h <= 4){
			if(h != 4){
				pos=($("#page" + h).offset().top - 70 + "px");
				$("body, html").animate({scrollTop : pos}, 800);
			}else{
				$("body, html").animate({scrollTop : $(document).height()}, 800, function(){
					$(".btn_bottom").addClass("up");
				});
			}
		}else{
			$("body, html").animate({scrollTop : 0}, 800);
			$(".btn_bottom").removeClass("up", "active");
			h=0;
		}
	});

	// window scroll
	$(window).scroll(function(){
		t=$(window).scrollTop();
		if(t < 500){
			$(".upper").removeClass("fixed");
			$(".mobile_menu").removeClass("fixed");
			$(".mobile_tab").removeClass("fixed");
		}else{
			$(".upper").addClass("fixed");
			$(".mobile_menu").addClass("fixed");
			$(".mobile_tab").addClass("fixed");
		}

		if(t <= $("#header").offset().top){
			$(".makeup_list ul li").removeClass("active");
			h=0;
		}
 		else if(t <= $("#page1").offset().top){
			$(".makeup_list li").addClass("active");
			h=1;
		}
		else if(t <= $("#page2").offset().top){
			$(".skin_gallery ul li").addClass("active");
			h=2;
		}
		else if(t <= $("#page3").offset().top){
			$(".homme_list li").addClass("active");
			h=3;
		}
		else if(t <= $("#page4").offset().top){
			$(".brandbox1").addClass("active");
			h=4;
		}

		topT=($(document).height()-$(window).height()-$("footer").height());
		if(t <= 0){
			$(".btn_bottom").removeClass("active");
			$(".btn_bottom").removeClass("up");
		}
		else if(t <= topT){
			$(".btn_bottom").addClass("active");
		}else{
			$(".btn_bottom").removeClass("active");
			$(".btn_bottom").addClass("up");
		}
	});
	$(window).trigger("scroll");

	var agent=navigator.userAgent;
	agent=agent.toLowerCase();
	var i;

	if(agent.indexOf("iphone") != -1){
		for(var i=0; i<3; i++){
			$(".keyvisual li").eq(i).html('<img src="images/keyvisual'+(i+1)+'_mobile.jpg" alt="모바일 헤라 메인 페이지'+(i+1)+'">')
		}
	}else{
		// console.log("not mobile");
	}


});
