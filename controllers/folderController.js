const { PrismaClient } = require("@prisma/client");
const cloudinary = require('cloudinary').v2;
const prisma = new PrismaClient();

const getFolderPage = async (req, res) => {
    const { id } = req.params;

    try {
        const folder = await prisma.folder.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!folder) {
            return res.status(404).json({msg: "Folder not found"});
        }

        const files = await prisma.file.findMany({
            where: {
                folderId: parseInt(id)
            }
        })

        const nestedFolders = await prisma.folder.findMany({
            where: {
                parentFolderId: parseInt(id)
            }
        })

        res.render("folder", {folder, files, nestedFolders});
    } catch (err) {
        console.error(err);
    }
}

const postCreateFolder = async (req, res) => {
    const { name } = req.body;

    try {
        await prisma.folder.create({
            data: {
                name: name,
                userId: req.user.id
            }
        })

        res.redirect("/");
    } catch (err) {
        console.error(err);
    }
}

const putEditFolder = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        await prisma.folder.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name
            }
        })

        res.redirect(`/folder/${id}`);
    } catch (err) {
        console.error(err);
    }
}

const deleteFolder = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.folder.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.redirect("/");
    } catch (err) {
        console.error(err);
    }
}

const postCreateNestedFolder = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        await prisma.folder.create({
            data: {
                name: name,
                userId: req.user.id,
                parentFolderId: parseInt(id)
            }
        })

        res.redirect(`/folder/${id}`);
    } catch (err) {
        console.error(err);
    }
}

const postFolderFileUpload = async (req, res) => {
    const { id } = req.params;

    try {
        const fileBuffer = req.file.buffer;
        const b64 = fileBuffer.toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            resource_type: 'auto',
          });

        await prisma.file.create({
            data: {
                url: result.url,
                cloudinary_id: result.public_id,
                name: req.file.originalname,
                resource_type: result.resource_type,
                size: req.file.size,
                folderId: parseInt(id),
                userId: req.user.id
            }
        });

        res.redirect(`/folder/${id}`);
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getFolderPage,
    postCreateFolder,
    putEditFolder,
    deleteFolder,
    postFolderFileUpload,
    postCreateNestedFolder
}