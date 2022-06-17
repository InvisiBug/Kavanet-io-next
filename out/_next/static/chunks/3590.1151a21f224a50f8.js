"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3590,9976,2938],{5120:function(o,t,e){e.r(t),e.d(t,{default:function(){return c}});var i=e(4035),s=e(3769),n=e(2938);function a(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}function p(o,t){return null!=t&&"undefined"!==typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](o):o instanceof t}var c=function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,h=this;a(this,o),this.hasFood=!1,this.update=function(o){var t=o.zombies,e=(o.humans,o.safezones,o.food),i=o.toFoodMap,s=o.toHomeMap,n=o.speed;n&&(h.velocity.setMag(n),h.speed=n),h.handleFood(),h.avoid(t),h.handleMovement(i,s),h.checkForFood(e)},this.show=function(){h.p5.push(),h.p5.translate(h.pos.x,h.pos.y),h.p5.rotate(h.velocity.heading()+h.p5.radians(90)),h.p5.imageMode(h.p5.CENTER),h.p5.image(h.img,0,0,h.config.imageSize,h.config.imageSize),h.p5.pop(),h.p5.push();var o=h.velocity.copy().setMag(10);h.p5.strokeWeight(2),h.p5.stroke(255),h.p5.line(h.pos.x,h.pos.y,h.pos.x+o.x,h.pos.y+o.y),h.p5.pop(),h.showFoodLevel()},this.handleFood=function(){h.food<=50?h.hasFood=!1:h.hasFood=!0,h.p5.frameCount%h.foodDeclineRate===0&&h.food>0&&(h.food-=1)},this.checkForFood=function(o){var t=h;o.forEach((function(e){t.pos.dist(e.pos)<10&&(t.food+=50,o.splice(o.indexOf(e),1))}))},this.showFoodLevel=function(){h.p5.pop(),h.p5.textSize(12),h.p5.fill(h.colour),h.p5.text("".concat(h.food),h.pos.x+8,h.pos.y-5),h.p5.push()},this.handleMovement=function(o,t){h.p5.random()<.2&&(h.acceleration=i.Vector.random2D().setMag(.2)),h.handleTrailMaps(o,t),h.velocity.add(h.acceleration),h.velocity.limit(h.speed),h.pos.add(h.velocity),(0,n.constrain)(h.p5,h.pos,h.velocity,h.acceleration)},this.handleTrailMaps=function(o,t){h.p5.frameCount%5===0&&(h.hasFood?(o.setVal(h.pos.x,h.pos.y,255),h.acceleration=t.getWeakest(h.pos.x,h.pos.y,h.hasFood).setMag(1)):(t.setVal(h.pos.x,h.pos.y,255),h.acceleration=o.getWeakest(h.pos.x,h.pos.y,h.hasFood).setMag(1)))},this.avoid=function(o){var t=h,e=null,n=1/0;return o.forEach((function(o){var i=t.pos.dist(o.pos);i<n&&(n=i,e=o)})),p(e,s.default)?(e.pos.dist(h.pos)<h.avoidanceDistance&&(h.acceleration=i.Vector.sub(h.pos,e.pos)),e):null},this.p5=t.p5,this.config=t,this.colour=this.p5.color("#3087B4"),this.avoidanceDistance=50,this.speed=t.speed,this.size=10,this.food=10,this.foodDeclineRate=t.foodDeclineRate,this.img=t.humanImg,this.acceleration=this.p5.createVector(0,0),this.velocity=i.Vector.random2D(),this.velocity.setMag(t.speed),this.pos=e&&c?this.p5.createVector(e,c):this.p5.createVector(this.p5.random(this.p5.width),this.p5.random(this.p5.height))}},3769:function(o,t,e){e.r(t),e.d(t,{default:function(){return c}});var i=e(4035),s=e(5120),n=e(2938);function a(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}function p(o,t){return null!=t&&"undefined"!==typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](o):o instanceof t}var c=function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,h=this;a(this,o),this.show=function(){h.p5.push(),h.p5.translate(h.pos.x,h.pos.y),h.p5.rotate(h.velocity.heading()),h.p5.imageMode(h.p5.CENTER),h.p5.image(h.img,0,0,h.config.imageSize,h.config.imageSize),h.p5.pop(),h.showFood()},this.showFood=function(){h.p5.pop(),h.p5.textSize(12),h.p5.fill(h.colour),h.p5.text("".concat(h.food),h.pos.x+8,h.pos.y-5),h.p5.push()},this.drawDirection=function(){h.p5.push(),h.p5.strokeWeight(2),h.p5.stroke(1);var o=h.velocity.copy();o.setMag(h.size/2),h.p5.translate(h.pos.x,h.pos.y),h.p5.line(0,0,o.x,o.y),h.p5.pop()},this.update=function(o,t,e){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;i&&(h.velocity.setMag(i),h.speed=i),h.handleMovement(),h.handleFood(),h.chase(t,o),h.avoid(e)},this.handleFood=function(){h.p5.frameCount%h.foodDeclineRate===0&&h.food>0&&(h.food-=1)},this.handleMovement=function(){h.p5.random()<.4&&(h.acceleration=i.Vector.random2D().setMag(.2)),h.velocity.add(h.acceleration),h.velocity.limit(h.speed),h.pos.add(h.velocity),(0,n.constrain)(h.p5,h.pos,h.velocity,h.acceleration)},this.avoid=function(o){var t=h;o.forEach((function(o){t.pos.dist(o.pos)<100&&(t.acceleration=i.Vector.sub(t.pos,o.pos))}))},this.chase=function(t,e){var n=h,a=null,c=1/0;if(t.forEach((function(o){var t=n.pos.dist(o.pos);t<c&&(c=t,t<100&&(a=o))})),p(a,s.default)&&(h.acceleration=i.Vector.sub(a.pos,h.pos),h.pos.dist(a.pos)<5)){h.food+=1,t.splice(t.indexOf(a),1);var r=a.pos.x+h.p5.random(-10,10),l=a.pos.y+h.p5.random(-10,10);e.push(new o(h.config,r,l))}},this.p5=t.p5,this.config=t,this.size=10,this.img=t.zombieImg,this.colour=this.p5.color(161,184,66),this.food=this.p5.floor(this.p5.random(10,20)),this.foodDeclineRate=t.foodDeclineRate,this.speed=t.speed,this.wanderStrength=.1,this.acceleration=this.p5.createVector(0,0),this.velocity=i.Vector.random2D(),this.velocity.setMag(t.speed),this.pos=e&&c?this.p5.createVector(e,c):this.p5.createVector(this.p5.random(this.p5.width),this.p5.random(this.p5.height))}},2938:function(o,t,e){e.r(t),e.d(t,{constrain:function(){return s},drawDirection:function(){return i}});var i=function(o,t,e,i){o.push(),o.strokeWeight(2),o.stroke(1);var s=e.copy();s.setMag(i/2),o.translate(t.x,t.y),o.line(0,0,s.x,s.y),o.pop()},s=function(o,t,e,i){i.set(0,0),t.x<=0?(e.mult(o.createVector(-1,1)),t.x=1):t.x>=o.width?(e.mult(o.createVector(-1,1)),t.x=o.width-1):t.y<=0?(e.mult(o.createVector(1,-1)),t.y=1):t.y>=o.height&&(e.mult(o.createVector(1,-1)),t.y=o.height-1)}},3590:function(o,t,e){e.r(t),e.d(t,{default:function(){return a}});var i=e(4035),s=e(5120);function n(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,p=this;if(n(this,o),this.update=function(o){p.p5.frameCount%p.foodDeclineRate===0&&p.sendOutHumans(o),p.checkForSurvivor(o)},this.checkForSurvivor=function(o){var t=p;o.forEach((function(o){o.pos.dist(t.pos)<t.size/2&&(t.food+=o.food,o.food=0),o.hasFood&&o.pos.dist(t.pos)<100&&(o.acceleration=i.Vector.sub(t.pos,o.pos))}))},this.sendOutHumans=function(o){if(!p.flag){p.flag=!0;for(var t=0;t<360;t+=18){i.Vector.fromAngle(t).setMag(50),o.push(new s.default(p.config,p.pos.x,p.pos.y))}}},this.show=function(){p.p5.fill(p.colour),p.p5.strokeWeight(0),p.p5.ellipse(p.pos.x,p.pos.y,p.size,p.size),p.config.showFood&&p.showFood()},this.showName=function(){p.p5.pop(),p.p5.textSize(12),p.p5.fill(p.colour),p.p5.textAlign(p.p5.CENTER),p.p5.text("Safezone",p.pos.x,p.pos.y-p.size/2-10),p.p5.push()},this.showFood=function(){p.p5.pop(),p.p5.textSize(12),p.p5.fill(p.colour),p.p5.textAlign(p.p5.LEFT),p.p5.text("Food: ".concat(p.food),p.pos.x+p.size/2+5,p.pos.y-p.size/2+20),p.p5.push()},this.showSurvivors=function(){p.p5.pop(),p.p5.textSize(12),p.p5.fill(p.colour),p.p5.textAlign(p.p5.LEFT),p.p5.text("Survivors: ".concat(p.survivors),p.pos.x+p.size/2-5,p.pos.y-p.size/2+5),p.p5.push()},this.p5=t.p5,this.config=t,this.colour=this.p5.color(161,184,66),this.size=50,this.foodDeclineRate=t.foodDeclineRate,this.food=10,this.survivors=10,this.humanCaptureDistance=10,this.flag=!1,e&&a)this.pos=this.p5.createVector(e,a);else{var c=10;this.pos=this.p5.createVector(this.p5.random(c,this.p5.width-2*c),this.p5.random(c,this.p5.height-c))}}}}]);