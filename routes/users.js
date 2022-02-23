const express = require("express");
const User = require("../models/schema/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

/**
 * 회원가입을 진행합니다.
 * @return 성공시 201, 중복된 회원 있을 시 400
 */

router.post("/register", async (req, res) => {

});

router.get("/status", (req, res) => {

});

router.post("/login", passport.authenticate("local"), (req, res) => {

});

router.post("/logout", (req, res) => {

});

module.exports = router;
