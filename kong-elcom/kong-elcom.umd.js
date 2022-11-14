(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["kong-elcom"] = factory();
	else
		root["kong-elcom"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/QDdialog.vue?vue&type=template&id=790b60ea&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('el-dialog', {
    attrs: {
      "title": _vm.title,
      "visible": _vm.dialogVisible,
      "width": _vm.width,
      "before-close": _vm.handleClose,
      "modal": _vm.modal,
      "append-to-body": _vm.appendToBody,
      "custom-class": _vm.customClass,
      "fullscreen": _vm.fullscreen,
      "top": _vm.top
    },
    on: {
      "update:visible": function ($event) {
        _vm.dialogVisible = $event;
      }
    }
  }, [_c('div', {
    staticClass: "main"
  }, [_vm._t("default"), _vm._t("img"), _vm._t("form"), _vm._t("table")], 2), _c('span', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_vm.isShowBtnConfim ? _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.handleConfim
    }
  }, [_vm._v("确 定")]) : _vm._e(), _vm.isShowBtnCancle ? _c('el-button', {
    on: {
      "click": _vm.handleCancle
    }
  }, [_vm._v("取 消")]) : _vm._e()], 1)]);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/QDdialog.vue?vue&type=script&lang=js&
/* harmony default export */ var QDdialogvue_type_script_lang_js_ = ({
  name: "QDdialog",
  data() {
    return {};
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "30%"
    },
    title: {
      type: String,
      default: "提示"
    },
    isShowBtnConfim: {
      type: Boolean,
      default: true
    },
    isShowBtnCancle: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '15vh'
    },
    modal: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ''
    }
    // 是否为全屏 Dialog	boolean	—	false
    // Dialog CSS 中的 margin-top 值	string	—	15vh
    // 是否需要遮罩层	boolean	—	true
    // 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上	boolean	—	true
    // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true	boolean	—	false
    // 是否在 Dialog 出现时将 body 滚动锁定	boolean	—	true
    // Dialog 的自定义类名	string	—	—
    // 是否可以通过点击 modal 关闭 Dialog	boolean	—	true
    // 是否可以通过按下 ESC 关闭 Dialog	boolean	—	true
    // 是否显示关闭按钮	boolean	—	true
    // 关闭前的回调，会暂停 Dialog 的关闭	function(done)，done 用于关闭 Dialog	—	—
    // 是否对头部和底部采用居中布局	boolean	—	false
  },

  components: {},
  mounted() {},
  methods: {
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
      // this.$confirm('确认关闭？').then(_ => {
      // 	done();
      // }).catch(_ => {});
    },

    // 确定
    handleConfim() {
      // this.$emit("update:dialogVisible", false);
      // 建议点击确定后的关闭逻辑 放在请求接口提交后
      this.$emit('confim', false);
    },
    // 取消
    handleCancle() {
      this.$emit("update:dialogVisible", false);
      this.$emit('cancle');
    }
  }
});
;// CONCATENATED MODULE: ./src/components/QDdialog.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_QDdialogvue_type_script_lang_js_ = (QDdialogvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/QDdialog.vue?vue&type=style&index=0&id=790b60ea&prod&lang=scss&scoped=true&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/QDdialog.vue?vue&type=style&index=0&id=790b60ea&prod&lang=scss&scoped=true&

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
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
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/components/QDdialog.vue



;


/* normalize component */

var component = normalizeComponent(
  components_QDdialogvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "790b60ea",
  null
  
)

/* harmony default export */ var QDdialog = (component.exports);
;// CONCATENATED MODULE: ./src/kong-elcom/index.js
// index.js

const install = Vue => {
  Vue.component(QDdialog.name, QDdialog);
};
/* harmony default export */ var kong_elcom = (install);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (kong_elcom);


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=kong-elcom.umd.js.map