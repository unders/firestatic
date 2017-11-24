/*
 (c) Andrea Giammarchi (ISC) */
'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(g,e,c){g instanceof String&&(g=String(g));for(var b=g.length,a=0;a<b;a++){var d=g[a];if(e.call(c,d,a,g))return{i:a,v:d}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(g,e,c){g!=Array.prototype&&g!=Object.prototype&&(g[e]=c.value)};
$jscomp.getGlobal=function(g){return"undefined"!=typeof window&&window===g?g:"undefined"!=typeof global&&null!=global?global:g};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(g,e,c,b){if(e){c=$jscomp.global;g=g.split(".");for(b=0;b<g.length-1;b++){var a=g[b];a in c||(c[a]={});c=c[a]}g=g[g.length-1];b=c[g];e=e(b);e!=b&&null!=e&&$jscomp.defineProperty(c,g,{configurable:!0,writable:!0,value:e})}};
$jscomp.polyfill("Array.prototype.find",function(g){return g?g:function(g,c){return $jscomp.findInternal(this,g,c).v}},"es6","es3");$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(g){return $jscomp.SYMBOL_PREFIX+(g||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var g=$jscomp.global.Symbol.iterator;g||(g=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[g]&&$jscomp.defineProperty(Array.prototype,g,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(g){var e=0;return $jscomp.iteratorPrototype(function(){return e<g.length?{done:!1,value:g[e++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(g){$jscomp.initSymbolIterator();g={next:g};g[$jscomp.global.Symbol.iterator]=function(){return this};return g};$jscomp.makeIterator=function(g){$jscomp.initSymbolIterator();var e=g[Symbol.iterator];return e?e.call(g):$jscomp.arrayIterator(g)};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(g){function e(){this.batch_=null}function c(f){return f instanceof a?f:new a(function(a,b){a(f)})}if(g&&!$jscomp.FORCE_POLYFILL_PROMISE)return g;e.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};e.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var b=$jscomp.global.setTimeout;e.prototype.asyncExecuteFunction=function(a){b(a,
0)};e.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(t){this.asyncThrow_(t)}}}this.batch_=null};e.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var a=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(h){b.reject(h)}};a.prototype.createResolveAndReject_=
function(){function a(a){return function(f){c||(c=!0,a.call(b,f))}}var b=this,c=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};a.prototype.resolveTo_=function(b){if(b===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(b instanceof a)this.settleSameAsPromise_(b);else{a:switch(typeof b){case "object":var f=null!=b;break a;case "function":f=!0;break a;default:f=!1}f?this.resolveToNonPromiseObj_(b):this.fulfill_(b)}};a.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(h){this.reject_(h);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};a.prototype.reject_=function(a){this.settle_(2,a)};a.prototype.fulfill_=function(a){this.settle_(1,a)};a.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};a.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var d=new e;a.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};a.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(t){c.reject(t)}};a.prototype.then=function(b,c){function f(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(v){k(v)}}:b}var d,k,l=new a(function(a,
b){d=a;k=b});this.callWhenSettled_(f(b,d),f(c,k));return l};a.prototype.catch=function(a){return this.then(void 0,a)};a.prototype.callWhenSettled_=function(a,b){function c(){switch(f.state_){case 1:a(f.result_);break;case 2:b(f.result_);break;default:throw Error("Unexpected state: "+f.state_);}}var f=this;null==this.onSettledCallbacks_?d.asyncExecute(c):this.onSettledCallbacks_.push(function(){d.asyncExecute(c)})};a.resolve=c;a.reject=function(b){return new a(function(a,c){c(b)})};a.race=function(b){return new a(function(a,
d){for(var f=$jscomp.makeIterator(b),h=f.next();!h.done;h=f.next())c(h.value).callWhenSettled_(a,d)})};a.all=function(b){var d=$jscomp.makeIterator(b),f=d.next();return f.done?c([]):new a(function(a,b){function l(b){return function(c){h[b]=c;k--;0==k&&a(h)}}var h=[],k=0;do h.push(void 0),k++,c(f.value).callWhenSettled_(l(h.length-1),b),f=d.next();while(!f.done)})};return a},"es6","es3");
(function(g){function e(b){if(c[b])return c[b].exports;var a=c[b]={i:b,l:!1,exports:{}};g[b].call(a.exports,a,a.exports,e);a.l=!0;return a.exports}var c={};e.m=g;e.c=c;e.d=function(b,a,c){e.o(b,a)||Object.defineProperty(b,a,{configurable:!1,enumerable:!0,get:c})};e.n=function(b){var a=b&&b.__esModule?function(){return b["default"]}:function(){return b};e.d(a,"a",a);return a};e.o=function(b,a){return Object.prototype.hasOwnProperty.call(b,a)};e.p="";return e(e.s=0)})([function(g,e){(function(c){function b(d){if(a[d])return a[d].exports;
var f=a[d]={i:d,l:!1,exports:{}};c[d].call(f.exports,f,f.exports,b);f.l=!0;return f.exports}var a={};b.m=c;b.c=a;b.d=function(a,c,k){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:k})};b.n=function(a){var c=a&&a.__esModule?function(){return a["default"]}:function(){return a};b.d(c,"a",c);return c};b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};b.p="";return b(b.s=9)})([function(c,b,a){b.global=document.defaultView;b.ELEMENT_NODE=1;b.ATTRIBUTE_NODE=2;b.TEXT_NODE=
3;b.COMMENT_NODE=8;b.DOCUMENT_FRAGMENT_NODE=11;b.OWNER_SVG_ELEMENT="ownerSVGElement";b.SVG_NAMESPACE="http://www.w3.org/2000/svg";b.CONNECTED="connected";b.DISCONNECTED="disconnected";b.EXPANDO="_hyper: ";b.SHOULD_USE_TEXT_CONTENT=/^style|textarea$/i;c="_hyper: "+(Math.random()*new Date|0)+";";b.UID=c;b.UIDC="\x3c!--"+c+"--\x3e"},function(c,b,a){c=a(0);var d=c.global,f=c.OWNER_SVG_ELEMENT,k=c.SVG_NAMESPACE,h=c.UID,t=c.UIDC,m=a(19),l=m.hasAppend;c=m.hasContent;var n=m.hasDoomedCloneNode;m=m.hasImportNode;
a=a(2);var p=a.create,u=a.doc,v=a.fragment,q=l?function(a,b){a.append.apply(a,b)}:function(a,b){for(var c=b.length,f=0;f<c;f++)a.appendChild(b[f])};b.append=q;var g=/(<[a-z]+[a-z0-9:_-]*)((?:[^\S]+[^ \f\n\r\t\/>"'=]+(?:=(?:'.*?'|".*?"|<.+?>|\S+))?)+)([^\S]*\/?>)/gi,x=new RegExp("([^\\S]+[^ \\f\\n\\r\\t\\/>\"'=]+=)(['\"]?)"+t+"\\2","gi"),e=function(a,b,c,f){return b+c.replace(x,A)+f},A=function(a,b,c){return b+(c||'"')+h+(c||'"')};b.createFragment=function(a,b){return(f in a?G:E)(a,b.replace(g,e))};
var w=n?function(a){var b=a.cloneNode();a=a.childNodes||[];for(var c=a.length,f=0;f<c;f++)b.appendChild(w(a[f]));return b}:function(a){return a.cloneNode(!0)};b.importNode=m?function(a,b){return a.importNode(b,!0)}:function(a,b){return w(b)};a=[];var r=a.slice;t=a.splice;l=a.unshift;b.push=a.push;b.slice=r;b.splice=t;b.unshift=l;b.unique=function(a){return z(a)};var z=function(a){if(a.propertyIsEnumerable("raw")||/Firefox\/(\d+)/.test((d.navigator||{}).userAgent)&&55>parseFloat(RegExp.$1)){var b=
{};z=function(a){var c="_"+a.join(h);return b[c]||(b[c]=a)}}else z=function(a){return a};return z(a)},E=c?function(a,b){a=p(a,"template");a.innerHTML=b;return a.content}:function(a,b){var c=p(a,"template");a=v(a);if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(b)){var f=RegExp.$1;c.innerHTML="<table>"+b+"</table>";q(a,r.call(c.querySelectorAll(f)))}else c.innerHTML=b,q(a,r.call(c.childNodes));return a},G=c?function(a,b){var c=v(a);a=u(a).createElementNS(k,"svg");a.innerHTML=b;q(c,r.call(a.childNodes));
return c}:function(a,b){var c=v(a);a=p(a,"div");a.innerHTML='<svg xmlns="'+k+'">'+b+"</svg>";q(c,r.call(a.firstChild.childNodes));return c}},function(c,b,a){b.create=function(a,b){return d(a).createElement(b)};var d=function(a){return a.ownerDocument||a};b.doc=d;b.fragment=function(a){return d(a).createDocumentFragment()};b.text=function(a,b){return d(a).createTextNode(b)}},function(c,b,a){function d(){}Object.defineProperty(b,"__esModule",{value:!0}).default=d;b.setup=function(a){Object.defineProperties(d.prototype,
{handleEvent:{value:function(a){var b=a.currentTarget;this["getAttribute"in b&&b.getAttribute("data-call")||"on"+a.type](a)}},html:f("html",a),svg:f("svg",a),state:f("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},setState:{value:function(a){var b=this.state;a="function"===typeof a?a.call(this,b):a;for(var c in a)b[c]=a[c];this.render()}}})};var f=function(a,b){var c="_"+a+"$";return{get:function(){return this[c]||(this[a]=b.call(this,a))},set:function(a){Object.defineProperty(this,
c,{configurable:!0,value:a})}}}},function(c,b,a){a=a(0);c=a.global;var d=a.UID;a=c.Event;try{new a("Event")}catch(k){a=function(a){var b=document.createEvent("Event");b.initEvent(a,!1,!1);return b}}b.Event=a;b.Map=c.Map||function(){var a=[],b=[];return{get:function(c){return b[a.indexOf(c)]},set:function(c,f){b[a.push(c)-1]=f}}};var f=c.WeakMap||function(){return{get:function(a){return a[d]},set:function(a,b){Object.defineProperty(a,d,{configurable:!0,value:b})}}};b.WeakMap=f;b.WeakSet=c.WeakSet||
function(){var a=new f;return{add:function(b){a.set(b,!0)},has:function(b){return!0===a.get(b)}}};c=Array.isArray||function(a){return function(b){return"[object Array]"===a.call(b)}}({}.toString);b.isArray=c;b.trim=d.trim||function(){return this.replace(/^\s+|\s+$/g,"")}},function(c,b,a){function d(a,b){this.node=a;this.childNodes=b}c=a(1);var f=c.push,k=c.slice,h=c.splice,t=c.unshift,m=a(2).fragment,l=function(a){return a.__esModule?a.default:a}(a(3));a=function(a){return a.__esModule?a.default:
a}(a(20));d.engine=a;d.prototype.empty=function(a){var b=this.node,c=this.childNodes,d=c.length;if(d)for(var l=b.parentNode,k=h.call(c,0,d);d--;)l.removeChild(n.getNode(k[d]));a&&(f.call(c,a),b.parentNode.insertBefore(n.getNode(a),b))};d.prototype.become=function(a){var b=a.length;if(0<b){var c=this.node,l=this.childNodes,p=c.parentNode,m=l.length,g=0,e=0;if(1>m)f.apply(l,n.insert(p,a,c));else{for(;g<m&&e<b&&l[g]===a[e];)g++,e++;if(g===m)b!==m&&f.apply(l,n.insert(p,k.call(a,e),c));else if(e===b)n.remove(p,
h.call(l,g,m));else{for(var w=m,r=b;w&&r;)if(l[--w]!==a[--r]){++w;++r;break}1>w?t.apply(l,n.insert(p,k.call(a,0,r),n.getNode(l[0]))):1>r?n.remove(p,h.call(l,g,w)):d.engine.update(n,p,c,l,g,w,m,a,e,r,b)}}}else this.empty()};var n={engine:a,getNode:function(a){return a instanceof l?a.render():a},insert:function(a,b,c){var f=b.length;if(1===f)a.insertBefore(n.getNode(b[0]),c);else{for(var d=0,l=m(a);d<f;)l.appendChild(n.getNode(b[d++]));a.insertBefore(l,c)}return b},remove:function(a,b){for(var c=b.length;c--;)a.removeChild(n.getNode(b[c]))}};
Object.defineProperty(b,"__esModule",{value:!0}).default=d},function(c,b,a){var d={},f=[],k=d.hasOwnProperty,h=0;Object.defineProperty(b,"__esModule",{value:!0}).default={define:function(a,b){a in d||(h=f.push(a));d[a]=b},invoke:function(a,b){for(var c=0;c<h;c++){var n=f[c];if(k.call(a,n))return d[n](a[n],b)}}}},function(c,b,a){c=a(0);var d=c.ELEMENT_NODE,f=c.SVG_NAMESPACE,k=a(4);c=k.WeakMap;var h=k.trim,g=a(2).fragment;k=a(1);var m=k.append,l=k.slice,n=k.unique,p=function(a){return a.__esModule?
a.default:a}(a(8)),u=new c,e=function(a){var b,c,k,t,u;return function(e){e=n(e);var q=t!==e;q&&(t=e,k=g(document),c="svg"===a?document.createElementNS(f,"svg"):k,u=p.bind(c));u.apply(null,arguments);if(q){"svg"===a&&m(k,l.call(c.childNodes));q=k.childNodes;for(var v=q.length,y=[],x=0;x<v;x++){var r=q[x];r.nodeType!==d&&0===h.call(r.textContent).length||y.push(r)}b=1===y.length?y[0]:y}return b}},q=function(a,b){var c=b.indexOf(":"),f=u.get(a),d=b;-1<c&&(d=b.slice(c+1),b=b.slice(0,c)||"html");f||u.set(a,
f={});return f[d]||(f[d]=e(b))};b.content=e;b.weakly=q;Object.defineProperty(b,"__esModule",{value:!0}).default=function(a,b){return null==a?e(b||"html"):q(a,b||"html")}},function(c,b,a){function d(a){a=n(a);var b;if(!(b=u.get(a))){b=a;var c=[],d=m(this,b.join(h));g.find(d,c,b.slice());c={fragment:d,paths:c};u.set(b,c);b=c}c=b;b=l(this.ownerDocument,c.fragment);c=g.create(b,c.paths);p.set(this,{template:a,updates:c});f.apply(c,arguments);this.textContent="";this.appendChild(b)}function f(){for(var a=
arguments.length,b=1;b<a;b++)this[b-1](arguments[b])}var k=a(4);c=k.Map;k=k.WeakMap;var h=a(0).UIDC,g=function(a){return a.__esModule?a.default:a}(a(21));a=a(1);var m=a.createFragment,l=a.importNode,n=a.unique,p=new k,u=new c;Object.defineProperty(b,"__esModule",{value:!0}).default=function(a){var b=p.get(this);b&&b.template===n(a)?f.apply(b.updates,arguments):d.apply(this,arguments);return this}},function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});var d=a(10),f=a(12);b=a(13);c=a(14);
a=a(15);d=d.getConfig();f=f.log({online:d.online});f.info("init app start");b=new b.Domain({logger:f});b=new a.App({logger:f,domain:b});new c.ActionHandler({app:b,logger:f});f.info("init app done")},function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});var d=a(11);b.getConfig=function(){return{online:d.env.online}}},function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});c=function(){function a(){}a.online=!0;return a}();b.env=c},function(c,b,a){Object.defineProperty(b,"__esModule",
{value:!0});var d=function(){function a(){}a.info=function(a){};a.error=function(a){};return a}(),f=function(){function a(){}a.info=function(a){console.info(a)};a.error=function(a){console.error(a)};return a}();b.log=function(a){return a.online?d:f}},function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});c=function(){function a(a){this.domainContact=new d(a.logger)}a.prototype.contact=function(){return this.domainContact};return a}();b.Domain=c;var d=function(){function a(a){this.logger=
a}a.prototype.send=function(a){this.logger.info(a);return null};return a}()},function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});c=function(){function a(a){this.app=a.app;this.logger=a.logger;document.body.addEventListener("submit",this);document.body.addEventListener("keyup",this)}a.prototype.handleEvent=function(a){try{var b=a.target;if("getAttribute"in b){var c=b.getAttribute("data-action");if(c)this[c+"On"+a.type](a)}}catch(t){this.logger.error(t)}};a.prototype.contactFormOnsubmit=
function(a){try{this.app.contactFormOnsubmit(a,a.target)}catch(k){this.logger.error("ContactFormOnsubmit Error"),this.logger.error(k)}};a.prototype.contactInputOnkeyup=function(a){try{this.app.contactInputOnkeyup(a)}catch(k){this.logger.error("ContactInputOnkeyup Error"),this.logger.error(k)}};a.prototype.cleanup=function(){document.body.removeEventListener("submit",this);document.body.removeEventListener("keyup",this)};return a}();b.ActionHandler=c},function(c,b,a){Object.defineProperty(b,"__esModule",
{value:!0});var d=a(16),f=a(25),g=function(){function a(a){var b=document.getElementById("contact-form");this.contact=new d.Contact(b);b||a.info("id='#contact-form' not found on page")}a.prototype.render=function(){this.contact.render()};return a}();c=function(){function a(a){this.logger=a.logger;this.view=new g(a.logger);this.domain=a.domain;this.formHelper=new f.FormHelper(a.logger);this.render()}a.prototype.contactFormOnsubmit=function(a,b){a.preventDefault();a=this.view.contact;a.disableSubmit();
this.render();this.logger.info("Action: contactFormOnSubmit");var c=a.checkValidity(b),d=c.data,f=c.focusID;c.valid?((c=this.domain.contact().send(d))?(this.logger.info("Post: Error; server error: "+c),a.setErrMessage(c)):(this.logger.info("Post: OK"),a.setOKMessage(b)),a.enableSubmit(),this.render()):(this.logger.info("Form Invalid: show form errors"),a.enableSubmit(),this.render(),this.formHelper.focus(b,f))};a.prototype.contactInputOnkeyup=function(a){this.view.contact.inputOnkeyup(a)||this.logger.error("inputOnkeyup "+
a.target+" failed");this.render()};a.prototype.render=function(){this.view.render()};return a}();b.App=c},function(c,b,a){function d(){return{submit:{disable:!1},email:{valid:!0,valueMissing:!1,typeMismatch:!1,hasValue:!1},message:{valid:!0,valueMissing:!1,tooShort:!1,hasValue:!1}}}var f=this&&this.__makeTemplateObject||function(a,b){Object.defineProperty?Object.defineProperty(a,"raw",{value:b}):a.raw=b;return a};Object.defineProperty(b,"__esModule",{value:!0});var g=a(17),h=a(24);c=function(){function a(a){this.state=
d();a?(this.notAttached=!1,this.html=g.bind(a)):this.notAttached=!0}a.trim=function(a){var b=a["contact-email"],c=b.value.trim();b.value="x";b.value=c;a=a["contact-message"];var d=a.value.trim();a.value=d;return{email:c,inputEmail:b,message:d,inputMessage:a}};a.prototype.disableSubmit=function(){this.state.submit.disable=!0};a.prototype.enableSubmit=function(){this.state.submit.disable=!1};a.prototype.checkValidity=function(b){var c=a.trim(b);if(b.checkValidity())return{data:c,focusID:"",valid:!0};
var d=c.inputEmail;b=d.validity.valid;this.state.email={hasValue:0!==c.email.length,valid:b,valueMissing:d.validity.valueMissing,typeMismatch:d.validity.typeMismatch};d=c.inputMessage;this.state.message={hasValue:0!==c.message.length,valid:d.validity.valid,valueMissing:d.validity.valueMissing,tooShort:d.validity.tooShort};d="contact-email";b&&(d="contact-message");return{data:c,focusID:d,valid:!1}};a.prototype.inputOnkeyup=function(a){if(13===a.keyCode)return!0;a=a.target;switch(a.id){case "contact-email":var b=
d().email;b.hasValue=0!==a.value.length;this.state.email=b;return!0;case "contact-message":return b=d().message,b.hasValue=0!==a.value.length,this.state.message=b,!0;default:return!1}};a.prototype.setErrMessage=function(a){console.log("showErrMessage("+a)};a.prototype.setOKMessage=function(a){a.reset();this.state=d()};a.prototype.render=function(){if(this.notAttached)return"";var a=this.state,b=h.css.formField;a.email.hasValue&&(b=b+" "+h.css.hasValue);var c=h.css.error+" "+h.css.invisible,d=h.css.error+
" "+h.css.hidden;!a.email.valid&&(b=b+" "+h.css.error,c=h.css.error+" "+h.css.hidden,a.email.valueMissing||a.email.typeMismatch)&&(d=h.css.error+" "+h.css.show);var g=h.css.formField;a.message.hasValue&&(g=g+" "+h.css.hasValue);var k=h.css.error+" "+h.css.invisible,m=h.css.error+" "+h.css.hidden;!a.message.valid&&(g=g+" "+h.css.error,k=h.css.error+" "+h.css.hidden,a.message.valueMissing||a.message.tooShort)&&(m=h.css.error+" "+h.css.show);a=a.submit.disable;return this.html(e||(e=f('\n    <div class="contact-width">\n        <h2 class="contact-header">Ready for a change? Let\u2019s get in touch.</h2>\n        <form action="#" data-action="contactForm" class="contact-form" novalidate>\n            <div class=";">\n                <input id=";" tabindex="1" data-action="contactInput" required type="email"/>\n                <label for=";">Your Email</label>\n                <span class=";">visibility:hidden</span>\n                <span class=";">we need your email</span>\n            </div>\n            <div class=";">\n                <textarea id=";" tabindex="2" data-action="contactInput" required minlength="5"></textarea>\n                <label for=";">How can we help you?</label>\n                <span class=";">visibility:hidden</span>\n                <span class=";">you need to write something</span>\n            </div>\n             <footer>\n                <button class="btn" tabindex="3" ype="submit" disabled=";">Send Message</button>\n            </footer>\n        </form>\n    </div>'.split(";"),
'\n    <div class="contact-width">\n        <h2 class="contact-header">Ready for a change? Let\u2019s get in touch.</h2>\n        <form action="#" data-action="contactForm" class="contact-form" novalidate>\n            <div class=";">\n                <input id=";" tabindex="1" data-action="contactInput" required type="email"/>\n                <label for=";">Your Email</label>\n                <span class=";">visibility:hidden</span>\n                <span class=";">we need your email</span>\n            </div>\n            <div class=";">\n                <textarea id=";" tabindex="2" data-action="contactInput" required minlength="5"></textarea>\n                <label for=";">How can we help you?</label>\n                <span class=";">visibility:hidden</span>\n                <span class=";">you need to write something</span>\n            </div>\n             <footer>\n                <button class="btn" tabindex="3" ype="submit" disabled=";">Send Message</button>\n            </footer>\n        </form>\n    </div>'.split(";"))),
b,"contact-email","contact-email",c,d,g,"contact-message","contact-message",k,m,a)};return a}();b.Contact=c;var e},function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});var d=a(18);b.wire=function(a,b){return d.wire(a,b)};b.bind=function(a){return d.bind(a)}},function(c,b,a){function d(a){return 2>arguments.length?null==a?l("html"):"string"===typeof a?e(null,a):"raw"in a?l("html")(a):"nodeType"in a?p.bind(a):n(a,"html"):("raw"in a?l("html"):e).apply(null,arguments)}var f=function(a){return a.__esModule?
a.default:a}(a(5));c=function(a){return a.__esModule?a.default:a}(a(3));var g=a(3).setup,h=function(a){return a.__esModule?a.default:a}(a(6)),e=function(a){return a.__esModule?a.default:a}(a(7)),m=a(7),l=m.content,n=m.weakly,p=function(a){return a.__esModule?a.default:a}(a(8));a=function(a){return p.bind(a)};h=h.define;d.Component=c;d.bind=a;d.define=h;d.hyper=d;d.wire=e;Object.defineProperty(d,"engine",{get:function(){return f.engine},set:function(a){f.engine=a}});g(l);b.Component=c;b.bind=a;b.define=
h;b.hyper=d;b.wire=e;Object.defineProperty(b,"__esModule",{value:!0}).default=d},function(c,b,a){a=a(2);c=a.create;var d=a.fragment;a=a.text;d=d(document);b.hasAppend="append"in d;c="content"in c(document,"template");b.hasContent=c;d.appendChild(a(d,"g"));d.appendChild(a(d,""));c=1===d.cloneNode(!0).childNodes.length;b.hasDoomedCloneNode=c;b.hasImportNode="importNode"in document},function(c,b,a){c=a(1);var d=c.slice,f=c.splice;Object.defineProperty(b,"__esModule",{value:!0}).default={update:function(a,
b,c,g,l,e,p,u,v,q){for(;l<e&&v<q;){var h=g[l],k=u[v],m=h===k?0:0>g.indexOf(k)?1:-1;0>m?(f.call(g,l,1),b.removeChild(a.getNode(h)),e--,p--):(0<m?(f.call(g,l,0,k),b.insertBefore(a.getNode(k),a.getNode(h)),l++,e++,p++):l++,v++)}if(l<e)for(h=f.call(g,l,e-l),l=h.length;l--;)b.removeChild(a.getNode(h[l]));v<q&&f.apply(g,[e,0].concat(a.insert(b,d.call(u,v,q),e<p?a.getNode(g[e]):c)))}}},function(c,b,a){function d(){}c=a(0);var f=c.CONNECTED,g=c.DISCONNECTED,e=c.COMMENT_NODE,t=c.DOCUMENT_FRAGMENT_NODE,m=c.ELEMENT_NODE,
l=c.TEXT_NODE,n=c.OWNER_SVG_ELEMENT,p=c.SHOULD_USE_TEXT_CONTENT,u=c.UID,v=c.UIDC,q=function(a){return a.__esModule?a.default:a}(a(5)),y=function(a){return a.__esModule?a.default:a}(a(3)),x=function(a){return a.__esModule?a.default:a}(a(22)),Q=function(a){return a.__esModule?a.default:a}(a(23)),A=function(a){return a.__esModule?a.default:a}(a(6)),w=a(2).text,r=a(4),z=r.Event;c=r.WeakSet;var E=r.isArray,G=r.trim;a=a(1);var O=a.createFragment,D=a.slice,J=new c;d.prototype=Object.create(null);var P=function(a){return{html:a}},
F=function(a,b){b=new z(b);for(var c=a.length,d=0;d<c;d++){var f=a[d];f.nodeType===m&&L(f,b)}},L=function(a,b){if(J.has(a))a.dispatchEvent(b);else{a=a.children;for(var c=a.length,d=0;d<c;d++)L(a[d],b)}},M=function(a,b,c){for(var f=a.childNodes,g=f.length,h=0;h<g;h++){var C=f[h];switch(C.nodeType){case m:for(var k=C,n=b,B=c,t=new d,H=k.attributes,K=D.call(H),q=[],r=K.length,y=0;y<r;y++){var w=K[y];if(w.value===u){var z=w.name;if(!(z in t)){var A=B.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/,"$1");
t[z]=H[A]||H[A.toLowerCase()];n.push(x.create("attr",t[z],A))}q.push(w)}}n=q.length;for(B=0;B<n;B++)k.removeAttributeNode(q[B]);M(C,b,c);break;case e:C.textContent===u&&(c.shift(),b.push(p.test(a.nodeName)?x.create("text",a):x.create("any",C)));break;case l:p.test(a.nodeName)&&G.call(C.textContent)===v&&(c.shift(),b.push(x.create("text",a)))}}},N=function(a,b){b(a.placeholder);"text"in a?Promise.resolve(a.text).then(String).then(b):"any"in a?Promise.resolve(a.any).then(b):"html"in a?Promise.resolve(a.html).then(P).then(b):
Promise.resolve(A.invoke(a,b)).then(b)},I=function(a){return null!=a&&"then"in a},R=function(a,b){var c=new q(a,b),d=!1,f,g=function(e){switch(typeof e){case "string":case "number":case "boolean":d?f!==e&&(f=e,b[0].textContent=e):(d=!0,f=e,c.empty(w(a,e)));break;case "object":case "undefined":if(null==e){d=!1;c.empty();break}default:if(d=!1,f=e,E(e))if(0===e.length)c.empty();else switch(typeof e[0]){case "string":case "number":case "boolean":g({html:e});break;case "object":if(E(e[0])&&(e=e.concat.apply([],
e)),I(e[0])){Promise.all(e).then(g);break}default:c.become(e)}else e instanceof y?c.empty(e):"ELEMENT_NODE"in e?c.become(e.nodeType===t?D.call(e.childNodes):[e]):I(e)?e.then(g):"placeholder"in e?N(e,g):"text"in e?g(String(e.text)):"any"in e?g(e.any):"html"in e?(c.empty(),e=O(a,[].concat(e.html).join("")),b.push.apply(b,e.childNodes),a.parentNode.insertBefore(e,a)):"length"in e?g(D.call(e)):g(A.invoke(e,g))}};return g},S=function(a,b,c){var d=n in a,e;if("style"===b)return Q(a,c,d);if(/^on/.test(b)){var h=
b.slice(2);h===f||h===g?J.add(a):b.toLowerCase()in a&&(h=h.toLowerCase());return function(b){e!==b&&(e&&a.removeEventListener(h,e,!1),(e=b)&&a.addEventListener(h,b,!1))}}if("data"===b||!d&&b in a)return function(c){e!==c&&(e=c,a[b]!==c&&(a[b]=c,null==c&&a.removeAttribute(b)))};var l=!1,k=c.cloneNode(!0);return function(b){e!==b&&(e=b,k.value!==b&&(null==b?l&&(l=!1,a.removeAttributeNode(k)):(k.value=b,l||(l=!0,a.setAttributeNode(k)))))}},T=function(a){var b,c=function(d){b!==d&&(b=d,"object"===typeof d&&
d?I(d)?d.then(c):"placeholder"in d?N(d,c):"text"in d?c(String(d.text)):"any"in d?c(d.any):"html"in d?c([].concat(d.html).join("")):"length"in d?c(D.call(d).join("")):c(A.invoke(d,c)):a.textContent=null==d?"":d)};return c};try{(new MutationObserver(function(a){for(var b=a.length,c=0;c<b;c++){var d=a[c];F(d.removedNodes,g);F(d.addedNodes,f)}})).observe(document,{subtree:!0,childList:!0})}catch(B){document.addEventListener("DOMNodeRemoved",function(a){F([a.target],g)},!1),document.addEventListener("DOMNodeInserted",
function(a){F([a.target],f)},!1)}Object.defineProperty(b,"__esModule",{value:!0}).default={create:function(a,b){for(var c=[],d=b.length,e=0;e<d;e++){var f=b[e],g=x.find(a,f.path);switch(f.type){case "any":c.push(R(g,[]));break;case "attr":c.push(S(g,f.name,f.node));break;case "text":c.push(T(g))}}return c},find:M}},function(c,b,a){c=a(0);var d=c.COMMENT_NODE,f=c.DOCUMENT_FRAGMENT_NODE,e=c.ELEMENT_NODE;Object.defineProperty(b,"__esModule",{value:!0}).default={create:function(a,b,c){var g=b,h=[];switch(g.nodeType){case e:case f:var k=
g;break;case d:k=g.parentNode;h.unshift(h.indexOf.call(k.childNodes,g));break;default:k=g.ownerElement}for(g=k;k=k.parentNode;g=k)h.unshift(h.indexOf.call(k.childNodes,g));return{type:a,name:c,node:b,path:h}},find:function(a,b){for(var c=b.length,d=0;d<c;d++)a=a.childNodes[b[d]];return a}}},function(c,b,a){var d=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;Object.defineProperty(b,"__esModule",{value:!0}).default=function(a,b,c){return c?(b=b.cloneNode(!0),b.value="",a.setAttributeNode(b),
e(b,c)):e(a.style,c)};var e=function(a,b){var c,e;return function(f){switch(typeof f){case "object":if(f){if("object"===c){if(!b&&e!==f)for(var k in e)k in f||(a[k]="")}else b?a.value="":a.cssText="";k=b?{}:a;for(var l in f){var m=f[l];k[l]="number"!==typeof m||d.test(l)?m:m+"px"}c="object";if(b){f=e=k;l=[];for(n in f)l.push(n.replace(g,h),":",f[n],";");var n=l.join("");a.value=n}else e=f;break}default:e!=f&&(c="string",e=f,b?a.value=f||"":a.cssText=f||"")}}},g=/([^A-Z])([A-Z]+)/g,h=function(a,b,
c){return b+"-"+c.toLowerCase()}},function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});c=function(){function a(){}a.errHighlight="error-highlight";a.highlight="highlight";a.error="error";a.formField="form-field";a.hasValue="has-value";a.invisible="invisible";a.hidden="hidden";a.show="";return a}();b.css=c},function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});c=function(){function a(a){this.logger=a}a.prototype.focus=function(a,b){(a=a[b])?a.focus():this.logger.error("focus on form id: "+
b+" failed")};return a}();b.FormHelper=c}])}]);