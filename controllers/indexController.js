const { genPassword } = require("../lib/passwordUtils");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getIndexPage = async (req, res) => {
    let folders = [];
    let files = [];

    try {

        if (req.user) {
            folders = await prisma.folder.findMany({
                where: {
                    userId: req.user.id,
                    parentFolderId: null
                }
            });
    
            files = await prisma.file.findMany({
                where: {
                    userId: req.user.id,
                    folderId: null
                }
            });
        }

        res.render("index", {folders, files});
    } catch (err) {
        console.error(err);
    }
}

const getSignupPage = (req, res) => {
    res.render("signup", {errors: []});
}

const postSignup = async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        const passwordHash = await genPassword(password);

        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                passwordHash: passwordHash
            }
        });

        req.login(user, err => {
            if (err) {
                return next(err);
            }

            res.redirect("/");
        })
    } catch (err) {
        console.error(err);
    }

}

const getLoginPage = (req, res) => {
    const errorMessages = req.flash("error");
    
    res.render("login", {messages: errorMessages});
}

const logout = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
}

const getBackPage = (req, res) => {
    res.redirect("..");
}

module.exports = {
    getIndexPage,
    getSignupPage,
    postSignup,
    getLoginPage,
    logout,
    getBackPage
}