/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse*/

const tileImages = [];
const tiles = [];
const grid = [];
let collapsed = [];
let uncollapsed = [];
const cellSize = 32; //Cells are always 32x32 pixels.

//Canvas dimensions are set each time the page is loaded.
const w = window.innerWidth;
const h = window.innerHeight;

//Page is filled, final row and column of tiles may be clipped.
const gridWidth = Math.floor((w / cellSize) + 1);
const gridHeight = Math.floor((h / cellSize) + 1);

const gridSpaceTotal = gridWidth * gridHeight; //Total number of cells
let WFC;

function preload() { //Load all tile images into an array
  tileImages.push(loadImage("WaveFunctionCollapse/images/Home/Ground.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Home/River.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Home/RiverTurn.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Home/Bridge.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Home/RoadTurn.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Home/RoadT.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Home/RoadCross.png"));
}

function setup() {
  WFC = createCanvas(w, h);
  WFC.parent("#WFCBackground"); //Attach canvas to div containing whole home page
  
  //Create tiles array containing every tile
  tiles.push(new Tile(tileImages[0], ["0", "0", "0", "0"]));
  tiles.push(new Tile(tileImages[1], ["1", "0", "1", "0"]));
  tiles.push(new Tile(tileImages[2], ["1", "1", "0", "0"]));
  tiles.push(new Tile(tileImages[3], ["1", "2", "1", "2"]));
  tiles.push(new Tile(tileImages[4], ["2", "2", "0", "0"]));
  tiles.push(new Tile(tileImages[5], ["0", "2", "2", "2"]));
  tiles.push(new Tile(tileImages[6], ["2", "2", "2", "2"]));

  //Adds every rotated tile
  const stop = tiles.length;
  for (let i = 1; i < stop; i++) {
    for(let j = 1; j < 4; j++) {
      tiles.push(tiles[i].rotate(j));
    }
  }

  //Fill grid with new cells
  for (let i = 0; i < gridSpaceTotal; i++) {
    let cell = new Cell(tiles.length, i % gridWidth, Math.floor(i / gridWidth));
    grid[i] = cell;
    uncollapsed.push(cell);
  }
  
  //Generate tile adjacency rules
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].analyze(tiles);
  }
}

function draw() {
  background(147, 196, 125); //Same as background for whole site

  for (let i = 0; i < collapsed.length; i++) { //Draw every collapsed cell
    let cell = collapsed[i];
    let index = cell.options[0];
    image(tiles[index].img, cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  }
  
  waveFunctionCollapse(collapsed, uncollapsed, grid, gridWidth, gridHeight);
}

function checkValid(allOptions, validOptions) {
  //Intersection of the two arrays, removes values from 'allOptions' which are not in 'valid Options'
  for (let i = allOptions.length - 1; i >= 0; i--) {
    if (!validOptions.includes(allOptions[i])) {
      allOptions.splice(i, 1);
    }
  }
}