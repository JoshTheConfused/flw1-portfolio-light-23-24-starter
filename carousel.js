//Load all elements
let left = document.getElementById("left");
let right = document.getElementById("right");
let description = document.getElementById("activity-description");
let activityImage = document.getElementById("activity-image");
let dot1 = document.getElementById("dot-1");
let dot2 = document.getElementById("dot-2");
let dot3 = document.getElementById("dot-3");
let dot4 = document.getElementById("dot-4");
let dot5 = document.getElementById("dot-5");

let curSlide = 0;

let shakespeare = {
  description: "For four summers, I had the opportunity to be a part of the West Kortright Center's Shakespeare in the Valley summer acting program, located in upstate New York. I have performed in <span class=\"italics\">Macbeth, 12th night, The Winter's Tale, </span> and <span class=\"italics\">Julius Caesar</span> there. In addition, I previously performed in <span class=\"italics\">The Tempest, Henry V, Hamlet, </span> and <span class=\"italics\">As You Like It</span> with the Brooklyn Shakespeare Company.",
  imgSrc: "shakespeare"
};
let frisbee = {
  description: "Since 10th grade, I have played Ultimate Frisbee with the BHSEC-M Bardbarians. We travel to several tournaments throughout the year (one as far as Virginia), at which we've been able to compete against some of the best teams in the country, including Columbia High School, where the sport was invented. We also participate in the city regular season and playoffs during the spring.",
  imgSrc: "frisbee"
};
let poetry = {
  description: "At Bard, I am an avid participant in our Poetry Club, and have been since 10th grade, when two of my friends were given charge of the club. We use the club as a space to read, write, and listen to poetry, and we publish a monthly zine, as well as an inter-school zine at the end of the year. Around the holidays, we have our annual Secret Sonnet event (which I proudly take credit for naming).",
  imgSrc: "poetry"
};
let skiing = {
  description: "I've been skiing for about as long as I've been walking. My father grew up in the Adirondacks, near Whiteface Mountain, and my mother took many trips around the country to ski growing up. As a result, they began teaching me from a very young age. I am now a relatively advanced skiier (although I have little experience outside of the East Coast), and a co-leader of my school's Snow Sports Club.",
  imgSrc: "skiing"
};
let computers = {
  description: "During quarantine, I began researching computer hardware and PC building, and in late 2020 I built myself a computer. Since then, I've mainly used it for coding and the typical internet browsing, along with some video games when I've had the chance to play them. Almost three years later, I am still using the same one, and it's remained functional and efficient the whole time.",
  imgSrc: "computer"
};

let slideData = [
  shakespeare,
  frisbee,
  poetry,
  skiing,
  computers
];

let dots = [dot1, dot2, dot3, dot4, dot5];

function setSlideData() {
  if (curSlide < 0) {
    curSlide += slideData.length //Keep slideIndex positive
  }
  curSlide %= slideData.length; //Wrap slides
  description.innerHTML = slideData[curSlide].description;
  activityImage.src = `images/${slideData[curSlide].imgSrc}.jpeg`;
  for (let i = 0; i < dots.length; i++) {
    dots[i].style.backgroundColor = "#444";
  }
  dots[curSlide].style.backgroundColor = "#1794ad";
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