import axios from "axios";
import Search from "./search/search.js";
import Profile from "./profile/profile.js";
import Utils from "./utils/utils.js";

class Main {
  constructor() {
    // load in site utility script
    this.utils = new Utils();

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
