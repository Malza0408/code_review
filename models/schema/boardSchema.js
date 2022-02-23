const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    ownerId: mongoose.Schema.Types.ObjectId,
    // ! 사용자를 구분하기 위해선, 절대 변하지 않는 값을 사용해야 합니다.
    // ! 일반적인 아이디, 비밀번호를 사용하기엔 대부분의 페이지는 아이디 변경을 지원하고 있죠?
    // ! 따라서, 절대 불변의 ObjectId를 사용해야 합니다.
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", boardSchema);
