if (Calls.find().count() === 0) {
  var randNum = function(a,b,decimal) {
    if (decimal) {return (Math.random() * (b-a+1)) + a}; 
    return (Math.floor(Math.random() * (b-a+1)) + a);
  };

  var now = new Date();
  var name = ["John Doe", "Mary Soap", "Joe Bloggs", "John Smith", "Billy Bob", "Johnny Davis", "Tim Cunning" ];
  var status = ["pending","active","closed"]; var sex = ["male","female"];

  var newDate = function () {
    now.setFullYear(randNum(2011,2013), randNum(0,8), randNum(1,31));
    now.setMinutes( randNum(1,59) );
    now.setHours( randNum(1,23) );
  };
  
  for (var i=0; i <= 16; i++) {
    newDate();
    Calls.insert({
      name: name[randNum(0,name.length-1)],
      number: randNum(1000000009,9999999999),
      age: randNum(4,94),
      sex: randNum(0,1),
      weight: randNum(15,98),
      loc: {lat: randNum(47,48,true), lon: randNum(8,9,true)},
      status: status[randNum(0,2)],
      timestamp: now.getTime(),
      date: now,
      urgency: randNum(0,4),
      ago: {hrs:randNum(1,7), min:randNum(1,59)},
    });
  };
};