const { PrismaClient } = require("@prisma/client");
const cloudinary = require('cloudinary').v2;

const prisma = new PrismaClient();

const getFilePage = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await prisma.file.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!file) {
            return res.status(404).json({msg: "File not found"})
        }

        res.render("file", {file});
    } catch (err) {
        console.error(err);
    }
};

const postFileUpload = async (req, res) => {
    try {
        const fileBuffer = req.file.buffer;
        const b64 = fileBuffer.toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            resource_type: 'auto',
          });

        console.log(result);


        await prisma.file.create({
            data: {
                url: result.url,
                cloudinary_id: result.public_id,
                name: req.file.originalname,
                resource_type: result.resource_type,
                size: req.file.size,
                userId: req.user.id
            }
        });

        res.redirect("/");
    } catch (err) {
        console.error(err);
    }
};

const deleteFile = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await prisma.file.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        await cloudinary.uploader.destroy(file.cloudinary_id, {resource_type: file.resource_type}, (error, result) => {
            console.log(result, error)
        });

        await prisma.file.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.redirect("/");
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getFilePage,
    postFileUpload,
    deleteFile
}

