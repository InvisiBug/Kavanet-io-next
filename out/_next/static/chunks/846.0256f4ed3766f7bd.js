"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[846,3189,3734,3864],{3189:function(t,s,e){e.r(s),e.d(s,{default:function(){return o}});var i=e(4035);function n(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}var o=function t(s){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=this;if(n(this,t),this.genes=[],this.mutation=function(){for(var t=0;t<o.genes.length;t++){o.p5.random(1)<.01&&(o.genes[t]=i.Vector.random2D(),o.genes[t].setMag(o.speed))}},this.boogieWith=function(s){for(var e=[],i=o.p5.floor(o.p5.random(o.genes.length)),n=0;n<o.genes.length;n++)e[n]=n>i?o.genes[n]:s.genes[n];return new t(o.simSettings,e)},this.simSettings=s,this.p5=s.p5,this.speed=s.speed,e)this.genes=e;else for(var a=0;a<this.simSettings.lifespan;a++){var r=i.Vector.random2D();r.setMag(this.speed),this.genes.push(r)}}},3734:function(t,s,e){e.r(s),e.d(s,{default:function(){return i}});var i=function t(s){var e=this;!function(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}(this,t),this.show=function(){e.p5.image(e.simSettings.obstacleImg,e.pos.x,e.pos.y,e.size,e.size)},this.checkCrash=function(t){e.p5.dist(e.pos.x,e.pos.y,t.x,t.y)<e.size&&console.log("crash")},this.simSettings=s,this.p5=s.p5,this.pos=this.p5.createVector(this.p5.random(0,this.p5.width),this.p5.random(this.p5.height/4,this.p5.height)),this.size=50}},3864:function(t,s,e){e.r(s),e.d(s,{default:function(){return o}});var i=e(3189);function n(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}var o=function t(s,e,o){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=this;n(this,t),this.obstacleArr=[],this.update=function(){if(r.location++,!r.completed&&!r.crashed){var t=r;r.p5.dist(r.pos.x,r.pos.y,r.target.x,r.target.y)<10&&(r.completed=!0),r.obstacleArr.forEach((function(s){t.p5.dist(t.pos.x,t.pos.y,s.pos.x,s.pos.y)<s.size/2&&(t.crashed=!0)}));(r.pos.x<0||r.pos.x>r.p5.width-0||r.pos.y<0||r.pos.y>r.p5.height-0)&&(r.crashed=!0),r.applyForce(r.dna.genes[r.location]),r.vel.add(r.acc),r.pos.add(r.vel),r.acc.mult(0)}},this.show=function(){r.completed||r.crashed||(r.p5.push(),r.p5.translate(r.pos.x,r.pos.y),r.p5.rotate(r.vel.heading()+-80),r.p5.imageMode(r.p5.CENTER),r.p5.image(r.simSettings.rocketImg,0,0,51,51),r.p5.pop())},this.applyForce=function(t){r.acc.add(t)},this.calcFitness=function(){var t=r.p5.dist(r.pos.x,r.pos.y,r.target.x,r.target.y);return r.fitness=r.p5.map(t,0,r.p5.width,r.p5.width,0),!!r.completed||(r.crashed?(r.fitness/=10,!1):void 0)},this.p5=s.p5,this.simSettings=s,this.img=s.rocketImg,this.target=e,this.obstacleArr=o,this.pos=this.p5.createVector(this.p5.width/2,this.p5.height),this.vel=this.p5.createVector(),this.acc=this.p5.createVector(),this.completed=!1,this.crashed=!1,this.dna=a||new i.default(this.simSettings),this.location=0,this.fitness=0}},846:function(t,s,e){e.r(s),e.d(s,{default:function(){return o}});var i=e(3864),n=e(3734);var o=function t(s,e){var o=this;!function(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}(this,t),this.rocketArr=[],this.matingPool=[],this.obstacleArr=[],this.run=function(){o.count++,o.p5.rectMode(o.p5.CENTER),o.rocketArr.forEach((function(t){t.update(),t.show()})),o.obstacleArr.forEach((function(t){t.show()}))},this.createNextGeneration=function(){o.evaluate(),o.breed()},this.evaluate=function(){var t=o;o.maxFitness=0,o.matingPool=[];var s=0;o.rocketArr.forEach((function(e){e.calcFitness()&&s++,e.fitness>t.maxFitness&&(t.maxFitness=e.fitness)})),console.log("Landed Rockets:",s,"\tCrashed Rockets:",o.simSettings.totalRockets-s),o.rocketArr.forEach((function(s){s.fitness/=t.maxFitness})),o.rocketArr.forEach((function(s){for(var e=100*s.fitness,i=0;i<e;i++)t.matingPool.push(s)}))},this.breed=function(){for(var t=[],s=0;s<o.rocketArr.length;s++){var e=o.p5.random(o.matingPool).dna,n=o.p5.random(o.matingPool).dna,a=e.boogieWith(n);a.mutation(),t.push(new i.default(o.simSettings,o.target,o.obstacleArr,a))}o.rocketArr=t,o.count=0},this.p5=s.p5,this.simSettings=s,this.lifespan=s.lifespan,this.target=e,this.maxFitness=0,this.count=0;for(var a=0;a<this.simSettings.totalObstacles;a++)this.obstacleArr.push(new n.default(s));for(var r=0;r<this.simSettings.totalRockets;r++)this.rocketArr.push(new i.default(s,e,this.obstacleArr))}}}]);