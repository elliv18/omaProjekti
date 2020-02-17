export const mustBeLoggedIn = user => {
    console.log('CURRENTUSER --', user)

    if (!user) {
        throw new Error("Not authenticated.");
    }
};