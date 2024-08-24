// helpful functions

function rad(a) {
  return a * (Math.PI / 180);
}

function ang(r) {
  return r * (180 / Math.PI);
}

function rand(min, max) {
  return (Math.random() * (max - min) + min);
}

function randInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getAng(x1, y1, x2, y2) {

  let disx = x1 - x2;
  let disy = y1 - y2;

  return Math.atan2(disy, disx);

}

function getDis(x1, y1, x2, y2) {

  return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));

}

function rotatePoint(cp, p, ang) {

  let cos = Math.cos(rad(ang));
  let sin = Math.sin(rad(ang));

  return new Point((cos * (p.x - cp.x)) + (sin * (p.y - cp.y)) + cp.x, (cos * (p.y - cp.y)) - (sin * (p.x - cp.x)) + cp.y);

}

// returns closest point on a line to the first point
function closestPointOnLine(px, py, ax, ay, bx, by) {

  let atob = { x: bx - ax, y: by - ay };
  let atop = { x: px - ax, y: py - ay };
  let len = (atob.x * atob.x) + (atob.y * atob.y);

  let dot = (atop.x * atob.x) + (atop.y * atob.y);

  let t = Math.min(1, Math.max(0, dot / len));

  dot = ((bx - ax) * (py - ay)) - ((by - ay) * (px - ax));

  return [ax + (atob.x * t), ay + (atob.y * t)];

}

// returns true if the 2 lines intersect
function lineIntersects(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {

  let det, gamma, lambda;

  det = (ax2 - ax1) * (by2 - by1) - (bx2 - bx1) * (ay2 - ay1);

  if (det == 0) {

    return false;

  } else {

    lambda = ((by2 - by1) * (bx2 - ax1) + (bx1 - by2) * (by2 - ay1)) / det;
    gamma = ((ay1 - ay2) * (by2 - ax1) + (ax2 - ax1) * (by2 - ay1)) / det;

    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);

  }

}

// returns -1 if negative, 1 if positive
function getNeg(num) {
  return num < 0 ? -1 : 1;
}

function hexToRgb(hex) {

  if (hex[0] == '#') {
    hex = hex.substring(1, 7);
  }

  let r = parseInt(hex[0], 16) * 16 + parseInt(hex[1], 16);
  let g = parseInt(hex[2], 16) * 16 + parseInt(hex[3], 16);
  let b = parseInt(hex[4], 16) * 16 + parseInt(hex[5], 16);

  return new Color(r, g, b, 1);

}

function compToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + compToHex(r) + compToHex(g) + compToHex(b);
}

function rgbStrToColor(str) {

  let comp = str.split(',');

  return new Color(
    parseInt(comp[0].split('(')[1]),
    parseInt(comp[1].trim()),
    parseInt(comp[2].split(')')[0].trim()),
    1
  );

}

function getIndex(arr, val) {
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      return i;
    }
  }
  
  //return -1;
  
}

function inPolygon(points, x, y) {

  let c = false;
  
  let vertx = points.map((p) => { return p[0] });
  let verty = points.map((p) => { return p[1] });

  for (let i = 0, j = vertx.length; i < vertx.length; j = i++) {
    if (((verty[i] > y) != (verty[j] > y)) && (x < (vertx[j] - vertx[i]) * (y - verty[i]) / (verty[j] - verty[i]) + vertx[i])) {
      c = !c;
    }
  }

  return c;

}

function circleIntersectsLine(ax, ay, bx, by, cx, cy, r) {
  
  ax -= cx;
  ay -= cy;
  bx -= cx;
  by -= cy;
  
  let a = (bx - ax) ** 2 + (by - ay) ** 2;
  let b = 2 * (ax * (bx - ax) + ay * (by - ay));
  let c = (ax ** 2) + (ay ** 2) - (r ** 2);
  
  let disc = (b ** 2) - (4 * a * c);
  if (disc <= 0) { return false; }
  
  let sqrtdisc = Math.sqrt(disc);
  
  let t1 = (-b + sqrtdisc)/(2 * a);
  let t2 = (-b - sqrtdisc)/(2 * a);
  
  if ((0 < t1 && t1 < 1) || (0 < t2 && t2 < 1)) { return true; }
  
  return false;
}

function toGrayscale(c) {
  
  let v = c.r + c.g + c.b;
  
  return new Color(v, v, v, c.a);
  
}

function whitelistChars(whitelist, str) {
  let regex = new RegExp(`[^${whitelist}]`, 'g');
  return str.replace(regex, '');
}