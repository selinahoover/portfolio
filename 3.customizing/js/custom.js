
var resizeElements;
$(document).ready(function() {

   // section4분할: 마우스 오버시
	$("article").on("mouseover",function(){
		if($(this).hasClass('video')){
			// section4분할:변수 vid에 video파일 참조
			var vid = $(this).find("video").get(0);
			// section4분할:동영상의 재생위치를 처음(0)으로 설정
			vid.currentTime=0;
			// section4분할:동영상을 재생
			vid.play();
			$(this).find("video").stop().animate({"opacity":"0.7"},1200);
		}
			//공통처리
			$('article').stop().animate({"width":"16.66%"},1000);
			$(this).stop().animate({"width":"50%"},1000,function(){
				//article이 넓어진 바로 후에 아래 구문이 실행됩니다.
				$(this).find(".text-box").stop().animate({"right":"10px"},200);
				// $(this).find("h3").stop().animate({"left":"80px"},400);
				// $(this).find("p").stop().animate({"left":"80px"},800);
			});
	});

	// section4분할: 마우스 아웃시
	$("article").on("mouseout",function(){
		if($(this).hasClass('video')){
			// section4분할: 변수 vid에 video파일 참조
			var vid = $(this).find("video").get(0);
			// section4분할: 동영상을 정지
			vid.pause();
			$(this).find("video").stop().animate({"opacity":"0"},2000);
		}

		//공통처리
		$('article').stop().animate({"width":"25%"},700);
		$(this).find(".text-box").stop().animate({"right":"-100%"},200);
		// $(this).find("h3").stop().animate({"right":"-310px"},200);
		// $(this).find("p").stop().animate({"right":"-310px"},500);
	});
  // section4분할 끝
  // Search bar
  // Set up common variables
  // --------------------------------------------------

  var bar = ".search_bar";
  var input = bar + " input[type='text']";
  var button = bar + " button[type='submit']";
  var dropdown = bar + " .search_dropdown";
  var dropdownLabel = dropdown + " > span";
  var dropdownList = dropdown + " ul";
  var dropdownListItems = dropdownList + " li";

  // Set up common functions
  // --------------------------------------------------

  resizeElements = function() {
    var barWidth = $(bar).outerWidth();

    var labelWidth = $(dropdownLabel).outerWidth();
    $(dropdown).width(labelWidth);

    var dropdownWidth = $(dropdown).outerWidth();
    var buttonWidth	= $(button).outerWidth();
    var inputWidth = barWidth - dropdownWidth - buttonWidth;
    var inputWidthPercent = inputWidth / barWidth * 100 + "%";

    $(input).css({ 'margin-left': dropdownWidth, 'width': inputWidthPercent });
  }

  function dropdownOn() {
    $(dropdownList).fadeIn(25);
    $(dropdown).addClass("active");
  }

  function dropdownOff() {
    $(dropdownList).fadeOut(25);
    $(dropdown).removeClass("active");
  }

  // Initialize initial resize of initial elements
  // --------------------------------------------------
  resizeElements();

  // Toggle new dropdown menu on click
  // --------------------------------------------------

  $(dropdown).click(function(event) {
    if ($(dropdown).hasClass("active")) {
      dropdownOff();
    } else {
      dropdownOn();
    }

    event.stopPropagation();
    return false;
  });

  $("html").click(dropdownOff);


  // Activate new dropdown option and show tray if applicable
  // --------------------------------------------------

  $(dropdownListItems).click(function() {
    $(this).siblings("li.selected").removeClass("selected");
    $(this).addClass("selected");

    // Focus the input
    $(this).parents("form.search_bar:first").find("input[type=text]").focus();

    var labelText = $(this).text();
    $(dropdownLabel).text(labelText);

    resizeElements();

  });

  // Resize all elements when the window resizes
  // --------------------------------------------------

  $(window).resize(function() {
    resizeElements();
  });

});
