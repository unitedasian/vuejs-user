(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue-authenticate"), require("vue-axios"), require("vue"), require("vuex"), require("vue-ls"));
	else if(typeof define === 'function' && define.amd)
		define(["vue-authenticate", "vue-axios", "vue", "vuex", "vue-ls"], factory);
	else if(typeof exports === 'object')
		exports["uam-vue-user"] = factory(require("vue-authenticate"), require("vue-axios"), require("vue"), require("vuex"), require("vue-ls"));
	else
		root["uam-vue-user"] = factory(root["vue-authenticate"], root["vue-axios"], root["vue"], root["vuex"], root["vue-ls"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_132__, __WEBPACK_EXTERNAL_MODULE_133__, __WEBPACK_EXTERNAL_MODULE_129__, __WEBPACK_EXTERNAL_MODULE_130__, __WEBPACK_EXTERNAL_MODULE_131__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 61);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(39)('wks');
var uid = __webpack_require__(40);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(2);
var ctx = __webpack_require__(11);
var hide = __webpack_require__(6);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(35);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(20)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3);
var IE8_DOM_DEFINE = __webpack_require__(67);
var toPrimitive = __webpack_require__(68);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(12);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(66)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(33)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(37);
var defined = __webpack_require__(19);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(39)('keys');
var uid = __webpack_require__(40);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(13);
var TAG = __webpack_require__(0)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77);
var global = __webpack_require__(1);
var hide = __webpack_require__(6);
var Iterators = __webpack_require__(8);
var TO_STRING_TAG = __webpack_require__(0)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(14);
var TAG = __webpack_require__(0)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(12);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(50);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(104)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssridKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);




var Profile = function () {
  function Profile(state) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Profile);

    this.init(state);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Profile, [{
    key: "init",
    value: function init(state) {
      var defaultState = {
        gender: null,
        given_name: null,
        surname: null
      };

      this.state = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(defaultState, state);
    }
  }, {
    key: "gender",
    get: function get() {
      return this.state.gender;
    },
    set: function set(gender) {
      this.state.gender = gender;
    }
  }, {
    key: "givenName",
    get: function get() {
      return this.state.given_name;
    },
    set: function set(givenName) {
      this.state.given_name = givenName;
    }
  }, {
    key: "surname",
    get: function get() {
      return this.state.surname;
    },
    set: function set(surname) {
      this.state.surname = surname;
    }
  }]);

  return Profile;
}();

