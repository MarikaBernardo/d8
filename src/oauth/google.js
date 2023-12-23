import { Strategy as GoogleStrategy } from "passport-google-oauth20";


const googleStrategy = new GoogleStrategy(
    {
        clientID: "200485343160-tjphsjmrs1n6prr55e9q9hvtocv08la2.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/users/oauth-callback",
    },
    async (_, __, profile, cb) => {
        try {
            // Cerca l'utente nel database in base all'ID di Google
            let user = await User.findOne({ googleId: profile.id });
            
            if (!user) {
                // Se l'utente non esiste, creane uno nuovo
                user = await User.create({
                    googleId: profile.id,
                    name: profile.name.givenName + " " + profile.name.familyName,
                    email: profile.emails[0].value,
                });
            }
            
            cb(null, user);
        } catch (err) {
            cb(err, null);
        }
    }
    );
    
    export default googleStrategy;
    