"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1859],{1859:function(e,t,r){r.r(t),r.d(t,{default:function(){return s}});var i=r(4035);var s=function e(t){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.sliderGroup=[],this.create=function(){for(var e=0;e<3;e++){var t=r.p5.createP();0===e?(r.sliderGroup[e]=r.p5.createSlider(0,2,r.speed+.2,.1),t.html("Zombie zpeed")):1===e?(r.sliderGroup[e]=r.p5.createSlider(0,2,r.speed+.5,.1),t.html("Human speed")):2===e?(r.sliderGroup[e]=r.p5.createSlider(0,2,r.speed-.1,.1),t.html("Hunter speed")):(r.sliderGroup[e]=r.p5.createSlider(0,100,10),t.html("test"));var i=r.p5.map(e,0,6,5,200);t.position(110,50+i-15),t.style("color","white"),r.sliderGroup[e].position(10,50+i),r.sliderGroup[e].style("width","80px")}},this.getVals=function(){return{zombieSpeed:r.sliderGroup[0].value(),humanSpeed:r.sliderGroup[1].value(),hunterSpeed:r.sliderGroup[2].value()}},this.p5=t.p5,this.colour=this.p5.color(48,135,180),this.size=20,this.speed=t.speed,this.acceleration=this.p5.createVector(0,0),this.velocity=i.Vector.random2D(),this.pos=this.p5.createVector(this.p5.random(this.p5.width),this.p5.random(this.p5.height)),this.velocity.setMag(t.speed)}}}]);