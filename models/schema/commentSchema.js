const mongoose = require("mongoose");

// 1. 댓글에는 무엇이 들어가야 할까요?
// * 스키마 작성시 제일 유의해야 할 점 -> 이 데이터가 어디에 의존하고 있는가를 봐야한다.
const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    ownerId: mongoose.Schema.Types.ObjectId,
    boardId: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

// 2. 어떻게 내보내야 할까요?
module.exports = mongoose.model("Comment", commentSchema);
