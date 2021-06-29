class Util {
  static RGBToHex(rgb) {
    let [r, g, b] = rgb.map((val) => +val);

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1) r = `0${r}`;
    if (g.length === 1) g = `0${g}`;
    if (b.length === 1) b = `0${b}`;

    return `#${r}${g}${b}`.toUpperCase();
  }
}

export default Util;
