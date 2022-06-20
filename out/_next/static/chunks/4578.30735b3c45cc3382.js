"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4578],{4578:function(t,e,r){function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.r(e),r.d(e,{default:function(){return a}});var a=function(){function t(e,r){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this;o(this,t),this.xpoints=0,this.ypoints=0,this.margin=0,this.generateNewMap=function(){i.xpoints=i.p5.floor(i.p5.width/i.xscale),i.ypoints=i.p5.floor(i.p5.height/i.yscale),i.margin=(i.p5.width-i.p5.height)/1;for(var t=0;t<i.ypoints;t++){i.trailMap[t]=[];for(var e=0;e<i.xpoints;e++)i.trailMap[t][e]=25}},this.show=function(){for(var t=0;t<i.ypoints;t++)for(var e=0;e<i.xpoints;e++){var r=e/i.xpoints,o=t/i.ypoints;if(i.p5.noStroke(),i.trailMap[t][e]>0){i.colour.setAlpha(i.trailMap[t][e]),i.p5.fill(i.colour);var a=i.p5.lerp(0,i.p5.width-0,r),c=i.p5.lerp(0,i.p5.height-0,o);i.p5.ellipse(a,c,i.size)}}},this.fade=function(){for(var t=0;t<i.ypoints;t++)for(var e=0;e<i.xpoints;e++)i.trailMap[t][e]>0?i.trailMap[t][e]-=1.5:i.trailMap[t][e]<0&&(i.trailMap[t][e]=0)},this.followScent=function(t,e){var r=i,o=i.p5.floor(t/i.xscale),a=i.p5.floor(e/i.xscale);[i.p5.createVector(-4,-3),i.p5.createVector(0,-3),i.p5.createVector(4,-3)].forEach((function(t,e){r.checkRegions(o+t.x,a+t.y)}))},this.checkRegions=function(t,e){var r=i;[i.p5.createVector(0,0),i.p5.createVector(-1,-1),i.p5.createVector(0,-1),i.p5.createVector(1,-1),i.p5.createVector(-1,0),i.p5.createVector(1,0),i.p5.createVector(-1,1),i.p5.createVector(0,1),i.p5.createVector(1,1)].forEach((function(o,a){r.setCompensateVal(t+o.x,e+o.y,255)}))},this.getVal=function(t,e){try{var r=i.p5.floor(t/i.xscale),o=i.p5.floor(e/i.xscale);return r>=i.xpoints&&(r=i.xpoints),o>=i.ypoints&&(o=i.ypoints),i.trailMap[o][r]}catch(a){return-1}},this.getCompensatedVal=function(t,e){try{return i.trailMap[e][t]}catch(r){return}},this.setCompensateVal=function(t,e,r){try{i.trailMap[e][t]=r}catch(o){console.log("Set Compensated Val Error")}},this.setVal=function(t,e,r){try{var o=i.p5.floor(t/i.xscale),a=i.p5.floor(e/i.xscale);o>=i.xpoints&&(o=i.xpoints-1),a>=i.ypoints&&(a=i.ypoints-1),i.trailMap[a][o]=r}catch(c){console.log("Out of bounds: Fix me")}},this.p5=e.p5,this.config=e,this.colour=r,this.offset=a,this.trailMap=[],this.scale=15,this.xscale=this.scale,this.yscale=this.scale,this.size=7}var e=t.prototype;return e.getStrongest=function(t,e,r){var o=this,a=this.p5.floor(t/this.xscale),i=this.p5.floor(e/this.xscale),c=0,s=0,p=this.p5.createVector();return[this.p5.createVector(-1,-1),this.p5.createVector(0,-1),this.p5.createVector(1,1),this.p5.createVector(-1,0),this.p5.createVector(1,0),this.p5.createVector(-1,1),this.p5.createVector(0,1),this.p5.createVector(1,1)].forEach((function(t){(c=o.getCompensatedVal(a+t.x,i+t.y))&&c>s&&(p.set(t.x,t.y),s=c)})),p},e.getWeakest=function(t,e,r){var o=this,a=this.p5.floor(t/this.xscale),i=this.p5.floor(e/this.xscale),c=0,s=1/0,p=this.p5.createVector(0,0);return[this.p5.createVector(-1,-1),this.p5.createVector(0,-1),this.p5.createVector(1,1),this.p5.createVector(-1,0),this.p5.createVector(1,0),this.p5.createVector(-1,1),this.p5.createVector(0,1),this.p5.createVector(1,1)].forEach((function(t,e){(c=o.getCompensatedVal(a+t.x,i+t.y))&&c<s&&(p.set(t.x,t.y).setMag(.5),s=c)})),p},t}()}}]);