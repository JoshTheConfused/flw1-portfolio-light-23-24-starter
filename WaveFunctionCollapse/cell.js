/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse*/

class Cell {
  constructor(val) {
    this.collapsed = false;

    if (val instanceof Array) { //Options parameter can be array...
      this.options = val;
    }
    else { //...Or length at which to generate array [0, 1, 2, ..., n]
      this.options = [];
      for (let i = 0; i < val; i++) {
        this.options[i] = i;
      }
    }
  }
}