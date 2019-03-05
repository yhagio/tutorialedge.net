import Cognito from './../cognito';

class Profile {
    constructor() {
        console.log("Profile Setup");
        this.userSession = null;
        
        console.log(Cognito.getCurrentUser());
    }

    
}

export default Profile;