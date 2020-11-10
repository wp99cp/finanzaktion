import * as admin from 'firebase-admin';
import {cloudFunction} from "./CloudFunctions";


// Use to set correct projectId and serviceAccount for the database
// the correct one is automatically set by the GClOUD_PROJECT name.
export const projectId = process.env.GCLOUD_PROJECT as string;
export const serviceAccount = require("../keys/" + projectId + "-firebase-adminsdk.json");

// connect to firebase firestore database
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://" + projectId + ".firebaseio.com",
});

export const db = admin.firestore();


exports.newUserCreated = cloudFunction().auth.user().onCreate(
    async (user: any) => {

        const userData = {
            displayName: user.displayName,
            email: user.email,
            access: {[user.uid]: 'owner'},
            just_created: true,
            uses_family_mode: true,
        };

        // adds the user to the database
        db.collection('users').doc(user.uid).set(userData)
            .then(() => console.log('Added user ' + user.displayName))
            .catch(e => console.error(e));

        // update counter of users
        await db.doc('/sharedData/statistics').update({
            user_count: admin.firestore.FieldValue.increment(1),
        });

        return true;

    });
