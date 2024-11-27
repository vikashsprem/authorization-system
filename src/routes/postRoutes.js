const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { authenticateToken, checkPermission } = require("../middleware/auth");
const { PERMISSIONS } = require("../constants/roles");
const validateRequest = require("../middleware/validateRequest");
const { feedSchemas } = require("../validators/schemas");
router.get(
  "/",
  authenticateToken,
  checkPermission(PERMISSIONS.READ),
  postController.getAllPosts,
);

router.post(
  "/",
  authenticateToken,
  checkPermission(PERMISSIONS.WRITE),
  validateRequest({ body: feedSchemas.create }),
  postController.createPost,
);

router.delete(
  "/:id",
  authenticateToken,
  checkPermission(PERMISSIONS.DELETE),
  validateRequest({ params: feedSchemas.id }),
  postController.deletePost,
);

module.exports = router;
