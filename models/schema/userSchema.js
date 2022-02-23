const mongoose = require("mongoose");

// ? 유저의 아이디와 비밀번호를 저장함.
// * type : 반드시 지정해야 함. -> 들어오는 데이터의 타입
// * required : 필수 여부
// * unique : 중복값 X
//
// * timestamps : createdAt, updatedAt
const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    userPw: { type: String, required: true, unique: true },
  }, // ! 뒤에 오는 것은 설정.
  {
    timestamps: true,
  }
);

// * "User" : document의 이름 (users 바뀜 -> s가 붙음.)
// * userSchema : 제약조건
module.exports = mongoose.model("User", userSchema);
