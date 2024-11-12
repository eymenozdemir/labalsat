const express = require("express");
const {
  createContract,
  updateContract,
  deleteContract,
  getContract,
  getallContract,
} = require("../controller/contractCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createContract);
router.put("/:id", authMiddleware, isAdmin, updateContract);
router.delete("/:id", authMiddleware, isAdmin, deleteContract);
router.get("/:id", getContract);
router.get("/", getallContract);

module.exports = router;
