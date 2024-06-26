/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse

This tileset (circuit) was taken from the original WFC github, and some tiles were removed*/

const tileImages = [];
const tiles = [];
const grid = [];
let collapsed = [];
let uncollapsed = [];
const cellSize = 21; //Cells are always 21x21 pixels.

//Canvas dimensions are set each time the page is loaded.
const w = window.innerWidth;
const h = window.innerHeight;

//Page is filled, final row and column of tiles may be clipped.
const gridWidth = Math.floor((w / cellSize) + 1);
const gridHeight = Math.floor((h / cellSize) + 1);

const gridSpaceTotal = gridWidth * gridHeight; //Total number of cells
let WFC;

function preload() { //Load all tile images into an array
  tileImages.push(loadImage("WaveFunctionCollapse/images/Projects/component.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Projects/substrate.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Projects/connection.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Projects/corner.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Projects/dskew.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Projects/skew.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Projects/track.png"));
}

function setup() {
  WFC = createCanvas(w, h);
  WFC.parent("#WFCBackground"); //Attach canvas to div containing whole home page

  //Create tiles array containing every tile
  tiles.push(new Tile(tileImages[0], ["0", "0", "0", "0"]));
  tiles.push(new Tile(tileImages[1], ["1", "1", "1", "1"]));
  tiles.push(new Tile(tileImages[2], ["2", "110", "0", "011"]));
  tiles.push(new Tile(tileImages[3], ["1", "1", "110", "011"]));
  tiles.push(new Tile(tileImages[4], ["2", "2", "2", "2"]));
  tiles.push(new Tile(tileImages[5], ["2", "2", "1", "1"]));
  tiles.push(new Tile(tileImages[6], ["2", "1", "2", "1"]));

  //Adds every rotated tile
  const stop = tiles.length;
  for (let i = 2; i < stop; i++) {
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