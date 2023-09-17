/** 
 * Original from: https://stackoverflow.com/questions/21961839/simulation-background-size-cover-in-canvas
 * Original By Ken Fyrstenberg Nilsen
 * 
 * Note: img must be fully loaded or have correct width & height set.
 */
//export default function drawImageProp({ctx, img, x, y, w, h, offsetX, offsetY} = {}) {
  //// Defaults
  //if (typeof x !== "number") x = 0;
  //if (typeof y !== "number") y = 0;
  //if (typeof w !== "number") w = ctx.canvas.width;
  //if (typeof h !== "number") h = ctx.canvas.height;
  //if (typeof offsetX !== "number") offsetX = 0.5;
  //if (typeof offsetY !== "number") offsetY = 0.5;

  //// keep bounds [0.0, 1.0]
  //if (offsetX < 0) offsetX = 0;
  //if (offsetY < 0) offsetY = 0;
  //if (offsetX > 1) offsetX = 1;
  //if (offsetY > 1) offsetY = 1;

  //var iw = img.width,
    //ih = img.height,
    //r = Math.min(w / iw, h / ih),
    //nw = iw * r, // new prop. width
    //nh = ih * r, // new prop. height
    //cx,
    //cy,
    //cw,
    //ch,
    //ar = 1;

  //// decide which gap to fill
  //if (nw < w) ar = w / nw;
  //if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
  //nw *= ar;
  //nh *= ar;

  //// calc source rectangle
  //cw = iw / (nw / w);
  //ch = ih / (nh / h);

  //cx = (iw - cw) * offsetX;
  //cy = (ih - ch) * offsetY;

  //// make sure source rectangle is valid
  //if (cx < 0) cx = 0;
  //if (cy < 0) cy = 0;
  //if (cw > iw) cw = iw;
  //if (ch > ih) ch = ih;

  //// fill image in dest. rectangle
  //ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
//}

export default function drawImageProp({ ctx, img, x, y, offsetX, offsetY } = {}) {
  // Defaults
  if (typeof x !== "number") x = 0;
  if (typeof y !== "number") y = 0;
  if (typeof offsetX !== "number") offsetX = 0.5;
  if (typeof offsetY !== "number") offsetY = 0.5;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
    ih = img.height,
    cx,
    cy;

  // calculate source rectangle
  cx = (iw - iw) * offsetX;
  cy = (ih - ih) * offsetY;

  // calculate centered position
  var centerX = x + (ctx.canvas.width - iw) * 0.5;
  var centerY = y + (ctx.canvas.height - ih) * 0.5;

  // draw image onto canvas without scaling, centered
  ctx.drawImage(img, cx, cy, iw, ih, centerX, centerY, iw, ih);
}

