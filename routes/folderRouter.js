const { Router } = require("express");
const folderController = require("../controllers/folderController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {isAuth} = require("../lib/authMiddleware");

const folderRouter = Router();

folderRouter.get("/:id", isAuth, folderController.getFolderPage);
folderRouter.post("/create", folderController.postCreateFolder);
folderRouter.put("/:id", folderController.putEditFolder);
folderRouter.delete("/:id", folderController.deleteFolder);
folderRouter.post("/:id/createFolder", folderController.postCreateNestedFolder);
folderRouter.post("/:id", upload.single("file"), folderController.postFolderFileUpload);

module.exports = folderRouter;