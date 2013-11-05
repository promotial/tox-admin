/*
 * jQuery Migrate - v1.1.0 - 2013-01-31
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function(h,F,B){h.migrateMute=true;var E={};h.migrateWarnings=[];if(!h.migrateMute&&F.console&&console.log){console.log("JQMIGRATE: Logging is active")}if(h.migrateTrace===B){h.migrateTrace=true}h.migrateReset=function(){E={};h.migrateWarnings.length=0};function j(G){if(!E[G]){E[G]=true;h.migrateWarnings.push(G);if(F.console&&console.warn&&!h.migrateMute){console.warn("JQMIGRATE: "+G);if(h.migrateTrace&&console.trace){console.trace()}}}}function k(I,J,K,H){if(Object.defineProperty){try{Object.defineProperty(I,J,{configurable:true,enumerable:true,get:function(){j(H);return K},set:function(L){j(H);K=L}});return}catch(G){}}h._definePropertyBroken=true;I[J]=K}if(document.compatMode==="BackCompat"){j("jQuery is not compatible with Quirks Mode")}var b={},l=h.attr,C=h.attrHooks.value&&h.attrHooks.value.get||function(){return null},D=h.attrHooks.value&&h.attrHooks.value.set||function(){return B},x=/^(?:input|button)$/i,w=/^[238]$/,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,A=/^(?:checked|selected)$/i;k(h,"attrFn",b,"jQuery.attrFn is deprecated");h.attr=function(G,I,L,K){var H=I.toLowerCase(),J=G&&G.nodeType;if(K&&l.length<4){j("jQuery.fn.attr( props, pass ) is deprecated");if(G&&!w.test(J)&&h.isFunction(h.fn[I])){return h(G)[I](L)}}if(I==="type"&&L!==B&&x.test(G.nodeName)&&G.parentNode){j("Can't change the 'type' of an input or button in IE 6/7/8")}if(!h.attrHooks[H]&&u.test(H)){h.attrHooks[H]={get:function(N,O){var M,P=h.prop(N,O);return P===true||typeof P!=="boolean"&&(M=N.getAttributeNode(O))&&M.nodeValue!==false?O.toLowerCase():B},set:function(M,P,N){var O;if(P===false){h.removeAttr(M,N)}else{O=h.propFix[N]||N;if(O in M){M[O]=true}M.setAttribute(N,N.toLowerCase())}return N}};if(A.test(H)){j("jQuery.fn.attr('"+H+"') may use property instead of attribute")}}return l.call(h,G,I,L)};h.attrHooks.value={get:function(G,H){var I=(G.nodeName||"").toLowerCase();if(I==="button"){return C.apply(this,arguments)}if(I!=="input"&&I!=="option"){j("jQuery.fn.attr('value') no longer gets properties")}return H in G?G.value:null},set:function(G,I){var H=(G.nodeName||"").toLowerCase();if(H==="button"){return D.apply(this,arguments)}if(H!=="input"&&H!=="option"){j("jQuery.fn.attr('value', val) no longer sets properties")}G.value=I}};var i,c,o=h.fn.init,q=h.parseJSON,y=/^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;h.fn.init=function(J,G,I){var H;if(J&&typeof J==="string"&&!h.isPlainObject(G)&&(H=y.exec(J))&&H[1]){if(J.charAt(0)!=="<"){j("$(html) HTML strings must start with '<' character")}if(G&&G.context){G=G.context}if(h.parseHTML){return o.call(this,h.parseHTML(h.trim(J),G,true),G,I)}}return o.apply(this,arguments)};h.fn.init.prototype=h.fn;h.parseJSON=function(G){if(!G&&G!==null){j("jQuery.parseJSON requires a valid JSON string");return null}return q.apply(this,arguments)};h.uaMatch=function(H){H=H.toLowerCase();var G=/(chrome)[ \/]([\w.]+)/.exec(H)||/(webkit)[ \/]([\w.]+)/.exec(H)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(H)||/(msie) ([\w.]+)/.exec(H)||H.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(H)||[];return{browser:G[1]||"",version:G[2]||"0"}};i=h.uaMatch(navigator.userAgent);c={};if(i.browser){c[i.browser]=true;c.version=i.version}if(c.chrome){c.webkit=true}else{if(c.webkit){c.safari=true}}h.browser=c;k(h,"browser",c,"jQuery.browser is deprecated");h.sub=function(){function H(K,J){return new H.fn.init(K,J)}h.extend(true,H,this);H.superclass=this;H.fn=H.prototype=this();H.fn.constructor=H;H.sub=this.sub;H.fn.init=function G(K,J){if(J&&J instanceof h&&!(J instanceof H)){J=H(J)}return h.fn.init.call(this,K,J,I)};H.fn.init.prototype=H.fn;var I=H(document);j("jQuery.sub() is deprecated");return H};var n=h.fn.data;h.fn.data=function(I){var J,H,G=this[0];if(G&&I==="events"&&arguments.length===1){J=h.data(G,I);H=h._data(G,I);if((J===B||J===H)&&H!==B){j("Use of jQuery.fn.data('events') is deprecated");return H}}return n.apply(this,arguments)};var z=/\/(java|ecma)script/i,r=h.fn.andSelf||h.fn.addBack;h.fn.andSelf=function(){j("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");return r.apply(this,arguments)};if(!h.clean){h.clean=function(I,G,J,O){G=G||document;G=!G.nodeType&&G[0]||G;G=G.ownerDocument||G;j("jQuery.clean() is deprecated");var L,H,K,M,N=[];h.merge(N,h.buildFragment(I,G).childNodes);if(J){K=function(P){if(!P.type||z.test(P.type)){return O?O.push(P.parentNode?P.parentNode.removeChild(P):P):J.appendChild(P)}};for(L=0;(H=N[L])!=null;L++){if(!(h.nodeName(H,"script")&&K(H))){J.appendChild(H);if(typeof H.getElementsByTagName!=="undefined"){M=h.grep(h.merge([],H.getElementsByTagName("script")),K);N.splice.apply(N,[L+1,0].concat(M));L+=M.length}}}}return N}}var d=h.event.add,e=h.event.remove,f=h.event.trigger,s=h.fn.toggle,p=h.fn.live,m=h.fn.die,a="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",t=new RegExp("\\b(?:"+a+")\\b"),v=/(?:^|\s)hover(\.\S+|)\b/,g=function(G){if(typeof(G)!="string"||h.event.special.hover){return G}if(v.test(G)){j("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'")}return G&&G.replace(v,"mouseenter$1 mouseleave$1")};if(h.event.props&&h.event.props[0]!=="attrChange"){h.event.props.unshift("attrChange","attrName","relatedNode","srcElement")}if(h.event.dispatch){k(h.event,"handle",h.event.dispatch,"jQuery.event.handle is undocumented and deprecated")}h.event.add=function(H,K,I,G,J){if(H!==document&&t.test(K)){j("AJAX events should be attached to document: "+K)}d.call(this,H,g(K||""),I,G,J)};h.event.remove=function(G,K,H,J,I){e.call(this,G,g(K)||"",H,J,I)};h.fn.error=function(){var G=Array.prototype.slice.call(arguments,0);j("jQuery.fn.error() is deprecated");G.splice(0,0,"error");if(arguments.length){return this.bind.apply(this,G)}this.triggerHandler.apply(this,G);return this};h.fn.toggle=function(H,I){if(!h.isFunction(H)||!h.isFunction(I)){return s.apply(this,arguments)}j("jQuery.fn.toggle(handler, handler...) is deprecated");var G=arguments,J=H.guid||h.guid++,K=0,L=function(M){var N=(h._data(this,"lastToggle"+H.guid)||0)%K;h._data(this,"lastToggle"+H.guid,N+1);M.preventDefault();return G[N].apply(this,arguments)||false};L.guid=J;while(K<G.length){G[K++].guid=J}return this.click(L)};h.fn.live=function(I,G,H){j("jQuery.fn.live() is deprecated");if(p){return p.apply(this,arguments)}h(this.context).on(I,this.selector,G,H);return this};h.fn.die=function(H,G){j("jQuery.fn.die() is deprecated");if(m){return m.apply(this,arguments)}h(this.context).off(H,this.selector||"**",G);return this};h.event.trigger=function(I,G,H,J){if(!H&!t.test(I)){j("Global events are undocumented and deprecated")}return f.call(this,I,G,H||document,J)};h.each(a.split("|"),function(G,H){h.event.special[H]={setup:function(){var I=this;if(I!==document){h.event.add(document,H+"."+h.guid,function(){h.event.trigger(H,null,I,true)});h._data(this,H,h.guid++)}return false},teardown:function(){if(this!==document){h.event.remove(document,H+"."+h._data(this,H))}return false}}})})(jQuery,window);