let left = document.getElementById('left');
let right = document.getElementById('right');
let description = document.getElementById('activity-description');
let image = document.getElementById('activity-image');
let curSlide = 0;
let slideData = fetch("carousel.json");

console.log(slideData);

for (let i in slideData) {
  console.log(i.description);
  console.log(i.imgSrc);
}