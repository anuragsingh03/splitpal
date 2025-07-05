const express = require("express");
const router = express.Router();
const { createGroup, joinGroup,leaveGroup, listUserGroups } = require("../controllers/groupController");
const auth = require('../middleware/authMiddleware');


router.post("/create",auth, createGroup);
router.post("/join", auth, joinGroup);
router.post("/leave",auth, leaveGroup);
router.get("/my-groups",auth, listUserGroups);


module.exports = router;