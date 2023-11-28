/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse*/

function waveFunctionCollapse(collapsed, uncollapsed, grid, gridWidth, gridHeight) {
  let leastEntropy = uncollapsed.slice();
  
  //Stops when every tile is collapsed
  if (leastEntropy.length === 0) {
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
    uncollapsed.splice(0, uncollapsed.length);
    collapsed.splice(0, collapsed.length);
    for (let i = 0; i < gridSpaceTotal; i++) {
      let cell = new Cell(tiles.length, i % gridWidth, Math.floor(i / gridWidth));
      grid[i] = cell;
      uncollapsed.push(cell);
    }
    return;
  }
  
  //Update collapsed tile
  tileToCollapse.options = [collapsedState];
  uncollapsed.splice(uncollapsed.indexOf(tileToCollapse), 1);
  collapsed.push(tileToCollapse);
  
  for (let i = 0; i < uncollapsed.length; i++) {
    let cell = uncollapsed[i]; //Update entropy for all uncollapsed cells
    let index = cell.x + (cell.y * gridWidth);
    //Generate array options [0, 1, 2, ..., n] for n total possible tiles
    let options = [];
    for (let k = 0; k < tiles.length; k++) {
      options[k] = k;
    }
  
    //Look up
    if (cell.y > 0) { //Make sure tile is not in the top row
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
    if (cell.x < gridWidth - 1) { //Make sure tile is not in the right column
      let right = grid[index + 1];
      let validOptions = [];
      for (let option of right.options) {
        let valid = tiles[option].left;
        validOptions = validOptions.concat(valid);
      }
      checkValid(options, validOptions);
    }
  
    //Look down
    if (cell.y < gridHeight - 1) { //Make sure tile is not in the bottom row
      let down = grid[index + gridWidth];
      let validOptions = [];
      for (let option of down.options) {
        let valid = tiles[option].up;
        validOptions = validOptions.concat(valid);
      }
      checkValid(options, validOptions);
    }
  
    //Look left
    if (cell.x > 0) { //Make sure tile is not in the top row
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

function checkValid(allOptions, validOptions) {
  //Intersection of the two arrays, removes values from 'allOptions' which are not in 'valid Options'
  for (let i = allOptions.length - 1; i >= 0; i--) {
    if (!validOptions.includes(allOptions[i])) {
      allOptions.splice(i, 1);
    }
  }
}