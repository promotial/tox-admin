define(function(a){window.onerror=function(c,e,b){var d=c+" (URL: "+e+", LineNumber: "+b+")";a(["modules/logging/logging-service"],function(f){f.logOutputMessage("Error: "+d)});a(["modules/tracking/tracking-service"],function(f){f.logException(new Error(d),d)});console.log(d);return true}});