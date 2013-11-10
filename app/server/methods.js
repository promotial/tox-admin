Meteor.methods({
  newCall: function (params) {
    if (params.secret === "r4nx4NXCZsMEIPV8FJplpnIMKg28qP0HNpY2tXOl0nXzmvVLohr2HDYpyrT1w4Y") {
      if (params.number && params.number !== "") {
        check(params.number, String);
      } else { params.number = false; }

      if (params.age && params.age !== "") {
        check(params.age, String);
        if (parseInt(params.age,10) > 140) {
          throw new Meteor.Error(400, "Enter real age");
        }
      } else { params.age = false; }

      if (params.sex !== null && params.sex !== undefined) {
        check(params.sex, Match.Integer);
        if (params.sex !== 1 && params.sex !== 0) {
          throw new Meteor.Error(400, "ERROR!");
        }
      } else { throw new Meteor.Error(400, "ERROR!"); }

      if (params.photos !== null && params.photos !== undefined) {
        check(params.photos, [String]);
        if (params.photos.length > 3) {
          throw new Meteor.Error(400, "ERROR!");
        }
      } else { throw new Meteor.Error(400, "ERROR!"); }

      if (params.weight && params.weight !== "") {
        check(params.weight, String);
        if (parseInt(params.weight, 10) > 900) {
          throw new Meteor.Error(400, "Enter real weight");
        }
      } else { params.weight = false; }

      if (params.locShare !== null && params.locShare !== undefined) {
        check(params.locShare, Boolean);
        if (params.locShare) {
          check(params.loc, { lon: Number, lat: Number});
        } else {if (params.loc !== false) {throw new Meteor.Error(400, "Could Not Access Location");} }
      } else { throw new Meteor.Error(400, "ERROR!"); }

      if (!params.user) {
        throw new Meteor.Error(401, "Access Denied!");
      }

      if (params.name && params.name.length > 0) {
        check(params.name, String);
      } else { throw new Meteor.Error(400, "ERROR!"); }

      params.date = new Date();
      params.timestamp = params.date.getTime();
      params.status = "pending";
      params.comments = [];
      params.urgency = 0;
      params.operator = false;

      Calls.insert(_.pick(params, 'photos', 'timestamp', 'user', 'date', 'locShare', 'loc', 'name', 'number', 'age', 'sex', 'weight', 'status', 'urgency', 'comments','operator'));

    } else { throw new Meteor.Error(401, "ERROR!"); }
  },
  newComment: function (message,id) {
    if (!Calls.findOne(id)) {throw new Meteor.Error(404,"Call doesn't exist");}
    if (Calls.findOne(id).status === "pending") {throw new Meteor.Error(403,"ERROR!");}
    if (this.userId !== Calls.findOne(id).operator) {throw new Meteor.Error(401,"Access Denied!");}
    check(message,String);
    if (message.length > 0) {
      var params = {};
      params.message = message;
      params.date = new Date();
      params.timestamp = params.date.getTime();
      Calls.update(id,{$push:{comments:params}});
    }
    throw new Meteor.Error(400,"Message can't be empty!");
  },
  uploadPhotos: function (photos) {
    check(photos,[String]);
    if (photos.length < 4) {
      var photoId = [];
      for (var i = 0; i < photos.length; i += 1) {
        photoId[i] = Photos.insert({src:photos[i]});
      }
      if (photoId.length === photos.length) {
        return photoId;
      } else {
        throw new Meteor.Error(500,"Error uploading images.");
      }
    } else {
      throw new Meteor.Error(403,"Exceeded image limit!");
    }
  },
  newUser: function (params) {
    check(params,{username:String,email:String,password:String,profile:{admin:Boolean,language:String}});
    if (params.username !== "" && params.email !== "" && params.password !== "" && params.profile.language === "de") {
      Accounts.createUser({
        username: params.username,
        email: params.email,
        password: params.password,
        profile: params.profile
      });
    }
  },
  'removedUser': function(id) {
    check(id,String);
    Calls.update({operator:id,status:"active"},{$set:{operator:false,status:"pending"}},{multi:true});
  }
});

