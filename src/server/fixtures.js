if (Calls.find().count() === 0) {
  var now = new Date();

  var name = ["John Doe", "Mary Soap", "Joe Bloggs", "John Smith", "Billy Bob", "Johnny Davis", "Tim Cunning" ];
  var status = ["pending","active","closed"]; var sex = ["male","female"];

  var newDate = function () {
    now.setFullYear(2013, Math.floor((Math.random()*11)+0), Math.floor((Math.random()*28)+1));
    now.setMinutes( Math.floor((Math.random()*59)+1) );
    now.setHours( Math.floor((Math.random()*23)+1) );
  };
  
  for (var i=0; i <= 16; i++) {
    newDate();
    Calls.insert({
      name: name[Math.floor((Math.random()*name.length)+0)],
      number: Math.floor((Math.random()*9999999999)+1000000009),
      age: Math.floor((Math.random()*94)+4),
      sex: sex[Math.floor((Math.random()*1)+0)],
      weight: Math.floor((Math.random()*89)+15),
      status: status[Math.floor((Math.random()*3)+0)],
      timestamp: now.getTime(),
      date: now,
      urgency: Math.floor((Math.random()*4)+0),
      ago: {hrs:Math.floor((Math.random()*23)+1), min:Math.floor((Math.random()*59)+1)},
    });
  };
};