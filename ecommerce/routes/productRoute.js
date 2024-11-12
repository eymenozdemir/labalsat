const express = require("express");
const {
  createProduct,
  offerProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  deleteWhislist,
  getListedProduct,
  rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/offer", express.json(), authMiddleware, offerProduct); //middleware silinebilir üsttekiyle yer değişebilir
router.post("/", express.json(), authMiddleware, isAdmin, createProduct);
router.get("/listed", express.json(), getListedProduct);
router.put("/wishlist", express.json(), authMiddleware, addToWishlist);
router.put("/delete-wishlist", express.json(), authMiddleware, deleteWhislist);
router.put("/rating", authMiddleware, rating);

router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/:id", getaProduct);

router.get("/", express.json(), getAllProduct);

module.exports = router;
