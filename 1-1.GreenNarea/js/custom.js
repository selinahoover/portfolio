
 // header > Search bar ===========================================================
var resizeElements;
$(document).ready(function() {
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
  // -----------------------------------------
  resizeElements = function() {
    var barWidth = $(bar).outerWidth();

    var labelWidth = $(dropdownLabel).outerWidth();
    $(dropdown).width(labelWidth);

    var dropdownWidth = $(dropdown).outerWidth();
    var buttonWidth	= $(button).outerWidth();
    var inputWidth = barWidth - dropdownWidth - buttonWidth ;
    var inputWidthPercent = inputWidth / barWidth * 90 + "%";

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
  // ----------------------------------------------
  $(window).on('load',function(){
    resizeElements();
  });
  // Toggle new dropdown menu on click
  // ----------------------------------------------

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
  // --------------------------------------------

  $(window).resize(function() {
    resizeElements();
  });
//  / header > Search bar ========================================================

//   header > 로그인 팝업  ========================================================
  $('#login').click(function(){
    $('.container').fadeIn();
    $('.black_bg').fadeIn();
  })
  $('.popup_wrap> a').click(function(){
    $('.container').fadeOut();
    $('.black_bg').fadeOut();
  })

//   header > 회원가입 팝업  ======================================================
  $('#join').click(function(){
    $('.signup-form').fadeIn();
    $('.black_bg').fadeIn();
  })
  $('.signup_bg > a').click(function(){
    $('.signup-form').fadeOut();
    $('.black_bg').fadeOut();
  })

//   header > 메뉴바  ============================================================
    // 메뉴 아이콘 클릭시 네비메뉴 보이기/ 닫기버튼 클릭시 숨기기
  $('.btn-menu').click(function(e){

    e.preventDefault();
    if($('.btn-menu i').hasClass('fa-bars')){
      $('.btn-menu i').attr('class','fas fa-times');
      $('nav').slideDown();
    }else{
      $('.btn-menu i').attr('class','fas fa-bars');
      $('nav').slideUp();
    }
  });

    // 1depth메뉴 클릭시 2depth메뉴 보이기
    $('#gnb-nav > li > a').click(function(){
      var iconName=$(this).find('i').hasClass('fa-angle-down');
      if(iconName){//닫혀있다면 열기
        //초기화진행
        $('#gnb-nav .depth2').slideUp();
        $('#gnb-nav i').attr('class','fas fa-angle-down');
        //내가 열고 싶은것만 열기
        $(this).next('.depth2').slideDown();
        $(this).find('i').attr('class','fas fa-angle-up');
      }else{//열려있다면 닫기
        $(this).next('.depth2').slideUp();
        $(this).find('i').attr('class','fas fa-angle-down');
      }
    })

    //언어변환열기
    $('.toggle-area > a').click(function(){
      if(!$(this).hasClass('on')){
        $(this).next().animate({
          width:130
        },1000);
        $(this).addClass('on');
      }else{
        $(this).next().animate({
          width:0
        },1000);
        $(this).removeClass('on');
      }
    })

    // 메인화면 픽스 아이콘 팝업
    $('.g_icon a').click(function(e){
      e.preventDefault();
      var id=$(this).attr('href');
      $(id).fadeIn();
      $('.black_bg').fadeIn();
    })
    $('.consultation .btn-close').click(function(e){
      e.preventDefault();
      $(this).parent().fadeOut();
      $('.black_bg').fadeOut();
    })

    // 지도 팝업
    $('footer .center .map a').click(function(){
      $('.map_wrapper').fadeIn();
      $('.black_bg').fadeIn();
    })
    $('.map_wrapper > a').click(function(){
      $('.map_wrapper').fadeOut();
      $('.black_bg').fadeOut();
    })

    // 이미지맵 호버시 나타나는 말풍선
    $('map area').on({
      mouseenter:function(){
        var index=$(this).index();
        console.log(index);
        $('.speech_bubble a').stop().fadeOut().eq(index).fadeIn();
      }
    })

    $('.speech_bubble a').on({
      mouseleave:function(){
        $(this).fadeOut();
      }
    })

    //몰로 이동
    $('#store').click(function(){
      document.location.href='../1-2.GreenNareaMall/index.html';
    })

//  / section> Initialize Swiper ==================================================
  var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      slidesPerView: 1,
      mousewheel: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
  });

  $('.speech_bubble a').click(function(e){
    e.preventDefault();
    var index=$('.speech_bubble a').index(this);
    swiper.slideTo(index, 1000, false);
  })


// Test for placeholder support 로그인 팝업=======================================
      $.support.placeholder = (function(){
          var i = document.createElement('input');
          return 'placeholder' in i;
      })();

      // placeholders가있는 경우 기본적으로 레이블 숨기기
      if($.support.placeholder) {
          $('.form-label').each(function(){
              $(this).addClass('js-hide-label');
          });

          // 코드삭제/추가
          $('.form-group').find('input, textarea').on('keyup blur focus', function(e){

              // Cache our selectors
              var $this = $(this),
                  $parent = $this.parent().find("label");

  						switch(e.type) {
  							case 'keyup': {
  								 $parent.toggleClass('js-hide-label', $this.val() == '');
  							} break;
  							case 'blur': {
  								if( $this.val() == '' ) {
                      $parent.addClass('js-hide-label');
                  } else {
                      $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
                  }
  							} break;
  							case 'focus': {
  								if( $this.val() !== '' ) {
                      $parent.removeClass('js-unhighlight-label');
                  }
  							} break;
  							default: break;
  						}
          });
         }
});
