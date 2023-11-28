let left = document.getElementById('left');
let right = document.getElementById('right');
let description = document.getElementById('activity-description');
let image = document.getElementById('activity-image');
let curSlide = 0;
let slideData = [
  {
    description: "###",
    imgSrc: "images/###.png"
  },
  {
    description: "%%%",
    imgSrc: "images/%%%.png"
  }
]

function loadSlideData(slideIndex) {
  slideIndex %= slideData.length;
  description.innerHTML = slideData[slideIndex].description;
  //image.src = slideData[slideIndex].imgSrc;
}

loadSlideData(curSlide);
left.addEventListener("click", function() {
  curSlide--;
  loadSlideData(curSlide);
});
right.addEventListener("click", function() {
  curSlide++;
  loadSlideData(curSlide);
});