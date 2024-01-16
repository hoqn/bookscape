/**
 * Color System 사용을 편하게 할 수 있도록 하는 postcss function.
 */

/**
 * 기본 색 제공
 * 
 * e.g.
 * `color(base 100 / .5)` becomes `rgb(var(--base-100) / .5)`
 */
/**
 * 배경 색에 따른 Content 색 제공
 * 
 * e.g.
 * `color(on base 500 / .5)` becomes `rgb(var(--base-contrast) / .5)`
 */
function themeColor(content) {
  const trimmedContent = String(content).trim();

  /** @type { (string | undefined)[] } */
  const [colorField, opacityField] = trimmedContent.split("/").map((str) => str.trim());

  const colorProps = colorField?.split(/\s+/) || [];

  let cursor = 0;

  // "on" base 500
  const $on = colorProps[cursor] == "on";
  if ($on) ++cursor;

  // on "base" 500
  const $color = cursor < colorProps.length ? colorProps[cursor++] : "";

  // on base "500"
  const $level = cursor < colorProps.length ? colorProps[cursor++] : "";

  // on base 500 / ".5"
  const $opacity = opacityField?.trim();

  if ($on) {
    const levelNum = Number($level);

    if (levelNum <= 300)      // @  50 100 200 300
      return `rgb(var(--${$color}-950))`; // TODO: `var(--darkest)`가 더 나을지 고민 필요
    else if (levelNum >= 700) // @ 700 800 900 950
      return `rgb(var(--lightest))`;
    else                      // @ 400 500 600
      return `rgb(var(--${$color}-contrast))`;
  }
  else {
    return `rgb(var(--${$color}-${$level})${$opacity ? ` / ${$opacity}` : ""})`;
  }
}

module.exports = {
  "theme-color": themeColor,
}
