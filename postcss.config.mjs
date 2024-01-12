import autoprefixer from "autoprefixer";
import postcssFunctions from "postcss-functions";
import postcssNesting from "postcss-nesting";
import postcssSimpleVars from "postcss-simple-vars";
import postcssCustomMedia from "postcss-custom-media";
import postcssHoverMediaFeature from "postcss-hover-media-feature";
import localCssFunctions from "./scripts/local-css-functions.mjs";

/** @type { import("postcss-load-config").Config } */
const postcssOptions = {
  plugins: [
    postcssFunctions({
      functions: localCssFunctions,
    }),                   // color-base()
    postcssNesting(),     // &.nesting
    postcssSimpleVars(),  // $simlpe-vars
    postcssCustomMedia(), // @custom-media
    postcssHoverMediaFeature(), // &:hover -> @media (hover: hover) { &:hover }
    autoprefixer(),
  ],
};

export default postcssOptions;
