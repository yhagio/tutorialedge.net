
class Login {
    constructor() {
        console.log("Hello World");
        try {
            document.getElementById('login')
        } catch(err) {
            console.log("lol");
        }
    }

    signup() {
        this.signup('elliotforbes', 'me@elliotf.dev', 'Ch@rlie1', (resp) => {
            console.log(resp);
        })
    }
}

export default Login;