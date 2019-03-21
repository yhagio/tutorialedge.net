/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/app";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/auth/auth.js":
/*!**************************!*\
  !*** ./app/auth/auth.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Auth; });\nclass Auth {\n  constructor() {}\n\n  static isAuthenticated() {}\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvYXV0aC9hdXRoLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2F1dGgvYXV0aC5qcz82MTIyIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dGgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGlzQXV0aGVudGljYXRlZCgpIHtcblxuICAgIH1cbn0gIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQU5BIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/auth/auth.js\n");

/***/ }),

/***/ "./app/main.js":
/*!*********************!*\
  !*** ./app/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _profile_profile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile/profile.js */ \"./app/profile/profile.js\");\n\n\nclass Main {\n  constructor() {\n    // load in site utility script\n    // match corresponding script to \n    if (window.location.pathname === \"/profile/\") {\n      this.profile = new _profile_profile_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    }\n  }\n\n} // main entry point\n\n\nlet main = new Main();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9tYWluLmpzP2YxNjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2ZpbGUgZnJvbSBcIi4vcHJvZmlsZS9wcm9maWxlLmpzXCI7XG5cbmNsYXNzIE1haW4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBsb2FkIGluIHNpdGUgdXRpbGl0eSBzY3JpcHRcbiAgICAvLyBtYXRjaCBjb3JyZXNwb25kaW5nIHNjcmlwdCB0byBcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9wcm9maWxlL1wiKSB7XG4gICAgICB0aGlzLnByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBtYWluIGVudHJ5IHBvaW50XG5sZXQgbWFpbiA9IG5ldyBNYWluKCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQUNBO0FBU0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app/main.js\n");

/***/ }),

/***/ "./app/profile/profile.js":
/*!********************************!*\
  !*** ./app/profile/profile.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Profile; });\n/* harmony import */ var _auth_auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/auth.js */ \"./app/auth/auth.js\");\n// import axios from 'axios';\n\nclass Profile {\n  constructor() {// if(!this.isLoggedIn()) {\n    //   window.location.replace('http://localhost:3000/login');\n    // }\n  }\n\n  isLoggedIn() {\n    if (document.cookie.indexOf(\"jwt-token\") >= 0) {\n      // 1. Validate Users' JWT-Token\n      _auth_auth_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isAuthenticated(); // 2. \n\n      return true;\n    }\n\n    return false;\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvcHJvZmlsZS9wcm9maWxlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL3Byb2ZpbGUvcHJvZmlsZS5qcz85NDU5Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgQXV0aCBmcm9tICcuLi9hdXRoL2F1dGguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9maWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gaWYoIXRoaXMuaXNMb2dnZWRJbigpKSB7XG4gICAgLy8gICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2xvZ2luJyk7XG4gICAgLy8gfVxuICB9XG5cbiAgaXNMb2dnZWRJbigpIHtcbiAgICBpZihkb2N1bWVudC5jb29raWUuaW5kZXhPZihcImp3dC10b2tlblwiKSA+PSAwKSB7XG4gICAgICAvLyAxLiBWYWxpZGF0ZSBVc2VycycgSldULVRva2VuXG4gICAgICBBdXRoLmlzQXV0aGVudGljYXRlZCgpO1xuICAgICAgLy8gMi4gXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFoQkEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app/profile/profile.js\n");

/***/ })

/******/ });