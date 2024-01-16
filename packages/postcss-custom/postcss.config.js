module.exports = {
  plugins: {
    "postcss-functions": {
      functions: {
        ...require("./color-functions"),
      },
    },
    "postcss-nesting": {},
    "postcss-simple-vars": {},
    "postcss-custom-media": {},
    "postcss-calc": {},
    "autoprefixer": {}, // TODO: turbopack을 사용하는 경우 왜인지 browserslist 패키지 상의 browserslist-stat.json 관련 오류가 생긴다..
    "cssnano": {},      // TODO: 위와 비슷하게 Module-not-found 오류가 발생한다.
  }
};