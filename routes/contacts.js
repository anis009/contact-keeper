const express = require("express");
const router = express();

//route GET api/contacts
// @desc Get all users contacts
// @access Private

router.get("/", (req, res) => {
	res.send("get all users contacts");
});

//route POST api/contacts
// @desc Add new contact
// @access Private

router.post("/", (req, res) => {
	res.send("add new contact");
});

//route PUT api/contacts/:id
// @desc Update contact
// @access Private

router.put("/:id", (req, res) => {
	res.send("Update Contact");
});

//route DELTE api/contacts/:id
// @desc Delete contact
// @access Private

router.delete("/:id", (req, res) => {
	res.send("Delete Contact");
});

module.exports = router;
