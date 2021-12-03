const express = require("express");
const router = express();

//route GET api/auth
// @desc Get logged in
// @access Private

router.get("/", (req, res) => {
	res.send("GEt logged in user");
});

//route POST api/auth
// @desc Auth user & get token
// @access Public

router.post("/", (req, res) => {
	res.send("Log in User");
});

module.exports = router;
