/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse*/

//cell class
class Cell {
  constructor(val) {
    this.collapsed = false;

    if (val instanceof Array) {
      this.options = val;
    }
    else {
      this.options = [];
      for (let i = 0; i < val; i++) {
        this.options[i] = i;
      }
    }
  }
}