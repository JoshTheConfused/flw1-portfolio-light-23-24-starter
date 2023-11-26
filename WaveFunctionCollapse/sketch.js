/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse*/

const tileImages = [];
const tiles = [];
const grid = [];
const cellSize = 25;
const width = window.innerWidth;
const height = window.innerHeight;
const gridWidth = Math.floor((width / cellSize) + 1);
const gridHeight = Math.floor((height / cellSize) + 1);
const gridSpaceTotal = gridWidth * gridHeight; //total number of cells
let WFC;

function preload() {
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
  WFC.parent("#WFCBackground");
  //context = WFC.getContext("2d");
  
  //gridWidth = Math.floor((width / cellSize) + 1);
  //gridHeight = Math.floor((height / cellSize) + 1);

  //create tiles array containing every tile
  tiles.push(new Tile(tileImages[0], [0, 0, 0, 0]));
  tiles.push(new Tile(tileImages[4], [1, 0, 1, 0]));
  tiles.push(new Tile(tileImages[5], [1, 1, 0, 0]));
  tiles.push(new Tile(tileImages[6], [1, 2, 1, 2]));
  tiles.push(new Tile(tileImages[7], [2, 2, 0, 0]));
  tiles.push(new Tile(tileImages[8], [0, 2, 2, 2]));
  tiles.push(new Tile(tileImages[9], [2, 2, 2, 2]));

  //adds every rotated tile
  const stop = tiles.length;
  for (let i = 1; i < stop; i++) {
    for(let j = 1; j < 4; j++) {
      tiles.push(tiles[i].rotate(j));
    }
  }

  //fill grid with new cells
  for (let i = 0; i < gridSpaceTotal; i++) {
    let cell = new Cell(tiles.length);
    //console.table(cell);
    grid[i] = cell;
  }
  //console.table(grid);
  //generate tile adjacency rules
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].analyze(tiles);
  }
}

function draw() {
  //console.table(grid);
  background(147, 196, 125);

  //const w = width / gridWidth;
  //const h = height / gridHeight;

  
  //console.log(`w: ${gridWidth}, h: ${gridHeight}`);

  for (let i = 0; i < gridSpaceTotal; i++) {
    let cell = grid[i];
    //console.log(cell);
    if (cell.collapsed) {
      let index = cell.options[0];
      image(tiles[index].img, (i % gridWidth) * cellSize, Math.floor(i / gridWidth) * cellSize, cellSize, cellSize);
    }
    /*else {
      fill(152, 196, 21);
      rect((i % gridWidth) * cellSize, Math.floor(i / gridWidth) * cellSize, cellSize, cellSize)
    }*/
  }

  //document.querySelector("#WFCBackground").innerHTML = WFC;

  //Creates a new Tile array holding every tile of least entropy
  let leastEntropy = grid.slice();
  //console.table(leastEntropy);
  leastEntropy = leastEntropy.filter((a) => !a.collapsed);
  if (leastEntropy.length === 0) { //stops when every tile is collapsed
    for (let i = 0; i < gridSpaceTotal; i++) {
      let state = grid[i].options[0];
      console.log(state);
      if (state === 0) { //Adds flowers, randomly rotated
        let img = tileImages[Math.floor(Math.random() * 4)];
        let rotations = Math.floor(Math.random() * 4);
        const newImg = createGraphics(img.width, img.height);
        newImg.imageMode(CENTER);
        newImg.translate(img.width / 2, img.height / 2);
        newImg.rotate(HALF_PI * rotations);
        newImg.image(img, 0, 0);
        image(newImg, (i % gridWidth) * cellSize, Math.floor(i / gridWidth) * cellSize, cellSize, cellSize);
      }
    }
    noLoop();
    return;
  }
  leastEntropy.sort((a, b) => {
    //console.log("a: " + a.options.length + ": " + a.options);
    //console.log("b: " + b.options.length + ": " + b.options);
    return a.options.length - b.options.length;
  });
  //console.table(leastEntropy);
  //console.log(leastEntropy[0].options.length);
  leastEntropy = leastEntropy.filter(
    (tile) => tile.options.length === leastEntropy[0].options.length);
  //console.table(leastEntropy);
  //randomly collapses a randomly chosen tile of least entropy
  const tileToCollapse = random(leastEntropy);
  const collapsedState = random(tileToCollapse.options);
  if (collapsedState === undefined) {
    //reset grid if state is not solveable
    for (let i = 0; i < gridSpaceTotal; i++) {
      let cell = new Cell(tiles.length);
      //console.table(cell);
      grid[i] = cell;
    }
    return;
  }
  tileToCollapse.options = [collapsedState];
  tileToCollapse.collapsed = true;
  //console.log(tileToCollapse);

  //Updates entropy of all uncollapsed tiles in grid
  for (let j = 0; j < gridHeight; j++) {
    for (let i = 0; i < gridWidth; i++) {
      //console.log("i: " + i);
      //console.log("j: " + j);
      let index = i + (j * gridWidth);
      //console.log("index: " + index);
      //console.log(index + ". Before:");
      //console.table(grid[index]);
      if (!grid[index].collapsed) {
        let options = [];
        for (let k = 0; k < tiles.length; k++) {
          options[k] = k;
        }

        //look up
        if (j > 0) {
        //^make sure tile is not in the top row
          //console.log(index - gridWidth);
          let up = grid[index - gridWidth];
          let validOptions = [];
          for (let option of up.options) {
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //look right
        if (i < gridWidth - 1) {
        //^make sure tile is not in the right column
          let right = grid[index + 1];
          let validOptions = [];
          for (let option of right.options) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //look down
        if (j < gridHeight - 1) {
        //^make sure tile is not in the bottom row
          let down = grid[index + gridWidth];
          let validOptions = [];
          for (let option of down.options) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //look left
        if (i > 0) {
        //^make sure tile is not in the top row
          let left = grid[index - 1];
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //console.log(options);
        grid[index].options = options;
      }
      //console.log(index + ". After:");
      //console.table(grid[index]);
    }
  }
  //noLoop();
}

function checkValid(allOptions, validOptions) { //Intersection of the two arrays
  for (let i = allOptions.length - 1; i >= 0; i--) {
    if (!validOptions.includes(allOptions[i])) {
      allOptions.splice(i, 1);
    }
  }
}