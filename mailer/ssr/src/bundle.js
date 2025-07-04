(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = require_object_assign();
      var n = 60103;
      var p = 60106;
      exports.Fragment = 60107;
      exports.StrictMode = 60108;
      exports.Profiler = 60114;
      var q = 60109;
      var r = 60110;
      var t = 60112;
      exports.Suspense = 60113;
      var u = 60115;
      var v = 60116;
      if ("function" === typeof Symbol && Symbol.for) {
        w = Symbol.for;
        n = w("react.element");
        p = w("react.portal");
        exports.Fragment = w("react.fragment");
        exports.StrictMode = w("react.strict_mode");
        exports.Profiler = w("react.profiler");
        q = w("react.provider");
        r = w("react.context");
        t = w("react.forward_ref");
        exports.Suspense = w("react.suspense");
        u = w("react.memo");
        v = w("react.lazy");
      }
      var w;
      var x = "function" === typeof Symbol && Symbol.iterator;
      function y(a) {
        if (null === a || "object" !== typeof a) return null;
        a = x && a[x] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      function z(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var A = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var B = {};
      function C(a, b, c) {
        this.props = a;
        this.context = b;
        this.refs = B;
        this.updater = c || A;
      }
      C.prototype.isReactComponent = {};
      C.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      C.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function D() {
      }
      D.prototype = C.prototype;
      function E(a, b, c) {
        this.props = a;
        this.context = b;
        this.refs = B;
        this.updater = c || A;
      }
      var F = E.prototype = new D();
      F.constructor = E;
      l(F, C.prototype);
      F.isPureReactComponent = true;
      var G = { current: null };
      var H = Object.prototype.hasOwnProperty;
      var I = { key: true, ref: true, __self: true, __source: true };
      function J(a, b, c) {
        var e, d = {}, k = null, h = null;
        if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
        var g = arguments.length - 2;
        if (1 === g) d.children = c;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          d.children = f;
        }
        if (a && a.defaultProps) for (e in g = a.defaultProps, g) void 0 === d[e] && (d[e] = g[e]);
        return { $$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current };
      }
      function K(a, b) {
        return { $$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function L(a) {
        return "object" === typeof a && null !== a && a.$$typeof === n;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var M = /\/+/g;
      function N(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function O(a, b, c, e, d) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case n:
              case p:
                h = true;
            }
        }
        if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
          return a2;
        })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
        h = 0;
        e = "" === e ? "." : e + ":";
        if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = e + N(k, g);
          h += O(k, b, c, f, d);
        }
        else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
        else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
        return h;
      }
      function P(a, b, c) {
        if (null == a) return a;
        var e = [], d = 0;
        O(a, e, "", "", function(a2) {
          return b.call(c, a2, d++);
        });
        return e;
      }
      function Q(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          a._status = 0;
          a._result = b;
          b.then(function(b2) {
            0 === a._status && (b2 = b2.default, a._status = 1, a._result = b2);
          }, function(b2) {
            0 === a._status && (a._status = 2, a._result = b2);
          });
        }
        if (1 === a._status) return a._result;
        throw a._result;
      }
      var R = { current: null };
      function S() {
        var a = R.current;
        if (null === a) throw Error(z(321));
        return a;
      }
      var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l };
      exports.Children = { map: P, forEach: function(a, b, c) {
        P(a, function() {
          b.apply(this, arguments);
        }, c);
      }, count: function(a) {
        var b = 0;
        P(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return P(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!L(a)) throw Error(z(143));
        return a;
      } };
      exports.Component = C;
      exports.PureComponent = E;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
      exports.cloneElement = function(a, b, c) {
        if (null === a || void 0 === a) throw Error(z(267, a));
        var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = G.current);
          void 0 !== b.key && (d = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) e.children = c;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          e.children = g;
        }
        return {
          $$typeof: n,
          type: a.type,
          key: d,
          ref: k,
          props: e,
          _owner: h
        };
      };
      exports.createContext = function(a, b) {
        void 0 === b && (b = null);
        a = { $$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
        a.Provider = { $$typeof: q, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = J;
      exports.createFactory = function(a) {
        var b = J.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: t, render: a };
      };
      exports.isValidElement = L;
      exports.lazy = function(a) {
        return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
      };
      exports.memo = function(a, b) {
        return { $$typeof: u, type: a, compare: void 0 === b ? null : b };
      };
      exports.useCallback = function(a, b) {
        return S().useCallback(a, b);
      };
      exports.useContext = function(a, b) {
        return S().useContext(a, b);
      };
      exports.useDebugValue = function() {
      };
      exports.useEffect = function(a, b) {
        return S().useEffect(a, b);
      };
      exports.useImperativeHandle = function(a, b, c) {
        return S().useImperativeHandle(a, b, c);
      };
      exports.useLayoutEffect = function(a, b) {
        return S().useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return S().useMemo(a, b);
      };
      exports.useReducer = function(a, b, c) {
        return S().useReducer(a, b, c);
      };
      exports.useRef = function(a) {
        return S().useRef(a);
      };
      exports.useState = function(a) {
        return S().useState(a);
      };
      exports.version = "17.0.2";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom-server.browser.production.min.js
  var require_react_dom_server_browser_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom-server.browser.production.min.js"(exports) {
      "use strict";
      var l = require_object_assign();
      var m = require_react();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var q = 60106;
      var r = 60107;
      var u = 60108;
      var z = 60114;
      var B = 60109;
      var aa = 60110;
      var ba = 60112;
      var D = 60113;
      var ca = 60120;
      var da = 60115;
      var ea = 60116;
      var fa = 60121;
      var ha = 60117;
      var ia = 60119;
      var ja = 60129;
      var ka = 60131;
      if ("function" === typeof Symbol && Symbol.for) {
        E = Symbol.for;
        q = E("react.portal");
        r = E("react.fragment");
        u = E("react.strict_mode");
        z = E("react.profiler");
        B = E("react.provider");
        aa = E("react.context");
        ba = E("react.forward_ref");
        D = E("react.suspense");
        ca = E("react.suspense_list");
        da = E("react.memo");
        ea = E("react.lazy");
        fa = E("react.block");
        ha = E("react.fundamental");
        ia = E("react.scope");
        ja = E("react.debug_trace_mode");
        ka = E("react.legacy_hidden");
      }
      var E;
      function F(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case r:
            return "Fragment";
          case q:
            return "Portal";
          case z:
            return "Profiler";
          case u:
            return "StrictMode";
          case D:
            return "Suspense";
          case ca:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case aa:
            return (a.displayName || "Context") + ".Consumer";
          case B:
            return (a._context.displayName || "Context") + ".Provider";
          case ba:
            var b = a.render;
            b = b.displayName || b.name || "";
            return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");
          case da:
            return F(a.type);
          case fa:
            return F(a._render);
          case ea:
            b = a._payload;
            a = a._init;
            try {
              return F(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      var la = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var ma = {};
      function I(a, b) {
        for (var c = a._threadCount | 0; c <= b; c++) a[c] = a._currentValue2, a._threadCount = c + 1;
      }
      function na(a, b, c, d) {
        if (d && (d = a.contextType, "object" === typeof d && null !== d)) return I(d, c), d[c];
        if (a = a.contextTypes) {
          c = {};
          for (var f in a) c[f] = b[f];
          b = c;
        } else b = ma;
        return b;
      }
      for (J = new Uint16Array(16), K = 0; 15 > K; K++) J[K] = K + 1;
      var J;
      var K;
      J[15] = 0;
      var oa = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var pa = Object.prototype.hasOwnProperty;
      var qa = {};
      var ra = {};
      function sa(a) {
        if (pa.call(ra, a)) return true;
        if (pa.call(qa, a)) return false;
        if (oa.test(a)) return ra[a] = true;
        qa[a] = true;
        return false;
      }
      function ta(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function ua(a, b, c, d) {
        if (null === b || "undefined" === typeof b || ta(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function M(a, b, c, d, f, h, t) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = f;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = h;
        this.removeEmptyString = t;
      }
      var N = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        N[a] = new M(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        N[b] = new M(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        N[a] = new M(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        N[a] = new M(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        N[a] = new M(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        N[a] = new M(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        N[a] = new M(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        N[a] = new M(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        N[a] = new M(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var va = /[\-:]([a-z])/g;
      function wa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          va,
          wa
        );
        N[b] = new M(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(va, wa);
        N[b] = new M(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(va, wa);
        N[b] = new M(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        N[a] = new M(a, 1, false, a.toLowerCase(), null, false, false);
      });
      N.xlinkHref = new M("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        N[a] = new M(a, 1, false, a.toLowerCase(), null, true, true);
      });
      var xa = /["'&<>]/;
      function O(a) {
        if ("boolean" === typeof a || "number" === typeof a) return "" + a;
        a = "" + a;
        var b = xa.exec(a);
        if (b) {
          var c = "", d, f = 0;
          for (d = b.index; d < a.length; d++) {
            switch (a.charCodeAt(d)) {
              case 34:
                b = "&quot;";
                break;
              case 38:
                b = "&amp;";
                break;
              case 39:
                b = "&#x27;";
                break;
              case 60:
                b = "&lt;";
                break;
              case 62:
                b = "&gt;";
                break;
              default:
                continue;
            }
            f !== d && (c += a.substring(f, d));
            f = d + 1;
            c += b;
          }
          a = f !== d ? c + a.substring(f, d) : c;
        }
        return a;
      }
      function ya(a, b) {
        var c = N.hasOwnProperty(a) ? N[a] : null;
        var d;
        if (d = "style" !== a) d = null !== c ? 0 === c.type : !(2 < a.length) || "o" !== a[0] && "O" !== a[0] || "n" !== a[1] && "N" !== a[1] ? false : true;
        if (d || ua(a, b, c, false)) return "";
        if (null !== c) {
          a = c.attributeName;
          d = c.type;
          if (3 === d || 4 === d && true === b) return a + '=""';
          c.sanitizeURL && (b = "" + b);
          return a + '="' + (O(b) + '"');
        }
        return sa(a) ? a + '="' + (O(b) + '"') : "";
      }
      function za(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var Aa = "function" === typeof Object.is ? Object.is : za;
      var P = null;
      var Q = null;
      var R = null;
      var S = false;
      var T = false;
      var U = null;
      var V = 0;
      function W() {
        if (null === P) throw Error(p(321));
        return P;
      }
      function Ba() {
        if (0 < V) throw Error(p(312));
        return { memoizedState: null, queue: null, next: null };
      }
      function Ca() {
        null === R ? null === Q ? (S = false, Q = R = Ba()) : (S = true, R = Q) : null === R.next ? (S = false, R = R.next = Ba()) : (S = true, R = R.next);
        return R;
      }
      function Da(a, b, c, d) {
        for (; T; ) T = false, V += 1, R = null, c = a(b, d);
        Ea();
        return c;
      }
      function Ea() {
        P = null;
        T = false;
        Q = null;
        V = 0;
        R = U = null;
      }
      function Fa(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Ga(a, b, c) {
        P = W();
        R = Ca();
        if (S) {
          var d = R.queue;
          b = d.dispatch;
          if (null !== U && (c = U.get(d), void 0 !== c)) {
            U.delete(d);
            d = R.memoizedState;
            do
              d = a(d, c.action), c = c.next;
            while (null !== c);
            R.memoizedState = d;
            return [d, b];
          }
          return [R.memoizedState, b];
        }
        a = a === Fa ? "function" === typeof b ? b() : b : void 0 !== c ? c(b) : b;
        R.memoizedState = a;
        a = R.queue = { last: null, dispatch: null };
        a = a.dispatch = Ha.bind(null, P, a);
        return [R.memoizedState, a];
      }
      function Ia(a, b) {
        P = W();
        R = Ca();
        b = void 0 === b ? null : b;
        if (null !== R) {
          var c = R.memoizedState;
          if (null !== c && null !== b) {
            var d = c[1];
            a: if (null === d) d = false;
            else {
              for (var f = 0; f < d.length && f < b.length; f++) if (!Aa(b[f], d[f])) {
                d = false;
                break a;
              }
              d = true;
            }
            if (d) return c[0];
          }
        }
        a = a();
        R.memoizedState = [a, b];
        return a;
      }
      function Ha(a, b, c) {
        if (!(25 > V)) throw Error(p(301));
        if (a === P) if (T = true, a = { action: c, next: null }, null === U && (U = /* @__PURE__ */ new Map()), c = U.get(b), void 0 === c) U.set(b, a);
        else {
          for (b = c; null !== b.next; ) b = b.next;
          b.next = a;
        }
      }
      function Ja() {
      }
      var X = null;
      var Ka = { readContext: function(a) {
        var b = X.threadID;
        I(a, b);
        return a[b];
      }, useContext: function(a) {
        W();
        var b = X.threadID;
        I(a, b);
        return a[b];
      }, useMemo: Ia, useReducer: Ga, useRef: function(a) {
        P = W();
        R = Ca();
        var b = R.memoizedState;
        return null === b ? (a = { current: a }, R.memoizedState = a) : b;
      }, useState: function(a) {
        return Ga(Fa, a);
      }, useLayoutEffect: function() {
      }, useCallback: function(a, b) {
        return Ia(function() {
          return a;
        }, b);
      }, useImperativeHandle: Ja, useEffect: Ja, useDebugValue: Ja, useDeferredValue: function(a) {
        W();
        return a;
      }, useTransition: function() {
        W();
        return [function(a) {
          a();
        }, false];
      }, useOpaqueIdentifier: function() {
        return (X.identifierPrefix || "") + "R:" + (X.uniqueID++).toString(36);
      }, useMutableSource: function(a, b) {
        W();
        return b(a._source);
      } };
      var La = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
      function Ma(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      var Na = { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true };
      var Oa = l({ menuitem: true }, Na);
      var Y = {
        animationIterationCount: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var Pa = ["Webkit", "ms", "Moz", "O"];
      Object.keys(Y).forEach(function(a) {
        Pa.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          Y[b] = Y[a];
        });
      });
      var Qa = /([A-Z])/g;
      var Ra = /^ms-/;
      var Z = m.Children.toArray;
      var Sa = la.ReactCurrentDispatcher;
      var Ta = { listing: true, pre: true, textarea: true };
      var Ua = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
      var Va = {};
      var Wa = {};
      function Xa(a) {
        if (void 0 === a || null === a) return a;
        var b = "";
        m.Children.forEach(a, function(a2) {
          null != a2 && (b += a2);
        });
        return b;
      }
      var Ya = Object.prototype.hasOwnProperty;
      var Za = { children: null, dangerouslySetInnerHTML: null, suppressContentEditableWarning: null, suppressHydrationWarning: null };
      function $a(a, b) {
        if (void 0 === a) throw Error(p(152, F(b) || "Component"));
      }
      function ab(a, b, c) {
        function d(d2, h2) {
          var e = h2.prototype && h2.prototype.isReactComponent, f2 = na(h2, b, c, e), t = [], g = false, n = { isMounted: function() {
            return false;
          }, enqueueForceUpdate: function() {
            if (null === t) return null;
          }, enqueueReplaceState: function(a2, c2) {
            g = true;
            t = [c2];
          }, enqueueSetState: function(a2, c2) {
            if (null === t) return null;
            t.push(c2);
          } };
          if (e) {
            if (e = new h2(d2.props, f2, n), "function" === typeof h2.getDerivedStateFromProps) {
              var k = h2.getDerivedStateFromProps.call(null, d2.props, e.state);
              null != k && (e.state = l({}, e.state, k));
            }
          } else if (P = {}, e = h2(
            d2.props,
            f2,
            n
          ), e = Da(h2, d2.props, e, f2), null == e || null == e.render) {
            a = e;
            $a(a, h2);
            return;
          }
          e.props = d2.props;
          e.context = f2;
          e.updater = n;
          n = e.state;
          void 0 === n && (e.state = n = null);
          if ("function" === typeof e.UNSAFE_componentWillMount || "function" === typeof e.componentWillMount) if ("function" === typeof e.componentWillMount && "function" !== typeof h2.getDerivedStateFromProps && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && "function" !== typeof h2.getDerivedStateFromProps && e.UNSAFE_componentWillMount(), t.length) {
            n = t;
            var v = g;
            t = null;
            g = false;
            if (v && 1 === n.length) e.state = n[0];
            else {
              k = v ? n[0] : e.state;
              var H = true;
              for (v = v ? 1 : 0; v < n.length; v++) {
                var x = n[v];
                x = "function" === typeof x ? x.call(e, k, d2.props, f2) : x;
                null != x && (H ? (H = false, k = l({}, k, x)) : l(k, x));
              }
              e.state = k;
            }
          } else t = null;
          a = e.render();
          $a(a, h2);
          if ("function" === typeof e.getChildContext && (d2 = h2.childContextTypes, "object" === typeof d2)) {
            var y = e.getChildContext();
            for (var A in y) if (!(A in d2)) throw Error(p(108, F(h2) || "Unknown", A));
          }
          y && (b = l({}, b, y));
        }
        for (; m.isValidElement(a); ) {
          var f = a, h = f.type;
          if ("function" !== typeof h) break;
          d(f, h);
        }
        return { child: a, context: b };
      }
      var bb = function() {
        function a(a2, b2, f) {
          m.isValidElement(a2) ? a2.type !== r ? a2 = [a2] : (a2 = a2.props.children, a2 = m.isValidElement(a2) ? [a2] : Z(a2)) : a2 = Z(a2);
          a2 = { type: null, domNamespace: La.html, children: a2, childIndex: 0, context: ma, footer: "" };
          var c = J[0];
          if (0 === c) {
            var d = J;
            c = d.length;
            var g = 2 * c;
            if (!(65536 >= g)) throw Error(p(304));
            var e = new Uint16Array(g);
            e.set(d);
            J = e;
            J[0] = c + 1;
            for (d = c; d < g - 1; d++) J[d] = d + 1;
            J[g - 1] = 0;
          } else J[0] = J[c];
          this.threadID = c;
          this.stack = [a2];
          this.exhausted = false;
          this.currentSelectValue = null;
          this.previousWasTextNode = false;
          this.makeStaticMarkup = b2;
          this.suspenseDepth = 0;
          this.contextIndex = -1;
          this.contextStack = [];
          this.contextValueStack = [];
          this.uniqueID = 0;
          this.identifierPrefix = f && f.identifierPrefix || "";
        }
        var b = a.prototype;
        b.destroy = function() {
          if (!this.exhausted) {
            this.exhausted = true;
            this.clearProviders();
            var a2 = this.threadID;
            J[a2] = J[0];
            J[0] = a2;
          }
        };
        b.pushProvider = function(a2) {
          var b2 = ++this.contextIndex, c = a2.type._context, h = this.threadID;
          I(c, h);
          var t = c[h];
          this.contextStack[b2] = c;
          this.contextValueStack[b2] = t;
          c[h] = a2.props.value;
        };
        b.popProvider = function() {
          var a2 = this.contextIndex, b2 = this.contextStack[a2], f = this.contextValueStack[a2];
          this.contextStack[a2] = null;
          this.contextValueStack[a2] = null;
          this.contextIndex--;
          b2[this.threadID] = f;
        };
        b.clearProviders = function() {
          for (var a2 = this.contextIndex; 0 <= a2; a2--) this.contextStack[a2][this.threadID] = this.contextValueStack[a2];
        };
        b.read = function(a2) {
          if (this.exhausted) return null;
          var b2 = X;
          X = this;
          var c = Sa.current;
          Sa.current = Ka;
          try {
            for (var h = [""], t = false; h[0].length < a2; ) {
              if (0 === this.stack.length) {
                this.exhausted = true;
                var g = this.threadID;
                J[g] = J[0];
                J[0] = g;
                break;
              }
              var e = this.stack[this.stack.length - 1];
              if (t || e.childIndex >= e.children.length) {
                var L = e.footer;
                "" !== L && (this.previousWasTextNode = false);
                this.stack.pop();
                if ("select" === e.type) this.currentSelectValue = null;
                else if (null != e.type && null != e.type.type && e.type.type.$$typeof === B) this.popProvider(e.type);
                else if (e.type === D) {
                  this.suspenseDepth--;
                  var G = h.pop();
                  if (t) {
                    t = false;
                    var C = e.fallbackFrame;
                    if (!C) throw Error(p(303));
                    this.stack.push(C);
                    h[this.suspenseDepth] += "<!--$!-->";
                    continue;
                  } else h[this.suspenseDepth] += G;
                }
                h[this.suspenseDepth] += L;
              } else {
                var n = e.children[e.childIndex++], k = "";
                try {
                  k += this.render(n, e.context, e.domNamespace);
                } catch (v) {
                  if (null != v && "function" === typeof v.then) throw Error(p(294));
                  throw v;
                } finally {
                }
                h.length <= this.suspenseDepth && h.push("");
                h[this.suspenseDepth] += k;
              }
            }
            return h[0];
          } finally {
            Sa.current = c, X = b2, Ea();
          }
        };
        b.render = function(a2, b2, f) {
          if ("string" === typeof a2 || "number" === typeof a2) {
            f = "" + a2;
            if ("" === f) return "";
            if (this.makeStaticMarkup) return O(f);
            if (this.previousWasTextNode) return "<!-- -->" + O(f);
            this.previousWasTextNode = true;
            return O(f);
          }
          b2 = ab(a2, b2, this.threadID);
          a2 = b2.child;
          b2 = b2.context;
          if (null === a2 || false === a2) return "";
          if (!m.isValidElement(a2)) {
            if (null != a2 && null != a2.$$typeof) {
              f = a2.$$typeof;
              if (f === q) throw Error(p(257));
              throw Error(p(258, f.toString()));
            }
            a2 = Z(a2);
            this.stack.push({ type: null, domNamespace: f, children: a2, childIndex: 0, context: b2, footer: "" });
            return "";
          }
          var c = a2.type;
          if ("string" === typeof c) return this.renderDOM(a2, b2, f);
          switch (c) {
            case ka:
            case ja:
            case u:
            case z:
            case ca:
            case r:
              return a2 = Z(a2.props.children), this.stack.push({
                type: null,
                domNamespace: f,
                children: a2,
                childIndex: 0,
                context: b2,
                footer: ""
              }), "";
            case D:
              throw Error(p(294));
            case ia:
              throw Error(p(343));
          }
          if ("object" === typeof c && null !== c) switch (c.$$typeof) {
            case ba:
              P = {};
              var d = c.render(a2.props, a2.ref);
              d = Da(c.render, a2.props, d, a2.ref);
              d = Z(d);
              this.stack.push({ type: null, domNamespace: f, children: d, childIndex: 0, context: b2, footer: "" });
              return "";
            case da:
              return a2 = [m.createElement(c.type, l({ ref: a2.ref }, a2.props))], this.stack.push({ type: null, domNamespace: f, children: a2, childIndex: 0, context: b2, footer: "" }), "";
            case B:
              return c = Z(a2.props.children), f = { type: a2, domNamespace: f, children: c, childIndex: 0, context: b2, footer: "" }, this.pushProvider(a2), this.stack.push(f), "";
            case aa:
              c = a2.type;
              d = a2.props;
              var g = this.threadID;
              I(c, g);
              c = Z(d.children(c[g]));
              this.stack.push({ type: a2, domNamespace: f, children: c, childIndex: 0, context: b2, footer: "" });
              return "";
            case ha:
              throw Error(p(338));
            case ea:
              return c = a2.type, d = c._init, c = d(c._payload), a2 = [m.createElement(c, l({ ref: a2.ref }, a2.props))], this.stack.push({
                type: null,
                domNamespace: f,
                children: a2,
                childIndex: 0,
                context: b2,
                footer: ""
              }), "";
          }
          throw Error(p(130, null == c ? c : typeof c, ""));
        };
        b.renderDOM = function(a2, b2, f) {
          var c = a2.type.toLowerCase();
          f === La.html && Ma(c);
          if (!Va.hasOwnProperty(c)) {
            if (!Ua.test(c)) throw Error(p(65, c));
            Va[c] = true;
          }
          var d = a2.props;
          if ("input" === c) d = l({ type: void 0 }, d, { defaultChecked: void 0, defaultValue: void 0, value: null != d.value ? d.value : d.defaultValue, checked: null != d.checked ? d.checked : d.defaultChecked });
          else if ("textarea" === c) {
            var g = d.value;
            if (null == g) {
              g = d.defaultValue;
              var e = d.children;
              if (null != e) {
                if (null != g) throw Error(p(92));
                if (Array.isArray(e)) {
                  if (!(1 >= e.length)) throw Error(p(93));
                  e = e[0];
                }
                g = "" + e;
              }
              null == g && (g = "");
            }
            d = l({}, d, { value: void 0, children: "" + g });
          } else if ("select" === c) this.currentSelectValue = null != d.value ? d.value : d.defaultValue, d = l({}, d, { value: void 0 });
          else if ("option" === c) {
            e = this.currentSelectValue;
            var L = Xa(d.children);
            if (null != e) {
              var G = null != d.value ? d.value + "" : L;
              g = false;
              if (Array.isArray(e)) for (var C = 0; C < e.length; C++) {
                if ("" + e[C] === G) {
                  g = true;
                  break;
                }
              }
              else g = "" + e === G;
              d = l(
                { selected: void 0, children: void 0 },
                d,
                { selected: g, children: L }
              );
            }
          }
          if (g = d) {
            if (Oa[c] && (null != g.children || null != g.dangerouslySetInnerHTML)) throw Error(p(137, c));
            if (null != g.dangerouslySetInnerHTML) {
              if (null != g.children) throw Error(p(60));
              if (!("object" === typeof g.dangerouslySetInnerHTML && "__html" in g.dangerouslySetInnerHTML)) throw Error(p(61));
            }
            if (null != g.style && "object" !== typeof g.style) throw Error(p(62));
          }
          g = d;
          e = this.makeStaticMarkup;
          L = 1 === this.stack.length;
          G = "<" + a2.type;
          b: if (-1 === c.indexOf("-")) C = "string" === typeof g.is;
          else switch (c) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              C = false;
              break b;
            default:
              C = true;
          }
          for (w in g) if (Ya.call(g, w)) {
            var n = g[w];
            if (null != n) {
              if ("style" === w) {
                var k = void 0, v = "", H = "";
                for (k in n) if (n.hasOwnProperty(k)) {
                  var x = 0 === k.indexOf("--"), y = n[k];
                  if (null != y) {
                    if (x) var A = k;
                    else if (A = k, Wa.hasOwnProperty(A)) A = Wa[A];
                    else {
                      var cb = A.replace(Qa, "-$1").toLowerCase().replace(Ra, "-ms-");
                      A = Wa[A] = cb;
                    }
                    v += H + A + ":";
                    H = k;
                    x = null == y || "boolean" === typeof y || "" === y ? "" : x || "number" !== typeof y || 0 === y || Y.hasOwnProperty(H) && Y[H] ? ("" + y).trim() : y + "px";
                    v += x;
                    H = ";";
                  }
                }
                n = v || null;
              }
              k = null;
              C ? Za.hasOwnProperty(w) || (k = w, k = sa(k) && null != n ? k + '="' + (O(n) + '"') : "") : k = ya(w, n);
              k && (G += " " + k);
            }
          }
          e || L && (G += ' data-reactroot=""');
          var w = G;
          g = "";
          Na.hasOwnProperty(c) ? w += "/>" : (w += ">", g = "</" + a2.type + ">");
          a: {
            e = d.dangerouslySetInnerHTML;
            if (null != e) {
              if (null != e.__html) {
                e = e.__html;
                break a;
              }
            } else if (e = d.children, "string" === typeof e || "number" === typeof e) {
              e = O(e);
              break a;
            }
            e = null;
          }
          null != e ? (d = [], Ta.hasOwnProperty(c) && "\n" === e.charAt(0) && (w += "\n"), w += e) : d = Z(d.children);
          a2 = a2.type;
          f = null == f || "http://www.w3.org/1999/xhtml" === f ? Ma(a2) : "http://www.w3.org/2000/svg" === f && "foreignObject" === a2 ? "http://www.w3.org/1999/xhtml" : f;
          this.stack.push({ domNamespace: f, type: c, children: d, childIndex: 0, context: b2, footer: g });
          this.previousWasTextNode = false;
          return w;
        };
        return a;
      }();
      exports.renderToNodeStream = function() {
        throw Error(p(207));
      };
      exports.renderToStaticMarkup = function(a, b) {
        a = new bb(a, true, b);
        try {
          return a.read(Infinity);
        } finally {
          a.destroy();
        }
      };
      exports.renderToStaticNodeStream = function() {
        throw Error(p(208));
      };
      exports.renderToString = function(a, b) {
        a = new bb(a, false, b);
        try {
          return a.read(Infinity);
        } finally {
          a.destroy();
        }
      };
      exports.version = "17.0.2";
    }
  });

  // node_modules/react-dom/server.browser.js
  var require_server_browser = __commonJS({
    "node_modules/react-dom/server.browser.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_dom_server_browser_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // WelcomeEmail.jsx
  var React = __toESM(require_react());
  var import_server = __toESM(require_server_browser());
  function WelcomeEmail({ userName }) {
    return /* @__PURE__ */ React.createElement("html", null, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", { charSet: "UTF-8" }), /* @__PURE__ */ React.createElement("title", null, "Welcome!")), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("h1", null, "Welcome, ", userName, "!"), /* @__PURE__ */ React.createElement("p", null, "Thank you for joining our service. We\u2019re excited to have you on board."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", { href: "https://yourcompany.com" }, "Visit our website"))));
  }
  globalThis.renderEmail = function(props) {
    return (0, import_server.renderToStaticMarkup)(/* @__PURE__ */ React.createElement(WelcomeEmail, { ...props }));
  };
  var WelcomeEmail_default = WelcomeEmail;
})();
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

react/cjs/react.production.min.js:
  (** @license React v17.0.2
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.browser.production.min.js:
  (** @license React v17.0.2
   * react-dom-server.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
