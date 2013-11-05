(function(a,k){var j=kendo.ui,l=j.Widget,i=a.proxy,b=a.extend,g=Math.max,f=/image.*/,e=l.extend({init:function(m,q){var r=this,n;l.fn.init.call(r,m,q);m=r.element;n=q.filter;r.store=r.options.store||new kendo.data.DataSource();r.store.bind("change",function(s){if((s.action=="add"&&r.index==s.index-1)||(s.action=="insert"&&r.index>=s.index)){r.index++}else{if(s.action=="remove"&&r.index>=s.index){r.index=(r.index-1)||0}}});r.index=-1;if(designer&&designer.icons){for(var o=0,p=designer.icons.length;o<p;o++){r.add(null,{name:designer.icons[o],type:"font"})}}if(n){m.on("dragenter",n,kendo.preventDefault).on("dragleave",n,kendo.preventDefault).on("dragover",n,kendo.preventDefault).on("drop",n,a.proxy(r._onDrop,r))}else{m.on("dragenter",kendo.preventDefault).on("dragleave",kendo.preventDefault).on("dragover",kendo.preventDefault).on("drop",a.proxy(r._onDrop,r))}},options:{name:"ImageManager",store:null},events:["update"],add:function(n,r){var s=this,o,p,m=s.store.data(),q=r.name.substr(0,g(0,r.name.indexOf("."))||k);m.find(function(t){if(t.name==r.name){return o=true}});if(o){return false}p={name:r.name,basename:q,className:"km-"+q,type:r.type};if(n){b(p,{size:r.fileSize,src:n,url:"url("+n+")",usage:"background-image"})}else{b(p,{usage:"font",readOnly:true})}s.store.add(p);s.trigger("update",{image:p,store:s.store});return p},removeByUid:function(m){this.store.remove(this.store.getByUid(m))},get:function(m){var o=this,n;if(!isNaN(m)){return o.store.at(m)}else{o.store.filter({field:"name",operator:"startswith",value:m});n=o.store.view()[0];return o.store.filter({})==k&&n}},getPrev:function(){var m=this;m.index-=m.index-1>=0?1:0;return m.store.at(m.index)},getNext:function(){var m=this;m.index+=m.index+1<=m.store.data().length-1?1:0;return m.store.at(m.index)},_onDrop:function(m){m=m.originalEvent;var s=this,r=0,o=m.dataTransfer.files;kendo.preventDefault(m);for(var p=0,n;(n=o[p]);p++){r+=n.fileSize;if(!n.type.match(f)){continue}var q=new FileReader();q.onerror=function(){};q.onload=(function(t){return function(u){s.add(u.target.result,t)}})(n);q.readAsDataURL(n)}}}),c=j.ComboBox.extend({init:function(m,q){var r=this,o,s,n=q.extensions,p=n?n.length:0;j.ComboBox.fn.init.call(r,m,q);q=r.options;r.ns=".kendo"+q.name;r.wrapper=r.element.closest(".kd-icon");r.wrapper.addClass("k-dropdown-wrap k-state-default").on("mouseenter"+r.ns+" mouseleave"+r.ns,r._toggleHover).on("focusin"+r.ns+" focusout"+r.ns,r._toggleFocus).attr("tabindex",-1);for(o=0;o<p;o++){s=designer.types[n[o]];r.extensions.push(a("<span class='kd-extension'></span>").appendTo(r.wrapper)["kendo"+s.editor](b({extension:true},s.values?s.values():{},s)).data("kendo"+s.editor))}r.popup.options.anchor=r.wrapper;r.popup.element.css("width","500px");r.bind("open",function(){r.popup.element.find(":has(.kd-item-group)").addClass("kd-group-start")});r.bind(r.events,q)},options:{name:"IconEditor"},events:["change"],extensions:[],_toggleFocus:function(m){a(m.currentTarget).closest(".kd-property").toggleClass("k-state-active k-state-focused",m.type==="focusin")},_onChange:function(m){}}),d=l.extend({init:function(m,n){var o=this;l.fn.init.call(o,m,n);n=o.options;o.ns=".kendo"+n.name;if(!n.extension){o.wrapper=o.element.parent();o.wrapper.addClass("k-dropdown-wrap k-state-default").on("mouseenter"+o.ns+" mouseleave"+o.ns,o._toggleHover).on("focusin"+o.ns+" focusout"+o.ns,o._toggleFocus).attr("tabindex",-1)}else{o.wrapper=o.element}o._wrap();o.icon.on("click",function(){if(o.window.element.is(":visible")){o.window.close()}else{o.window.center().open()}});o.bind(o.events,n)},options:{name:"ImageEditor"},events:["change"],destroy:function(){var m=this;m.wrapper.off();m.element.off();m.window.destroy();m.imageList.destroy();if(m.editor&&m.editor.popup){m.editor.popup.destroy()}},_toggleHover:function(m){a(m.currentTarget).closest(".kd-property").toggleClass("k-state-hover",m.type==="mouseenter")},_toggleFocus:function(m){a(m.currentTarget).closest(".kd-property").toggleClass("k-state-active k-state-focused",m.type==="focusin")},_onChange:function(m){},_wrap:function(){var m=this;m.icon=a("<a class='k-icon k-i-pencil'></a>").appendTo(m.wrapper);m.window=a("<div class='k-image-window'></div>").appendTo(document.body).kendoWindow({modal:true,visible:false,width:600,height:300,title:"Choose image",actions:["Close"]}).data("kendoWindow");if(window.designer.imageManager){m.manager=window.designer.imageManager}else{m.manager=m.window.element.kendoImageManager({store:designer.store}).data("kendoImageManager")}m.imageList=a("<div class='k-image-list'></div>").appendTo(m.window.element).kendoListView({selectable:true,template:"<div class='k-image-list-item k-widget k-header k-style-#=data.usage#'># if (data.url) { #<style scoped>.#=data.className# { #=data.usage#: #=data.url# }</style>#}#<div class='k-image-view km-icon #=data.className# k-usage-#=data.usage#' ></div># if (!data.readOnly) { #<a class='k-icon k-delete'></a>#}#<span class='k-image-name'>#=data.basename#<span>used as <strong>#=data.usage#</strong></span></span><div class='sep'><div class='dark'></div><div class='light'></div></div></div>",dataSource:m.manager.store}).data("kendoListView");m.imageList.element.on("click",".k-delete",function(n){m.imageList.remove(a(n.currentTarget).parent());return false});m.imageList.element.on("click",".k-image-list-item",function(n){var o=m.manager.store.getByUid(a(n.currentTarget).attr("data-uid"));if(o.usage=="background-image"){o.set("usage","-webkit-mask-image")}else{if(o.usage=="-webkit-mask-image"){o.set("usage","background-image")}else{n.preventDefault()}}})}}),h=l.extend({init:function(m,n){var o=this;n=b({},n.kind?designer.types[n.kind]:{},n);l.fn.init.call(o,m,n);n=o.options;o.options.property=o.options.attr||"data-"+o.element.data("kendo-prop").replace(/(\w)(?=[A-Z])/g,"$1-").toLowerCase();o.type=n.type||o.element.attr("type");o._onChangeProxy=i(o._onChange,o);o.bool=(o.type=="checkbox"||o.type=="radio");o._wrap();o.bind(o.events,n)},options:{name:"PropertyEditor",kind:null,value:null,editor:null},events:["change"],destroy:function(){if(this.editor&&this.editor.popup){this.editor.popup.destroy()}},_wrap:function(){var q=this,s,p=b({},q.options),r=p.value,n=p.editor,m=p.classes,o=kendo.guid();delete p.name;q.element.attr("id",o);q.wrapper=q.element.wrap("<div class='k-widget kd-property k-popup kd-"+q.options.kind+"'></div>").parent();if(q.bool){q.element.addClass("k-"+q.type);q.wrapper.addClass("kd-borderless").append("<label for="+o+" class='k-"+q.type+"'></label>");if(r||p.defaultValue){q.element.prop("checked","checked")}}else{if(r!==k){q.element.prop("value",r)}q.wrapper.addClass(n&&!m?"kd-borderless":"k-textbox");if(n){s=p.values?p.values(q.element.attr("data-kendo-id")):[];q.editor=q.element["kendo"+n](b(true,a.isArray(s)?{dataSource:s}:s,{popup:{appendTo:document.body}},p)).data("kendo"+n);if(q.editor&&q.editor.popup){q.editor.popup.element.addClass("kd-property-list kd-"+q.options.kind)}}}if(m){q.wrapper.addClass(m)}q.element.prop("type",q.type)}});j.plugin(c);j.plugin(d);j.plugin(e);j.plugin(h)})(jQuery);