const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validPassword } = require("../lib/passwordUtils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyCallback = async (username, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            return done(null, false);
        }

        const isValid = await validPassword(password, user.passwordHash);

        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    } catch (err) {
        done(err);
    }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (user) {
            done(null, user);
        }
    } catch (err) {
        done(err);
    }
});