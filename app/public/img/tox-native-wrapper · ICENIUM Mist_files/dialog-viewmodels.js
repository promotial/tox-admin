define(function(h){var f=h("kendo"),j=h("modules/core/base-classes").ViewModelBase;var d=window,a={MESSAGE_STORE_CREDENTIALS:"Remember my credentials for current browser session?"};var e=j.extend({_deferred:null,init:function(){var k=this;j.fn.init.apply(k,arguments);k._deferred=$.Deferred()},dialog:function(k){return Property.call.apply(this,["dialog",k])},closeDialog:function(){var k=this;if(k.dialog()){k.dialog().close();k.dialog(null)}},onClose:function(){var k=this;if(k._deferred.state()==="pending"){k._deferred.reject()}},getPromise:function(){return this._deferred.promise()}});var g=e.extend({init:function(m,k,l){var n=this;e.fn.init.apply(n,arguments);if(m!==undefined){n.set("message",m)}if(k!==undefined){n.acceptClickHandler=k}if(l!==undefined&&!l){n.set("acceptVisible",false)}},onAcceptClicked:function(){var k=this;k._buttonClickHandler("acceptClickHandler");k._deferred.resolve()},message:"",acceptText:d.OK_TEXT,rejectText:"",cancelText:"",acceptVisible:true,rejectVisible:false,cancelVisible:false,onCancelClicked:null,onRejectClicked:null,canPerformAction:true,acceptEnabled:function(){var k=this;return k.canAccept()&&k.get("canPerformAction")},canAccept:function(){return true},_buttonClickHandler:function(l){var m=this;m.set("canPerformAction",false);var k=m[l];if(k){k.apply(m)}m.getPromise().always(function(){m.closeDialog()})}});var b=g.extend({acceptText:d.YES_TEXT,rejectText:d.NO_TEXT,cancelText:d.CANCEL_TEXT,init:function(k){var o=this;if(k===undefined){k={}}g.fn.init.apply(o,[k.message,k.accept]);if(k.cancel!==undefined){o.cancelClickHandler=k.cancel}if(k.reject!==undefined){o.rejectClickHandler=k.reject}if(k.canAccept!==undefined){o.canAccept=k.canAccept}var m=["acceptText","rejectText","cancelText","rejectVisible","cancelVisible"];for(var l=0;l<m.length;l++){var n=m[l];if(k[n]!==undefined){o.set(n,k[n])}}},rejectVisible:true,onRejectClicked:function(){var k=this;k._buttonClickHandler("rejectClickHandler");k._deferred.reject("reject")},onCancelClicked:function(){var k=this;k._buttonClickHandler("cancelClickHandler");k._deferred.reject("cancel")},validator:function(k){return Property.call.apply(this,["validator",k])}});var c=b.extend({init:function(k){var l=this;if(k===undefined||k.fileList===undefined){throw new Error("Invalid dialog configuration")}l.data=k.fileList;b.fn.init.apply(l,arguments);l.bind("bind",$.proxy(l.onBind,l))},onBind:function(){var m=this,k=$("#fileListGrid"),l=[{field:"FilePath",title:"Name",template:"<span class='document-type-icon ico-#=IconType#'></span>#=FilePath#"}];if(m.data.length>0&&m.data[0].ChangeType!==undefined){l.push({field:"ChangeType",title:"Status",template:"<div title='#=ChangeType#'  class='ico-version-control change-type-#=ChangeType#' />",width:"50px"})}m.grid=k.kendoGrid({dataSource:new f.data.DataSource({data:m.data}),columns:l,scrollable:true}).data("kendoGrid")}});var i=g.extend({message:"",username:"",password:"",usernamePlaceHolderText:"Enter Username",passWordPlaceHolderText:"Enter Password",optionText:a.MESSAGE_STORE_CREDENTIALS,optionValue:false,optionVisible:false,acceptText:d.OK_TEXT,cancelText:d.CANCEL_TEXT,init:function(l){var s=this,m,r,n=["cancel"],q=["acceptText","cancelText","cancelVisible","optionText","optionValue","optionVisible"];if(l===undefined){l={}}g.fn.init.apply(s,[l.message,l.accept]);for(var o=0;o<n.length;o++){m=n[o];if(l[m]!==undefined){s[m+"ClickHandler"]=l[m]}}for(var p=0;p<q.length;p++){r=q[p];if(l[r]!==undefined){s.set(r,l[r])}}if(l.message){s.message=l.message}},onAcceptClicked:function(){var k=this;k._deferred.resolveWith(k,[k.get("username"),k.get("password"),k.get("optionValue")]);k._buttonClickHandler("okClickHandler")},onCancelClicked:function(){var k=this;k._deferred.reject();k._buttonClickHandler("cancelClickHandler")},clearUserName:function(){this.set("username","")},clearPassword:function(){this.set("password","")},validator:function(k){return Property.call.apply(this,["validator",k])},onAccept:function(){}.attribute("track",{featureCategory:"Options",featureName:"UserCredentialsDialog"}),onCancel:function(){}.attribute("track",{featureCategory:"Options",featureName:"UserCredentialsDialog"}),canAccept:function(){var k=this;return k.get("username")!==""&&k.get("password")}});return{DialogViewModelBase:e,MessageBoxViewModel:g,ConfirmationDialogViewModel:b,ConfirmationFileListDialogViewModel:c,UserCredentialsDialogViewModel:i}});