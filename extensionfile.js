(function(Scratch) {
  'use strict';

  class TurboAuth {
    constructor() {
      this.loggedIn = false;
    }

    getInfo() {
      return {
        id: 'turboauth',
        name: 'TurboAuth',
        iconURL: 'https://example.com/new-icon.png', // Add the URL of your new icon here
        blocks: [
          {
            opcode: 'showLogin',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show login UI',
          },
          {
            opcode: 'getUsername',
            blockType: Scratch.BlockType.REPORTER,
            text: 'username',
          },
          {
            opcode: 'getPassword',
            blockType: Scratch.BlockType.REPORTER,
            text: 'password',
          },
          {
            opcode: 'getEmail',
            blockType: Scratch.BlockType.REPORTER,
            text: 'email',
          },
          {
            opcode: 'changeThemeColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change theme color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#007BFF'
              }
            }
          },
          {
            opcode: 'isLoggedIn',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'logged in?'
          },
          {
            opcode: 'logout',
            blockType: Scratch.BlockType.COMMAND,
            text: 'logout'
          }
        ]
      };
    }

    showLogin() {
      this.loginDiv = document.createElement('div');
      this.loginDiv.style.position = 'fixed';
      this.loginDiv.style.top = '50%';
      this.loginDiv.style.left = '50%';
      this.loginDiv.style.transform = 'translate(-50%, -50%)';
      this.loginDiv.style.backgroundColor = '#007BFF';
      this.loginDiv.style.padding = '20px';
      this.loginDiv.style.borderRadius = '10px';
      this.loginDiv.style.color = 'white';
      this.loginDiv.style.textAlign = 'center';
      this.loginDiv.style.display = 'flex';
      this.loginDiv.style.flexDirection = 'column';
      this.loginDiv.style.alignItems = 'center';
      this.loginDiv.style.zIndex = '9999'; // Ensure it stays on top

      const usernameInput = document.createElement('input');
      usernameInput.type = 'text';
      usernameInput.placeholder = 'Username';
      usernameInput.style.marginBottom = '10px';
      usernameInput.style.padding = '10px';
      usernameInput.style.borderRadius = '5px';
      usernameInput.style.border = 'none';

      const passwordInput = document.createElement('input');
      passwordInput.type = 'password';
      passwordInput.placeholder = 'Password';
      passwordInput.style.marginBottom = '10px';
      passwordInput.style.padding = '10px';
      passwordInput.style.borderRadius = '5px';
      passwordInput.style.border = 'none';

      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.placeholder = 'Email';
      emailInput.style.marginBottom = '10px';
      emailInput.style.padding = '10px';
      emailInput.style.borderRadius = '5px';
      emailInput.style.border = 'none';

      const submitButton = document.createElement('button');
      submitButton.innerText = 'Login';
      submitButton.style.padding = '10px 20px';
      submitButton.style.borderRadius = '5px';
      submitButton.style.border = 'none';
      submitButton.style.backgroundColor = 'white';
      submitButton.style.color = '#007BFF';
      submitButton.style.cursor = 'pointer';
      submitButton.style.marginTop = '10px';

      submitButton.onclick = () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const email = emailInput.value;
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Email:', email);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        this.loggedIn = true;
        alert('User created successfully!');
        document.body.removeChild(this.loginDiv);
      };

      this.loginDiv.appendChild(usernameInput);
      this.loginDiv.appendChild(passwordInput);
      this.loginDiv.appendChild(emailInput);
      this.loginDiv.appendChild(submitButton);
      document.body.appendChild(this.loginDiv);
    }

    changeThemeColor(args) {
      if (this.loginDiv) {
        this.loginDiv.style.backgroundColor = args.COLOR;
        const submitButton = this.loginDiv.querySelector('button');
        submitButton.style.color = args.COLOR;
      }
    }

    getUsername() {
      return localStorage.getItem('username') || '';
    }

    getPassword() {
      return localStorage.getItem('password') || '';
    }

    getEmail() {
      return localStorage.getItem('email') || '';
    }

    isLoggedIn() {
      return this.loggedIn;
    }

    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('email');
      this.loggedIn = false;
      alert('Logged out successfully!');
    }
  }

  Scratch.extensions.register(new TurboAuth());
})(Scratch);