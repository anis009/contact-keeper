const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

//route GET api/auth
// @desc Get logged in
// @access Private

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json({ user });
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

//route POST api/auth
// @desc Auth user & get token
// @access Public

router.post(
	"/",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			const payload = {
				user: {
					id: user._id,
				},
			};

			const token = await jwt.sign(payload, config.get("jwtSecret"), {
				expiresIn: 360000,
			});

			res.json({ token });
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