/* harmony default export */ __webpack_exports__["a"] = (Profile);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(34);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(69);
var hide = __webpack_require__(6);
var has = __webpack_require__(13);
var Iterators = __webpack_require__(8);
var $iterCreate = __webpack_require__(70);
var setToStringTag = __webpack_require__(24);
var getPrototypeOf = __webpack_require__(76);
var ITERATOR = __webpack_require__(0)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(73);
var enumBugKeys = __webpack_require__(41);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(14);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(18);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(19);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(26);
var ITERATOR = __webpack_require__(0)('iterator');
var Iterators = __webpack_require__(8);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(3);
var aFunction = __webpack_require__(12);
var SPECIES = __webpack_require__(0)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var invoke = __webpack_require__(85);
var html = __webpack_require__(42);
var cel = __webpack_require__(21);
var global = __webpack_require__(1);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(14)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3);
var isObject = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(27);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(50);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Loading__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_MixinNotification_vue__ = __webpack_require__(53);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    isSocialAuthPending: function isSocialAuthPending() {
      return this.$store.getters['user/isSocialAuthPending'];
    },
    isRequestPending: function isRequestPending() {
      return this.$store.getters['user/isRequestPending'];
    }
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0__components_Loading__["a" /* default */]
  },

  data: function data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    };
  },


  methods: {
    authenticate: function authenticate(provider) {
      var _this = this;

      this.clearNotifications();

      this.$auth.authenticate(provider).then(function (authResponse) {
        _this.$uamAuth.loginWithToken(authResponse.data).then(function () {
          _this.$router.push({ name: 'home' });
        }).catch(function () {
          _this.addNotification(_this.$i18n.t('user.login.notifyLabel.unknownError'));
        });
      }, function (error) {
        if (error.message === 'Network Error') {
          _this.addNotification(_this.$i18n.t('user.login.notifyLabel.cannotconnect'));
        }
      });
    },
    onSubmit: function onSubmit() {
      var _this2 = this;

      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this2.clearNotifications();

          _this2.$uamAuth.login(_this2.credentials).then(function () {
            _this2.$emit('login-success');

            if (!_this2.noRedirect) {
              if (_this2.redirectTo !== undefined) {
                _this2.$router.push({ name: _this2.redirectTo });
              } else {
                _this2.$router.push({ name: 'home' });
              }
            }
          }).catch(function (error) {
            if (error.response && error.response.status === 401) {
              _this2.credentials.password = '';
              _this2.addNotification(_this2.$i18n.t('user.login.notifyLabel.unauthorized'));
            } else {
              _this2.addNotification(_this2.$i18n.t('user.login.notifyLabel.cannotconnect'));
            }
          });
        }
      });
    }
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_MixinNotification_vue__["a" /* default */]],

  name: 'uam-user-login',

  props: {
    noRedirect: { // if enabled, no redirect after successful login
      type: Boolean,
      default: false
    },

    redirectTo: String,

    title: String,

    facebook: { // facebook login
      type: Boolean,
      default: false
    },

    github: { // github login
      type: Boolean,
      default: false
    },

    google: { // google login
      type: Boolean,
      default: false
    },

    linkedin: { // linkedin login
      type: Boolean,
      default: false
    }
  }
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'uam-user-loading'
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MixinNotification_vue__ = __webpack_require__(54);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_24143e88_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MixinNotification_vue__ = __webpack_require__(110);
var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MixinNotification_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_24143e88_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MixinNotification_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/mixins/MixinNotification.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24143e88", Component.options)
  } else {
    hotAPI.reload("data-v-24143e88", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Notification_vue__ = __webpack_require__(55);
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    'notification': __WEBPACK_IMPORTED_MODULE_0__components_Notification_vue__["a" /* default */]
  },

  computed: {
    showNotification: function showNotification() {
      return this.notifications.length !== 0;
    }
  },

  data: function data() {
    return {
      notifications: []
    };
  },


  methods: {
    addNotification: function addNotification(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'danger';

      this.notifications.push({ message: message, type: type });
    },

    clearNotifications: function clearNotifications() {
      this.notifications = [];
    }
  }
});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Notification_vue__ = __webpack_require__(56);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9084a0ca_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Notification_vue__ = __webpack_require__(109);
var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Notification_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9084a0ca_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Notification_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Notification.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9084a0ca", Component.options)
  } else {
    hotAPI.reload("data-v-9084a0ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'uam_notification',

  props: ['notifications']
});

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_MixinNotification_vue__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_Profile__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_User__ = __webpack_require__(58);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    isRequestPending: function isRequestPending() {
      return this.$store.getters['user/isRequestPending'];
    }
  },

  created: function created() {
    var dictionary = {
      custom: {
        gender: {
          required: function required() {
            return 'Select gender.';
          }
        }
      }
    };

    this.$validator.localize('en', dictionary);
  },
  data: function data() {
    return {
      confirmPassword: '',
      genderOptions: [{ text: this.$i18n.t('user.profile.gender.options.female'), value: 1 }, { text: this.$i18n.t('user.profile.gender.options.male'), value: 2 }],
      profile: new __WEBPACK_IMPORTED_MODULE_1__models_Profile__["a" /* default */](this.$uamAuth.user.profile.state),
      scope: {
        credentials: 'user',
        profile: 'profile'
      },
      user: new __WEBPACK_IMPORTED_MODULE_2__models_User__["a" /* default */](this.$uamAuth.user.state)
    };
  },


  methods: {
    onSubmit: function onSubmit(scope) {
      var _this = this;

      this.$validator.validateAll(scope).then(function (result) {
        if (result) {
          if (scope === _this.scope.credentials) {
            _this.updateUser();
          }

          if (scope === _this.scope.profile) {
            _this.updateProfile();
          }
        }
      });
    },
    updateProfile: function updateProfile() {
      var _this2 = this;

      this.clearNotifications();

      this.$axios.put(this.updateUrl + this.$uamAuth.user.id, { profile: this.profile.state }).then(function (response) {
        _this2.$uamAuth.updateProfile(response.data.profile).then(function () {
          _this2.addNotification(_this2.$i18n.t('user.profile.notifyLabel.updated'), 'success');
        });
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          _this2.$uamAuth.refreshToken().then(function () {
            _this2.$axios.put(_this2.updateUrl + _this2.$uamAuth.user.id, { profile: _this2.profile.state }).then(function (response) {
              _this2.$uamAuth.updateProfile(response.data.profile).then(function () {
                _this2.addNotification(_this2.$i18n.t('user.profile.notifyLabel.updated'), 'success');
              });
            });
          }).catch(function (error) {
            if (error.response.status === 401) {
              _this2.$emit('unauthorized-error');
            } else {
              _this2.addNotification(_this2.$i18n.t('user.profile.notifyLabel.cannotrefresh'));
            }
          });
        } else if (error.response && error.response.status === 422) {
          _this2.addNotification(_this2.$i18n.t('user.profile.notifyLabel.validationError'));
        } else {
          _this2.addNotification(_this2.$i18n.t('user.profile.notifyLabel.cannotconnect'));
        }
      });
    },
    updateUser: function updateUser() {
      var _this3 = this;

      this.clearNotifications();

      this.$axios.put(this.updateUrl + this.$uamAuth.user.id, { user: this.user.state }).then(function (response) {
        _this3.$uamAuth.updateUser(response.data).then(function () {
          _this3.addNotification(_this3.$i18n.t('user.profile.notifyLabel.updated'), 'success');
        });
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          _this3.$uamAuth.refreshToken().then(function () {
            _this3.$axios.put(_this3.updateUrl + _this3.$uamAuth.user.id, { user: _this3.user.state }).then(function (response) {
              _this3.$uamAuth.updateUser(response.data).then(function () {
                _this3.addNotification(_this3.$i18n.t('user.profile.notifyLabel.updated'), 'success');
              });
            });
          }).catch(function (error) {
            if (error.response.status === 401) {
              _this3.$emit('unauthorized-error');
            } else {
              _this3.addNotification(_this3.$i18n.t('user.profile.notifyLabel.cannotrefresh'));
            }
          });
        } else if (error.response && error.response.status === 422) {
          _this3.addNotification(_this3.$i18n.t('user.profile.notifyLabel.uniqueEmail'));
        } else {
          _this3.addNotification(_this3.$i18n.t('user.profile.notifyLabel.cannotconnect'));
        }
      });
    }
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_MixinNotification_vue__["a" /* default */]],

  name: 'uam_profile',

  props: ['update-url']
});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Profile__ = __webpack_require__(31);





var User = function () {
  function User(state) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, User);

    this.init(state);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(User, [{
    key: 'init',
    value: function init(state) {
      var defaultState = {
        email: null,
        id: null,
        password: null,
        username: null
      };

      this.state = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(defaultState, state);

      this.profile = state && state.profile ? new __WEBPACK_IMPORTED_MODULE_3__Profile__["a" /* default */](state.profile) : new __WEBPACK_IMPORTED_MODULE_3__Profile__["a" /* default */]();
    }
  }, {
    key: 'email',
    get: function get() {
      return this.state.email;
    },
    set: function set(email) {
      this.state.email = email;
    }
  }, {
    key: 'id',
    get: function get() {
      return this.state.id;
    },
    set: function set(id) {
      this.state.id = id;
    }
  }, {
    key: 'password',
    get: function get() {
      return this.state.password;
    },
    set: function set(password) {
      this.state.password = password;
    }
  }, {
    key: 'profile',
    get: function get() {
      return this.state.profile;
    },
    set: function set(profile) {
      this.state.profile = profile;
    }
  }, {
    key: 'username',
    get: function get() {
      return this.state.username;
    },
    set: function set(username) {
      this.state.username = username;
    }
  }]);

  return User;
}();

