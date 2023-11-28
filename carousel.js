let left = document.getElementById("left");
let right = document.getElementById("right");
let description = document.getElementById("activity-description");
let image = document.getElementById("activity-image");
let curSlide = 0;
let slideData = [
  {
    description: "@@@",
    imgSrc: "images/@@@.png"
  },
  {
    description: "&&&",
    imgSrc: "images/%%%.png"
  }
];

function setSlideData(slideIndex) {
  slideIndex %= slideData.length;
  description.innerHTML = slideData[slideIndex].description;
  //image.src = slideData[slideIndex].imgSrc;
}

setSlideData(curSlide);
left.addEventListener("click", function() {
  curSlide--;
    setSlideData(curSlide);
});
right.addEventListener("click", function() {
  curSlide++;
    setSlideData(curSlide);
});