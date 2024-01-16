function color(colorName) {
  return (level, opacity) => {
    return opacity ? `rgb(var(--${colorName}-${level}) / ${opacity} )` : `rgb(var(--${colorName}-${level}))`;
  }
}

/**
 * 배경색에 따른 Content 색
 */
function contrastColor(colorName) {
  return (level) => {
    const levelNum = Number(level);

    if (levelNum <= 300) { // 50, 100, 200, 300
      return `rgb(var(--darkest))`;
    } else if (levelNum >= 700) { // 700, 800, 900
      return `rgb(var(--lightest))`;
    } else { // 400, 500, 600
      return `rgb(var(--${colorName}-contrast))`;
    }
  }
}

export default {
  ...["primary", "base"].reduce((ac, cu) => ({
    ...ac,
    [`color-${cu}`]: color(cu),
    [`color-${cu}-contrast`]: contrastColor(cu),
  }), {}),
};
