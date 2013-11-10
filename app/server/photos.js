setInterval(function(){
  var photos = Photos.find({}).fetch();

  for (var i = 0; i < photos.length; i += 1) {
    if (!(Calls.findOne({photos:photos[i]._id}))) {
      Photos.remove(photos[i]._id);
    }
  }
},300000);