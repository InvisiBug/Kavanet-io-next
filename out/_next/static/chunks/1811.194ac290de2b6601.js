(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1811,5933,1534],{4223:function(t){t.exports=function(t,n,r){if("number"!==typeof n||"number"!==typeof r)throw new TypeError('Must specify "to" and "from" arguments as numbers');if(n>r){var e=n;n=r,r=e}var i=r-n;if(0===i)return r;return t-i*Math.floor((t-n)/i)}},5137:function(t,n,r){var e=r(9075),i=r(4223),a=Number.EPSILON;function o(t,n,r){return n<r?t<n?n:t>r?r:t:t<r?r:t>n?n:t}function u(t,n,r){return t*(1-r)+n*r}function f(t,n,r){return Math.abs(t-n)<a?0:(r-t)/(n-t)}function c(t,n){return n=e(n,0),"number"===typeof t&&isFinite(t)?t:n}function h(t){if("number"!==typeof t)throw new TypeError("Expected dims argument");return function(n,r){var i;r=e(r,0),null==n?i=r:"number"===typeof n&&isFinite(n)&&(i=n);var a,o=[];if(null==i)for(a=0;a<t;a++)o[a]=c(n[a],r);else for(a=0;a<t;a++)o[a]=i;return o}}function s(t,n,r,e){if(e=e||[],t.length!==n.length)throw new TypeError("min and max array are expected to have the same length");for(var i=0;i<t.length;i++)e[i]=u(t[i],n[i],r);return e}function l(t,n){if("number"!==typeof(t=e(t,0)))throw new TypeError("Expected n argument to be a number");for(var r=[],i=0;i<t;i++)r.push(n);return r}function p(t,n){return(t%n+n)%n}function v(t,n,r,e){return u(t,n,1-Math.exp(-r*e))}t.exports={mod:p,fract:function(t){return t-Math.floor(t)},sign:function(t){return t>0?1:t<0?-1:0},degToRad:function(t){return t*Math.PI/180},radToDeg:function(t){return 180*t/Math.PI},wrap:i,pingPong:function(t,n){return t=p(t,2*n),n-Math.abs(t-n)},linspace:function(t,n){if("number"!==typeof(t=e(t,0)))throw new TypeError("Expected n argument to be a number");"boolean"===typeof(n=n||{})&&(n={endpoint:!0});var r=e(n.offset,0);return n.endpoint?l(t).map((function(n,e){return t<=1?0:(e+r)/(t-1)})):l(t).map((function(n,e){return(e+r)/t}))},lerp:u,lerpArray:s,inverseLerp:f,lerpFrames:function(t,n,r){n=o(n,0,1);var e=t.length-1,i=n*e,a=Math.floor(i),f=i-a,c=Math.min(a+1,e),h=t[a%t.length],l=t[c%t.length];if("number"===typeof h&&"number"===typeof l)return u(h,l,f);if(Array.isArray(h)&&Array.isArray(l))return s(h,l,f,r);throw new TypeError("Mismatch in value type of two array elements: "+a+" and "+c)},clamp:o,clamp01:function(t){return o(t,0,1)},smoothstep:function(t,n,r){var e=o(f(t,n,r),0,1);return e*e*(3-2*e)},damp:v,dampArray:function(t,n,r,e,i){i=i||[];for(var a=0;a<t.length;a++)i[a]=v(t[a],n[a],r,e);return i},mapRange:function(t,n,r,e,i,o){if(Math.abs(n-r)<a)return e;var u=(t-n)/(r-n)*(i-e)+e;return o&&(i<e?u<i?u=i:u>e&&(u=e):u>i?u=i:u<e&&(u=e)),u},expand2D:h(2),expand3D:h(3),expand4D:h(4)}},9075:function(t){t.exports=function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]}},1811:function(t,n,r){"use strict";r.r(n),r.d(n,{default:function(){return u}});var e=r(5137),i=r(5933),a=r(1534);function o(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}var u=function t(n,r,u){var f=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),o(this,"habitat",[]),o(this,"createRandomHabitat",(function(){for(var t=0;t<f.env.gridSize;t++){f.habitat[t]=[];for(var n=0;n<f.env.gridSize;n++)f.habitat[t].push((0,a.getRandomInt)(0,4))}})),o(this,"tick",(function(){f.draw()})),o(this,"draw",(function(){for(var t=0;t<f.env.gridSize;t++)for(var n=0;n<f.env.gridSize;n++){var r=n/(f.env.gridSize-1),i=t/(f.env.gridSize-1);f.ctx.fillStyle=f.getHabitatColour(f.habitat[n][t]),f.ctx.fillRect(f.env.marginX+(0,e.lerp)(0,f.env.height,r)-f.size/2,(0,e.lerp)(0,f.env.height,i)-f.size/2,f.size,f.size)}})),o(this,"getHabitat",(function(t,n){var r,e;return r=t<0?0:t>f.env.gridSize-1?f.env.gridSize-1:t,e=n<0?0:n>f.env.gridSize-1?f.env.gridSize-1:n,f.habitat[r][e]})),o(this,"getHabitatColour",(function(t){return["#aaaaaa","#666B3A","#ADAB76","#B05449"][t]})),this.ctx=n,this.env=r,this.size=(r.width-2*r.marginX)/r.gridSize,this.habitat=new i.default(r,u).habitat,this.draw()}},5933:function(t,n,r){"use strict";r.r(n),r.d(n,{default:function(){return o}});var e=r(1534),i=r(6708);function a(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}var o=function t(n,r){var o=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),a(this,"habitat",[]),a(this,"createHabitat",(function(){for(var t=[],n=0;n<o.env.gridSize;n++){t[n]=[];for(var r=0;r<o.env.gridSize;r++)t[n].push((0,e.getRandomInt)(0,3))}return t})),a(this,"createBlankHabitat",(function(){for(var t=0;t<o.env.gridSize;t++){o.habitat[t]=[];for(var n=0;n<o.env.gridSize;n++)o.habitat[t].push(0)}})),a(this,"tick",(function(){console.log("tick")})),this.env=n,this.habitat=r?i.ElizasHabitat:this.createHabitat()}},1534:function(t,n,r){"use strict";r.r(n),r.d(n,{drawGradientBackground:function(){return a},getRandomInt:function(){return i},test:function(){return e}});var e=function(){console.log("test")},i=function(t,n){return t=Math.ceil(t),n=Math.floor(n),Math.floor(Math.random()*(n-t+1))+t},a=function(t,n,r){var e=t.color(n),i=t.color(r);e.setAlpha(20),i.setAlpha(20);for(var a=0;a<t.width+1;a++){var o=t.map(a,0,t.width,0,1),u=t.lerpColor(e,i,o);t.stroke(u),t.line(a,-1,a,t.height),t.pop()}}}}]);