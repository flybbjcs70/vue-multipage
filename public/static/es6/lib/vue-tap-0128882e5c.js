!function(){var e={};e.install=function(e){e.directive("tap",{isFn:!0,acceptStatement:!0,bind:function(){},update:function(e){var t=this;return t.tapObj={},"function"!=typeof e?console.error('The param of directive "v-tap" must be a function!'):(t.handler=function(n){n.tapObj=t.tapObj,e.call(t,n)},void(t.isPC()?t.el.addEventListener("click",function(n){n.preventDefault(),e.call(t,n)},!1):(this.el.addEventListener("touchstart",function(e){t.modifiers.stop&&e.stopPropagation(),t.modifiers.prevent&&e.preventDefault(),t.touchstart(e,t)},!1),this.el.addEventListener("touchend",function(n){return n.preventDefault(),t.el.href&&!t.modifiers.prevent?window.location=t.el.href:t.touchend(n,t,e)},!1))))},unbind:function(){},isTap:function(){var e=this;if(e.el.disabled)return!1;var t=this.tapObj;return this.time<150&&Math.abs(t.distanceX)<2&&Math.abs(t.distanceY)<2},isPC:function(){for(var e=navigator.userAgent,t=["Android","iPhone","Windows Phone","iPad","iPod"],n=!0,i=0;i<t.length;i++)if(e.indexOf(t[i])>0){n=!1;break}return n},touchstart:function(e,t){var n=e.touches[0],i=t.tapObj;i.pageX=n.pageX,i.pageY=n.pageY,i.clientX=n.clientX,i.clientY=n.clientY,t.time=+new Date},touchend:function(e,t){var n=e.changedTouches[0],i=t.tapObj;t.time=+new Date-t.time,i.distanceX=i.pageX-n.pageX,i.distanceY=i.pageY-n.pageY,t.isTap(i)&&setTimeout(function(){t.handler(e)},150)}})},"object"==typeof exports?module.exports=e:"function"==typeof define&&define.amd?define([],function(){return e}):window.Vue&&(window.vueTap=e,Vue.use(e))}();