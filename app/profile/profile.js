// import axios from 'axios';
import Auth from '../auth/auth.js';

export default class Profile {
  constructor() {
    console.log("Hi");
    if(!this.isLoggedIn()) {
      window.location.replace('http://localhost:3000/login');
    }
  }

  logout() {

  }

  isLoggedIn() {
    console.log("checking logged in status");
    if(document.cookie.indexOf("jwt-token") >= 0) {
      // 1. Validate Users' JWT-Token
      Auth.isAuthenticated();
      // 2. 
      return true;
    }
    return false;
  }
}

