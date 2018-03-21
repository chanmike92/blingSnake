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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$b = $b;

function $b (input) {
  if (typeof input === "string") {
    let nodelist = document.querySelectorAll(input);
    let elArray = [];
    for (var i = 0; i < nodelist.length; i++) {
      elArray.push(nodelist[i]);
    }
    return new DOMNodeCollection(elArray);
  }
  else if (input instanceof HTMLElement) {
    return new DOMNodeCollection([input]);
  }
  else if (input instanceof Function) {
    let functionQueue = [];
    if (document.readyState === 'complete') {
      input();
    } else {
    functionQueue.push(input);
    document.addEventListener('DOMContentLoaded', (e) => {
      functionQueue.forEach((funct) => funct());
      functionQueue = [];
      });
    }
  }
}

$b.extend = (...objects) => {
  return Object.assign({}, ...objects);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elArr) {
    this.elArr = elArr;
  }

  html(arg) {
    if (typeof arg === 'undefined') {
      return this.elArr[0].innerHTML;
    } else {
      this.elArr.forEach((el) => {
       el.innerHTML = arg;
     });
    }
  }

  empty() {
    this.html = "";
  }

  append(arg) {
    if (typeof arg === 'string') {
      this.elArr.forEach((el) => {
        el.innerHTML += arg;
      });
    }
    else if (arg instanceof HTMLElement) {
      this.elArr.forEach((el) => {
        el.innerHTML += arg.outerHTML;
      });
    }
    else if (arg instanceof DOMNodeCollection) {
      const limit = this.elArr.length;
      arg.elArr.forEach((argEl) => {
        for (var i = 0; i < limit; i++) {
          this.elArr[i].innerHTML += argEl.outerHTML;
        }
      });
    }
  }

  attr(name, value) {
    if (typeof value === 'undefined') {
      return this.elArr[0].getAttribute(name);
    } else {
    this.elArr[0].setAttribute(name, value);
    }
  }

  addClass(names) {
    this.elArr.forEach((el) => {
      el.classList.add(names);
    });
  }

  removeClass(names) {
    this.elArr.forEach((el) => {
      el.classList.remove(names);
    });
  }

  children() {
    const childrenArr = [];
    this.elArr.forEach((el) => {
      if (el.children.length === 0) {
        return this;
      } else {
        el.children.forEach((childNode) => {
          childrenArr.push(childNode);
        });
      }
    });
    const currentgen = new DOMNodeCollection(childrenArr);
    return currentgen.children();
  }

  parent() {
    const parentArr = [];
    this.elArr.forEach((el) => {
      parentArr.push(el.parentNode);
    });

    return parentArr;
  }

  find(selector) {
    const selectArr = [];
    this.elArr.forEach((el) => {
      el.querySelectorAll(selector).forEach(selectedEl => {
        selectArr.push(selectedEl);
      });
    });
    return selectArr;
  }

  remove() {
    this.elArr.forEach((el) => el.remove());
    this.elArr = [];
  }

  on(type, listener) {
    this.elArr.forEach((el) => {
      el[type] = listener;
      el.addEventListener(type, listener);
    });
  }

  off(type) {
    this.elArr.forEach((el) => {
      el.removeEventListener(type, el[type]);
    });
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=bling.js.map