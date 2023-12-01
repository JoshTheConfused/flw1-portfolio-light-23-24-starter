//Load all elements
let left = document.getElementById("left");
let right = document.getElementById("right");
let description = document.getElementById("activity-description");
let activityImage = document.getElementById("activity-image");

let curSlide = 0;

let shakespeare = {
  description: "Shakespeare",
  imgSrc: "shakespeare"
};
let frisbee = {
  description: "Frisbee",
  imgSrc: "frisbee"
};
let poetry = {
  description: "Poetry Club",
  imgSrc: "poetry"
};
let skiing = {
  description: "Shredding",
  imgSrc: "skiing"
};
let computers = {
  description: "Building my computer",
  imgSrc: "computer"
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
  activityImage.src = `images/${slideData[curSlide].imgSrc}.jpeg`;
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