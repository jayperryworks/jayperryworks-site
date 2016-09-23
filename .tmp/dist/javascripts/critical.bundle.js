/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** multi critical ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! vendor/modernizr.js */1);
	module.exports = __webpack_require__(/*! picturefill */2);


/***/ },
/* 1 */
/*!*******************************************************!*\
  !*** ./source/assets/javascripts/vendor/modernizr.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	/*! modernizr 3.3.1 (Custom Build) | MIT *
	 * http://modernizr.com/download/?-backgroundsize-bgpositionxy-bgsizecover-borderimage-canvas-canvastext-checked-csscalc-cssgradients-cssremunit-csstransforms-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-flexbox-flexboxlegacy-flexboxtweener-flexwrap-inlinesvg-lastchild-ligatures-multiplebgs-objectfit-requestanimationframe-rgba-svg-svgasimg-svgclippaths-svgfilters-svgforeignobject-video-setclasses-shiv !*/
	!function(e,t,n){function r(e,t){return typeof e===t}function i(){var e,t,n,i,o,a,s;for(var l in x)if(x.hasOwnProperty(l)){if(e=[],t=x[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)a=e[o],s=a.split("."),1===s.length?Modernizr[s[0]]=i:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=i),S.push((i?"":"no-")+s.join("-"))}}function o(e){var t=T.className,n=Modernizr._config.classPrefix||"";if(C&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),C?T.className.baseVal=t:T.className=t)}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):C?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(e,t){return!!~(""+e).indexOf(t)}function l(){var e=t.body;return e||(e=a(C?"svg":"body"),e.fake=!0),e}function c(e,n,r,i){var o,s,c,d,u="modernizr",f=a("div"),p=l();if(parseInt(r,10))for(;r--;)c=a("div"),c.id=i?i[r]:u+(r+1),f.appendChild(c);return o=a("style"),o.type="text/css",o.id="s"+u,(p.fake?p:f).appendChild(o),p.appendChild(f),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),f.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",d=T.style.overflow,T.style.overflow="hidden",T.appendChild(p)),s=n(f,e),p.fake?(p.parentNode.removeChild(p),T.style.overflow=d,T.offsetHeight):f.parentNode.removeChild(f),!!s}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function u(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(d(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+d(t[i])+":"+r+")");return o=o.join(" or "),c("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function p(e,t,i,o){function l(){d&&(delete z.style,delete z.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var c=u(e,i);if(!r(c,"undefined"))return c}for(var d,p,h,m,g,v=["modernizr","tspan"];!z.style;)d=!0,z.modElem=a(v.shift()),z.style=z.modElem.style;for(h=e.length,p=0;h>p;p++)if(m=e[p],g=z.style[m],s(m,"-")&&(m=f(m)),z.style[m]!==n){if(o||r(i,"undefined"))return l(),"pfx"==t?m:!0;try{z.style[m]=i}catch(y){}if(z.style[m]!=g)return l(),"pfx"==t?m:!0}return l(),!1}function h(e,t){return function(){return e.apply(t,arguments)}}function m(e,t,n){var i;for(var o in e)if(e[o]in t)return n===!1?e[o]:(i=t[e[o]],r(i,"function")?h(i,n||t):i);return!1}function g(e,t,n,i,o){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+_.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?p(s,t,i,o):(s=(e+" "+N.join(a+" ")+a).split(" "),m(s,t,n))}function v(e,t,r){return g(e,n,n,t,r)}function y(e,t){return e-1===t||e===t||e+1===t}function w(e,t){if("object"==typeof e)for(var n in e)A(e,n)&&w(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),i=Modernizr[r[0]];if(2==r.length&&(i=i[r[1]]),"undefined"!=typeof i)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),o([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}var x=[],b={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){x.push({name:e,fn:t,options:n})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=b,Modernizr=new Modernizr;var S=[],T=t.documentElement,C="svg"===T.nodeName.toLowerCase();C||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=w.elements;return"string"==typeof e?e.split(" "):e}function i(e,t){var n=w.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),w.elements=n+" "+e,c(t)}function o(e){var t=y[e[g]];return t||(t={},v++,e[g]=v,y[v]=t),t}function a(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():m.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!i.canHaveChildren||h.test(e)||i.tagUrn?i:r.frag.appendChild(i)}function s(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||o(e);for(var i=n.frag.cloneNode(),a=0,s=r(),l=s.length;l>a;a++)i.createElement(s[a]);return i}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return w.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(w,t.frag)}function c(e){e||(e=t);var r=o(e);return!w.shivCSS||d||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||l(e,r),e}var d,u,f="3.7.3",p=e.html5||{},h=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,m=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){d=!0,u=!0}}();var w={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:f,shivCSS:p.shivCSS!==!1,supportsUnknownElements:u,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:c,createElement:a,createDocumentFragment:s,addElements:i};e.html5=w,c(t),"object"==typeof module&&module.exports&&(module.exports=w)}("undefined"!=typeof e?e:this,t),Modernizr.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("canvastext",function(){return Modernizr.canvas===!1?!1:"function"==typeof a("canvas").getContext("2d").fillText});var E="Moz O ms Webkit",_=b._config.usePrefixes?E.split(" "):[];b._cssomPrefixes=_;var k={elem:a("modernizr")};Modernizr._q.push(function(){delete k.elem});var z={style:k.elem.style};Modernizr._q.unshift(function(){delete z.style});var N=b._config.usePrefixes?E.toLowerCase().split(" "):[];b._domPrefixes=N,b.testAllProps=g,b.testAllProps=v,Modernizr.addTest("ligatures",v("fontFeatureSettings",'"liga" 1'));var P=function(t){var r,i=F.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var a=0;i>a;a++){var s=F[a],l=s.toUpperCase()+"_"+r;if(l in o)return"@-"+s.toLowerCase()+"-"+t}return!1};b.atRule=P;var j=b.prefixed=function(e,t,n){return 0===e.indexOf("@")?P(e):(-1!=e.indexOf("-")&&(e=f(e)),t?g(e,t,n):g(e,"pfx"))};Modernizr.addTest("requestanimationframe",!!j("requestAnimationFrame",e),{aliases:["raf"]}),Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("video",function(){var e=a("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("bgpositionxy",function(){return v("backgroundPositionX","3px",!0)&&v("backgroundPositionY","5px",!0)}),Modernizr.addTest("backgroundsize",v("backgroundSize","100%",!0)),Modernizr.addTest("bgsizecover",v("backgroundSize","cover")),Modernizr.addTest("borderimage",v("borderImage","url() 1",!0));var F=b._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];b._prefixes=F,Modernizr.addTest("csscalc",function(){var e="width:",t="calc(10px);",n=a("a");return n.style.cssText=e+F.join(t+e),!!n.style.length});var I=b.testStyles=c;Modernizr.addTest("checked",function(){return I("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",function(e){var t=a("input");return t.setAttribute("type","checkbox"),t.setAttribute("checked","checked"),e.appendChild(t),20===t.offsetLeft})}),Modernizr.addTest("flexbox",v("flexBasis","1px",!0)),Modernizr.addTest("flexboxlegacy",v("boxDirection","reverse",!0)),Modernizr.addTest("flexboxtweener",v("flexAlign","end",!0)),Modernizr.addTest("flexwrap",v("flexWrap","wrap",!0)),Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",i=0,o=F.length-1;o>i;i++)e=0===i?"to ":"",r+=t+F[i]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=t+"-webkit-"+n);var s=a("a"),l=s.style;return l.cssText=r,(""+l.backgroundImage).indexOf("gradient")>-1}),I("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}",function(e){Modernizr.addTest("lastchild",e.lastChild.offsetWidth>e.firstChild.offsetWidth)},2),Modernizr.addTest("multiplebgs",function(){var e=a("a").style;return e.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(e.background)}),Modernizr.addTest("objectfit",!!j("objectFit"),{aliases:["object-fit"]}),Modernizr.addTest("cssremunit",function(){var e=a("a").style;try{e.fontSize="3rem"}catch(t){}return/rem/.test(e.fontSize)}),Modernizr.addTest("rgba",function(){var e=a("a").style;return e.cssText="background-color:rgba(150,255,150,.5)",(""+e.backgroundColor).indexOf("rgba")>-1}),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&v("transform","scale(1)",!0)}),I("#modernizr { height: 50vh; }",function(t){var n=parseInt(e.innerHeight/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).height,10);Modernizr.addTest("cssvhunit",r==n)}),I("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],r=t.childNodes[1],i=t.childNodes[0],o=parseInt((r.offsetWidth-r.clientWidth)/2,10),a=i.clientWidth/100,s=i.clientHeight/100,l=parseInt(50*Math.max(a,s),10),c=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);Modernizr.addTest("cssvmaxunit",y(l,c)||y(l,c-o))},3),I("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],r=t.childNodes[1],i=t.childNodes[0],o=parseInt((r.offsetWidth-r.clientWidth)/2,10),a=i.clientWidth/100,s=i.clientHeight/100,l=parseInt(50*Math.min(a,s),10),c=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);Modernizr.addTest("cssvminunit",y(l,c)||y(l,c-o))},3),I("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).width,10);Modernizr.addTest("cssvwunit",r==n)});var A;!function(){var e={}.hasOwnProperty;A=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),b._l={},b.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},b._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){b.addTest=w}),Modernizr.addTest("svgasimg",t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"));var O={}.toString;Modernizr.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(O.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))}),Modernizr.addTest("svgfilters",function(){var t=!1;try{t="SVGFEColorMatrixElement"in e&&2==SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(n){}return t}),Modernizr.addTest("svgforeignobject",function(){return!!t.createElementNS&&/SVGForeignObject/.test(O.call(t.createElementNS("http://www.w3.org/2000/svg","foreignObject")))}),Modernizr.addTest("inlinesvg",function(){var e=a("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)}),i(),o(S),delete b.addTest,delete b.addAsyncTest;for(var L=0;L<Modernizr._q.length;L++)Modernizr._q[L]();e.Modernizr=Modernizr}(window,document);

/***/ },
/* 2 */
/*!*******************************************!*\
  !*** ./~/picturefill/dist/picturefill.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! picturefill - v3.0.2 - 2016-02-12
	 * https://scottjehl.github.io/picturefill/
	 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
	 */
	/*! Gecko-Picture - v1.0
	 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
	 * Firefox's early picture implementation (prior to FF41) is static and does
	 * not react to viewport changes. This tiny module fixes this.
	 */
	(function(window) {
		/*jshint eqnull:true */
		var ua = navigator.userAgent;
	
		if ( window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45) ) {
			addEventListener("resize", (function() {
				var timer;
	
				var dummySrc = document.createElement("source");
	
				var fixRespimg = function(img) {
					var source, sizes;
					var picture = img.parentNode;
	
					if (picture.nodeName.toUpperCase() === "PICTURE") {
						source = dummySrc.cloneNode();
	
						picture.insertBefore(source, picture.firstElementChild);
						setTimeout(function() {
							picture.removeChild(source);
						});
					} else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
						img._pfLastSize = img.offsetWidth;
						sizes = img.sizes;
						img.sizes += ",100vw";
						setTimeout(function() {
							img.sizes = sizes;
						});
					}
				};
	
				var findPictureImgs = function() {
					var i;
					var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
					for (i = 0; i < imgs.length; i++) {
						fixRespimg(imgs[i]);
					}
				};
				var onResize = function() {
					clearTimeout(timer);
					timer = setTimeout(findPictureImgs, 99);
				};
				var mq = window.matchMedia && matchMedia("(orientation: landscape)");
				var init = function() {
					onResize();
	
					if (mq && mq.addListener) {
						mq.addListener(onResize);
					}
				};
	
				dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
	
				if (/^[c|i]|d$/.test(document.readyState || "")) {
					init();
				} else {
					document.addEventListener("DOMContentLoaded", init);
				}
	
				return onResize;
			})());
		}
	})(window);
	
	/*! Picturefill - v3.0.2
	 * http://scottjehl.github.io/picturefill
	 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
	 *  License: MIT
	 */
	
	(function( window, document, undefined ) {
		// Enable strict mode
		"use strict";
	
		// HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)
		document.createElement( "picture" );
	
		var warn, eminpx, alwaysCheckWDescriptor, evalId;
		// local object for method references and testing exposure
		var pf = {};
		var isSupportTestReady = false;
		var noop = function() {};
		var image = document.createElement( "img" );
		var getImgAttr = image.getAttribute;
		var setImgAttr = image.setAttribute;
		var removeImgAttr = image.removeAttribute;
		var docElem = document.documentElement;
		var types = {};
		var cfg = {
			//resource selection:
			algorithm: ""
		};
		var srcAttr = "data-pfsrc";
		var srcsetAttr = srcAttr + "set";
		// ua sniffing is done for undetectable img loading features,
		// to do some non crucial perf optimizations
		var ua = navigator.userAgent;
		var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35 );
		var curSrcProp = "currentSrc";
		var regWDesc = /\s+\+?\d+(e\d+)?w/;
		var regSize = /(\([^)]+\))?\s*(.+)/;
		var setOptions = window.picturefillCFG;
		/**
		 * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
		 */
		// baseStyle also used by getEmValue (i.e.: width: 1em is important)
		var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
		var fsCss = "font-size:100%!important;";
		var isVwDirty = true;
	
		var cssCache = {};
		var sizeLengthCache = {};
		var DPR = window.devicePixelRatio;
		var units = {
			px: 1,
			"in": 96
		};
		var anchor = document.createElement( "a" );
		/**
		 * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
		 * @type {boolean}
		 */
		var alreadyRun = false;
	
		// Reusable, non-"g" Regexes
	
		// (Don't use \s, to avoid matching non-breaking space.)
		var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
		    regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
		    regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
		    regexTrailingCommas = /[,]+$/,
		    regexNonNegativeInteger = /^\d+$/,
	
		    // ( Positive or negative or unsigned integers or decimals, without or without exponents.
		    // Must include at least one digit.
		    // According to spec tests any decimal point must be followed by a digit.
		    // No leading plus sign is allowed.)
		    // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
		    regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
	
		var on = function(obj, evt, fn, capture) {
			if ( obj.addEventListener ) {
				obj.addEventListener(evt, fn, capture || false);
			} else if ( obj.attachEvent ) {
				obj.attachEvent( "on" + evt, fn);
			}
		};
	
		/**
		 * simple memoize function:
		 */
	
		var memoize = function(fn) {
			var cache = {};
			return function(input) {
				if ( !(input in cache) ) {
					cache[ input ] = fn(input);
				}
				return cache[ input ];
			};
		};
	
		// UTILITY FUNCTIONS
	
		// Manual is faster than RegEx
		// http://jsperf.com/whitespace-character/5
		function isSpace(c) {
			return (c === "\u0020" || // space
			        c === "\u0009" || // horizontal tab
			        c === "\u000A" || // new line
			        c === "\u000C" || // form feed
			        c === "\u000D");  // carriage return
		}
	
		/**
		 * gets a mediaquery and returns a boolean or gets a css length and returns a number
		 * @param css mediaqueries or css length
		 * @returns {boolean|number}
		 *
		 * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
		 */
		var evalCSS = (function() {
	
			var regLength = /^([\d\.]+)(em|vw|px)$/;
			var replace = function() {
				var args = arguments, index = 0, string = args[0];
				while (++index in args) {
					string = string.replace(args[index], args[++index]);
				}
				return string;
			};
	
			var buildStr = memoize(function(css) {
	
				return "return " + replace((css || "").toLowerCase(),
					// interpret `and`
					/\band\b/g, "&&",
	
					// interpret `,`
					/,/g, "||",
	
					// interpret `min-` as >=
					/min-([a-z-\s]+):/g, "e.$1>=",
	
					// interpret `max-` as <=
					/max-([a-z-\s]+):/g, "e.$1<=",
	
					//calc value
					/calc([^)]+)/g, "($1)",
	
					// interpret css values
					/(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
					//make eval less evil
					/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
				) + ";";
			});
	
			return function(css, length) {
				var parsedLength;
				if (!(css in cssCache)) {
					cssCache[css] = false;
					if (length && (parsedLength = css.match( regLength ))) {
						cssCache[css] = parsedLength[ 1 ] * units[parsedLength[ 2 ]];
					} else {
						/*jshint evil:true */
						try{
							cssCache[css] = new Function("e", buildStr(css))(units);
						} catch(e) {}
						/*jshint evil:false */
					}
				}
				return cssCache[css];
			};
		})();
	
		var setResolution = function( candidate, sizesattr ) {
			if ( candidate.w ) { // h = means height: || descriptor.type === 'h' do not handle yet...
				candidate.cWidth = pf.calcListLength( sizesattr || "100vw" );
				candidate.res = candidate.w / candidate.cWidth ;
			} else {
				candidate.res = candidate.d;
			}
			return candidate;
		};
	
		/**
		 *
		 * @param opt
		 */
		var picturefill = function( opt ) {
	
			if (!isSupportTestReady) {return;}
	
			var elements, i, plen;
	
			var options = opt || {};
	
			if ( options.elements && options.elements.nodeType === 1 ) {
				if ( options.elements.nodeName.toUpperCase() === "IMG" ) {
					options.elements =  [ options.elements ];
				} else {
					options.context = options.elements;
					options.elements =  null;
				}
			}
	
			elements = options.elements || pf.qsa( (options.context || document), ( options.reevaluate || options.reselect ) ? pf.sel : pf.selShort );
	
			if ( (plen = elements.length) ) {
	
				pf.setupRun( options );
				alreadyRun = true;
	
				// Loop through all elements
				for ( i = 0; i < plen; i++ ) {
					pf.fillImg(elements[ i ], options);
				}
	
				pf.teardownRun( options );
			}
		};
	
		/**
		 * outputs a warning for the developer
		 * @param {message}
		 * @type {Function}
		 */
		warn = ( window.console && console.warn ) ?
			function( message ) {
				console.warn( message );
			} :
			noop
		;
	
		if ( !(curSrcProp in image) ) {
			curSrcProp = "src";
		}
	
		// Add support for standard mime types.
		types[ "image/jpeg" ] = true;
		types[ "image/gif" ] = true;
		types[ "image/png" ] = true;
	
		function detectTypeSupport( type, typeUri ) {
			// based on Modernizr's lossless img-webp test
			// note: asynchronous
			var image = new window.Image();
			image.onerror = function() {
				types[ type ] = false;
				picturefill();
			};
			image.onload = function() {
				types[ type ] = image.width === 1;
				picturefill();
			};
			image.src = typeUri;
			return "pending";
		}
	
		// test svg support
		types[ "image/svg+xml" ] = document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#Image", "1.1" );
	
		/**
		 * updates the internal vW property with the current viewport width in px
		 */
		function updateMetrics() {
	
			isVwDirty = false;
			DPR = window.devicePixelRatio;
			cssCache = {};
			sizeLengthCache = {};
	
			pf.DPR = DPR || 1;
	
			units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
			units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);
	
			units.vw = units.width / 100;
			units.vh = units.height / 100;
	
			evalId = [ units.height, units.width, DPR ].join("-");
	
			units.em = pf.getEmValue();
			units.rem = units.em;
		}
	
		function chooseLowRes( lowerValue, higherValue, dprValue, isCached ) {
			var bonusFactor, tooMuch, bonus, meanDensity;
	
			//experimental
			if (cfg.algorithm === "saveData" ){
				if ( lowerValue > 2.7 ) {
					meanDensity = dprValue + 1;
				} else {
					tooMuch = higherValue - dprValue;
					bonusFactor = Math.pow(lowerValue - 0.6, 1.5);
	
					bonus = tooMuch * bonusFactor;
	
					if (isCached) {
						bonus += 0.1 * bonusFactor;
					}
	
					meanDensity = lowerValue + bonus;
				}
			} else {
				meanDensity = (dprValue > 1) ?
					Math.sqrt(lowerValue * higherValue) :
					lowerValue;
			}
	
			return meanDensity > dprValue;
		}
	
		function applyBestCandidate( img ) {
			var srcSetCandidates;
			var matchingSet = pf.getSet( img );
			var evaluated = false;
			if ( matchingSet !== "pending" ) {
				evaluated = evalId;
				if ( matchingSet ) {
					srcSetCandidates = pf.setRes( matchingSet );
					pf.applySetCandidate( srcSetCandidates, img );
				}
			}
			img[ pf.ns ].evaled = evaluated;
		}
	
		function ascendingSort( a, b ) {
			return a.res - b.res;
		}
	
		function setSrcToCur( img, src, set ) {
			var candidate;
			if ( !set && src ) {
				set = img[ pf.ns ].sets;
				set = set && set[set.length - 1];
			}
	
			candidate = getCandidateForSrc(src, set);
	
			if ( candidate ) {
				src = pf.makeUrl(src);
				img[ pf.ns ].curSrc = src;
				img[ pf.ns ].curCan = candidate;
	
				if ( !candidate.res ) {
					setResolution( candidate, candidate.set.sizes );
				}
			}
			return candidate;
		}
	
		function getCandidateForSrc( src, set ) {
			var i, candidate, candidates;
			if ( src && set ) {
				candidates = pf.parseSet( set );
				src = pf.makeUrl(src);
				for ( i = 0; i < candidates.length; i++ ) {
					if ( src === pf.makeUrl(candidates[ i ].url) ) {
						candidate = candidates[ i ];
						break;
					}
				}
			}
			return candidate;
		}
	
		function getAllSourceElements( picture, candidates ) {
			var i, len, source, srcset;
	
			// SPEC mismatch intended for size and perf:
			// actually only source elements preceding the img should be used
			// also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector
			var sources = picture.getElementsByTagName( "source" );
	
			for ( i = 0, len = sources.length; i < len; i++ ) {
				source = sources[ i ];
				source[ pf.ns ] = true;
				srcset = source.getAttribute( "srcset" );
	
				// if source does not have a srcset attribute, skip
				if ( srcset ) {
					candidates.push( {
						srcset: srcset,
						media: source.getAttribute( "media" ),
						type: source.getAttribute( "type" ),
						sizes: source.getAttribute( "sizes" )
					} );
				}
			}
		}
	
		/**
		 * Srcset Parser
		 * By Alex Bell |  MIT License
		 *
		 * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]
		 *
		 * Based super duper closely on the reference algorithm at:
		 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
		 */
	
		// 1. Let input be the value passed to this algorithm.
		// (TO-DO : Explain what "set" argument is here. Maybe choose a more
		// descriptive & more searchable name.  Since passing the "set" in really has
		// nothing to do with parsing proper, I would prefer this assignment eventually
		// go in an external fn.)
		function parseSrcset(input, set) {
	
			function collectCharacters(regEx) {
				var chars,
				    match = regEx.exec(input.substring(pos));
				if (match) {
					chars = match[ 0 ];
					pos += chars.length;
					return chars;
				}
			}
	
			var inputLength = input.length,
			    url,
			    descriptors,
			    currentDescriptor,
			    state,
			    c,
	
			    // 2. Let position be a pointer into input, initially pointing at the start
			    //    of the string.
			    pos = 0,
	
			    // 3. Let candidates be an initially empty source set.
			    candidates = [];
	
			/**
			* Adds descriptor properties to a candidate, pushes to the candidates array
			* @return undefined
			*/
			// (Declared outside of the while loop so that it's only created once.
			// (This fn is defined before it is used, in order to pass JSHINT.
			// Unfortunately this breaks the sequencing of the spec comments. :/ )
			function parseDescriptors() {
	
				// 9. Descriptor parser: Let error be no.
				var pError = false,
	
				// 10. Let width be absent.
				// 11. Let density be absent.
				// 12. Let future-compat-h be absent. (We're implementing it now as h)
				    w, d, h, i,
				    candidate = {},
				    desc, lastChar, value, intVal, floatVal;
	
				// 13. For each descriptor in descriptors, run the appropriate set of steps
				// from the following list:
				for (i = 0 ; i < descriptors.length; i++) {
					desc = descriptors[ i ];
	
					lastChar = desc[ desc.length - 1 ];
					value = desc.substring(0, desc.length - 1);
					intVal = parseInt(value, 10);
					floatVal = parseFloat(value);
	
					// If the descriptor consists of a valid non-negative integer followed by
					// a U+0077 LATIN SMALL LETTER W character
					if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {
	
						// If width and density are not both absent, then let error be yes.
						if (w || d) {pError = true;}
	
						// Apply the rules for parsing non-negative integers to the descriptor.
						// If the result is zero, let error be yes.
						// Otherwise, let width be the result.
						if (intVal === 0) {pError = true;} else {w = intVal;}
	
					// If the descriptor consists of a valid floating-point number followed by
					// a U+0078 LATIN SMALL LETTER X character
					} else if (regexFloatingPoint.test(value) && (lastChar === "x")) {
	
						// If width, density and future-compat-h are not all absent, then let error
						// be yes.
						if (w || d || h) {pError = true;}
	
						// Apply the rules for parsing floating-point number values to the descriptor.
						// If the result is less than zero, let error be yes. Otherwise, let density
						// be the result.
						if (floatVal < 0) {pError = true;} else {d = floatVal;}
	
					// If the descriptor consists of a valid non-negative integer followed by
					// a U+0068 LATIN SMALL LETTER H character
					} else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {
	
						// If height and density are not both absent, then let error be yes.
						if (h || d) {pError = true;}
	
						// Apply the rules for parsing non-negative integers to the descriptor.
						// If the result is zero, let error be yes. Otherwise, let future-compat-h
						// be the result.
						if (intVal === 0) {pError = true;} else {h = intVal;}
	
					// Anything else, Let error be yes.
					} else {pError = true;}
				} // (close step 13 for loop)
	
				// 15. If error is still no, then append a new image source to candidates whose
				// URL is url, associated with a width width if not absent and a pixel
				// density density if not absent. Otherwise, there is a parse error.
				if (!pError) {
					candidate.url = url;
	
					if (w) { candidate.w = w;}
					if (d) { candidate.d = d;}
					if (h) { candidate.h = h;}
					if (!h && !d && !w) {candidate.d = 1;}
					if (candidate.d === 1) {set.has1x = true;}
					candidate.set = set;
	
					candidates.push(candidate);
				}
			} // (close parseDescriptors fn)
	
			/**
			* Tokenizes descriptor properties prior to parsing
			* Returns undefined.
			* (Again, this fn is defined before it is used, in order to pass JSHINT.
			* Unfortunately this breaks the logical sequencing of the spec comments. :/ )
			*/
			function tokenize() {
	
				// 8.1. Descriptor tokeniser: Skip whitespace
				collectCharacters(regexLeadingSpaces);
	
				// 8.2. Let current descriptor be the empty string.
				currentDescriptor = "";
	
				// 8.3. Let state be in descriptor.
				state = "in descriptor";
	
				while (true) {
	
					// 8.4. Let c be the character at position.
					c = input.charAt(pos);
	
					//  Do the following depending on the value of state.
					//  For the purpose of this step, "EOF" is a special character representing
					//  that position is past the end of input.
	
					// In descriptor
					if (state === "in descriptor") {
						// Do the following, depending on the value of c:
	
					  // Space character
					  // If current descriptor is not empty, append current descriptor to
					  // descriptors and let current descriptor be the empty string.
					  // Set state to after descriptor.
						if (isSpace(c)) {
							if (currentDescriptor) {
								descriptors.push(currentDescriptor);
								currentDescriptor = "";
								state = "after descriptor";
							}
	
						// U+002C COMMA (,)
						// Advance position to the next character in input. If current descriptor
						// is not empty, append current descriptor to descriptors. Jump to the step
						// labeled descriptor parser.
						} else if (c === ",") {
							pos += 1;
							if (currentDescriptor) {
								descriptors.push(currentDescriptor);
							}
							parseDescriptors();
							return;
	
						// U+0028 LEFT PARENTHESIS (()
						// Append c to current descriptor. Set state to in parens.
						} else if (c === "\u0028") {
							currentDescriptor = currentDescriptor + c;
							state = "in parens";
	
						// EOF
						// If current descriptor is not empty, append current descriptor to
						// descriptors. Jump to the step labeled descriptor parser.
						} else if (c === "") {
							if (currentDescriptor) {
								descriptors.push(currentDescriptor);
							}
							parseDescriptors();
							return;
	
						// Anything else
						// Append c to current descriptor.
						} else {
							currentDescriptor = currentDescriptor + c;
						}
					// (end "in descriptor"
	
					// In parens
					} else if (state === "in parens") {
	
						// U+0029 RIGHT PARENTHESIS ())
						// Append c to current descriptor. Set state to in descriptor.
						if (c === ")") {
							currentDescriptor = currentDescriptor + c;
							state = "in descriptor";
	
						// EOF
						// Append current descriptor to descriptors. Jump to the step labeled
						// descriptor parser.
						} else if (c === "") {
							descriptors.push(currentDescriptor);
							parseDescriptors();
							return;
	
						// Anything else
						// Append c to current descriptor.
						} else {
							currentDescriptor = currentDescriptor + c;
						}
	
					// After descriptor
					} else if (state === "after descriptor") {
	
						// Do the following, depending on the value of c:
						// Space character: Stay in this state.
						if (isSpace(c)) {
	
						// EOF: Jump to the step labeled descriptor parser.
						} else if (c === "") {
							parseDescriptors();
							return;
	
						// Anything else
						// Set state to in descriptor. Set position to the previous character in input.
						} else {
							state = "in descriptor";
							pos -= 1;
	
						}
					}
	
					// Advance position to the next character in input.
					pos += 1;
	
				// Repeat this step.
				} // (close while true loop)
			}
	
			// 4. Splitting loop: Collect a sequence of characters that are space
			//    characters or U+002C COMMA characters. If any U+002C COMMA characters
			//    were collected, that is a parse error.
			while (true) {
				collectCharacters(regexLeadingCommasOrSpaces);
	
				// 5. If position is past the end of input, return candidates and abort these steps.
				if (pos >= inputLength) {
					return candidates; // (we're done, this is the sole return path)
				}
	
				// 6. Collect a sequence of characters that are not space characters,
				//    and let that be url.
				url = collectCharacters(regexLeadingNotSpaces);
	
				// 7. Let descriptors be a new empty list.
				descriptors = [];
	
				// 8. If url ends with a U+002C COMMA character (,), follow these substeps:
				//		(1). Remove all trailing U+002C COMMA characters from url. If this removed
				//         more than one character, that is a parse error.
				if (url.slice(-1) === ",") {
					url = url.replace(regexTrailingCommas, "");
					// (Jump ahead to step 9 to skip tokenization and just push the candidate).
					parseDescriptors();
	
				//	Otherwise, follow these substeps:
				} else {
					tokenize();
				} // (close else of step 8)
	
			// 16. Return to the step labeled splitting loop.
			} // (Close of big while loop.)
		}
	
		/*
		 * Sizes Parser
		 *
		 * By Alex Bell |  MIT License
		 *
		 * Non-strict but accurate and lightweight JS Parser for the string value <img sizes="here">
		 *
		 * Reference algorithm at:
		 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute
		 *
		 * Most comments are copied in directly from the spec
		 * (except for comments in parens).
		 *
		 * Grammar is:
		 * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>
		 * <source-size> = <media-condition> <source-size-value>
		 * <source-size-value> = <length>
		 * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes
		 *
		 * E.g. "(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw"
		 * or "(min-width: 30em), calc(30vw - 15px)" or just "30vw"
		 *
		 * Returns the first valid <css-length> with a media condition that evaluates to true,
		 * or "100vw" if all valid media conditions evaluate to false.
		 *
		 */
	
		function parseSizes(strValue) {
	
			// (Percentage CSS lengths are not allowed in this case, to avoid confusion:
			// https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list
			// CSS allows a single optional plus or minus sign:
			// http://www.w3.org/TR/CSS2/syndata.html#numbers
			// CSS is ASCII case-insensitive:
			// http://www.w3.org/TR/CSS2/syndata.html#characters )
			// Spec allows exponential notation for <number> type:
			// http://dev.w3.org/csswg/css-values/#numbers
			var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;
	
			// (This is a quick and lenient test. Because of optional unlimited-depth internal
			// grouping parens and strict spacing rules, this could get very complicated.)
			var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
	
			var i;
			var unparsedSizesList;
			var unparsedSizesListLength;
			var unparsedSize;
			var lastComponentValue;
			var size;
	
			// UTILITY FUNCTIONS
	
			//  (Toy CSS parser. The goals here are:
			//  1) expansive test coverage without the weight of a full CSS parser.
			//  2) Avoiding regex wherever convenient.
			//  Quick tests: http://jsfiddle.net/gtntL4gr/3/
			//  Returns an array of arrays.)
			function parseComponentValues(str) {
				var chrctr;
				var component = "";
				var componentArray = [];
				var listArray = [];
				var parenDepth = 0;
				var pos = 0;
				var inComment = false;
	
				function pushComponent() {
					if (component) {
						componentArray.push(component);
						component = "";
					}
				}
	
				function pushComponentArray() {
					if (componentArray[0]) {
						listArray.push(componentArray);
						componentArray = [];
					}
				}
	
				// (Loop forwards from the beginning of the string.)
				while (true) {
					chrctr = str.charAt(pos);
	
					if (chrctr === "") { // ( End of string reached.)
						pushComponent();
						pushComponentArray();
						return listArray;
					} else if (inComment) {
						if ((chrctr === "*") && (str[pos + 1] === "/")) { // (At end of a comment.)
							inComment = false;
							pos += 2;
							pushComponent();
							continue;
						} else {
							pos += 1; // (Skip all characters inside comments.)
							continue;
						}
					} else if (isSpace(chrctr)) {
						// (If previous character in loop was also a space, or if
						// at the beginning of the string, do not add space char to
						// component.)
						if ( (str.charAt(pos - 1) && isSpace( str.charAt(pos - 1) ) ) || !component ) {
							pos += 1;
							continue;
						} else if (parenDepth === 0) {
							pushComponent();
							pos +=1;
							continue;
						} else {
							// (Replace any space character with a plain space for legibility.)
							chrctr = " ";
						}
					} else if (chrctr === "(") {
						parenDepth += 1;
					} else if (chrctr === ")") {
						parenDepth -= 1;
					} else if (chrctr === ",") {
						pushComponent();
						pushComponentArray();
						pos += 1;
						continue;
					} else if ( (chrctr === "/") && (str.charAt(pos + 1) === "*") ) {
						inComment = true;
						pos += 2;
						continue;
					}
	
					component = component + chrctr;
					pos += 1;
				}
			}
	
			function isValidNonNegativeSourceSizeValue(s) {
				if (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) {return true;}
				if (regexCssCalc.test(s)) {return true;}
				// ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:
				// "-0 is equivalent to 0 and is not a negative number." which means that
				// unitless zero and unitless negative zero must be accepted as special cases.)
				if ((s === "0") || (s === "-0") || (s === "+0")) {return true;}
				return false;
			}
	
			// When asked to parse a sizes attribute from an element, parse a
			// comma-separated list of component values from the value of the element's
			// sizes attribute (or the empty string, if the attribute is absent), and let
			// unparsed sizes list be the result.
			// http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values
	
			unparsedSizesList = parseComponentValues(strValue);
			unparsedSizesListLength = unparsedSizesList.length;
	
			// For each unparsed size in unparsed sizes list:
			for (i = 0; i < unparsedSizesListLength; i++) {
				unparsedSize = unparsedSizesList[i];
	
				// 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.
				// ( parseComponentValues() already omits spaces outside of parens. )
	
				// If unparsed size is now empty, that is a parse error; continue to the next
				// iteration of this algorithm.
				// ( parseComponentValues() won't push an empty array. )
	
				// 2. If the last component value in unparsed size is a valid non-negative
				// <source-size-value>, let size be its value and remove the component value
				// from unparsed size. Any CSS function other than the calc() function is
				// invalid. Otherwise, there is a parse error; continue to the next iteration
				// of this algorithm.
				// http://dev.w3.org/csswg/css-syntax/#parse-component-value
				lastComponentValue = unparsedSize[unparsedSize.length - 1];
	
				if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
					size = lastComponentValue;
					unparsedSize.pop();
				} else {
					continue;
				}
	
				// 3. Remove all consecutive <whitespace-token>s from the end of unparsed
				// size. If unparsed size is now empty, return size and exit this algorithm.
				// If this was not the last item in unparsed sizes list, that is a parse error.
				if (unparsedSize.length === 0) {
					return size;
				}
	
				// 4. Parse the remaining component values in unparsed size as a
				// <media-condition>. If it does not parse correctly, or it does parse
				// correctly but the <media-condition> evaluates to false, continue to the
				// next iteration of this algorithm.
				// (Parsing all possible compound media conditions in JS is heavy, complicated,
				// and the payoff is unclear. Is there ever an situation where the
				// media condition parses incorrectly but still somehow evaluates to true?
				// Can we just rely on the browser/polyfill to do it?)
				unparsedSize = unparsedSize.join(" ");
				if (!(pf.matchesMedia( unparsedSize ) ) ) {
					continue;
				}
	
				// 5. Return size and exit this algorithm.
				return size;
			}
	
			// If the above algorithm exhausts unparsed sizes list without returning a
			// size value, return 100vw.
			return "100vw";
		}
	
		// namespace
		pf.ns = ("pf" + new Date().getTime()).substr(0, 9);
	
		// srcset support test
		pf.supSrcset = "srcset" in image;
		pf.supSizes = "sizes" in image;
		pf.supPicture = !!window.HTMLPictureElement;
	
		// UC browser does claim to support srcset and picture, but not sizes,
		// this extended test reveals the browser does support nothing
		if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
			(function(image2) {
				image.srcset = "data:,a";
				image2.src = "data:,a";
				pf.supSrcset = image.complete === image2.complete;
				pf.supPicture = pf.supSrcset && pf.supPicture;
			})(document.createElement("img"));
		}
	
		// Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute
		if (pf.supSrcset && !pf.supSizes) {
	
			(function() {
				var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
				var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
				var img = document.createElement("img");
				var test = function() {
					var width = img.width;
	
					if (width === 2) {
						pf.supSizes = true;
					}
	
					alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;
	
					isSupportTestReady = true;
					// force async
					setTimeout(picturefill);
				};
	
				img.onload = test;
				img.onerror = test;
				img.setAttribute("sizes", "9px");
	
				img.srcset = width1 + " 1w," + width2 + " 9w";
				img.src = width1;
			})();
	
		} else {
			isSupportTestReady = true;
		}
	
		// using pf.qsa instead of dom traversing does scale much better,
		// especially on sites mixing responsive and non-responsive images
		pf.selShort = "picture>img,img[srcset]";
		pf.sel = pf.selShort;
		pf.cfg = cfg;
	
		/**
		 * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
		 */
		pf.DPR = (DPR  || 1 );
		pf.u = units;
	
		// container of supported mime types that one might need to qualify before using
		pf.types =  types;
	
		pf.setSize = noop;
	
		/**
		 * Gets a string and returns the absolute URL
		 * @param src
		 * @returns {String} absolute URL
		 */
	
		pf.makeUrl = memoize(function(src) {
			anchor.href = src;
			return anchor.href;
		});
	
		/**
		 * Gets a DOM element or document and a selctor and returns the found matches
		 * Can be extended with jQuery/Sizzle for IE7 support
		 * @param context
		 * @param sel
		 * @returns {NodeList|Array}
		 */
		pf.qsa = function(context, sel) {
			return ( "querySelector" in context ) ? context.querySelectorAll(sel) : [];
		};
	
		/**
		 * Shortcut method for matchMedia ( for easy overriding in tests )
		 * wether native or pf.mMQ is used will be decided lazy on first call
		 * @returns {boolean}
		 */
		pf.matchesMedia = function() {
			if ( window.matchMedia && (matchMedia( "(min-width: 0.1em)" ) || {}).matches ) {
				pf.matchesMedia = function( media ) {
					return !media || ( matchMedia( media ).matches );
				};
			} else {
				pf.matchesMedia = pf.mMQ;
			}
	
			return pf.matchesMedia.apply( this, arguments );
		};
	
		/**
		 * A simplified matchMedia implementation for IE8 and IE9
		 * handles only min-width/max-width with px or em values
		 * @param media
		 * @returns {boolean}
		 */
		pf.mMQ = function( media ) {
			return media ? evalCSS(media) : true;
		};
	
		/**
		 * Returns the calculated length in css pixel from the given sourceSizeValue
		 * http://dev.w3.org/csswg/css-values-3/#length-value
		 * intended Spec mismatches:
		 * * Does not check for invalid use of CSS functions
		 * * Does handle a computed length of 0 the same as a negative and therefore invalid value
		 * @param sourceSizeValue
		 * @returns {Number}
		 */
		pf.calcLength = function( sourceSizeValue ) {
	
			var value = evalCSS(sourceSizeValue, true) || false;
			if (value < 0) {
				value = false;
			}
	
			return value;
		};
	
		/**
		 * Takes a type string and checks if its supported
		 */
	
		pf.supportsType = function( type ) {
			return ( type ) ? types[ type ] : true;
		};
	
		/**
		 * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
		 * @param sourceSizeStr
		 * @returns {*}
		 */
		pf.parseSize = memoize(function( sourceSizeStr ) {
			var match = ( sourceSizeStr || "" ).match(regSize);
			return {
				media: match && match[1],
				length: match && match[2]
			};
		});
	
		pf.parseSet = function( set ) {
			if ( !set.cands ) {
				set.cands = parseSrcset(set.srcset, set);
			}
			return set.cands;
		};
	
		/**
		 * returns 1em in css px for html/body default size
		 * function taken from respondjs
		 * @returns {*|number}
		 */
		pf.getEmValue = function() {
			var body;
			if ( !eminpx && (body = document.body) ) {
				var div = document.createElement( "div" ),
					originalHTMLCSS = docElem.style.cssText,
					originalBodyCSS = body.style.cssText;
	
				div.style.cssText = baseStyle;
	
				// 1em in a media query is the value of the default font size of the browser
				// reset docElem and body to ensure the correct value is returned
				docElem.style.cssText = fsCss;
				body.style.cssText = fsCss;
	
				body.appendChild( div );
				eminpx = div.offsetWidth;
				body.removeChild( div );
	
				//also update eminpx before returning
				eminpx = parseFloat( eminpx, 10 );
	
				// restore the original values
				docElem.style.cssText = originalHTMLCSS;
				body.style.cssText = originalBodyCSS;
	
			}
			return eminpx || 16;
		};
	
		/**
		 * Takes a string of sizes and returns the width in pixels as a number
		 */
		pf.calcListLength = function( sourceSizeListStr ) {
			// Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
			//
			//                           or (min-width:30em) calc(30% - 15px)
			if ( !(sourceSizeListStr in sizeLengthCache) || cfg.uT ) {
				var winningLength = pf.calcLength( parseSizes( sourceSizeListStr ) );
	
				sizeLengthCache[ sourceSizeListStr ] = !winningLength ? units.width : winningLength;
			}
	
			return sizeLengthCache[ sourceSizeListStr ];
		};
	
		/**
		 * Takes a candidate object with a srcset property in the form of url/
		 * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
		 *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
		 *     "images/pic-small.png"
		 * Get an array of image candidates in the form of
		 *      {url: "/foo/bar.png", resolution: 1}
		 * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
		 * If sizes is specified, res is calculated
		 */
		pf.setRes = function( set ) {
			var candidates;
			if ( set ) {
	
				candidates = pf.parseSet( set );
	
				for ( var i = 0, len = candidates.length; i < len; i++ ) {
					setResolution( candidates[ i ], set.sizes );
				}
			}
			return candidates;
		};
	
		pf.setRes.res = setResolution;
	
		pf.applySetCandidate = function( candidates, img ) {
			if ( !candidates.length ) {return;}
			var candidate,
				i,
				j,
				length,
				bestCandidate,
				curSrc,
				curCan,
				candidateSrc,
				abortCurSrc;
	
			var imageData = img[ pf.ns ];
			var dpr = pf.DPR;
	
			curSrc = imageData.curSrc || img[curSrcProp];
	
			curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);
	
			// if we have a current source, we might either become lazy or give this source some advantage
			if ( curCan && curCan.set === candidates[ 0 ].set ) {
	
				// if browser can abort image request and the image has a higher pixel density than needed
				// and this image isn't downloaded yet, we skip next part and try to save bandwidth
				abortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);
	
				if ( !abortCurSrc ) {
					curCan.cached = true;
	
					// if current candidate is "best", "better" or "okay",
					// set it to bestCandidate
					if ( curCan.res >= dpr ) {
						bestCandidate = curCan;
					}
				}
			}
	
			if ( !bestCandidate ) {
	
				candidates.sort( ascendingSort );
	
				length = candidates.length;
				bestCandidate = candidates[ length - 1 ];
	
				for ( i = 0; i < length; i++ ) {
					candidate = candidates[ i ];
					if ( candidate.res >= dpr ) {
						j = i - 1;
	
						// we have found the perfect candidate,
						// but let's improve this a little bit with some assumptions ;-)
						if (candidates[ j ] &&
							(abortCurSrc || curSrc !== pf.makeUrl( candidate.url )) &&
							chooseLowRes(candidates[ j ].res, candidate.res, dpr, candidates[ j ].cached)) {
	
							bestCandidate = candidates[ j ];
	
						} else {
							bestCandidate = candidate;
						}
						break;
					}
				}
			}
	
			if ( bestCandidate ) {
	
				candidateSrc = pf.makeUrl( bestCandidate.url );
	
				imageData.curSrc = candidateSrc;
				imageData.curCan = bestCandidate;
	
				if ( candidateSrc !== curSrc ) {
					pf.setSrc( img, bestCandidate );
				}
				pf.setSize( img );
			}
		};
	
		pf.setSrc = function( img, bestCandidate ) {
			var origWidth;
			img.src = bestCandidate.url;
	
			// although this is a specific Safari issue, we don't want to take too much different code paths
			if ( bestCandidate.set.type === "image/svg+xml" ) {
				origWidth = img.style.width;
				img.style.width = (img.offsetWidth + 1) + "px";
	
				// next line only should trigger a repaint
				// if... is only done to trick dead code removal
				if ( img.offsetWidth + 1 ) {
					img.style.width = origWidth;
				}
			}
		};
	
		pf.getSet = function( img ) {
			var i, set, supportsType;
			var match = false;
			var sets = img [ pf.ns ].sets;
	
			for ( i = 0; i < sets.length && !match; i++ ) {
				set = sets[i];
	
				if ( !set.srcset || !pf.matchesMedia( set.media ) || !(supportsType = pf.supportsType( set.type )) ) {
					continue;
				}
	
				if ( supportsType === "pending" ) {
					set = supportsType;
				}
	
				match = set;
				break;
			}
	
			return match;
		};
	
		pf.parseSets = function( element, parent, options ) {
			var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;
	
			var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
			var imageData = element[ pf.ns ];
	
			if ( imageData.src === undefined || options.src ) {
				imageData.src = getImgAttr.call( element, "src" );
				if ( imageData.src ) {
					setImgAttr.call( element, srcAttr, imageData.src );
				} else {
					removeImgAttr.call( element, srcAttr );
				}
			}
	
			if ( imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset ) {
				srcsetAttribute = getImgAttr.call( element, "srcset" );
				imageData.srcset = srcsetAttribute;
				srcsetParsed = true;
			}
	
			imageData.sets = [];
	
			if ( hasPicture ) {
				imageData.pic = true;
				getAllSourceElements( parent, imageData.sets );
			}
	
			if ( imageData.srcset ) {
				imageSet = {
					srcset: imageData.srcset,
					sizes: getImgAttr.call( element, "sizes" )
				};
	
				imageData.sets.push( imageSet );
	
				isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || "");
	
				// add normal src as candidate, if source has no w descriptor
				if ( !isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x ) {
					imageSet.srcset += ", " + imageData.src;
					imageSet.cands.push({
						url: imageData.src,
						d: 1,
						set: imageSet
					});
				}
	
			} else if ( imageData.src ) {
				imageData.sets.push( {
					srcset: imageData.src,
					sizes: null
				} );
			}
	
			imageData.curCan = null;
			imageData.curSrc = undefined;
	
			// if img has picture or the srcset was removed or has a srcset and does not support srcset at all
			// or has a w descriptor (and does not support sizes) set support to false to evaluate
			imageData.supported = !( hasPicture || ( imageSet && !pf.supSrcset ) || (isWDescripor && !pf.supSizes) );
	
			if ( srcsetParsed && pf.supSrcset && !imageData.supported ) {
				if ( srcsetAttribute ) {
					setImgAttr.call( element, srcsetAttr, srcsetAttribute );
					element.srcset = "";
				} else {
					removeImgAttr.call( element, srcsetAttr );
				}
			}
	
			if (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) ||  element.src !== pf.makeUrl(imageData.src))) {
				if (imageData.src === null) {
					element.removeAttribute("src");
				} else {
					element.src = imageData.src;
				}
			}
	
			imageData.parsed = true;
		};
	
		pf.fillImg = function(element, options) {
			var imageData;
			var extreme = options.reselect || options.reevaluate;
	
			// expando for caching data on the img
			if ( !element[ pf.ns ] ) {
				element[ pf.ns ] = {};
			}
	
			imageData = element[ pf.ns ];
	
			// if the element has already been evaluated, skip it
			// unless `options.reevaluate` is set to true ( this, for example,
			// is set to true when running `picturefill` on `resize` ).
			if ( !extreme && imageData.evaled === evalId ) {
				return;
			}
	
			if ( !imageData.parsed || options.reevaluate ) {
				pf.parseSets( element, element.parentNode, options );
			}
	
			if ( !imageData.supported ) {
				applyBestCandidate( element );
			} else {
				imageData.evaled = evalId;
			}
		};
	
		pf.setupRun = function() {
			if ( !alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio) ) {
				updateMetrics();
			}
		};
	
		// If picture is supported, well, that's awesome.
		if ( pf.supPicture ) {
			picturefill = noop;
			pf.fillImg = noop;
		} else {
	
			 // Set up picture polyfill by polling the document
			(function() {
				var isDomReady;
				var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;
	
				var run = function() {
					var readyState = document.readyState || "";
	
					timerId = setTimeout(run, readyState === "loading" ? 200 :  999);
					if ( document.body ) {
						pf.fillImgs();
						isDomReady = isDomReady || regReady.test(readyState);
						if ( isDomReady ) {
							clearTimeout( timerId );
						}
	
					}
				};
	
				var timerId = setTimeout(run, document.body ? 9 : 99);
	
				// Also attach picturefill on resize and readystatechange
				// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
				var debounce = function(func, wait) {
					var timeout, timestamp;
					var later = function() {
						var last = (new Date()) - timestamp;
	
						if (last < wait) {
							timeout = setTimeout(later, wait - last);
						} else {
							timeout = null;
							func();
						}
					};
	
					return function() {
						timestamp = new Date();
	
						if (!timeout) {
							timeout = setTimeout(later, wait);
						}
					};
				};
				var lastClientWidth = docElem.clientHeight;
				var onResize = function() {
					isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
					lastClientWidth = docElem.clientHeight;
					if ( isVwDirty ) {
						pf.fillImgs();
					}
				};
	
				on( window, "resize", debounce(onResize, 99 ) );
				on( document, "readystatechange", run );
			})();
		}
	
		pf.picturefill = picturefill;
		//use this internally for easy monkey patching/performance testing
		pf.fillImgs = picturefill;
		pf.teardownRun = noop;
	
		/* expose methods for testing */
		picturefill._ = pf;
	
		window.picturefillCFG = {
			pf: pf,
			push: function(args) {
				var name = args.shift();
				if (typeof pf[name] === "function") {
					pf[name].apply(pf, args);
				} else {
					cfg[name] = args[0];
					if (alreadyRun) {
						pf.fillImgs( { reselect: true } );
					}
				}
			}
		};
	
		while (setOptions && setOptions.length) {
			window.picturefillCFG.push(setOptions.shift());
		}
	
		/* expose picturefill */
		window.picturefill = picturefill;
	
		/* expose picturefill */
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// CommonJS, just export
			module.exports = picturefill;
		} else if ( true ) {
			// AMD support
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return picturefill; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
	
		// IE8 evals this sync, so it must be the last thing we do
		if ( !pf.supPicture ) {
			types[ "image/webp" ] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==" );
		}
	
	} )( window, document );


/***/ }
/******/ ]);
//# sourceMappingURL=critical.bundle.js.map