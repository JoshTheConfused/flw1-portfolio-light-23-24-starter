/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse*/

const tileImages = [];
const tiles = [];
const grid = [];
const cellSize = 25; //Cells are always 25x25 pixels.

//Canvas dimensions are set each time the page is loaded.
const width = window.innerWidth;
const height = window.innerHeight;

//Page is filled, final row and column of tiles may be clipped.
const gridWidth = Math.floor((width / cellSize) + 1);
const gridHeight = Math.floor((height / cellSize) + 1);

const gridSpaceTotal = gridWidth * gridHeight; //Total number of cells
let WFC;

function preload() { //Load all tile images into an array
  tileImages.push(loadImage("WaveFunctionCollapse/images/Ground.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/FlowersPink.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/FlowersBlue.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/FlowersOrange.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/River.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/RiverTurn.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/Bridge.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/RoadTurn.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/RoadT.png"));
  tileImages.push(loadImage("WaveFunctionCollapse/images/RoadCross.png"));
}

function setup() {
  WFC = createCanvas(width, height);
  WFC.parent("#WFCBackground"); //Attach canvas to div containing whole home page
  
  //Create tiles array containing every tile
  tiles.push(new Tile(tileImages[0], [0, 0, 0, 0]));
  tiles.push(new Tile(tileImages[4], [1, 0, 1, 0])); //Skip flower tiles
  tiles.push(new Tile(tileImages[5], [1, 1, 0, 0]));
  tiles.push(new Tile(tileImages[6], [1, 2, 1, 2]));
  tiles.push(new Tile(tileImages[7], [2, 2, 0, 0]));
  tiles.push(new Tile(tileImages[8], [0, 2, 2, 2]));
  tiles.push(new Tile(tileImages[9], [2, 2, 2, 2]));

  //Adds every rotated tile
  const stop = tiles.length;
  for (let i = 1; i < stop; i++) {
    for(let j = 1; j < 4; j++) {
      tiles.push(tiles[i].rotate(j));
    }
  }

  //Fill grid with new cells
  for (let i = 0; i < gridSpaceTotal; i++) {
    let cell = new Cell(tiles.length);
    grid[i] = cell;
  }
  
  //Generate tile adjacency rules
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].analyze(tiles);
  }
}

function draw() {
  background(147, 196, 125); //Same as background for whole site

  for (let i = 0; i < gridSpaceTotal; i++) { //Draw every collapsed cell
    let cell = grid[i];
    if (cell.collapsed) {
      let index = cell.options[0];
      image(tiles[index].img, (i % gridWidth) * cellSize, Math.floor(i / gridWidth) * cellSize, cellSize, cellSize);
    }
  }

  let leastEntropy = grid.slice();
  leastEntropy = leastEntropy.filter((a) => !a.collapsed);
  
  //Stops when every tile is collapsed
  if (leastEntropy.length === 0) {
    for (let i = 0; i < gridSpaceTotal; i++) {
      let state = grid[i].options[0];
      if (state === 0) { //Adds flowers, randomly rotated
        const imgChoice = Math.floor(Math.random() * 4);
        let img = tileImages[imgChoice];
        if (imgChoice !== 0) { //No rotation if the cell is grass
          let rotations = Math.floor(Math.random() * 4);
          const newImg = createGraphics(img.width, img.height);
          newImg.imageMode(CENTER);
          newImg.translate(img.width / 2, img.height / 2);
          newImg.rotate(HALF_PI * rotations);
          newImg.image(img, 0, 0);
          img = newImg;
        }
        image(img, (i % gridWidth) * cellSize, Math.floor(i / gridWidth) * cellSize, cellSize, cellSize);
      }
    }
    noLoop();
    return;
  }
  
  leastEntropy.sort((a, b) => { //Sort by # of options
    return a.options.length - b.options.length;
  });
  leastEntropy = leastEntropy.filter( //Removes all tiles not of least entropy
    (tile) => tile.options.length === leastEntropy[0].options.length);

  //Randomly collapse a random tile
  const tileToCollapse = random(leastEntropy);
  const collapsedState = random(tileToCollapse.options);

  //Reset if there are no viable options to collapse to
  if (collapsedState === undefined) {
    for (let i = 0; i < gridSpaceTotal; i++) {
      let cell = new Cell(tiles.length);
      grid[i] = cell;
    }
    return;
  }

  //Update collapsed tile
  tileToCollapse.options = [collapsedState];
  tileToCollapse.collapsed = true;

  for (let j = 0; j < gridHeight; j++) {
    for (let i = 0; i < gridWidth; i++) {
      let index = i + (j * gridWidth);
      if (!grid[index].collapsed) { //Update entropy for all uncollapsed cells
        
        //Generate array options [0, 1, 2, ..., n] for n total possible tiles
        let options = [];
        for (let k = 0; k < tiles.length; k++) {
          options[k] = k;
        }

        //Look up
        if (j > 0) { //Make sure tile is not in the top row
          let up = grid[index - gridWidth]; //Select cell above
          let validOptions = [];
          for (let option of up.options) { //Loop through every option of up
            //Add every possible tile below each of those to 'valid'
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions); //Remove invalid options from 'options'
        } //Process continues in same manner for other 3 directions

        //Look right
        if (i < gridWidth - 1) { //Make sure tile is not in the right column
          let right = grid[index + 1];
          let validOptions = [];
          for (let option of right.options) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //Look down
        if (j < gridHeight - 1) { //Make sure tile is not in the bottom row
          let down = grid[index + gridWidth];
          let validOptions = [];
          for (let option of down.options) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //Look left
        if (i > 0) { //Make sure tile is not in the top row
          let left = grid[index - 1];
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        grid[index].options = options;
      }
    }
  }
}

function checkValid(allOptions, validOptions) {
  //Intersection of the two arrays, removes values from 'allOptions' which are not in 'valid Options'
  for (let i = allOptions.length - 1; i >= 0; i--) {
    if (!validOptions.includes(allOptions[i])) {
      allOptions.splice(i, 1);
    }
  }
}