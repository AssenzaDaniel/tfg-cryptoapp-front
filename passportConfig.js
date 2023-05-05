const GoogleStrategy = require("passport-google-oauth2").Strategy

const JwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")

module.exports = (passport) => {
    passport.use(
        "auth-google",
        new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:1616/oauth2/redirect/google",
        // scope: [ 'profile', 'email' ],
        status: true
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                const user = {
                    provider: profile.provider,
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.email,
                    photo: profile.photos[0].value
                }
                console.log(user)
                return done(null, user)
            } catch (error) {
                return done(error, false)
            }
        })
    )
    passport.use(
        "jwt",
        new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: process.env.JWT_SECRET_KEY,
        },
        async (jwtPayload, done) => {
            try {
                const user = jwtPayload.user
                done(null, user)
            } catch (error) {
                done(error, false)
            }
        })
    )
}