"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1534],{1534:function(t,n,o){o.r(n),o.d(n,{drawGradientBackground:function(){return a},getRandomInt:function(){return e},test:function(){return r}});var r=function(){console.log("test")},e=function(t,n){return t=Math.ceil(t),n=Math.floor(n),Math.floor(Math.random()*(n-t+1))+t},a=function(t,n,o){var r=t.color(n),e=t.color(o);r.setAlpha(20),e.setAlpha(20);for(var a=0;a<t.width+1;a++){var u=t.map(a,0,t.width,0,1),c=t.lerpColor(r,e,u);t.stroke(c),t.line(a,-1,a,t.height),t.pop()}}}}]);