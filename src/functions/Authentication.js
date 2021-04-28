import { Auth } from 'aws-amplify';

export async function userignUp(username, password, email, phone_number, name, other_attributes) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          
                phone_number,   
                name,
                other_attributes,
            }
        });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

export async function signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        console.log(user);
        return user;
    } catch (error) {
        console.log('error signing in', error);
    }
}

export async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export async function resetPassword(username, code, new_password){
    try{
        Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
    } catch (error) {
        console.log(error);
    }
}

export async function updateUserAttributes(user, attributes){
    try{
        const result = await Auth.updateUserAttributes(user, attributes);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}