define(function(e){var c=e("kendo"),f=e("./rest-proxy"),g=f.init(window.location.host,serviceConfiguration.backendServiceScheme);var b=window,a={PAGE_NAME_DASHBOARD:"Dashboard",PAGE_NAME_WORKSPACE:"Workspace"};var d=c.Class.extend({init:function(){},prepareBaseUrl:function(i){var h=decodeURI(i);if(h.substr(h.length-1)!=="/"){h+="/"}return h},logOut:function(){try{document.location.href=window.iceRootAlias+"Logout"}catch(h){}},navigateToSolution:function(i){var j=this,h=j.clearWorkspaceName(iceConfiguration.baseUrl);h=this.prepareBaseUrl(h).replace(a.PAGE_NAME_DASHBOARD,a.PAGE_NAME_WORKSPACE);window.location.href=h+i},navigateToDashboard:function(h){var i=window.iceRootAlias;i=(h)?i:[i,(a.PAGE_NAME_DASHBOARD+"?SolutionName="),encodeURIComponent(iceConfiguration.solutionName)].join("");window.location.href=i},clearWorkspaceName:function(i){var j,h=decodeURI(i);if(h.indexOf(a.PAGE_NAME_WORKSPACE)<0){return h}j=h.indexOf(a.PAGE_NAME_WORKSPACE)+a.PAGE_NAME_WORKSPACE.length;h=h.substr(0,j);return h},getMockPageByProjectTemplate:function(i,j,h){return this.getMobileFileAddress(i,"/"+j+".html",h)},getMobileSimulatorAddress:function(j,h,i){return this.getMobileFileAddress(j,"/index.html",h,i)},getMobileFileAddress:function(k,i,h,j){if(!h){h=b.DEVICE_ID_IPHONE4}if(!j){j="2.0.0"}return this.getMobileProjectPath(k,h,j)+i},getMobilePackageShortAddress:function(j,h){var i=this,k=i.getMobilePackageAddress(j,h);return g.cordovaService.getLiveSyncUrl({longUrl:k})},getMobilePackageITMSShortLinks:function(k,h){var j=this,l=j.getMobilePackageAddressByType("manifest",k,h),i=new $.Deferred();g.cordovaService.getLiveSyncUrl({longUrl:l}).done(function(m){i.resolve("itms-services://?action=download-manifest&amp;url="+encodeURIComponent(m))}).fail(function(m){i.reject(m)});return i.promise()},getMobilePackageAddress:function(i,h){return this.getMobilePackageAddressByType("package",i,h)},getMobilePackageAddressByType:function(j,i,h){return serviceConfiguration.backendServiceScheme+"://"+window.location.host+"/Mist/MobilePackage/"+j+"?packagePath="+encodeURIComponent(encodeURIComponent(h))+"&token="+encodeURIComponent(encodeURIComponent(i))},getIonAppPackageAddress:function(h){var i=encodeURIComponent(serviceConfiguration.backendServiceScheme+"://"+window.location.host);return"icenium://"+i+"?LiveSyncToken="+encodeURIComponent(h)},getMobileProjectPath:function(j,h,i){return this.prepareBaseUrl(iceConfiguration.baseUrl)+"MobileSimulator/"+h+"/"+i+"/"+encodeURIComponent(j)},getCertificateRequestAddress:function(j,i,h){return window.iceRootAlias+"MobilePackage?Name="+encodeURIComponent(j)+"&Email="+encodeURIComponent(i)+"&Country="+encodeURIComponent(h)+"&Action=GenerateCertificateRequest"},openWebWindow:function(h){window.open(h,"iceWebView","toolbar=1, scrollbars=1, location=1, status=1, menubar=1, resizable=1, width="+screen.width+", height="+screen.height)}});return new d()});