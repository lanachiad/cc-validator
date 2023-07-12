var express = require("express");
var router = express.Router();
var validator = require("./validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/validator", (req, res, next) => {
  const is_valid = validator.ccValidator(req.body.inputDigits);

  res.send(is_valid);

  return is_valid;
});

module.exports = router;
