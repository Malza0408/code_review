const express = require("express");
const User = require("../models/schema/userSchema");
const Board = require("../models/schema/boardSchema");
const Comment = require("../models/schema/commentSchema");
const { off } = require("../models/schema/userSchema");
const router = express.Router();

/**
 * 전체 게시물을 반환합니다.
 * @return 전체 게시물
 */

router.get("/", async (req, res) => {
  const boards = await Board.find({});
  res.status(200).json(boards);
});

/**
 * 게시물을 작성합니다.
 * @return 성공 시 201
 */

// name, content
router.post("/", async (req, res) => {
  const { name, content } = req.body;
  const board = new Board({
    name,
    content,
  });
  // save를 통해 데이터를 저장 => 반환 값 : 넣은 값
  // 새로운 데이터를 생성 => 201 created
  board
    .save()
    .then((savedResult) => {
      res.status(201).json({
        result: "ok",
        data: savedResult,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "Oops! Server error",
      });
    });
});

/**
 * 특정 아이디를 갖는 게시물의 정보를 반환합니다.
 * @param id 아이디
 * @return 게시물 정보 (댓글 포함)
 */

router.get("/:id", async (req, res) => {});

/**
 * 특정 아이디를 갖는 게시물에 댓글을 답니다.
 * @param id 아이디
 * @return 성공시 201, 게시물이 존재하지 않을 시 404
 */

// 1. id 추출
// 2. id로 board를 찾아서, 글이 있는지 확인
// 3. 글이 없으면 404, 있으면 다음으로
// 4. body에서 데이터 추출해서 comment 객체를 만들어 줘야함
// 5. save

router.post("/:id/comment", (req, res) => {
  const id = req.params.id;
  const board = Board.findById(id);
  const { content } = req.body;

  if (!board) {
    return res.status(404).json({
      result: "Not Found",
    });
  }

  const comment = new Comment({
    content,
    boardId: id,
  });
  comment
    .save()
    .then((savedResult) => {
      res.status(201).json({
        result: "ok",
        data: savedResult,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: "Oops! Server error",
      });
    });
});

/**
 * 특정 게시물을 삭제합니다.
 * @param id 아이디
 * @return 성공 시 200, 존재하지 않을 시 404
 */

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  // ? findByIdAndDelete findById => 결과 삭제
  // * 데이터가 있는지 없는지 여부
  // * then -> 매개변수가 결과를 담는다.
  // * .n 삭제 된 데이터의 수 이다.
  Board.findByIdAndDelete(id).then((output) => {
    if (output.n === 0) {
      return res.status(404).json({
        result: "Not Found",
      });
    }
    res.status(200).json({
      result: "success",
    });
  });
});

/**
 * 특정 게시물을 대체합니다.
 * @param id 게시물의 id
 * @return 성공 시 200, 존재하지 않을 시 404
 */

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, content } = req.body;
  Board.findByIdAndUpdate(id, {
    name,
    content,
  }).then((output) => {
    if (output.n === 0) {
      return res.status(404).json({
        result: "Not Found",
      });
    }

    res.status(200).json({
      result: "ok",
    });
  });
});

module.exports = router;
