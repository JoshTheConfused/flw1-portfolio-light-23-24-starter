/*Wave Function Collapse (tiled model)
All Credit for this implementation goes to The Coding Train / Daniel Shiffman: https://www.youtube.com/watch?v=rI_y2GAlQFM
This was coded almost exactly to his implementation as shown in the above video
Original Wave Function Collapse: https://github.com/mxgmn/WaveFunctionCollapse*/

//tile class
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
    //rotate image
    const newImg = createGraphics(this.img.width, this.img.height);
    newImg.imageMode(CENTER);
    newImg.translate(this.img.width / 2, this.img.height / 2);
    newImg.rotate(HALF_PI * rotations);
    newImg.image(this.img, 0, 0);

    //rotate edges
    const numEdges = 4;
    const newEdges = [];
    for (let i = 0; i < numEdges; i++) {
      newEdges[i] = this.edges[(i - rotations + numEdges) % numEdges];
    }

    return new Tile(newImg, newEdges);
  }

  analyze(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      //Check connection up
      if (tiles[i].edges[2] === this.edges[0]) {
        this.up.push(i)
      }
      //Check connection right
      if (tiles[i].edges[3] === this.edges[1]) {
        this.right.push(i)
      }
      //Check connection down
      if (tiles[i].edges[0] === this.edges[2]) {
        this.down.push(i)
      }
      //Check connection left
      if (tiles[i].edges[1] === this.edges[3]) {
        this.left.push(i)
      }
    }
  }
}