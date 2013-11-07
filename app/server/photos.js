var cleanPhotos = setInterval(function(){
  Photos.find({}).forEach(function(photo) {
    if (!(Calls.find({photos:photo._id}))) {
      Photos.remove(photo._id);
    }
  })
},300000);