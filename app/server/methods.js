Meteor.methods({
  newCall: function (params) {
    if (params.secret==="r4nx4NXCZsMEIPV8FJplpnIMKg28qP0HNpY2tXOl0nXzmvVLohr2HDYpyrT1w4Y") {
      if (params.number && params.number !== "") {
        check(params.number, String);
      } else {params.number=false}

      if (params.age !== null && params.age !== undefined && params.age !== "") {
        check(params.age, String);
        if (parseInt(params.age,10) > 140) {
          throw new Meteor.Error(400, "Enter real age");
        }
      } else {params.age=false}

      if (params.sex !== null && params.sex !== undefined) {
        check(params.sex, Match.Integer);
        if (params.sex !== 1 && params.sex !== 0) {
          throw new Meteor.Error(400, "ERROR!");
        }
      } else {throw new Meteor.Error(400, "ERROR!");}

      if (params.weight !== null && params.weight !== undefined && params.weight !== "") {
        check(params.weight, String);
        if (parseInt(params.weight,10) > 900) {
          throw new Meteor.Error(400, "Enter real weight");
        }
      } else {params.weight=false}

      if (params.locShare !== null && params.locShare !== undefined) {
        check(params.locShare, Boolean);
        if (params.locShare) {
          check(params.loc,{lon:Number,lat:Number})
        } else {if (params.loc !== false) {throw new Meteor.Error(400, "Could Not Access Location");} }
      } else {throw new Meteor.Error(400, "ERROR!");}

      params.user=this.userId;

      if (params.name && params.name.length > 0) {
        check(params.name, String);
      } else {throw new Meteor.Error(400, "ERROR!");}

      params.date = new Date;
      params.timestamp = params.date.getTime();
      params.status = "pending";
      params.comments = [];
      params.urgency = 0;
      params.operator = false;

      Calls.insert(_.pick(params, 'timestamp','user','date','locShare','loc','name','number','age','sex','weight','status','urgency','comments','operator'));

    } else {throw new Meteor.Error(401, "ERROR!");}
  },
  newComment: function (message,id) {
    if (!Calls.find(id)) {throw new Meteor.Error(404,"Call doesn't exist")}
    if (Calls.find(id).status === "pending") {throw new Meteor.Error(403,"ERROR!")}
    if (!this.userId === Calls.find(id).operator) {throw new Meteor.Error(401,"Access Denied!")};
    check(message,String);
    if (message.length > 0) {
      var params = {};
      params.message = message;
      params.date = new Date;
      params.timestamp = params.date.getTime();
      Calls.update(id,{$push:{comments:params}});
    }
    throw new Meteor.Error(400,"Message can't be empty!");
  },
  newUser: function (params,id) {
    check(params,{username:String,email:String,password:String,profile:{admin:Boolean,language:String}})
    if (params.username !== "" && params.email !== "" && params.password !== "" && params.profile.language === "de") {
      Accounts.createUser({
        username: params.username,
        email: params.email,
        password: params.password,
        profile: params.profile
      })
    }
  }
});