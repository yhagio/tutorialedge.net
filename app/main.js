import Profile from "./profile/profile.js";

class Main {
  constructor() {
    // load in site utility script
    // match corresponding script to 
    if (window.location.pathname === "/search/") {
      this.search = new Search();
    }
    if (window.location.pathname === "/profile/") {
      this.profile = new Profile();
    }
  }
}

// main entry point
let main = new Main();
