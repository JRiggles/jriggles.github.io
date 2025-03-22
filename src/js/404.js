$(document).ready(() => {
  $(".heading, .sub1, .sub2").css({
    opacity: 0.8, // fade in the text
  });

  var starCount = Math.ceil(200 + Math.random() * 200);

  // get viewport size
  var portHeight = $(window).height();
  var portWidth = $(window).width();

  // generate stars (classes range from star1 to star<starCount>)
  for (var n = starCount; n > 0; n--) {
    $("body").append("<span class='stars star" + n + "'></span>");

    // constrain star colors to reds & blues
    var hue = Math.ceil(Math.random() * 90);
    if (hue > 60) {
      hue = Math.ceil(180 + Math.random() * 45);
    }

    // set star properties
    var starColor = "hsl(" + hue + ", 100%, 95%)"; // keep the colors subtle/washed out
    var starOpacity = Math.random() + 0.5;
    var xPosition = Math.ceil(Math.random() * portWidth);
    var yPosition = Math.ceil(Math.random() * portHeight);
    var starSize; // set below...

    // make some (10%) of our stars 'big' stars
    if (n > starCount * 0.1) {
      starSize = Math.ceil(Math.random() * 2);
    } else {
      starSize = Math.ceil(Math.random() * 5);
    }

    // apply CSS to the stars
    $(".star" + n).css({
      background: starColor,
      "border-radius": "50%",
      "box-shadow": "0 0 10px 1px " + starColor,
      opacity: starOpacity,
      position: "absolute",
      left: xPosition,
      top: yPosition,
      height: starSize,
      width: starSize,
    });
  }

  // parallax stars on mouse movement (slow, but pretty)
  $(document).on("mousemove", function parallax(event) {
    let x = -100 * (event.pageX / (portWidth / 5));
    let y = -100 * (event.pageY / (portHeight / 5));
    // NOTE: greater divisor for portWidth, portHeight = more intense parallax effect
    $(".stars").css({ transform: `translate(${x}%, ${y}%)` });
  });
});