/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    isLoggedIn: function isLoggedIn() {
      return this.$uamAuth.isLoggedIn();
    },
    profileRoute: function profileRoute() {
      return this.$uamAuth.routes.profile;
    },
    signupRoute: function signupRoute() {
      return this.$uamAuth.routes.signup;
    }
  },

  methods: {
    login: function login() {
      this.$router.push({ name: this.$uamAuth.routes.login });
    },
    logout: function logout() {
      var _this = this;

      this.$uamAuth.logout().then(function () {
        _this.$router.push({ name: _this.$uamAuth.routes.logout });
      });
    },
    profile: function profile() {
      this.$router.push({ name: this.$uamAuth.routes.profile });
    },
    signup: function signup() {
      if (this.$uamAuth.doSignup) {
        this.$router.push({ name: this.$uamAuth.routes.signup });
      }
    }
  },

  name: 'uam-user-menu',

  props: {
    divider: {
      type: Boolean,
      default: true
    },
    right: { // Right align dowpdown menu (default is left align)
      type: Boolean,
      default: false
    },
    welcome: String
  }
});

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'login',

  props: ['redirectTo']
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
module.exports = __webpack_require__(63);


/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__authenticator__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_Profile__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_User__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_store_module__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_authenticate__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_authenticate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_vue_authenticate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_axios__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_vue_axios__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UAMProfile", function() { return __WEBPACK_IMPORTED_MODULE_3__models_Profile__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UAMUser", function() { return __WEBPACK_IMPORTED_MODULE_4__models_User__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UAMUserRouter", function() { return __WEBPACK_IMPORTED_MODULE_5__router__["a"]; });











var VuePlugin = {
  /**
   * Install user plugin
   *
   * @param {Vue} Vue
   * @param {Object} options
   */
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (Vue._uam_user_vue_installed) {
      return;
    }

    Vue._uam_user_vue_installed = true;

    options.redirectRoute = options.redirectRoute || 'login';

    var store = options.store;

    Vue.axios = options.axios;
    Vue.prototype.$axios = options.axios;

    var axios = Vue.axios;

    var profileModel = options.profileModel || new __WEBPACK_IMPORTED_MODULE_3__models_Profile__["a" /* default */]();
    var userModel = options.userModel || new __WEBPACK_IMPORTED_MODULE_4__models_User__["a" /* default */]();

    var localStorageNamespace = options.localStorageNamespace || '_user_';

    var userModule = Object(__WEBPACK_IMPORTED_MODULE_6__user_store_module__["a" /* default */])({ axios: axios, userModel: userModel, profileModel: profileModel, localStorageNamespace: localStorageNamespace });

    // Registered store module is namespaced based on the path(module name) the module is registered at
    var moduleName = 'user';
    var moduleNamespace = moduleName;

    // register `user` module to store dynamically
    store.registerModule(moduleName, userModule);

    var authenticator = new __WEBPACK_IMPORTED_MODULE_1__authenticator__["a" /* default */]({
      apiRoutes: options.apiRoutes,
      credentialsParamMapper: options.credentialsParamMapper,
      namespace: moduleNamespace,
      routes: options.routes,
      store: store
    });

    Vue.uamAuth = authenticator;
    Vue.prototype.$uamAuth = authenticator;

    // Register global components
    for (var component in __WEBPACK_IMPORTED_MODULE_2__components__) {
      Vue.component(component, __WEBPACK_IMPORTED_MODULE_2__components__[component]);
    }

    options.router.beforeEach(function (to, from, next) {
      if (to.matched.length) {
        if (to.matched.some(function (record) {
          return record.meta.requiresAuth;
        })) {
          // this route requires authenticated user, check if logged in
          // if not, redirect to login page.
          if (!Vue.uamAuth.isLoggedIn()) {
            next({
              name: options.redirectRoute,
              query: { redirect: to.name }
            });
          } else {
            if (Vue.uamAuth.isTokenExpired()) {
              // check if access token expired on client side (offline auth)
              Vue.uamAuth.refreshToken().then(function () {
                next();
              }).catch(function () {
                if (to.matched.some(function (record) {
                  return record.meta.redirectOnExpire;
                })) {
                  // at-least one of child routes or parent route record have meta field `redirectOnExpire` set to true
                  next({
                    name: options.redirectRoute,
                    query: { redirect: to.name }
                  });
                } else {
                  next();
                }
              });
            } else {
              next();
            }
          }
        } else {
          // doesn't require any authentication such as home page, login page
          next();
        }
      } else {
        // when url path doesn't match with any registered route
        window.location = window.location.origin;
      }
    });

    var socialAuthAxiosInstance = axios.create({});

    Vue.use(__WEBPACK_IMPORTED_MODULE_8_vue_axios___default.a, socialAuthAxiosInstance);

    var axiosInterceptors = {
      bindRequestInterceptor: function bindRequestInterceptor() {
        socialAuthAxiosInstance.interceptors.request.use(function (config) {
          store.dispatch(moduleNamespace + '/updateSocialAuthPending', true);
          return config;
        }, function (error) {
          store.dispatch(moduleNamespace + '/updateSocialAuthPending', false);
          return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(error);
        });
      },

      bindResponseInterceptor: function bindResponseInterceptor() {
        socialAuthAxiosInstance.interceptors.response.use(function (response) {
          store.dispatch(moduleNamespace + '/updateSocialAuthPending', false);
          return response;
        }, function (error) {
          store.dispatch(moduleNamespace + '/updateSocialAuthPending', false);
          return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(error);
        });
      }
    };

    for (var name in axiosInterceptors) {
      options.vueAuthenticateOptions[name] = axiosInterceptors[name];
    }

    Vue.use(__WEBPACK_IMPORTED_MODULE_7_vue_authenticate___default.a, options.vueAuthenticateOptions);

    // Axios request interceptor
    axios.interceptors.request.use(function (config) {
      store.dispatch(moduleNamespace + '/updateRequestPending', true);
      return config;
    }, function (error) {
      store.dispatch(moduleNamespace + '/updateRequestPending', false);
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(error);
    });

    // Axios response interceptor
    axios.interceptors.response.use(function (response) {
      store.dispatch(moduleNamespace + '/updateRequestPending', false);
      return response;
    }, function (error) {
      store.dispatch(moduleNamespace + '/updateRequestPending', false);
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(error);
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlugin);
}

/* harmony default export */ __webpack_exports__["default"] = (VuePlugin);



/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65);
__webpack_require__(17);
__webpack_require__(25);
__webpack_require__(80);
__webpack_require__(90);
__webpack_require__(91);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 65 */
/***/ (function(module, exports) {



/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18);
var defined = __webpack_require__(19);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(20)(function () {
  return Object.defineProperty(__webpack_require__(21)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(71);
var descriptor = __webpack_require__(35);
var setToStringTag = __webpack_require__(24);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(0)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(3);
var dPs = __webpack_require__(72);
var enumBugKeys = __webpack_require__(41);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(21)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(42).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(3);
var getKeys = __webpack_require__(36);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(13);
var toIObject = __webpack_require__(22);
var arrayIndexOf = __webpack_require__(74)(false);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(22);
var toLength = __webpack_require__(38);
var toAbsoluteIndex = __webpack_require__(75);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(13);
var toObject = __webpack_require__(43);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(78);
var step = __webpack_require__(79);
var Iterators = __webpack_require__(8);
var toIObject = __webpack_require__(22);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(33)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(34);
var global = __webpack_require__(1);
var ctx = __webpack_require__(11);
var classof = __webpack_require__(26);
var $export = __webpack_require__(5);
var isObject = __webpack_require__(10);
var aFunction = __webpack_require__(12);
var anInstance = __webpack_require__(81);
var forOf = __webpack_require__(82);
var speciesConstructor = __webpack_require__(45);
var task = __webpack_require__(46).set;
var microtask = __webpack_require__(86)();
var newPromiseCapabilityModule = __webpack_require__(27);
var perform = __webpack_require__(47);
var promiseResolve = __webpack_require__(48);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(0)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(87)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(24)($Promise, PROMISE);
__webpack_require__(88)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(89)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var call = __webpack_require__(83);
var isArrayIter = __webpack_require__(84);
var anObject = __webpack_require__(3);
var toLength = __webpack_require__(38);
var getIterFn = __webpack_require__(44);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(3);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(8);
var ITERATOR = __webpack_require__(0)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(46).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(14)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(6);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var core = __webpack_require__(2);
var dP = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(0)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(0)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(5);
var core = __webpack_require__(2);
var global = __webpack_require__(1);
var speciesConstructor = __webpack_require__(45);
var promiseResolve = __webpack_require__(48);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(27);
var perform = __webpack_require__(47);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);





var Authenticator = function () {
  function Authenticator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Authenticator);

    this.store = options.store;

    this.routes = options.routes;

    this.apiRoutes = {
      login: '/login',
      logout: '/logout',
      refresh: '/login/refresh',
      currentUser: '/user/me?includes[]=profile'
    };

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(this.apiRoutes, options.apiRoutes);

    this.credentialsParamMapper = {
      username: 'username',
      password: 'password'
    };

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(this.credentialsParamMapper, options.credentialsParamMapper);

    this.namespace = options.namespace || 'user'; // namespace of store module
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Authenticator, [{
    key: 'isLoggedIn',
    value: function isLoggedIn() {
      return this.store.getters[this.namespace + '/isLoggedIn'];
    }
  }, {
    key: 'isRefreshExpired',
    value: function isRefreshExpired() {
      return this.store.getters[this.namespace + '/isRefreshExpired'];
    }
  }, {
    key: 'isTokenExpired',
    value: function isTokenExpired() {
      return this.store.getters[this.namespace + '/tokenExpiresAt'] <= new Date().getTime();
    }
  }, {
    key: 'convertCredentials',
    value: function convertCredentials(credentials) {
      var _ref;

      return _ref = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, this.credentialsParamMapper.username, credentials.username), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, this.credentialsParamMapper.password, credentials.password), _ref;
    }
  }, {
    key: 'login',
    value: function login(credentials) {
      var convertedCredentials = this.convertCredentials(credentials);

      return this.store.dispatch(this.namespace + '/login', {
        credentials: convertedCredentials,
        loginUrl: this.apiRoutes.login,
        currentUserUrl: this.apiRoutes.currentUser
      });
    }

    /**
     * @param {Object} token
     * @param {string} token.access_token
     * @param {number} token.expires_in The duration to expire in seconds
     */

  }, {
    key: 'loginWithToken',
    value: function loginWithToken(token) {
      return this.store.dispatch(this.namespace + '/loginWithToken', {
        token: token,
        currentUserUrl: this.apiRoutes.currentUser
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      return this.store.dispatch(this.namespace + '/logout', {
        logoutUrl: this.apiRoutes.logout
      });
    }
  }, {
    key: 'refreshToken',
    value: function refreshToken() {
      return this.store.dispatch(this.namespace + '/refreshToken', {
        refreshUrl: this.apiRoutes.refresh
      });
    }
  }, {
    key: 'updateProfile',
    value: function updateProfile(profile) {
      return this.store.dispatch(this.namespace + '/updateProfile', profile);
    }
  }, {
    key: 'updateUser',
    value: function updateUser(user) {
      return this.store.dispatch(this.namespace + '/updateUser', user);
    }
  }, {
    key: 'user',
    get: function get() {
      return this.store.getters[this.namespace + '/user'];
    }
  }]);

  return Authenticator;
}();

/* harmony default export */ __webpack_exports__["a"] = (Authenticator);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(97) });


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(98);
var pIE = __webpack_require__(99);
var toObject = __webpack_require__(43);
var IObject = __webpack_require__(37);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(20)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 99 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Login_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Notification_vue__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Profile_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UserMenu_vue__ = __webpack_require__(116);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "uamLogin", function() { return __WEBPACK_IMPORTED_MODULE_0__Login_vue__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "uamNotification", function() { return __WEBPACK_IMPORTED_MODULE_1__Notification_vue__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "uamProfile", function() { return __WEBPACK_IMPORTED_MODULE_2__Profile_vue__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "uamUserMenu", function() { return __WEBPACK_IMPORTED_MODULE_3__UserMenu_vue__["a"]; });







/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__ = __webpack_require__(51);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ef68022e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__ = __webpack_require__(111);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(102)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ef68022e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ef68022e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ef68022e", Component.options)
  } else {
    hotAPI.reload("data-v-ef68022e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(103);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(30)("524a7815", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ef68022e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ef68022e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, "\n.login[data-v-ef68022e] {\n  align-items: flex-start;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n.login .invalid-feedback[data-v-ef68022e] {\n    display: block;\n}\n", ""]);

// exports


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Loading_vue__ = __webpack_require__(52);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_efe9d588_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Loading_vue__ = __webpack_require__(108);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(106)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-efe9d588"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Loading_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_efe9d588_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Loading_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Loading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-efe9d588", Component.options)
  } else {
    hotAPI.reload("data-v-efe9d588", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(107);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(30)("cb1328b0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-efe9d588\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Loading.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-efe9d588\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Loading.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, "\n.loading[data-v-efe9d588] {\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "loading" }, [
      _c("i", { staticClass: "fa fa-refresh fa-spin fa-4x" })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-efe9d588", esExports)
  }
}

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    _vm._l(_vm.notifications, function(notification, index) {
      return _c(
        "div",
        {
          key: index,
          class: "alert alert-" + notification.type,
          attrs: { role: "alert" }
        },
        [_vm._v("\n    " + _vm._s(notification.message) + "\n  ")]
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9084a0ca", esExports)
  }
}

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.showNotification
    ? _c("notification", {
        staticClass: "notify",
        attrs: { notifications: _vm.notifications }
      })
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-24143e88", esExports)
  }
}

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "login" }, [
    _c(
      "main",
      [
        _c("h1", [
          _vm._v(
            "\n      " +
              _vm._s(_vm.title ? _vm.title : _vm.$t("user.login.title")) +
              "\n    "
          )
        ]),
        _vm._v(" "),
        _vm.isRequestPending || _vm.isSocialAuthPending
          ? _vm._t("loading", [_c("Loading")])
          : _c(
              "div",
              [
                _vm.showNotification
                  ? _c("notification", {
                      staticClass: "notify",
                      attrs: { notifications: _vm.notifications }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "form",
                  {
                    staticClass: "login-form",
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        _vm.onSubmit($event)
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "username" } }, [
                        _vm._v(_vm._s(_vm.$t("user.login.username.label")))
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.credentials.username,
                            expression: "credentials.username"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          placeholder: this.$i18n.t(
                            "user.login.username.placeholder"
                          ),
                          id: "username",
                          name: "username",
                          type: "text",
                          required: ""
                        },
                        domProps: { value: _vm.credentials.username },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.credentials,
                              "username",
                              $event.target.value
                            )
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "password" } }, [
                        _vm._v(_vm._s(_vm.$t("user.login.password.label")))
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.credentials.password,
                            expression: "credentials.password"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          placeholder: this.$i18n.t(
                            "user.login.password.placeholder"
                          ),
                          id: "password",
                          name: "password",
                          type: "password",
                          required: ""
                        },
                        domProps: { value: _vm.credentials.password },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.credentials,
                              "password",
                              $event.target.value
                            )
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: { type: "submit" }
                      },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.$t("user.login.submit")) +
                            "\n        "
                        )
                      ]
                    )
                  ]
                ),
                _vm._v(" "),
                _vm.facebook || _vm.github || _vm.google || _vm.linkedin
                  ? _c("div", { staticClass: "with" }, [
                      _c("p", [_vm._v(_vm._s(_vm.$t("login.with")))]),
                      _vm._v(" "),
                      _vm.facebook
                        ? _c("a", {
                            staticClass: "fa fa facebook",
                            on: {
                              click: function($event) {
                                _vm.authenticate("facebook")
                              }
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.google
                        ? _c("a", {
                            staticClass: "fa fa google",
                            on: {
                              click: function($event) {
                                _vm.authenticate("google")
                              }
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.linkedin
                        ? _c("a", {
                            staticClass: "fa fa linkedin",
                            on: {
                              click: function($event) {
                                _vm.authenticate("linkedin")
                              }
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.github
                        ? _c("a", {
                            staticClass: "fa fa github",
                            on: {
                              click: function($event) {
                                _vm.authenticate("github")
                              }
                            }
                          })
                        : _vm._e()
                    ])
                  : _vm._e()
              ],
              1
            )
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ef68022e", esExports)
  }
}

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Profile_vue__ = __webpack_require__(57);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bf1681ae_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Profile_vue__ = __webpack_require__(115);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(113)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bf1681ae"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Profile_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bf1681ae_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Profile_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Profile.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bf1681ae", Component.options)
  } else {
    hotAPI.reload("data-v-bf1681ae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(114);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(30)("5c895da8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bf1681ae\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Profile.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bf1681ae\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Profile.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, "\n.invalid-feedback[data-v-bf1681ae] {\n    display: block;\n}\n", ""]);

// exports


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.showNotification
        ? _c("notification", {
            staticClass: "notify",
            attrs: { notifications: _vm.notifications }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.isRequestPending
        ? _c("i", {
            staticClass: "fa fa-spinner fa-3x fa-spin loading",
            attrs: { "aria-hidden": "true" }
          })
        : _c(
            "b-card",
            { attrs: { "no-body": "" } },
            [
              _c(
                "b-tabs",
                { ref: "tabs", attrs: { card: "" } },
                [
                  _c(
                    "b-tab",
                    {
                      attrs: {
                        title: this.$i18n.t(
                          "user.profile.tabLabel.credentials"
                        ),
                        active: ""
                      }
                    },
                    [
                      _c(
                        "form",
                        {
                          attrs: { "data-vv-scope": _vm.scope.credentials },
                          on: {
                            submit: function($event) {
                              $event.preventDefault()
                              _vm.onSubmit("user")
                            }
                          }
                        },
                        [
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { attrs: { for: "uam_username" } }, [
                              _vm._v(
                                _vm._s(_vm.$t("user.profile.username.label"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.user.username,
                                  expression: "user.username"
                                },
                                {
                                  name: "validate",
                                  rawName: "v-validate",
                                  value: "required|min:2|max:255",
                                  expression: "'required|min:2|max:255'"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                placeholder: this.$i18n.t(
                                  "user.profile.username.placeholder"
                                ),
                                required: "",
                                type: "text",
                                id: "uam_username",
                                name: "username"
                              },
                              domProps: { value: _vm.user.username },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.user,
                                    "username",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.errors.has("user.username"),
                                    expression: "errors.has('user.username')"
                                  }
                                ],
                                staticClass: "invalid-feedback"
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.errors.first("user.username"))
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { attrs: { for: "email" } }, [
                              _vm._v(_vm._s(_vm.$t("user.profile.email.label")))
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.user.email,
                                  expression: "user.email"
                                },
                                {
                                  name: "validate",
                                  rawName: "v-validate",
                                  value: "required|email",
                                  expression: "'required|email'"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                placeholder: this.$i18n.t(
                                  "user.profile.email.placeholder"
                                ),
                                name: "email",
                                required: "",
                                type: "email",
                                id: "email"
                              },
                              domProps: { value: _vm.user.email },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.user,
                                    "email",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.errors.has("user.email"),
                                    expression: "errors.has('user.email')"
                                  }
                                ],
                                staticClass: "invalid-feedback"
                              },
                              [_vm._v(_vm._s(_vm.errors.first("user.email")))]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { attrs: { for: "uam_password" } }, [
                              _vm._v(
                                _vm._s(_vm.$t("user.profile.password.label"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.user.password,
                                  expression: "user.password"
                                },
                                {
                                  name: "validate",
                                  rawName: "v-validate",
                                  value:
                                    "min:6|max:255|confirmed:confirm_password",
                                  expression:
                                    "'min:6|max:255|confirmed:confirm_password'"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                placeholder: this.$i18n.t(
                                  "user.profile.password.placeholder"
                                ),
                                type: "password",
                                id: "uam_password",
                                name: "password"
                              },
                              domProps: { value: _vm.user.password },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.user,
                                    "password",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.errors.has("user.password"),
                                    expression: "errors.has('user.password')"
                                  }
                                ],
                                staticClass: "invalid-feedback"
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.errors.first("user.password"))
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c(
                              "label",
                              { attrs: { for: "confirm-password" } },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.$t("user.profile.confirmPassword.label")
                                  )
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.confirmPassword,
                                  expression: "confirmPassword"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                placeholder: this.$i18n.t(
                                  "user.profile.confirmPassword.placeholder"
                                ),
                                type: "password",
                                id: "confirm-password",
                                name: "confirm_password"
                              },
                              domProps: { value: _vm.confirmPassword },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.confirmPassword = $event.target.value
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.errors.has(
                                      "user.confirm_password"
                                    ),
                                    expression:
                                      "errors.has('user.confirm_password')"
                                  }
                                ],
                                staticClass: "invalid-feedback"
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(
                                      _vm.errors.first("user.confirm_password")
                                    ) +
                                    "\n            "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: { type: "submit" }
                            },
                            [
                              _vm._v(
                                _vm._s(_vm.$t("user.profile.submit.label"))
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-tab",
                    {
                      attrs: {
                        title: this.$i18n.t("user.profile.tabLabel.you")
                      }
                    },
                    [
                      _c(
                        "form",
                        {
                          attrs: { "data-vv-scope": _vm.scope.profile },
                          on: {
                            submit: function($event) {
                              $event.preventDefault()
                              _vm.onSubmit("profile")
                            }
                          }
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "form-group" },
                            [
                              _vm._l(_vm.genderOptions, function(option) {
                                return _c(
                                  "div",
                                  {
                                    key: option.value,
                                    staticClass: "form-check form-check-inline"
                                  },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.profile.gender,
                                          expression: "profile.gender"
                                        },
                                        {
                                          name: "validate",
                                          rawName: "v-validate",
                                          value: "required|in:1,2",
                                          expression: "'required|in:1,2'"
                                        }
                                      ],
                                      staticClass: "form-check-input",
                                      attrs: {
                                        id: "gender_" + option.value,
                                        type: "radio",
                                        name: "gender"
                                      },
                                      domProps: {
                                        value: option.value,
                                        checked: _vm._q(
                                          _vm.profile.gender,
                                          option.value
                                        )
                                      },
                                      on: {
                                        change: function($event) {
                                          _vm.$set(
                                            _vm.profile,
                                            "gender",
                                            option.value
                                          )
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "label",
                                      {
                                        staticClass: "form-check-label",
                                        attrs: { for: "gender_" + option.value }
                                      },
                                      [_vm._v(_vm._s(option.text))]
                                    )
                                  ]
                                )
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.errors.has("profile.gender"),
                                      expression: "errors.has('profile.gender')"
                                    }
                                  ],
                                  staticClass: "invalid-feedback"
                                },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(
                                        _vm.errors.first("profile.gender")
                                      ) +
                                      "\n            "
                                  )
                                ]
                              )
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { attrs: { for: "given_name" } }, [
                              _vm._v(
                                _vm._s(_vm.$t("user.profile.givenName.label"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.profile.givenName,
                                  expression: "profile.givenName"
                                },
                                {
                                  name: "validate",
                                  rawName: "v-validate",
                                  value: "required|min:2|max:255",
                                  expression: "'required|min:2|max:255'"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                name: "given_name",
                                placeholder: this.$i18n.t(
                                  "user.profile.givenName.placeholder"
                                ),
                                type: "text",
                                id: "given_name",
                                required: ""
                              },
                              domProps: { value: _vm.profile.givenName },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.profile,
                                    "givenName",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.errors.has("profile.given_name"),
                                    expression:
                                      "errors.has('profile.given_name')"
                                  }
                                ],
                                staticClass: "invalid-feedback"
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(
                                      _vm.errors.first("profile.given_name")
                                    ) +
                                    "\n            "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { attrs: { for: "surname" } }, [
                              _vm._v(
                                _vm._s(_vm.$t("user.profile.surname.label"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.profile.surname,
                                  expression: "profile.surname"
                                },
                                {
                                  name: "validate",
                                  rawName: "v-validate",
                                  value: "required|min:2|max:255",
                                  expression: "'required|min:2|max:255'"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                name: "surname",
                                required: "",
                                type: "text",
                                id: "surname",
                                placeholder: this.$i18n.t(
                                  "user.profile.surname.placeholder"
                                )
                              },
                              domProps: { value: _vm.profile.surname },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.profile,
                                    "surname",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.errors.has("profile.surname"),
                                    expression: "errors.has('profile.surname')"
                                  }
                                ],
                                staticClass: "invalid-feedback"
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(
                                      _vm.errors.first("profile.surname")
                                    ) +
                                    "\n            "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: { type: "submit" }
                            },
                            [
                              _vm._v(
                                _vm._s(_vm.$t("user.profile.submit.label"))
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  )
                ],
                1
              )
            ],
            1
          )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-bf1681ae", esExports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserMenu_vue__ = __webpack_require__(59);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_53e47a0c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_UserMenu_vue__ = __webpack_require__(117);
var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserMenu_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_53e47a0c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_UserMenu_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/UserMenu.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53e47a0c", Component.options)
  } else {
    hotAPI.reload("data-v-53e47a0c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-nav",
    [
      !_vm.isLoggedIn
        ? [
            _c(
              "b-nav-item",
              {
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    _vm.login($event)
                  }
                }
              },
              [
                _vm._v(
                  "\n      " + _vm._s(_vm.$t("user.menu.login")) + "\n    "
                )
              ]
            ),
            _vm._v(" "),
            _vm.signupRoute
              ? _c(
                  "b-nav-item",
                  {
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.signup($event)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n      " + _vm._s(_vm.$t("user.menu.signup")) + "\n    "
                    )
                  ]
                )
              : _vm._e()
          ]
        : [
            _c(
              "b-nav-item-dropdown",
              { attrs: { right: true } },
              [
                _c("template", { slot: "button-content" }, [
                  _vm._v(
                    "\n        " +
                      _vm._s(
                        _vm.welcome
                          ? _vm.welcome
                          : _vm.$t("user.menu.welcome", {
                              user: _vm.$uamAuth.user.username
                            })
                      ) +
                      "\n      "
                  )
                ]),
                _vm._v(" "),
                _vm.profileRoute
                  ? _c(
                      "b-dropdown-item",
                      {
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.profile($event)
                          }
                        }
                      },
                      [
                        _c("i", {
                          staticClass: "fa fa-user",
                          attrs: { "aria-hidden": "true" }
                        }),
                        _vm._v(
                          " \n        " +
                            _vm._s(_vm.$t("user.menu.profile")) +
                            "\n      "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm._t("default"),
                _vm._v(" "),
                _vm.divider
                  ? _c("div", { staticClass: "dropdown-divider" })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "b-dropdown-item",
                  {
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.logout($event)
                      }
                    }
                  },
                  [
                    _c("i", {
                      staticClass: "fa fa-sign-out",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(
                      " \n        " +
                        _vm._s(_vm.$t("user.menu.logout")) +
                        "\n      "
                    )
                  ]
                )
              ],
              2
            )
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-53e47a0c", esExports)
  }
}

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_login_Index__ = __webpack_require__(119);


var addRoutes = function addRoutes(router, meta) {
  router.addRoutes([{
    component: __WEBPACK_IMPORTED_MODULE_0__modules_login_Index__["a" /* default */],
    name: 'login',
    path: '/login',
    props: function props(route) {
      return { redirectTo: route.query.redirect };
    }
  }]);
};

/* harmony default export */ __webpack_exports__["a"] = ({
  addRoutes: addRoutes
});

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__ = __webpack_require__(60);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7372988a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__ = __webpack_require__(120);
var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7372988a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/modules/login/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7372988a", Component.options)
  } else {
    hotAPI.reload("data-v-7372988a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("uamLogin", { attrs: { "redirect-to": _vm.redirectTo } })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7372988a", esExports)
  }
}

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue_ls__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue_ls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vue_ls__);








