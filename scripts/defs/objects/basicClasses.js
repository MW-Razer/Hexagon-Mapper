// basic essential classes

class Color {
    constructor(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
    
    toStr() {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    toHexStr() {
      return rgbToHex(this.r, this.g, this.b);
    }

    getNewOpacity(a) {

      return new Color(this.r, this.g, this.b, a);

    }

    getNewOpacityMultiplied(mult) {

      return new Color(this.r, this.g, this.b, this.a * mult);

    }

    getSecondary(off = 50) {

      if (this.r + this.g + this.b > 380) {

        return new Color(
          Math.max(this.r - off, 0),
          Math.max(this.g - off, 0),
          Math.max(this.b - off, 0),
          this.a
        );

      } else {

        return new Color(
          Math.min(this.r + off, 255),
          Math.min(this.g + off, 255),
          Math.min(this.b + off, 255),
          this.a
        );

      }
      

    }
    
    darken(sub) {
      
      return new Color(
        Math.max(this.r - sub, 0),
        Math.max(this.g - sub, 0),
        Math.max(this.b - sub, 0),
        this.a
      );
      
    }
    
}

// better overlapping thingy that uses a canvas
const colorCanv = document.getElementById('colorCanv');
const colorCtx = colorCanv.getContext('2d');

colorCanv.setAttribute('willReadFrequently', 'true');

const overlapCanvColors = (colors) => {

  for (let i = 0; i < colors.length; i++) {

    if (colors[i] != null) {

      colorCtx.fillStyle = colors[i].toStr();

      colorCtx.fillRect(0, 0, 1, 1);
      
    }

  }

  let p = colorCtx.getImageData(0, 0, 1, 1).data;

  let color = new Color(
    p[0],
    p[1],
    p[2],
    p[3] / 255
  );

  // console.log(`result color: ${color.toStr()}\nresult opaque equivalent: ${opaqueColor(color, rgbStrToColor(css_get('--background-color'))).toStr()}`);

  colorCtx.clearRect(0, 0, 1, 1);

  return opaqueColor(color, rgbStrToColor(css_get('--background-color')));

}

// returns the opaque equivalent of a transparent color and a background
const opaqueColor = (color, background) => {

  return new Color(
    background.r - (color.a * (background.r - color.r)),
    background.g - (color.a * (background.g - color.g)),
    background.b - (color.a * (background.b - color.b)),
    1
  );

}

// averages out colors
const blendColors = (colors) => {

  let c = new Color(0, 0, 0, 1);

  let colorCount = 0;
  
  for (let i = 0; i < colors.length; i++) {

    c.r += colors[i].r * colors[i].a;
    c.g += colors[i].g * colors[i].a;
    c.b += colors[i].b * colors[i].a;

    c.a += colors[i].a;

    colorCount += colors[i].a;

    // console.log(`blending in: ${colors[i].toStr()} (adding ${colors[i].g} * ${colors[i].a} g), new color: ${c.toStr()}, colorCount: ${colorCount}`);

  }

  c.r /= colorCount;
  c.g /= colorCount;
  c.b /= colorCount;

  c.a /= colorCount;

  return c;

}

// things that need to be defined before the class definitions (huh)
let grid = null;