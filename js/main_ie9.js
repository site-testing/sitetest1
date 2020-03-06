$(function(){
	var n=0;
	var count=3;

	setTimeout(function(){
		$(".keyvisual li").eq(n).addClass("current");
		$(".pagination li").eq(n).addClass("current");

		$("body, html").animate({scrollTop : 0}, 800);
	},150);

	// gnb hover

	$(".gnb > ul > li").mouseenter(function(){
			$(".gnb > ul"). stop().animate({height: "300px"});
			$(".upper").addClass("active").stop().animate({height: "310px"},400);
			$(".upper .logo a").addClass("active");
			$(".gnb > ul > li > a").addClass("active");
		});

	$(".gnb > ul > li").mouseleave(function(){
			$(".gnb > ul").stop().animate({height:"70px"});
			$(".upper").stop().animate({height: "70px"}, 1000).removeClass("active");
			$(".upper .logo a").removeClass("active");
			$(".gnb > ul > li > a").removeClass("active");
		});



	// popup
	function fixedScroll(){
		$(document).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e){
			e.preventDefault();
			return false;
		});
	}

	$(".social li").click(function(e){
		e.preventDefault();
		$(".popup").show();
		$(".dim").addClass("on");
		fixedScroll();
	});
	$(".popup .close").click(function(e){
		e.preventDefault();
		$(".popup").hide();
		$(".dim").removeClass("on");
		$(document).off("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll");
	});

	// select
	var d;
	var str="";

	$(".select dt a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).parent().next().slideToggle(300);
	});
	$(".select dd a").click(function(e){
		e.preventDefault();

		d=$(this).parent().index();
		$("select option").eq(d).prop("selected", true);
		str=$(this).text();
		$(".select dt a").html(str+'<span class="direc"></span>');
		$(this).parents("dd").slideUp(300);
		$(".select dt a").removeClass("active");
	});

	// keyvisyual

	function galleryActive(){ // 사용자 함수로 코드를 적약시킬 수 있습니다.
		$(".keyvisual li").animate({opacity : 0}, 600, function(){
			$(".keyvisual li").removeClass("current");
		});
		$(".keyvisual li").eq(n).animate({opacity : 1}, 600, function(){
			$(this).addClass("current");
		});
		$(".pagination li.current").removeClass("current");
		$(".pagination li").eq(n).addClass("current");
	}
	galleryActive();

	function intervalMoving(){
		if(n < (count-1)){
			n=n+1;
		}else{
			n=0;
		}
		galleryActive();
	}

	var id=setInterval(intervalMoving, 40000);

	// direction navigation
	$(".prev_contents").click(function(e){
		e.preventDefault();

		if(n > 0){ // 0, 1, 2, 3
			n=n-1;
			galleryActive();
		}
	});
	$(".next_contents").click(function(e){
		e.preventDefault();

		if(n < (count-1)){ // 0, 1, 2, 3
			n=n+1;
			galleryActive();
		}
	});
	// btn_bottom click
	var pos;
	var h=0;
	$(".btn_bottom").click(function(e){
		e.preventDefault();
		$(this).addClass("active");

		h=h+1;
		console.log("h :" + h);

		if (h <= 4){
			pos=$("#page" + h).offset().top;
			$("body, html").animate({scrollTop : pos}, 800, function(){
				if(pos >= $("#page4").offset().top){
					$(".btn_bottom").addClass("up");
				}
			});
		}
		else {
			$("body, html").animate({scrollTop : 0}, 800);
			$(".btn_bottom").removeClass("up");
			$(".btn_bottom").removeClass("active");
		}
	});

	// pagination
	$(".pagination a").click(function(e){
		e.preventDefault();
		var index=$(this).parent().index();

		if(n != index){
			n=index;
			$(".keyvisual li.current").removeClass("current");
			$(".keyvisual li").eq(n).addClass("current");
			$(".pagination li.current").removeClass("current");
			$(".pagination li").eq(n).addClass("current");
		}
	});

	// clearinterval
	$(".left, .right, .pagination a").hover(
		function(){
			clearInterval(id);
		},
		function(){
			id=setInterval(intervalMoving, 5000);
		}
	);

	 //mousewheel
	 var moving=false;
	 var scrollTop;
	
	 $("body, html").mousewheel(function(e, delta){
	 	scrollTop=$(window).scrollTop();
	
	 	if(!moving){
	 		if(delta < 0){
	 			if(scrollTop < $("section").eq(0).offset().top){
	 				moving=true;
	 				$("body").animate({scrollTop:$("#page1").offset().top}, 700, function(){
	 					moving=false;
	 				});
	 			}
	 		}else if(delta > 0){
	 			if(scrollTop < $("section").eq(1).offset().top){
	 				moving=true;
	 				$("body").animate({scrollTop:0}, 700, function(){
	 					moving=false;
	 				});
	 			}
	 		}
	 	}
	 });


	// skin care 갤러리
	var total;
	var w;
	var bestW;
	var distance;
	var n1=0;

	$(".control_btn .next").click(function(e){
		e.preventDefault();

		if(n1 < total){
			n1=n1+1;
		}
		distance=(bestW*n1)*(-1);
		$(".skincare_list ul").css({left:distance});
	});
	$(".control_btn .prev").click(function(e){
		e.preventDefault();

		if(n1 > 0){
			n1=n1-1;
		}
		distance=(bestW*n1)*(-1);
		$(".skincare_list ul").css({left:distance});
	});

	$(window).resize(function(){
		setTimeout(function(){
			w=$(this).width();
			bestW=$(".skincare_list li").width();
			$(".skincare_list ul").css({left:0});
			n1=0;

			if(w <= 562){
				total=8;
			}else if(w <= 870){
				total=7;
			}else if(w <= 980){
				total=6;
			}else if(w <= 1100){
				total=5;
			}else{
				total=4;
			}
			console.log("w:" + w);
			if(w <= 854){
				status="mobile";
			}else{
				status="pc";
				if($(".mobile_gnb").hasClass("active") == true){
					$(".mobile_tab a").removeClass("active");
					$(".mobile_gnb").removeClass("active");
					$(".mobile_gnb .sub").css({"display":"none"});
					$(".transparency").removeClass("active");
				}
			}
		}, 300);
	});
	$(window).trigger("resize");

	//mobile_gnb
	$(".mobile_tab a").click(function(e){
		e.preventDefault();
		$(".mobile_tab a").toggleClass("active");
		$(".mobile_gnb").toggleClass("active");
		$(".transparency").toggleClass("active");
	});
	$(".mobile_gnb > ul > li > a").click(function(e){
		e.preventDefault();
		if(status == "mobile"){
			if($(this).next(".sub").css("display") == "none"){
				$(".mobile_gnb .sub").slideUp(300);
				$(this).next(".sub").slideDown(300);
			}else{
				$(this).next(".sub").slideUp(300);
			}
		}
	});
	$(".transparency").click(function(){
		$(".mobile_gnb").removeClass("active");
		$(".mobile_tab a").removeClass("active");
		$(".transparency").removeClass("active");
	});

	//brandstory

	$(".brand_2 li img").hover(
		function(){
			$(this).attr("src", "images/brand2_over.jpg");
		},
		function(){
			$(this).attr("src", "images/brand2.jpg");
		}
	);
	$(".brand_3 li img").hover(
		function(){
			$(this).attr("src", "images/brand3_over.jpg");
		},
		function(){
			$(this).attr("src", "images/brand3.jpg");
		}
	);


	// window scoll
	$(window).scroll(function(){
		t=$(window).scrollTop();
		//console.log("t:"  + t);
		if (t < 500){
			$("#header .upper").removeClass("fixed");
			$(".gnb > ul > li > a").removeClass("fix_active");
			$(".upper .logo a").removeClass("fix_active");

		}else{
			$("#header .upper").addClass("fixed");
			$(".gnb > ul > li > a").addClass("fix_active");
			$(".upper .logo a").addClass("fix_active");
		}

		if(t <= $("#header").offset().top){
			$("#page1 ul li").removeClass("active");
		}
		else if(t <= $("#page1").offset().top + 800){
			$("#page1 ul li").addClass("active");
			$(".skincare_list ul li").removeClass("active");
		}
		else if(t <= $("#page2").offset().top + 900){
			$(".skincare_list ul li").addClass("active");
		}
		 else{
		 	$(".page4_inner .brand_1").addClass("active");
		 }

	});
	$(window).trigger("scroll");

	// focus
	$(".gnb > ul > li > a").focusin(function(){
		$(".gnb > ul").addClass("active");
		$(".upper").addClass("active");
		$(".gnb > ul > li > a").addClass("active");
		$(".upper .logo a").addClass("active");
	});

	$(".gnb li:last-child > ul > li:last-child a").focusout(function(){
		$(".gnb > ul").removeClass("active");
		$(".upper").removeClass("active");
		$(".gnb > ul > li > a").removeClass("active");
		$(".upper .logo a").removeClass("active");
	});

});
