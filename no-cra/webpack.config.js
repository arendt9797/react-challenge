const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvWebpack = require("dotenv-webpack");

module.exports = {
  entry: "./src/app.js", // 가장 먼저 접근할 js 파일
  output: {
    // 번들링된 파일을 어디에 어떻게 둘건지
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
  },
  module: {
    rules: [
      //.css .js 등 서로 다른 확장자를 가진 파일을 처리할 때 어떤 규칙을 적용할지 정의
      {
        test: /\.js$/, // 어떤 파일을 대상으로 할지 정규표현식으로 작성
        exclude: /node_modules/, // node_modules 폴더는 제외
        use: {
          loader: "babel-loader", // babel-loader를 사용. babel을 사용해서 문법변환을 하겠다는 뜻
        },
      },
    ],
  },
  plugins: [
    // 플러그인은 동기적으로 처리된다
    new CleanWebpackPlugin(),   // 필요없는 빌드 파일 제거
    new HtmlWebpackPlugin({     // html파일에 캐시 값 매칭시키기
      template: "index.html",
      filename: "index.html",
    }),
    new DotenvWebpack({  // 환경 변수 관리
      path: `./.env.${process.env.NODE_ENV || "development"}`,
    }),
  ],
  devServer: {  // 빌드 환경이 아니라 개발 환경에서 개발을 하고 싶어! -> 개발 서버 설정
    static: { // 어떤 폴더를 참조할 것인가?
      directory: path.join(__dirname, "dist"),
    },
    port: 9000,
    open: true, // 서버 실행시 자동으로 브라우저를 연다
    hot: true,  // hot module replacement = hot reload 업데이트 실시간 변경
  },
  mode: "development", // 없으면 warning 이 남
};