var LOGIN = 'LOGIN';
var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var LOGOUT = 'LOGOUT';
var UPDATE_USER = 'UPDATE_USER';
var UPDATE_PROFILE = 'UPDATE_PROFILE';
var UPDATE_SOCIAL_AUTH_PENDING = 'UPDATE_SOCIAL_AUTH_PENDING';
var UPDATE_REQUEST_PENDING = 'UPDATE_REQUEST_PENDING';

var transmissionLagDuration = 500; // in milliseconds

__WEBPACK_IMPORTED_MODULE_4_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_5_vuex___default.a);

/* harmony default export */ __webpack_exports__["a"] = (function (options) {
  var _mutations;

  var storageOptions = {
    namespace: options.localStorageNamespace
  };

  __WEBPACK_IMPORTED_MODULE_4_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_6_vue_ls___default.a, storageOptions);

  var axios = options.axios;
  var profileModel = options.profileModel;
  var userModel = options.userModel;

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('access_token');
  axios.defaults.withCredentials = true;

  return {
    namespaced: true,

    state: {
      isLoggedIn: !!__WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('access_token'),
      tokenExpiresAt: __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('access_token_expire'),
      isRefreshExpired: __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('is_refresh_expired'),
      user: __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('user'),
      pending: false,
      locale: 'en',
      isSocialAuthPending: false,
      isRequestPending: false
    },

    mutations: (_mutations = {}, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_mutations, LOGIN, function (state) {
      state.pending = true;
    }), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_mutations, LOGIN_SUCCESS, function (state) {
      state.tokenExpiresAt = __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('access_token_expire');
      state.isRefreshExpired = __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('is_refresh_expired');
      state.pending = false;
      state.user = __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('user');
      state.isLoggedIn = true;
    }), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_mutations, LOGOUT, function (state) {
      state.tokenExpiresAt = null;
      state.isRefreshExpired = __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('is_refresh_expired');
      state.user = null;
      state.data = null;
      state.isLoggedIn = false;
    }), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_mutations, UPDATE_USER, function (state, user) {
      state.user = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign___default()({}, state.user, user);
    }), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_mutations, UPDATE_PROFILE, function (state, profile) {
      state.user.profile = profile;
    }), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_mutations, UPDATE_SOCIAL_AUTH_PENDING, function (state, payload) {
      state.isSocialAuthPending = payload.isSocialAuthPending;
    }), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()(_mutations, UPDATE_REQUEST_PENDING, function (state, payload) {
      state.isRequestPending = payload.isRequestPending;
    }), _mutations),

    actions: {
      login: function login(_ref, payload) {
        var state = _ref.state,
            commit = _ref.commit,
            rootState = _ref.rootState;

        commit(LOGIN);

        return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
          axios.post(payload.loginUrl, payload.credentials).then(function (response) {
            var expireUtcTime = new Date().getTime() + response.data.expires_in * 1000; // in milliseconds

            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration);
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('access_token', response.data.access_token);
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('is_refresh_expired', false);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('access_token');

            axios.all([axios.get(payload.currentUserUrl)]).then(function (_ref2) {
              var _ref3 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref2, 1),
                  userResponse = _ref3[0].data;

              __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('user', userResponse.user);

              commit(LOGIN_SUCCESS);
              resolve();
            });
          }).catch(function (error) {
            reject(error);
          });
        });
      },
      loginWithToken: function loginWithToken(_ref4, payload) {
        var state = _ref4.state,
            commit = _ref4.commit,
            rootState = _ref4.rootState;

        commit(LOGIN);

        return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
          var expireUtcTime = new Date().getTime() + payload.token.expires_in * 1000; // in milliseconds

          __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration);
          __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('access_token', payload.token.access_token);
          __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('is_refresh_expired', false);

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('access_token');

          axios.get(payload.currentUserUrl).then(function (response) {
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('user', response.data.user);

            commit(LOGIN_SUCCESS);
            resolve();
          }).catch(function (error) {
            reject(error);
          });
        });
      },
      logout: function logout(_ref5, payload) {
        var commit = _ref5.commit;

        return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve) {
          axios.post(payload.logoutUrl).then(function (response) {
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.clear();

            delete axios.defaults.headers.common['Authorization'];

            commit(LOGOUT);
            resolve();
          }, function (error) {
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.clear();

            delete axios.defaults.headers.common['Authorization'];

            commit(LOGOUT);
            reject(error);
          });
        });
      },
      refreshToken: function refreshToken(_ref6, payload) {
        var commit = _ref6.commit;

        commit(LOGIN);

        return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
          axios.defaults.headers.common['Authorization'] = '';
          axios.post(payload.refreshUrl).then(function (response) {
            var expireUtcTime = new Date().getTime() + response.data.expires_in * 1000; // in milliseconds

            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration);
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('access_token', response.data.access_token);
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('is_refresh_expired', false);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('access_token');
            commit(LOGIN_SUCCESS);
            resolve();
          }, function (error) {
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.clear();
            __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('is_refresh_expired', true);

            commit(LOGOUT);
            reject(error);
          });
        });
      },
      updateProfile: function updateProfile(_ref7, profile) {
        var commit = _ref7.commit;

        return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve) {
          var user = __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('user');

          user.profile = profile;

          __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('user', user);
          commit(UPDATE_PROFILE, profile);
          resolve();
        });
      },
      updateRequestPending: function updateRequestPending(_ref8, isRequestPending) {
        var commit = _ref8.commit;

        return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve) {
          commit(UPDATE_REQUEST_PENDING, { isRequestPending: isRequestPending });
          resolve();
        });
      },
      updateSocialAuthPending: function updateSocialAuthPending(_ref9, isSocialAuthPending) {
        var commit = _ref9.commit;

        return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve) {
          commit(UPDATE_SOCIAL_AUTH_PENDING, { isSocialAuthPending: isSocialAuthPending });
          resolve();
        });
      },
      updateUser: function updateUser(_ref10, user) {
        var commit = _ref10.commit;

        return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve) {
          if (!user.profile) {
            user.profile = __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.get('user').profile;
          }

          __WEBPACK_IMPORTED_MODULE_4_vue___default.a.ls.set('user', user);
          commit(UPDATE_USER, user);
          resolve();
        });
      }
    },

    getters: {
      isLoggedIn: function isLoggedIn(state) {
        return state.isLoggedIn;
      },

      tokenExpiresAt: function tokenExpiresAt(state) {
        return state.tokenExpiresAt;
      },

      isRefreshExpired: function isRefreshExpired(state) {
        return state.isRefreshExpired;
      },

      locale: function locale(state) {
        return state.locale;
      },

      user: function user(state) {
        userModel.init(state.user);

        return userModel;
      },

      profile: function profile(state) {
        profileModel.init(state.user && state.user.profile);

        return profileModel;
      },

      isSocialAuthPending: function isSocialAuthPending(state) {
        return state.isSocialAuthPending;
      },

      isRequestPending: function isRequestPending(state) {
        return state.isRequestPending;
      }
    }
  };
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(123);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(126);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
__webpack_require__(17);
module.exports = __webpack_require__(125);


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(26);
var ITERATOR = __webpack_require__(0)('iterator');
var Iterators = __webpack_require__(8);
module.exports = __webpack_require__(2).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
__webpack_require__(17);
module.exports = __webpack_require__(128);


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3);
var get = __webpack_require__(44);
module.exports = __webpack_require__(2).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_129__;

/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_130__;

/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_131__;

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_132__;

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_133__;

/***/ })
/******/ ]);
});