(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3057:function(e,t,r){const n=r(7294);const a=n.forwardRef((function(e,t){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),n.createElement("path",{fillRule:"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",clipRule:"evenodd"}))}));e.exports=a},4184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r)){if(r.length){var s=a.apply(null,r);s&&e.push(s)}}else if("object"===i)if(r.toString===Object.prototype.toString)for(var l in r)n.call(r,l)&&r[l]&&e.push(l);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r)}()},8312:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(4767)}])},4767:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return G}});var n=r(5893),a=r(1799);function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l=r(7294),o=r(3057),u=r.n(o),c=r(6486);var d=(0,c.memoize)((function(e){return f(e)/(1+e.hydartion_percent)})),g=(0,c.memoize)((function(e){return f(e)*e.hydartion_percent/(1+e.hydartion_percent)})),f=(0,c.memoize)((function(e){return m(e)-e.stage1_starter_grams})),m=(0,c.memoize)((function(e){return e.stage1_starter_grams+e.stage1_excess_grams})),x=(0,c.memoize)((function(e){return v(e)/(1+e.hydartion_percent)})),h=(0,c.memoize)((function(e){return v(e)*e.hydartion_percent/(1+e.hydartion_percent)})),v=(0,c.memoize)((function(e){return p(e)-m(e)})),p=(0,c.memoize)((function(e){return e.mixing_percent*w(e)})),_=(0,c.memoize)((function(e){return b(e)/(1+e.hydartion_percent)})),j=(0,c.memoize)((function(e){return b(e)*e.hydartion_percent/(1+e.hydartion_percent)})),b=(0,c.memoize)((function(e){return w(e)-y(e)-p(e)})),y=(0,c.memoize)((function(e){return e.salt_percent*w(e)})),w=(0,c.memoize)((function(e){return e.loaf_weight_grams*e.loaf_count}));function N(e){return e/100}function k(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function S(e){return l.useMemo((function(){return e.replace(/[^A-Z0-9]+/gi,"_")}),[e])}function C(e){return(0,n.jsx)(P,k((0,a.Z)({},e),{suffix:"g"}))}function O(e){return(0,n.jsx)(P,k((0,a.Z)({min:0,max:100},e),{suffix:"%",offsetRight:30}))}function z(e){var t=1===e.value?"loaf":"loaves";return(0,n.jsx)(P,k((0,a.Z)({},e),{suffix:t,offsetRight:50}))}function F(e){var t=S(e.label),r=e.value.toFixed((0,c.isNumber)(e.decimals)?e.decimals:0);return(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsxs)("label",{htmlFor:t,className:"flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",children:[(0,n.jsx)("div",{children:e.label}),(0,n.jsxs)("div",{children:[r," ",e.suffix]})]}),(0,n.jsx)("input",{id:t,type:"range",min:e.min,max:e.max,step:e.step,value:r,onChange:function(t){return function(t){var r,n=+parseFloat(t).toFixed(2);null===(r=e.onChange)||void 0===r||r.call(e,n)}(t.target.value)},className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"})]})}function P(e){var t=S(e.label),r=e.value.toFixed(2);return(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:t,className:"block text-sm font-medium text-gray-700",children:e.label}),(0,n.jsxs)("div",{className:"mt-1 relative rounded-md shadow-sm",children:[(0,n.jsx)("input",{type:"number",name:t,id:t,min:e.min,max:e.max,step:e.step,value:r,onChange:function(t){return function(t){var r,n=+parseFloat(t).toFixed(2);null===(r=e.onChange)||void 0===r||r.call(e,n)}(t.target.value)},className:"focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm pr-3 border-gray-300 rounded-md text-right",style:{paddingRight:e.offsetRight},placeholder:"0","aria-describedby":"input-suffix"}),(0,n.jsx)("div",{className:"absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",children:(0,n.jsx)("span",{className:"text-gray-500 sm:text-sm",id:"input-suffix",children:e.suffix})})]})]})}var A=r(4184),E=r.n(A);function W(e){var t=e.tabs,r=e.initTab,a=s(l.useState(r||0),2),i=a[0],o=a[1],u=l.useMemo((function(){var e;return null===t||void 0===t||null===(e=t[i])||void 0===e?void 0:e.content}),[t,i]);return(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"sm:hidden",children:(0,n.jsx)(L,{tabs:t,currentTab:i,onChange:function(e){return o(e)}})}),(0,n.jsx)("div",{className:"hidden sm:block",children:(0,n.jsx)(M,{tabs:t,currentTab:i,onChange:function(e){return o(e)}})}),(0,n.jsx)("div",{children:u})]})}function L(e){return(0,n.jsx)("div",{className:"border-b border-gray-200 overflow-x-auto overflow-y-hidden flex justify-between items-center gap-2",children:(0,n.jsx)("nav",{className:"flex gap-x-2","aria-label":"Tabs",children:e.tabs.map((function(t,r){return(0,n.jsx)("button",{onClick:function(){return e.onChange(r)},children:(0,n.jsx)("div",{className:E()(r===e.currentTab?"border-red-500 text-red-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"),children:(0,n.jsx)("span",{children:t.label})})},t.label)}))})})}function M(e){return(0,n.jsx)("div",{className:"border-b border-gray-200 flex justify-between items-center gap-2",children:(0,n.jsx)("nav",{className:"-mb-px flex space-x-8","aria-label":"Tabs",children:e.tabs.map((function(t,r){return(0,n.jsx)("button",{onClick:function(){return e.onChange(r)},children:(0,n.jsx)("div",{className:E()(r===e.currentTab?"border-red-500 text-red-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"),children:(0,n.jsx)("span",{children:t.label})})},t.label)}))})})}function T(){var e=s(l.useState({hydartion_percent:75,mixing_percent:25,salt_percent:1,stage1_excess_grams:20,loaf_weight_grams:755,loaf_count:2,stage1_starter_grams:5,stage2_starter_grams:5}),2),t=e[0],r=e[1],i=function(e){var t=s(l.useState(),2),r=t[0],n=t[1];return l.useEffect((function(){var t=(0,a.Z)({},e);t.hydartion_percent=N(t.hydartion_percent),t.salt_percent=N(t.salt_percent),t.mixing_percent=N(t.mixing_percent),n({stage1:{flour_grams:d(t),water_grams:g(t),combined_flour_water_grams:f(t),output_grams:m(t)},stage2:{flour_grams:x(t),water_grams:h(t),combined_flour_water_grams:v(t),output_grams:p(t)},mixing:{flour_grams:_(t),water_grams:j(t),combined_flour_water_grams:b(t),salt_grams:y(t)},final_dough_weight:w(t)})}),[e]),r}(t),o=[{label:"Options",content:(0,n.jsx)(Q,{s:t,setState:r})},{label:"Advanced",content:(0,n.jsx)(X,{s:t,setState:r})},{label:"JSON",content:(0,n.jsx)("pre",{children:JSON.stringify(t,null,2)})}];return(0,n.jsxs)("div",{className:"p-3",children:[(0,n.jsx)(W,{tabs:o}),(0,n.jsx)($,{className:"p-6 px-10",height:"140px",width:"100%"}),(0,n.jsx)("div",{className:"flex flex-col items-center",children:(0,n.jsx)("div",{className:"grid grid-cols-1",children:(0,n.jsx)(R,{state:t,computed:i})})})]})}function R(e){var t,r,a,i,s,l,o,u,d,g,f=e.state,m=e.computed;return(0,n.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-4 gap-3 items-start",children:[(0,n.jsxs)("div",{className:"flex items-center gap-3",children:[(0,n.jsx)(B,{title:"Stage 1",children:(0,n.jsx)(I,{rows:[{key:"\ud83c\udf3e Flour",value:(0,c.round)(null===m||void 0===m||null===(t=m.stage1)||void 0===t?void 0:t.flour_grams)+" g"},{key:"\ud83d\udca7 Water",value:(0,c.round)(null===m||void 0===m||null===(r=m.stage1)||void 0===r?void 0:r.water_grams)+" g"},{key:"\ud83c\udfac Starter",value:(0,c.round)(f.stage1_starter_grams)+" g"}]})}),(0,n.jsx)(H,{weight:null===m||void 0===m||null===(a=m.stage1)||void 0===a?void 0:a.output_grams})]}),(0,n.jsxs)("div",{className:"flex items-center gap-3",children:[(0,n.jsx)(B,{title:"Stage 2",children:(0,n.jsx)(I,{rows:[{key:"\ud83c\udf3e Flour",value:(0,c.round)(null===m||void 0===m||null===(i=m.stage2)||void 0===i?void 0:i.flour_grams)+" g"},{key:"\ud83d\udca7 Water",value:(0,c.round)(null===m||void 0===m||null===(s=m.stage2)||void 0===s?void 0:s.water_grams)+" g"},{key:"\ud83c\udfac Starter",value:(0,c.round)(f.stage2_starter_grams)+" g"}]})}),(0,n.jsx)(H,{weight:null===m||void 0===m||null===(l=m.stage2)||void 0===l?void 0:l.output_grams})]}),(0,n.jsxs)("div",{className:"flex items-center gap-3",children:[(0,n.jsx)(B,{title:"Mixing",children:(0,n.jsx)(I,{rows:[{key:"\ud83c\udf3e Flour",value:(0,c.round)(null===m||void 0===m||null===(o=m.mixing)||void 0===o?void 0:o.flour_grams)+" g"},{key:"\ud83d\udca7 Water",value:(0,c.round)(null===m||void 0===m||null===(u=m.mixing)||void 0===u?void 0:u.water_grams)+" g"},{key:"\ud83e\uddc2 Salt",value:(0,c.round)(null===m||void 0===m||null===(d=m.mixing)||void 0===d?void 0:d.salt_grams)+" g"},{key:"\ud83c\udfac Starter",value:(0,c.round)(null===m||void 0===m||null===(g=m.stage2)||void 0===g?void 0:g.output_grams)+" g"}]})}),(0,n.jsx)(H,{weight:null===m||void 0===m?void 0:m.final_dough_weight})]}),(0,n.jsxs)(B,{title:"Output",children:[(0,n.jsx)(I,{rows:[{key:"\ud83c\udf5e "+J(f.loaf_count),value:"".concat((0,c.round)(f.loaf_count)," x ").concat((0,c.round)(f.loaf_weight_grams)," g")}]}),(0,n.jsx)(Z,{state:f,computed:m})]})]})}function Z(e){var t=e.state.loaf_count,r=new Array(t).fill(0).map((function(e,r){return t-r-1}));return(0,n.jsx)("div",{className:"grid grid-cols-2 gap-2 mt-2",children:r.map((function(t){return(0,n.jsx)(D,{weight:e.state.loaf_weight_grams},t)}))})}function D(e){var t=e.weight,r=15+(t-100)/1e3*10;return(0,n.jsxs)("div",{style:{fontSize:r},className:"bg-orange-100 rounded-xl flex-shrink-0 flex flex-col items-center shadow-xl",children:[(0,n.jsx)("span",{children:"Loaf"}),(0,n.jsxs)("span",{className:"text-gray-500 text-xs",children:[t," g"]})]})}function H(e){return(0,n.jsxs)("div",{className:"flex flex-col items-center",children:[(0,n.jsx)(u(),{className:"text-gray-600",width:30}),(0,n.jsx)("span",{className:"whitespace-nowrap",children:(0,c.round)(e.weight)+" g"})]})}function I(e){return(0,n.jsx)("table",{children:(0,n.jsx)("tbody",{children:e.rows.map((function(e){return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{className:"pr-2 whitespace-nowrap",children:e.key}),(0,n.jsx)("td",{className:"text-right whitespace-nowrap",children:e.value})]},e.key)}))})})}function B(e){return(0,n.jsxs)("div",{className:"p-3 bg-gray-100 rounded-xl shadow-xl flex flex-col",children:[e.title&&(0,n.jsx)("h1",{className:"text-2xl",children:e.title}),e.children]})}function J(e){return 1===e?"loaf":"loaves"}function Q(e){var t=e.s,r=e.setState,i=function(e){return r((0,a.Z)({},t,e))};return(0,n.jsx)("div",{className:"mt-3",children:(0,n.jsx)(B,{children:(0,n.jsxs)("div",{className:"w-full grid grid-cols-1 sm:grid-cols-3 gap-3",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)(U,{children:"Weight"}),(0,n.jsx)(F,{min:100,max:1e3,step:1,value:t.loaf_weight_grams,onChange:function(e){return i({loaf_weight_grams:e})},label:"Loaf weight",suffix:"g"}),(0,n.jsx)(F,{min:1,max:20,step:1,value:t.loaf_count,onChange:function(e){return i({loaf_count:e})},label:"Loaf count",suffix:J(t.loaf_count)})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)(U,{children:"Percentages"}),(0,n.jsx)(F,{value:t.hydartion_percent,onChange:function(e){return i({hydartion_percent:e})},label:"Hydration % (Water/Flour)",suffix:"%"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)(U,{children:"Percentages"}),(0,n.jsx)(F,{value:t.hydartion_percent,onChange:function(e){return i({hydartion_percent:e})},label:"Hydration % (Water/Flour)",suffix:"%"}),(0,n.jsx)(F,{value:t.mixing_percent,onChange:function(e){return i({mixing_percent:e})},label:"Mixing % (Levain/Weight)",suffix:"%"})]})]})})})}function X(e){var t=e.s,r=e.setState,i=function(e){return r((0,a.Z)({},t,e))};return(0,n.jsxs)("div",{children:[(0,n.jsx)(U,{children:"Percentages"}),(0,n.jsx)(O,{value:t.hydartion_percent,onChange:function(e){return i({hydartion_percent:e})},label:"Hydration % (Water/Flour)"}),(0,n.jsx)(O,{value:t.mixing_percent,onChange:function(e){return i({mixing_percent:e})},label:"Mixing % (Levain/Weight)"}),(0,n.jsx)(O,{value:t.salt_percent,onChange:function(e){return i({salt_percent:e})},label:"Salt Percent"}),(0,n.jsx)(U,{children:"Weights"}),(0,n.jsx)(C,{value:t.stage1_excess_grams,onChange:function(e){return i({stage1_excess_grams:e})},label:"Excess (From Stage 1)"}),(0,n.jsx)(C,{value:t.loaf_weight_grams,onChange:function(e){return i({loaf_weight_grams:e})},label:"Loaf weight"}),(0,n.jsx)(z,{value:t.loaf_count,onChange:function(e){return i({loaf_count:e})},label:"Loaf count"}),(0,n.jsx)(U,{children:"Weather Determined"}),(0,n.jsx)(C,{value:t.stage1_starter_grams,onChange:function(e){return i({stage1_starter_grams:e})},label:"Stage 1 Starter"}),(0,n.jsx)(C,{value:t.stage2_starter_grams,onChange:function(e){return i({stage2_starter_grams:e})},label:"Stage 2 Starter"})]})}function U(e){return(0,n.jsx)("h3",{className:"text-black italic mb-4",children:e.children})}function $(e){return(0,n.jsxs)("svg",{className:e.className,preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:e.width,height:e.height,viewBox:"-0.5 -0.5 288 80",children:[(0,n.jsx)("defs",{}),(0,n.jsxs)("g",{children:[(0,n.jsx)("path",{d:"M 286 1 Q 286 51 146 41 Q 6 31 6 70.9",fill:"none",stroke:"rgb(0, 0, 0)",strokeWidth:"2",strokeMiterlimit:"10",pointerEvents:"stroke"}),(0,n.jsx)("path",{d:"M 6 77.65 L 1.5 68.65 L 6 70.9 L 10.5 68.65 Z",fill:"rgb(0, 0, 0)",stroke:"rgb(0, 0, 0)",strokeWidth:"3",strokeMiterlimit:"10",pointerEvents:"all"})]})]})}function q(e){return(0,n.jsx)("div",{className:"flex flex-col items-center w-full",children:(0,n.jsx)("div",{className:"max-w-4xl w-full",children:e.children})})}var G=function(){return(0,n.jsxs)(q,{children:[(0,n.jsx)("h1",{className:"my-10 font-bold text-2xl text-center",children:"Doughculator \ud83c\udf5e"}),(0,n.jsx)(T,{})]})}}},function(e){e.O(0,[662,774,888,179],(function(){return t=8312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);