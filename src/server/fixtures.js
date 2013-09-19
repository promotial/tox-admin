if (Calls.find().count() === 0) {
  var now = new Date();

  var names = ["John Doe", "Mary Soap", "Joe Bloggs", "John Smith", "Billy Bob", "Johnny Davis", "Tim Cunning" ]
  
  var lists = ["pending","active","closed"]

  var newDate = function () {
    now.setMinutes( Math.floor((Math.random()*60)+1) );
    now.setHours( Math.floor((Math.random()*23)+1) );
    now.setDate( Math.floor((Math.random()*27)+1) );
    now.setMonth( Math.floor((Math.random()*12)+1) );
    now.setYear( Math.floor((Math.random()*2013)+2009) );
  };
  
  for (var i=0; i <= 20; i++) {
    newDate();
    Calls.insert({
      name: names[Math.floor((Math.random()*names.length)+0)],
      number: Math.floor((Math.random()*9999999999)+1000000009),
      timestamp: now.getTime(),
      date: now,
      status: lists[Math.floor((Math.random()*3)+0)],
      urgency: Math.floor((Math.random()*5)+0),
    });
  };
};