// ! 사용할 모듈 import
const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const passport = require("passport");
// const passportConfig = require("./passport");
// const session = require("express-session");

// ! 라우터 및 기타 파일 import
const boardRouter = require("./routes/board");
const userRouter = require("./routes/users");

// ! 라우터 연결, 변수 생성
const app = express();

// ! 기본 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_DOMAIN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * ? dotenv의 기능이 뭔가요?
 * * .env 파일 안에 명시한 매개변수들을 process.env에 저장합니다.
 * * 이렇게 관리하게 되면 외부에 드러나면 안 되는 내용들 (ex. API 키, db 서버 계정들)을 노출시키지 않을 수 있겠죠?
 * * 당연하겠지만, .env는 반드시 .gitignore에 넣어야 합니다!
 */
app.use("/", userRouter);
app.use("/board", boardRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}번 포트에서 실행되고 있어요!`);
});
