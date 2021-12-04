const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
router.post(
	"/",
	[
		check("name", "Please add name").not().isEmpty(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 }),
		check("email", "Please include a valid email").isEmail(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({
					msg: "User already exists",
				});
			}
			user = new User({
				name,
				password,
				email,
			});
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			// res.send("User saved");
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
