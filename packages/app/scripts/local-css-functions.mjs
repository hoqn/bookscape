function color(colorName) {
  return (level, opacity) => {
    return opacity ? `rgb(var(--${colorName}-${level}) / ${opacity} )` : `rgb(var(--${colorName}-${level}))`;
  }
}

export default {
  ...["primary", "base"].reduce((ac, cu) => ({
    ...ac,
    [`color-${cu}`]: color(cu),
  }), {}),
};
