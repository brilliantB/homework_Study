var express = require("express");
var router = express.Router();

const AuthController = require("../../controllers/ssac/auth/AuthController");
const BoardController = require("../../controllers/ssac/board/BoardController");

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);

router.get("/board", BoardController.getAllData);
router.post("/board", BoardController.uploadData);
router.get("/board/:idx", BoardController.getIdxData);
router.delete("/board/:idx", BoardController.deleteData);

module.exports = router;



