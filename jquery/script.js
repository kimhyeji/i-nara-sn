$(document).ready(function () {
  // gnb button function
  $(".headbtn").click(function () {
    $(".gnb").addClass("active");
  });
  $(".gnbbtn").click(function () {
    $(".gnb").removeClass("active");
  });
  // gbn background-color
  $(".headbtn").click(function () {
    $(".gnbbg").addClass("active");
  });
  $(".gnbbtn").click(function () {
    $(".gnbbg").removeClass("active");
  });
  //gbn item appear animation
  $(".headbtn").click(function () {
    $(".gnbBxColor").addClass("active");
  });
  $(".gnbbtn").click(function () {
    $(".gnbBxColor").removeClass("active");
  });
});

// $(".videoBx:gt(0)").hide();

// setInterval(function () {
//   $(".videoBx:first").fadeOut(1500).next().fadeIn(1500);
//   $(".videoBx:first").appendTo(".introVedioBX");
// }, 3600);

$(".introVedioBX").slick({
  dots: false,
  infinite: true,
  fade: true,
  cssEase: "linear",
  autoplay: true,
  autoplaySpeed: 2000,
  draggable: false,
});

$(".introVedioBX").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    // 모든 동영상을 멈추고, 선택된 슬라이드의 동영상을 처음부터 재생
    const videos = $(".introVedioBX video");
    videos.each(function () {
      this.pause();
      this.currentTime = 0; // 동영상 시간을 처음으로 설정
    });

    const nextVideo = videos.eq(nextSlide); // 다음 슬라이드의 동영상
    if (nextVideo.length) {
      nextVideo[0].play(); // 다음 동영상 재생
    }
  }
);
