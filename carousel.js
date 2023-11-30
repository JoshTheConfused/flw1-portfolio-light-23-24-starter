//Load all elements
let left = document.getElementById("left");
let right = document.getElementById("right");
let description = document.getElementById("activity-description");
let activityImage = document.getElementById("activity-image");

let curSlide = 0;

let shakespeare = {
  description: "Shakespeare",
  imgSrc: ""
};
let frisbee = {
  description: "Frisbee",
  imgSrc: ""
};
let poetry = {
  description: "Poetry Club",
  imgSrc: ""
};
let skiing = {
  description: "Shredding",
  imgSrc: ""
};
let computers = {
  description: "Building my computer",
  imgSrc: ""
};

let slideData = [
  shakespeare,
  frisbee,
  poetry,
  skiing,
  computers
];

function setSlideData(slideIndex) {
  slideIndex %= slideData.length; //Wrap slides
  description.innerHTML = slideData[slideIndex].description;
  //activityImage.src = slideData[slideIndex].imgSrc;
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