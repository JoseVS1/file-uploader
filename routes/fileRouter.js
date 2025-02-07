const { Router } = require("express");
const fileController = require("../controllers/fileController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {isAuth} = require("../lib/authMiddleware");

const fileRouter = Router();

fileRouter.get("/:id", isAuth, fileController.getFilePage);
fileRouter.post("/upload", upload.single("file"), fileController.postFileUpload);
fileRouter.delete("/:id", fileController.deleteFile);

module.exports = fileRouter;