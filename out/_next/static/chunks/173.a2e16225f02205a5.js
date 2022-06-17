"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[173,4449,1365,9043,5933,6430,1534],{4449:function(t,i,e){e.r(i),e.d(i,{default:function(){return c}});var n=e(8130),a=e.n(n),r=e(5137),o=e(9043);function s(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function h(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}var c=function t(i,e,n){arguments.length>3&&void 0!==arguments[3]||(a().rangeFloor(0,e.gridSize-1),a().rangeFloor(0,e.gridSize-1));var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:a().pick([1,2,3]),d=this;s(this,t),h(this,"runNumber",0),h(this,"setPos",(function(t){d.x=t[0],d.y=t[1]})),h(this,"getInfo",(function(){return{x:d.x,y:d.y,width:d.size,height:d.size,id:d.id,species:d.species}})),h(this,"get0tile",(function(){var t=!1;do{var i=a().rangeFloor(0,d.env.gridSize-1),e=a().rangeFloor(0,d.env.gridSize-1);d.habitat.getHabitat(i,e)!==o.woodlandEdge&&d.habitat.getHabitat(i,e)!==o.woodland&&d.habitat.getHabitat(i,e)!==o.buildings&&(d.setPos([i,e]),t=!0)}while(!0!==t)})),h(this,"tick",(function(t){d.runNumber+=1,d.alive&&(d.nest||(d.setPos([d.x+a().pick([-d.env.moveDistance,0,d.env.moveDistance]),d.y+a().pick([-d.env.moveDistance,0,d.env.moveDistance])]),d.detectWalls(),d.checkForNest()),d.draw())})),h(this,"checkForNest",(function(){d.habitat.getHabitat(d.x,d.y)===d.species&&(d.nest=!0)})),h(this,"checkForSuitableNest",(function(){if(d.habitat.getHabitat(d.x,d.y)===d.species)return!0})),h(this,"die",(function(){d.alive=!1})),h(this,"draw",(function(){d.ctx.beginPath();var t=d.x/(d.env.gridSize-1),i=d.y/(d.env.gridSize-1);d.ctx.arc(d.env.marginX+(0,r.lerp)(0,d.env.height,t)-d.size/2,(0,r.lerp)(0,d.env.height,i),d.size,0,2*Math.PI),d.ctx.fillStyle=1===d.species?"#A51401":2===d.species?"#FBFB39":3===d.species?"#081CA1":"#ffffff",d.ctx.fill()})),h(this,"detectWalls",(function(){d.x<0?d.x=0:d.x>d.env.gridSize-1?d.x=d.env.gridSize-1:d.y<0?d.y=0:d.y>d.env.gridSize-1&&(d.y=d.env.gridSize-1)})),this.ctx=i,this.env=e,this.size=2,this.width=this.size,this.height=this.size,this.habitat=n,this.species=c,this.id=Math.random(),this.nest=!1,this.alive=!0,this.life=10,this.timestamp=0,this.lastTimestamp=0,this.get0tile(),this.draw()}},1365:function(t,i,e){e.r(i),e.d(i,{default:function(){return d}});var n=e(8130),a=e.n(n),r=e(5137),o=e(9043),s=e(1534);function h(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function c(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}var d=function t(i,e,n){arguments.length>3&&void 0!==arguments[3]||(a().rangeFloor(0,e.gridSize-1),a().rangeFloor(0,e.gridSize-1));var d=this;h(this,t),c(this,"runNumber",0),c(this,"lookAroundSize",2),c(this,"buildingFound",!1),c(this,"setPos",(function(t){d.x=t[0],d.y=t[1]})),c(this,"get0tile",(function(){var t=!1;do{var i=a().rangeFloor(0,d.env.gridSize-1),e=a().rangeFloor(0,d.env.gridSize-1);d.habitat.getHabitat(i,e)!==o.woodlandEdge&&d.habitat.getHabitat(i,e)!==o.woodland&&d.habitat.getHabitat(i,e)!==o.buildings&&(d.setPos([i,e]),t=!0)}while(!0!==t)})),c(this,"findTileNearHouse",(function(){var t=!1;do{var i=a().rangeFloor(0,d.env.gridSize-1),e=a().rangeFloor(0,d.env.gridSize-1);d.searchForBuildingProximity(i,e)&&(d.setPos([i,e]),t=!0)}while(!0!==t)})),c(this,"getInfo",(function(){return{id:d.id,x:d.x,y:d.y,width:d.size,height:d.size,species:d.species}})),c(this,"tick",(function(t){d.move(),d.checkAndEatBat(t),d.draw()})),c(this,"checkAndEatBat",(function(t){for(var i=0;i<t.length;i++)d.x===t[i].getInfo().x&&d.y===t[i].getInfo().y&&(0,s.getRandomInt)(0,10)>5&&t[i].die()})),c(this,"move",(function(){var t=!1,i=0,e=0;do{i=d.x+a().pick([-d.env.moveDistance,0,d.env.moveDistance]),e=d.y+a().pick([-d.env.moveDistance,0,d.env.moveDistance]),d.avoidEdges(i,e)&&d.avoidBadHabitats(i,e)&&d.searchForBuildingProximity(i,e)&&(d.buildingFound=!0,d.x=i,d.y=e,t=!0)}while(!0!==t)})),c(this,"avoidBadHabitats",(function(t,i){return d.habitat.getHabitat(t,i)!==o.buildings&&d.habitat.getHabitat(t,i)!==o.woodland})),c(this,"avoidEdges",(function(t,i){var e=t>0&&t<d.env.gridSize,n=i>0&&i<d.env.gridSize;return e&&n})),c(this,"searchForBuildingProximity",(function(t,i){for(var e=i-d.lookAroundSize;e<i+d.lookAroundSize+1;e++)for(var n=t-d.lookAroundSize;n<t+d.lookAroundSize+1;n++)if(d.habitat.getHabitat(n,e)===o.buildings)return!0;return!1})),c(this,"draw",(function(){d.ctx.beginPath();var t=d.x/(d.env.gridSize-1),i=d.y/(d.env.gridSize-1);d.ctx.arc(d.env.marginX+(0,r.lerp)(0,d.env.height,t)-d.size/2,(0,r.lerp)(0,d.env.height,i),d.size,0,2*Math.PI),d.ctx.fillStyle="#fff",d.ctx.fill()})),this.ctx=i,this.env=e,this.size=2,this.width=this.size,this.height=this.size,this.habitat=n,this.id=Math.random(),this.timestamp=0,this.lastTimestamp=0,this.findTileNearHouse()}},9043:function(t,i,e){e.r(i),e.d(i,{buildings:function(){return r},woodland:function(){return n},woodlandEdge:function(){return a}});var n=1,a=2,r=3},1811:function(t,i,e){e.r(i),e.d(i,{default:function(){return s}});var n=e(5137),a=e(5933),r=e(1534);function o(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}var s=function t(i,e,s){var h=this;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),o(this,"habitat",[]),o(this,"createRandomHabitat",(function(){for(var t=0;t<h.env.gridSize;t++){h.habitat[t]=[];for(var i=0;i<h.env.gridSize;i++)h.habitat[t].push((0,r.getRandomInt)(0,4))}})),o(this,"tick",(function(){h.draw()})),o(this,"draw",(function(){for(var t=0;t<h.env.gridSize;t++)for(var i=0;i<h.env.gridSize;i++){var e=i/(h.env.gridSize-1),a=t/(h.env.gridSize-1);h.ctx.fillStyle=h.getHabitatColour(h.habitat[i][t]),h.ctx.fillRect(h.env.marginX+(0,n.lerp)(0,h.env.height,e)-h.size/2,(0,n.lerp)(0,h.env.height,a)-h.size/2,h.size,h.size)}})),o(this,"getHabitat",(function(t,i){var e,n;return e=t<0?0:t>h.env.gridSize-1?h.env.gridSize-1:t,n=i<0?0:i>h.env.gridSize-1?h.env.gridSize-1:i,h.habitat[e][n]})),o(this,"getHabitatColour",(function(t){return["#aaaaaa","#666B3A","#ADAB76","#B05449"][t]})),this.ctx=i,this.env=e,this.size=(e.width-2*e.marginX)/e.gridSize,this.habitat=new a.default(e,s).habitat,this.draw()}},5933:function(t,i,e){e.r(i),e.d(i,{default:function(){return o}});var n=e(1534),a=e(6708);function r(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}var o=function t(i,e){var o=this;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),r(this,"habitat",[]),r(this,"createHabitat",(function(){for(var t=[],i=0;i<o.env.gridSize;i++){t[i]=[];for(var e=0;e<o.env.gridSize;e++)t[i].push((0,n.getRandomInt)(0,3))}return t})),r(this,"createBlankHabitat",(function(){for(var t=0;t<o.env.gridSize;t++){o.habitat[t]=[];for(var i=0;i<o.env.gridSize;i++)o.habitat[t].push(0)}})),r(this,"tick",(function(){console.log("tick")})),this.env=i,this.habitat=e?a.ElizasHabitat:this.createHabitat()}},6430:function(t,i,e){e.r(i),e.d(i,{default:function(){return d}});var n=e(8130),a=e.n(n),r=e(5137),o=e(9043),s=e(1534);function h(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function c(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}var d=function t(i,e,n){arguments.length>3&&void 0!==arguments[3]||(a().rangeFloor(0,e.gridSize-1),a().rangeFloor(0,e.gridSize-1));var d=this;h(this,t),c(this,"runNumber",0),c(this,"lookAroundSize",4),c(this,"buildingFound",!1),c(this,"setPos",(function(t){d.x=t[0],d.y=t[1]})),c(this,"get0tile",(function(){var t=!1;do{var i=a().rangeFloor(0,d.env.gridSize-1),e=a().rangeFloor(0,d.env.gridSize-1);d.habitat.getHabitat(i,e)!==o.woodlandEdge&&d.habitat.getHabitat(i,e)!==o.woodland&&d.habitat.getHabitat(i,e)!==o.buildings&&(d.setPos([i,e]),t=!0)}while(!0!==t)})),c(this,"findDeepWoodland",(function(){var t=!1;do{var i=a().rangeFloor(0,d.env.gridSize-1),e=a().rangeFloor(0,d.env.gridSize-1);d.habitat.getHabitat(i,e)!==o.woodlandEdge&&d.habitat.getHabitat(i,e)!==o.buildings&&0!==d.habitat.getHabitat(i,e)&&(d.setPos([i,e]),t=!0)}while(!0!==t)})),c(this,"getInfo",(function(){return{id:d.id,x:d.x,y:d.y,width:d.size,height:d.size,species:d.species}})),c(this,"tick",(function(t){d.move(),d.draw()})),c(this,"checkAndEatBat",(function(t){for(var i=0;i<t.length;i++)d.x===t[i].getInfo().x&&d.y===t[i].getInfo().y&&(0,s.getRandomInt)(0,10)>5&&t[i].die()})),c(this,"move",(function(){var t=!1,i=0,e=0;do{i=d.x+a().pick([-d.env.moveDistance,0,d.env.moveDistance]),e=d.y+a().pick([-d.env.moveDistance,0,d.env.moveDistance]),d.avoidEdges(i,e)&&d.avoidBadHabitats(i,e)&&(d.x=i,d.y=e,t=!0)}while(!0!==t)})),c(this,"avoidBadHabitats",(function(t,i){return d.habitat.getHabitat(t,i)!==o.buildings&&d.habitat.getHabitat(t,i)!==o.woodlandEdge&&d.habitat.getHabitat(t,i)!==o.woodlandEdge})),c(this,"avoidEdges",(function(t,i){var e=t>0&&t<d.env.gridSize,n=i>0&&i<d.env.gridSize;return e&&n})),c(this,"searchForBuildingProximity",(function(t,i){for(var e=i-d.lookAroundSize;e<i+d.lookAroundSize+1;e++)for(var n=t-d.lookAroundSize;n<t+d.lookAroundSize+1;n++)if(d.habitat.getHabitat(n,e)===o.buildings)return!0;return!1})),c(this,"draw",(function(){d.ctx.beginPath();var t=d.x/(d.env.gridSize-1),i=d.y/(d.env.gridSize-1);d.ctx.arc(d.env.marginX+(0,r.lerp)(0,d.env.height,t)-d.size/2,(0,r.lerp)(0,d.env.height,i),d.size,0,2*Math.PI),d.ctx.fillStyle="#FCEB0B",d.ctx.fill()})),this.ctx=i,this.env=e,this.size=2,this.width=this.size,this.height=this.size,this.habitat=n,this.id=Math.random(),this.timestamp=0,this.lastTimestamp=0,this.get0tile()}},173:function(t,i,e){e.r(i),e.d(i,{default:function(){return h}});var n=e(4449),a=e(1811),r=e(1365),o=e(6430);function s(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}var h=function t(i){var e=this;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),s(this,"env",{width:window.innerWidth,height:window.innerHeight,marginX:(window.innerWidth-window.innerHeight)/2,bgColour:"rgba(25, 25, 25)",speed:1,fps:10,moveDistance:1,gridSize:100}),s(this,"tickables",[]),s(this,"timestamp",0),s(this,"lastTimestamp",0),s(this,"bats",[]),s(this,"runNumber",0),s(this,"numBats",100),s(this,"numCats",10),s(this,"numHawks",20),s(this,"setup",(function(){e.resizeCanvas(),e.drawBackground(),e.habitat=new a.default(e.ctx,e.env,!0),e.tickables.push(e.habitat);for(var t=0;t<e.numHawks;t++){var i=new o.default(e.ctx,e.env,e.habitat,[47,43]);e.tickables.push(i)}for(var s=0;s<e.numCats;s++){var h=new r.default(e.ctx,e.env,e.habitat,[47,43]);e.tickables.push(h)}for(var c=0;c<e.numBats;c++){var d=new n.default(e.ctx,e.env,e.habitat,[50,50]);e.bats.push(d),e.tickables.push(d)}e.sim()})),s(this,"sim",(function(){var t=e;if(e.timestamp=Date.now(),!(e.timestamp-e.lastTimestamp<1e3/e.env.fps)){var i=e;e.tickables.forEach((function(t){t.tick(i.bats)})),e.lastTimestamp=e.timestamp}requestAnimationFrame((function(){return t.sim()}))})),s(this,"printStats",(function(){for(var t=0,i=0,n=0;n<e.bats.length;n++)e.bats[n].alive&&(t+=1),e.bats[n].nest&&e.bats[n].alive&&(i+=1);console.log("Bats Killed :",e.numBats-t,"Bats Remaining :",t,"\t Bats With a House :",i)})),s(this,"drawBackground",(function(){e.ctx.fillStyle=e.env.bgColour,e.ctx.fillRect(0,0,e.env.width,e.env.height)})),s(this,"resizeCanvas",(function(){e.canvas.width=e.env.width,e.canvas.height=e.env.height})),this.canvas=i,this.ctx=this.canvas.getContext("2d"),this.setup()}},1534:function(t,i,e){e.r(i),e.d(i,{drawGradientBackground:function(){return r},getRandomInt:function(){return a},test:function(){return n}});var n=function(){console.log("test")},a=function(t,i){return t=Math.ceil(t),i=Math.floor(i),Math.floor(Math.random()*(i-t+1))+t},r=function(t,i,e){var n=t.color(i),a=t.color(e);n.setAlpha(20),a.setAlpha(20);for(var r=0;r<t.width+1;r++){var o=t.map(r,0,t.width,0,1),s=t.lerpColor(n,a,o);t.stroke(s),t.line(r,-1,r,t.height),t.pop()}}}}]);