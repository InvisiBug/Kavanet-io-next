"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2566],{2566:function(e,t,n){n.r(t);var r=n(5893),c=(n(7294),n(3785)),o=n(8085);t.default=function(){return(0,r.jsx)(c.a,{sketch:o.sketch})}},3785:function(e,t,n){n.d(t,{a:function(){return s}});const r=!0,c={Date:r,RegExp:r,String:r,Number:r};function o(e,t,n={cyclesFix:!0},r=[]){let u=[];const i=Array.isArray(e);for(const f in e){const a=e[f],l=i?+f:f;if(!(f in t)){u.push({type:"REMOVE",path:[l],oldValue:e[f]});continue}const s=t[f],p="object"===typeof a&&"object"===typeof s;if(!(a&&s&&p)||c[Object.getPrototypeOf(a).constructor.name]||n.cyclesFix&&r.includes(a))a===s||p&&(isNaN(a)?a+""===s+"":+a===+s)||u.push({path:[l],type:"CHANGE",value:s,oldValue:a});else{const e=o(a,s,n,n.cyclesFix?r.concat([a]):[]);u.push.apply(u,e.map((e=>(e.path.unshift(l),e))))}}const a=Array.isArray(t);for(const c in t)c in e||u.push({type:"CREATE",path:[a?+c:c],value:t[c]});return u}var u=n(4035),i=n.n(u),a=n(7294),f="undefined"===typeof window?a.useEffect:a.useLayoutEffect;function l(e){var t;null===(t=e.current)||void 0===t||t.remove(),e.current=void 0}var s=(0,a.memo)((function(e){var t=e.sketch,n=e.children,r=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n}(e,["sketch","children"]),c=(0,a.createRef)(),o=(0,a.useRef)();return f((function(){null!==c.current&&(l(o),o.current=function(e,t){return new(i())(e,t)}(t,c.current))}),[t]),f((function(){var e,t;return null===(t=null===(e=o.current)||void 0===e?void 0:e.updateWithProps)||void 0===t?void 0:t.call(e,r)}),[r]),f((function(){return function(){return l(o)}}),[]),a.createElement("div",{ref:c},n)}),(function(e,t){return 0===o(e,t).length}))}}]);