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
  newDescription = slideData[slideIndex].description;
  description.innerHTML = newDescription;
  //image.src = slideData[slideIndex].imgSrc
}

loadSlideData(curSlide);
left.addEventHandler("click", function() {
  curSlide--;
  if (curSlide < 0) {
    curSlide = slideData.length - 1;
  }
  loadSlideData(curSlide);
});
right.addEventHandler("click", function() {
  curSlide++;
  if (curSlide > slideData.length - 1) {
    curSlide = 0;
  }
  loadSlideData(curSlide);
});