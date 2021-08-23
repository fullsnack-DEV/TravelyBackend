const express = require("express");
const router = express.Router();
const { getprivatedata } = require("../controllers/PrivateController");
const { protect } = require("../middlewares/ProtectAuth");
router.route("/").get(protect, getprivatedata);

module.exports = router;
