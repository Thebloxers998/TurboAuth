class TurboAuth {
    constructor() {
        this.loggedIn = false;
        this.token = null;
    }

    getInfo() {
        return {
            id: 'turboauth',
            name: 'TurboAuth',
            blocks: [
                {
                    opcode: 'whenUserLoggedIn',
                    blockType: Scratch.BlockType.HAT,
                    text: 'when user is logged in'
                },
                {
                    opcode: 'whenUserLoggedOut',
                    blockType: Scratch.BlockType.HAT,
                    text: 'when user is logged out'
                },
                {
                    opcode: 'loginUser',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'login user [USERNAME] with password [PASSWORD]',
                    arguments: {
                        USERNAME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'username'
                        },
                        PASSWORD: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'password'
                        }
                    }
                },
                {
                    opcode: 'logoutUser',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'logout user',
                    arguments: {}
                }
            ]
        };
    }

    whenUserLoggedIn() {
        return this.loggedIn;
    }

    whenUserLoggedOut() {
        return !this.loggedIn;
    }

    loginUser(args) {
        const { USERNAME, PASSWORD } = args;
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: USERNAME, password: PASSWORD })
        })
        .then(response => response.json())
        .then(data => {
            if (data.auth) {
                this.loggedIn = true;
                this.token = data.token;
                Scratch.vm.runtime.startHats('turboauth_whenUserLoggedIn');
                console.log(`User ${USERNAME} logged in`);
            } else {
                console.error('Login failed');
            }
        });
    }

    logoutUser(args) {
        fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
                'x-access-token': this.token
            }
        })
        .then(response => response.json())
        .then(data => {
            this.loggedIn = false;
            this.token = null;
            Scratch.vm.runtime.startHats('turboauth_whenUserLoggedOut');
            console.log('User logged out');
        });
    }
}

Scratch.extensions.register(new TurboAuth());
