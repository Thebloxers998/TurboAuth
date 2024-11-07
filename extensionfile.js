(function(Scratch) {
  'use strict';

  class TurboAuth {
    constructor() {
      this.loggedIn = false;
      this.lastActivity = null;
      this.sessionTimeout = 3600000; // 1 hour in milliseconds
    }

    getInfo() {
      return {
        id: 'turboauth',
        name: 'TurboAuth',
        iconURL: 'https://i.ibb.co/bs4pJ98/Untitled26-20241105222432.png',
        blocks: [
          {
            opcode: 'registerUser',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Register User with username [USERNAME] password [PASSWORD] email [EMAIL]',
            arguments: {
              USERNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'username'
              },
              PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'password'
              },
              EMAIL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'email'
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'authenticateAccount',
            blockType: Scratch.BlockType.COMMAND,
            text: 'authenticate account with username [USERNAME] password [PASSWORD]',
            arguments: {
              USERNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'username'
              },
              PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'password'
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'updateUserProfile',
            blockType: Scratch.BlockType.COMMAND,
            text: 'update user profile with username [USERNAME] password [PASSWORD] email [EMAIL]',
            arguments: {
              USERNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'username'
              },
              PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'password'
              },
              EMAIL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'email'
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'hasUserRole',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'user has role [ROLE]',
            arguments: {
              ROLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'admin'
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'getUsername',
            blockType: Scratch.BlockType.REPORTER,
            text: 'username',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'getPassword',
            blockType: Scratch.BlockType.REPORTER,
            text: 'password',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'getEmail',
            blockType: Scratch.BlockType.REPORTER,
            text: 'email',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'changeThemeColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change theme color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ADD8E6'
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'isLoggedIn',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'logged in?',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'logout',
            blockType: Scratch.BlockType.COMMAND,
            text: 'logout',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'getLoginStatus',
            blockType: Scratch.BlockType.REPORTER,
            text: 'login status',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'getLastLoginTime',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last login time',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'whenLoggedIn',
            blockType: Scratch.BlockType.HAT,
            text: 'when logged in',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'whenLoggedOut',
            blockType: Scratch.BlockType.HAT,
            text: 'when logged out',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'setSessionTimeout',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set session timeout to [MINUTES] minutes',
            arguments: {
              MINUTES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 60
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'getTimeUntilTimeout',
            blockType: Scratch.BlockType.REPORTER,
            text: 'minutes until session timeout',
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'validatePassword',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is password [PASSWORD] strong?',
            arguments: {
              PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'password123'
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'getUserLoginAttempts',
            blockType: Scratch.BlockType.REPORTER,
            text: 'login attempts for [USERNAME]',
            arguments: {
              USERNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'username'
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'resetLoginAttempts',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset login attempts for [USERNAME]',
            arguments: {
              USERNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'username'
              }
            },
            blockColor: '#ADD8E6',
          },
          {
            opcode: 'getLastActivityTime',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last activity time',
            blockColor: '#ADD8E6',
          }
        ]
      };
    }

    registerUser(args) {
      this.loginDiv = document.createElement('div');
      this.loginDiv.style.position = 'fixed';
      this.loginDiv.style.top = '50%';
      this.loginDiv.style.left = '50%';
      this.loginDiv.style.transform = 'translate(-50%, -50%)';
      this.loginDiv.style.backgroundColor = '#ADD8E6';
      this.loginDiv.style.padding = '20px';
      this.loginDiv.style.borderRadius = '10px';
      this.loginDiv.style.color = 'white';
      this.loginDiv.style.textAlign = 'center';
      this.loginDiv.style.display = 'flex';
      this.loginDiv.style.flexDirection = 'column';
      this.loginDiv.style.alignItems = 'center';
      this.loginDiv.style.zIndex = '9999';

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
      submitButton.innerText = 'Register';
      submitButton.style.padding = '10px 20px';
      submitButton.style.borderRadius = '5px';
      submitButton.style.border = 'none';
      submitButton.style.backgroundColor = 'white';
      submitButton.style.color = '#ADD8E6';
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
        alert('User registered successfully!');
        document.body.removeChild(this.loginDiv);
      };

      this.loginDiv.appendChild(usernameInput);
      this.loginDiv.appendChild(passwordInput);
      this.loginDiv.appendChild(emailInput);
      this.loginDiv.appendChild(submitButton);
      document.body.appendChild(this.loginDiv);
    }

    authenticateAccount(args) {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
      const attempts = parseInt(this.getUserLoginAttempts(args)) || 0;

      if (attempts >= 19) {
        alert('Account temporarily locked. Too many failed attempts.');
        return;
      }

      if (storedUsername === args.USERNAME && storedPassword === args.PASSWORD) {
        this.loggedIn = true;
        this.lastActivity = Date.now();
        this.resetLoginAttempts(args);
        localStorage.setItem('lastLoginTime', new Date().toLocaleString());
        alert('Authentication successful!');
      } else {
        localStorage.setItem(`loginAttempts_${args.USERNAME}`, (attempts + 1).toString());
        alert('Incorrect username or password.');
      }
    }

    updateUserProfile(args) {
      localStorage.setItem('username', args.USERNAME);
      localStorage.setItem('password', args.PASSWORD);
      localStorage.setItem('email', args.EMAIL);
      alert('User profile updated successfully!');
    }

    hasUserRole(args) {
      const roles = localStorage.getItem('roles') || '';
      return roles.includes(args.ROLE);
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

    changeThemeColor(args) {
      if (this.loginDiv) {
        this.loginDiv.style.backgroundColor = args.COLOR;
        const submitButton = this.loginDiv.querySelector('button');
        submitButton.style.color = args.COLOR;
      }
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

    getLoginStatus() {
      return this.loggedIn ? 'Logged in' : 'Logged out';
    }

    getLastLoginTime() {
      return localStorage.getItem('lastLoginTime') || 'Never';
    }

    setSessionTimeout(args) {
      this.sessionTimeout = args.MINUTES * 60000;
      return true;
    }

    getTimeUntilTimeout() {
      if (!this.lastActivity) return 0;
      const timeLeft = (this.sessionTimeout - (Date.now() - this.lastActivity)) / 60000;
      return Math.max(0, Math.round(timeLeft));
    }

    validatePassword(args) {
      const password = args.PASSWORD;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isLongEnough = password.length >= 8;
      
      return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough;
    }

    getUserLoginAttempts(args) {
      const attempts = localStorage.getItem(`loginAttempts_${args.USERNAME}`);
      return attempts || '0';
    }

    resetLoginAttempts(args) {
      localStorage.setItem(`loginAttempts_${args.USERNAME}`, '0');
    }

    getLastActivityTime() {
      if (!this.lastActivity) return 'No activity';
      return new Date(this.lastActivity).toLocaleString();
    }

    whenLoggedIn() {
      // I need help here
    }

    whenLoggedOut() {
      // and here  
    }
  }

  Scratch.extensions.register(new TurboAuth());
})(Scratch);
