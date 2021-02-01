import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

//All of this is firebase custom token management, if required

admin.initializeApp();

exports.addAdmin = functions.https.onCall((data, context) => {
    if(context.auth?.token.moderator !== true) {
        return {
            error: "Request not authorized. User must be a moderator to fulfill request."
        };
    }

    const email=data.email;
    return grantModeratorRole(email).then(() => {
        return {
            result: `Request fulfilled! ${email} is now a moderator.`
        }
    })
})

async function grantModeratorRole(email: string): Promise<void>{
    const user = await admin.auth().getUserByEmail(email);
    if(user.customClaims && (user.customClaims as any).moderator === true) {
        return;
    }
    return admin.auth().setCustomUserClaims(user.uid, {
        moderator: true
    });
}