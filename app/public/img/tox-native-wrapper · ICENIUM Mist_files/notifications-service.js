define(function(c){var a=c("kendo");var b=a.Observable.extend({notificationTypes:{WARNING:"warning",CHROME_WEBSTORE:"chrome-webstore"},init:function(){var d=this;a.Observable.fn.init.apply(d,arguments);d.notificationsDS=new a.data.DataSource({data:[]})},addNotification:function(d){var e=this;d.read=false;e.notificationsDS.insert(0,d)},removeNotification:function(d){var e=this;e.notificationsDS.remove(d)},getNotificationsDataSource:function(){var d=this;return d.notificationsDS},notificationsCount:function(){var d=this;return d.notificationsDS.data().length}});return new b()});