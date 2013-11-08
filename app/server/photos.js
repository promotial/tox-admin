var cleanPhotos = setInterval(function(){
  var photos = Photos.find({});
  photos.forEach(function(photo) {
    if (!(Calls.findOne({photos:photo._id}))) {
      Photos.remove(photo._id);
    }
  })
},300000);