/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse*/

//Reverse a string
function reverseString(s) {
  let arr = s.split("");
  arr = arr.reverse();
  return arr.join("");
}

//Compare two edges
function compareEdge(a, b) {
  if (a.length == 1 && b.length == 1) {
    return a == b;
  }
  return a == reverseString(b);
}

class Tile {
  constructor(img, edges) {
    this.img = img;
    this.edges = edges;

    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];
  }

  rotate(rotations) {
    //Rotate image
    const newImg = createGraphics(this.img.width, this.img.height);
    newImg.imageMode(CENTER);
    newImg.translate(this.img.width / 2, this.img.height / 2);
    newImg.rotate(HALF_PI * rotations);
    newImg.image(this.img, 0, 0);

    //Rotate edges
    const numEdges = 4;
    const newEdges = [];
    for (let i = 0; i < numEdges; i++) {
      newEdges[i] = this.edges[(i - rotations + numEdges) % numEdges];
    }

    return new Tile(newImg, newEdges);
  }

  analyze(tiles) { //Create lists of connectable tiles in each direction
    for (let i = 0; i < tiles.length; i++) {
      //Check connection up
      if (compareEdge(tiles[i].edges[2], this.edges[0])) {
        this.up.push(i);
      }
      //Check connection right
      if (compareEdge(tiles[i].edges[3], this.edges[1])) {
        this.right.push(i);
      }
      //Check connection down
      if (compareEdge(tiles[i].edges[0], this.edges[2])) {
        this.down.push(i);
      }
      //Check connection left
      if (compareEdge(tiles[i].edges[1], this.edges[3])) {
        this.left.push(i);
      }
    }
  }
}