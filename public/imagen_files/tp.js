﻿!function s(r,a,l){function u(t,e){if(!a[t]){if(!r[t]){var i="function"==typeof require&&require;if(!e&&i)return i(t,!0);if(d)return d(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[t]={exports:{}};r[t][0].call(o.exports,function(e){return u(r[t][1][e]||e)},o,o.exports,s,r,a,l)}return a[t].exports}for(var d="function"==typeof require&&require,e=0;e<l.length;e++)u(l[e]);return u}({1:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});i.EMPTY_WIDGET_ID="000000000000000000000000",i.LAZY_LOADED_WIDGETS=["54d39695764ea907c0f34825","577258fb31f02306e4e3aaf9"]},{}],2:[function(e,t,i){"use strict";var n=!1;function f(e){try{if(n)return;var t=document.createElement("script");t.setAttribute("type","application/ld+json"),t.innerHTML=JSON.stringify(e),document.head.appendChild(document.createComment("Added by Trustpilot")),document.head.appendChild(t),document.head.appendChild(document.createComment("/Added by Trustpilot")),n=!0}catch(e){}}var m=e("./xhr.js");t.exports=function(e){if(n)return!1;var t="60f537b5b0f1639de1fe048c"===e.templateId;return e.schemaType&&e.location?(function(e){var t=e.businessunitId,i=e.location,n=e.locale,o=e.templateId,s="https://widget.trustpilot.com"+("/data/jsonld/business-unit/"+t+"/location/"+i)+"?"+["url="+encodeURIComponent(window.location.href),"templateId="+o,"locale="+n].join("&");m.xhrGet({url:s,success:function(e){e.url=document.location.href,e["@id"]=document.location.href,f(e)},error:function(e){console.error(e)}})}(e),!0):!(!e.sku||!(e.name||t&&"Product"===e.schemaType))&&(function(e){var t=e.businessunitId,i=e.locale,n=e.templateId,o=e.name,s=e.sku,r=e.reviewnumber,a=e.price,l=e.priceCurrency,u=e.availability,d=i&&i.split("-")[0],c="https://widget.trustpilot.com"+("5763bccae0a06d08e809ecbb"===n?"/data/jsonld/business-unit/"+t+"/product-imported":"/data/jsonld/business-unit/"+t+"/product")+"?sku="+encodeURIComponent(s)+"&numberOfReviews="+(r||10)+(o?"&productName="+encodeURIComponent(o):"")+"&language="+d+"&templateId="+n+"&url="+encodeURIComponent(window.location.origin+window.location.pathname),h=a&&l&&u?{"@type":"Offer",priceCurrency:l,price:a,availability:u}:null;m.xhrGet({url:c,success:function(e){h&&(e.offers=h),(e.offers||e.review||e.aggregateRating)&&f(e)},error:function(e){console.error(e)}})}(e),!0)}},{"./xhr.js":7}],3:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(e,t,i){return t&&o(e.prototype,t),i&&o(e,i),e};function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var s=a(e("./snippets")),r=a(e("./widget"));function a(e){return e&&e.__esModule?e:{default:e}}var l=(n(u,[{key:"initializeOnPageLoad",value:function(){"loading"!==this.document.readyState?this.findAndApplyWidgets():this.document.addEventListener("DOMContentLoaded",this.findAndApplyWidgets.bind(this))}},{key:"applyWidgetFromDomElement",value:function(e,t){e.firstChild&&"IFRAME"===e.firstChild.tagName&&!t||this.createWidget(e)}},{key:"findAndApplyWidgets",value:function(){var t=this;this.stats.findAndApplyCalls+=1;var e=this.widgetElements;e&&0!==e.length&&(this.stats.elements=e.length,e.forEach(function(e){return t.createWidget(e)}))}},{key:"createWidget",value:function(e){this.removeWidget(e);var t=e.dataset;(0,s.default)(t);var i={container:e,dataset:t},n=new r.default(i);return n.initialize(),this.stats.applied+=1,this.stats.applyFromDomCalls+=1,this.widgets.push(n),n}},{key:"removeWidget",value:function(t){for(;t.firstChild;)t.removeChild(t.firstChild);this.widgets.filter(function(e){return e.isLazyLoaded&&e.isSameNodeAs(t)}).forEach(function(e){e.destroy()})}},{key:"closePopups",value:function(){this.widgets.forEach(function(e){return e.closePopup()})}},{key:"businessUnitId",get:function(){return this.widgetElements[0].dataset.businessunitId}},{key:"widgetElements",get:function(){return[].slice.call(this.document.getElementsByClassName("trustpilot-widget"))}}]),u);function u(e,t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),this.window=e,this.document=t,this.widgets=[],this.stats={applied:0,findAndApplyCalls:0,applyFromDomCalls:0,elements:0},this.version=i}i.default=l},{"./snippets":2,"./widget":5}],4:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},o=function(e,t,i){return t&&s(e.prototype,t),i&&s(e,i),e};function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r="53aa8912dec7e10d38f59f36,539adbd6dec7e10e686debee,539ad60defb9600b94d7df2c,539ad998dec7e10e686debe0,539ad0ffdec7e10e686debd7,54d0e1d8764ea9078c79e6ee,54ad5defc6454f065c28af8b".split(",");function a(e){var t="";return e&&0<e.length&&(e=e.toLowerCase(),t=/(px|\%)/i.test(e)?e:e+"px"),t}var l=(o(u,[{key:"getIframeOptionsFromData",value:function(){var e=this.iframeData||{styles:{}};return n({},this.defaultIframeOptions,{position:e.styles.position||"",zindex:e.styles.zindex||"",margin:e.styles.margin||"",top:e.styles.top||"",bottom:e.styles.bottom||"",left:e.styles.left||"",right:e.styles.right||"",height:e.styles.height||"",width:e.styles.width||this.defaultIframeOptions.styles.width||"",display:e.show?"block":"none",src:this.baseUrl+e.source+this.queryString,borderStyle:this.defaultIframeOptions.styles.borderStyle,overflow:this.defaultIframeOptions.styles.overflow,loading:this.dataset.loading,allow:e.allow})}},{key:"initialize",value:function(e,t){this._iframe=function(e){var t=document.createElement("iframe");return t.style.position=e.position,t.style.zIndex=e.zindex,t.style.margin=e.margin,t.style.top=e.top,t.style.bottom=e.bottom,t.style.left=e.left,t.style.right=e.right,t.style.height=e.height,t.style.width=e.width,t.style.borderStyle=e.borderStyle,t.style.backgroundColor=e.backgroundColor,t.style.display=e.display,t.style.overflow=e.overflow,t.allowTransparency=e.allowTransparency,t.title="Customer reviews powered by Trustpilot",t.loading=e.loading||"auto",t.src=e.src,e.allow&&(t.allow=e.allow),t}(this.getIframeOptionsFromData()),e.appendChild(this._iframe),this._iframe.addEventListener("load",t)}},{key:"sendMessage",value:function(e){this._iframe.contentWindow&&(e=JSON.stringify(e),this._iframe.contentWindow.postMessage(e,"https://widget.trustpilot.com"))}},{key:"isInViewport",value:function(e){var t=this._iframe.getBoundingClientRect(),i=t.width||this._iframe.offsetWidth,n=t.height||this._iframe.offsetHeight;return 0<=t.top&&0<=t.left&&t.bottom-n*e<=(window.innerHeight||document.documentElement.clientHeight)&&t.right-i*e<=(window.innerWidth||document.documentElement.clientWidth)}},{key:"setWidgetId",value:function(e){this.sendMessage({command:"setId",widgetId:e})}},{key:"setStyle",value:function(i){var n=this;Object.keys(i).forEach(function(e){var t=i[e];n._iframe.style[e]=t})}},{key:"isScrollBlockingPopup",value:function(){return"popup"===this.name&&this.isScrollBlocking}},{key:"disablePageScroll",value:function(){this.defaultOverflowProperties=this.OVERFLOW_PROPERTIES.reduce(function(e,t){return e[t]=document.body.style.getPropertyValue(t),e},{}),document.body.style.overflow="hidden"}},{key:"restorePageScroll",value:function(){var e=!0,t=!1,i=void 0;try{for(var n,o=this.OVERFLOW_PROPERTIES[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var s=n.value;document.body.style.removeProperty(s),this.defaultOverflowProperties[s]&&document.body.style.setProperty(s,this.defaultOverflowProperties[s])}}catch(e){t=!0,i=e}finally{try{!e&&o.return&&o.return()}finally{if(t)throw i}}}},{key:"show",value:function(){this.isScrollBlockingPopup()&&!this.isVisible&&this.disablePageScroll(),this._iframe.style.display="block",this.isVisible=!0}},{key:"hide",value:function(){this.isScrollBlockingPopup()&&this.isVisible&&this.restorePageScroll(),this._iframe.style.display="none",this.isVisible=!1}},{key:"focus",value:function(){this._iframe.contentWindow.focus()}},{key:"resizeHeight",value:function(e){"number"==typeof e&&0!==e&&(this._iframe.style.height=e+"px")}},{key:"_shouldAllowRobots",value:function(){return"true"===this.dataset.allowRobots&&this.dataset.location&&-1<r.indexOf(this.templateId)}},{key:"dimensions",get:function(){return{height:a(this.dataset.styleHeight),width:a(this.dataset.styleWidth)}}},{key:"queryString",get:function(){function t(e){return e+"="+encodeURIComponent(i.dataset[e])}function e(e){return Object.keys(i.dataset).filter(e).map(t)}var i=this,n=["businessunitId","templateId"],o=e(function(e){return-1!==n.indexOf(e)}),s=e(function(e){return-1===n.indexOf(e)&&"allowRobots"!==e});return"?"+o.join("&")+"#"+s.join("&")}},{key:"templateId",get:function(){return this.dataset.templateId}},{key:"baseUrl",get:function(){return"https://widget.trustpilot.com/trustboxes/"+this.templateId+"/"}},{key:"defaultIframeOptions",get:function(){return{source:this._shouldAllowRobots()?"index_allow_robots.html":"index.html",allowTransparency:"true",styles:{borderStyle:"none",backgroundColor:"transparent",display:"block",overflow:"hidden",height:this.dimensions.height,width:this.dimensions.width,position:"relative"},show:!0}}}]),u);function u(e,t,i){var n=3<arguments.length&&void 0!==arguments[3]&&arguments[3];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),this.OVERFLOW_PROPERTIES=["overflow","overflow-x","overflow-y"],this.name=e,this.dataset=t,this.iframeData=i||this.defaultIframeOptions,this.defaultOverflowProperties={},this.isVisible=!1,this.isScrollBlocking=n}i.default=l},{}],5:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(e,t,i){return t&&o(e.prototype,t),i&&o(e,i),e};function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=s(e("./tracking")),r=s(e("./iframe")),d=e("./../constants");function s(e){return e&&e.__esModule?e:{default:e}}var a=(n(c,null,[{key:"generateId",value:function(){for(var e=this.usedIds,t=void 0;t=Math.random(),-1!==e.indexOf(t););return this.usedIds.push(t)}}]),n(c,[{key:"isContainerInViewport",value:function(e){var t=0<arguments.length&&void 0!==e?e:200,i=this.container.getBoundingClientRect(),n=i.width||this.container.offsetWidth,o=i.height||this.container.offsetHeight;return 0<=i.top&&0<=i.left&&i.bottom-o-t<=(window.innerHeight||document.documentElement.clientHeight)&&i.right-n-t<=(window.innerWidth||document.documentElement.clientWidth)}},{key:"initialize",value:function(){!this.isLazyLoaded||this.isContainerInViewport()?(this._widgetIFrameOrigin="https://widget.trustpilot.com",this.createIFrame("main"),this.attachMessageListener()):this.lazyLoadTimeout=setTimeout(this.initialize,500)}},{key:"handleCommand",value:function(e){var t=e.data,i=e.origin;try{var n="string"==typeof t?JSON.parse(t):t;return i===this._widgetIFrameOrigin&&n.widgetId===this.id&&this.widgetIframeMessageHandler(n)}catch(e){return!1}}},{key:"attachMessageListener",value:function(){window.addEventListener("message",this.handleCommand.bind(this),!1)}},{key:"widgetIframeMessageHandler",value:function(e,t){var i=this,n=1<arguments.length&&void 0!==t?t:function(){};this.stats.events[e.command]=(this.stats.events[e.command]||0)+1;var o=e.name,s=e.style,r=e.height,a=e.targets,l=e.attachToBody,u=this.iframes[o],d={createIFrame:function(){return i.createIFrame(o,e,l)},setStyle:function(){return u.setStyle(s)},show:function(){return u.show()},hide:function(){return u.hide()},focus:function(){return u.focus()},loaded:function(){return i.iframes.main.sendMessage("loaded")},message:function(){return u.sendMessage(e)},ping:function(){i.iframes.main.sendMessage({command:"pong"}),i.stats.pongSent=!0},"resize-height":function(){return i.getIframeOrMain(o).resizeHeight(r)},impression:function(){return i.tracking.initialize()},scrollTo:function(){return i.scrollToTrustBox(a)}}[e.command];return d?(d(),!0):(n(),!1)}},{key:"createIFrame",value:function(e,t,i){var n=this,o=2<arguments.length&&void 0!==i&&i,s=new r.default(e,this.dataset,t,o);this.iframes[e]=s,this.stats.createIFrameCalls+=1,s.initialize(o?document.body:this.container,function(){s.setWidgetId(n.id),n.stats.iframeLoadEvents+=1})}},{key:"getIframeOrMain",value:function(e){return this.iframes[e]||this.iframes.main}},{key:"isInViewport",value:function(e){return this.iframes.main.isInViewport(e)}},{key:"isSameNodeAs",value:function(e){try{return this.container.isSameNode(e)}catch(e){return!1}}},{key:"destroy",value:function(){this.lazyLoadTimeout&&clearTimeout(this.lazyLoadTimeout)}},{key:"closePopup",value:function(){"popup"in this.iframes&&(this.iframes.main.sendMessage({name:"main",command:"message",message:"popup toggled",visible:!1}),this.iframes.popup.hide())}},{key:"scrollToTrustBox",value:function(e){var t=0<arguments.length&&void 0!==e?e:[],i=document.querySelector(t.map(function(e){return"[data-template-id='"+e+"']"}).join(","));if(i){var n=i.querySelector("iframe");n&&(i.scrollIntoView({behavior:"smooth"}),n.contentWindow.focus())}}},{key:"id",get:function(){return this._id||(this._id=this.constructor.generateId()),this._id}}]),c);function c(e){var t=this,i=e.container,n=e.dataset,o=e.session,s=e.anonymousId,r=e.testId,a=e.sessionExpiry;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);var l={container:i,dataset:n,templateId:n.templateId,businessUnitId:n.businessunitId,locale:n.locale};Object.keys(l).forEach(function(e){if(!l[e])throw"No "+e+" supplied for TrustBox"}),this.container=i,this.container.style.position="relative",this.dataset=n,this.iframes={},this.tracking=new u.default(function(e){return t.iframes.main.sendMessage(e)},function(){return t.isInViewport(.5)},{session:o,group:n.group,sessionExpiry:a,anonymousId:s,testId:r,templateId:n.templateId}),this.isLazyLoaded=-1<d.LAZY_LOADED_WIDGETS.indexOf(n.templateId),this.lazyLoadTimeout=null,this.isSameNodeAs=this.isSameNodeAs.bind(this),this.destroy=this.destroy.bind(this),this.stats={createIFrameCalls:0,iframeLoadEvents:0,events:{},pongSent:!1},this.initialize=this.initialize.bind(this)}a.usedIds=[],i.default=a},{"./../constants":1,"./iframe":4,"./tracking":6}],6:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(e,t,i){return t&&o(e.prototype,t),i&&o(e,i),e};function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=e("../constants");var s=(n(d,[{key:"initialize",value:function(){this.sendImpressionData(),this.attachListener(),this.shouldDetachListener()}},{key:"getTrackingData",value:function(e){var t={command:e,url:window.document.URL,referrer:window.document.referrer,userAgent:window.navigator.userAgent,language:window.navigator.userLanguage||window.navigator.language,platform:window.navigator.platform};return this.session&&this.group&&(t.session=this.session,t.sessionExpiry=this.sessionExpiry),this.anonymousId&&(t.anonymousId=this.anonymousId),this.testId&&(t.testId=this.testId),t}},{key:"sendImpressionData",value:function(){if(!this.hasSentImpression){this.hasSentImpression=!0;var e=this.getTrackingData("impression-received");this.sendMessage(e)}}},{key:"sendVisibilityData",value:function(){if(!this.hasSentViewTracking){this.hasSentViewTracking=!0;var e=this.getTrackingData("trustbox-in-viewport");this.sendMessage(e)}}},{key:"attachListener",value:function(){var t,i,n,o=arguments,e=this,s=(t=function(){e.templateId!==u.EMPTY_WIDGET_ID&&!e.shouldDetachListener()||(window.removeEventListener("scroll",a,r),window.removeEventListener("resize",l,r))},i=100,n=void 0,function(){var e=o;clearTimeout(n),n=setTimeout(function(){n=null,t(e)},i)}),r={passive:!0,capture:!1},a=window.addEventListener("scroll",s,r),l=window.addEventListener("resize",s,r);s()}},{key:"shouldDetachListener",value:function(){return!!this.hasSentViewTracking||(this.hasBeenVisible?(this.hasSentImpression&&this.sendVisibilityData(),!0):!!this.isTrustBoxVisible()&&(this.hasSentImpression?(this.sendVisibilityData(),!0):this.hasBeenVisible=!0))}}]),d);function d(e,t,i){var n=i.session,o=i.sessionExpiry,s=i.group,r=i.anonymousId,a=i.testId,l=i.templateId;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),this.hasSentImpression=!1,this.hasSentViewTracking=!1,this.sendMessage=e,this.isTrustBoxVisible=t,this.session=n,this.group=s,this.sessionExpiry=o,this.anonymousId=r,this.testId=a,this.templateId=l}i.default=s},{"../constants":1}],7:[function(e,t,i){"use strict";function n(t){try{return JSON.parse(t.responseText)}catch(e){return t.responseText}}t.exports={xhrGet:function(e){var t=new window.XMLHttpRequest;t.open("GET",e.url,!0),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.onreadystatechange=function(){4===t.readyState&&(200<=t.status&&t.status<300?e.success(n(t)):e.error&&e.error(n(t)))},t.send()}}},{}],8:[function(t,e,i){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(i){try{e=t("./lib/widget-management.js").default,window.Trustpilot=window.Trustpilot||{loadFromElement:function(e,t){if(e)return this.Modules.WidgetManagement&&this.Modules.WidgetManagement.applyWidgetFromDomElement(e,t);console.error('No element supplied to "Trustpilot.loadFromElement"')}},window.Trustpilot.Modules=window.Trustpilot.Modules||{},window.Trustpilot.Modules.WidgetManagement?window.Trustpilot.Modules.WidgetManagement.version!==i&&console.log("Detected legacy TrustBox bootstrap with version:",window.Trustpilot.Modules.WidgetManagement.version,", current:",i):(window.Trustpilot.Modules.WidgetManagement=new e(window,document,i),window.Trustpilot.Modules.WidgetManagement.initializeOnPageLoad(),window.addEventListener("load",function(){try{for(var e=document.getElementsByClassName("trustpilot-widget"),t=0;t<e.length;++t){var i=e[t],n=i.firstChild&&i.firstChild.tagName;n&&"IFRAME"!==n&&window.Trustpilot.loadFromElement(i)}}catch(e){console.error("Error loading trustboxes "+e)}})),window.addEventListener("click",function(){window.Trustpilot.Modules.WidgetManagement.closePopups()})}catch(t){!function(){function e(e){console.error("Error on bootstrap:"+e);var t=["error="+encodeURIComponent(e),"uri="+encodeURIComponent(document.URL),"bootstrapVersion="+i].join("&");document.createElement("img").src="https://widget.trustpilot.com/feedback/report-error?"+t}try{"object"===(void 0===t?"undefined":n(t))?e(t.message):e(t)}catch(e){console.error("Error on error reporting method:"+e)}}()}var e}("1.409.0")},{"./lib/widget-management.js":3}]},{},[8]);
//# sourceMappingURL=tp.widget.bootstrap.min.js.map
