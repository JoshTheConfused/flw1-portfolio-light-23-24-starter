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

function setSlideData() {
  if (curSlide < 0) {
    curSlide += slideData.length //Keep slideIndex positive
  }
  curSlide %= slideData.length; //Wrap slides
  description.innerHTML = slideData[curSlide].description;
  //activityImage.src = slideData[slideIndex].imgSrc;
}

setSlideData();
left.addEventListener("click", function() {
  curSlide--;
  setSlideData();
});
right.addEventListener("click", function() {
  curSlide++;
  setSlideData();
});