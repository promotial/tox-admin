if (Meteor.users.find().count() === 0) {
  Accounts.createUser({email:"admin@tox.com",password:"admin",username:"Admin",profile:{admin:true,language:"de"} });
}

/*if (Calls.find().count() === 0) {
  var randNum = function(a,b,decimal) {
    if (decimal) {return (Math.random() * (b-a+1)) + a};
    return (Math.floor(Math.random() * (b-a+1)) + a);
  };

  var now = new Date();
  var names = ["John Doe", "Mary Soap", "Joe Bloggs", "John Smith", "Billy Bob", "Johnny Davis", "Tim Cunning" ];
  var sex = ["male","female"];

  var newDate = function () {
    now.setFullYear(randNum(2011,2013), randNum(0,8), randNum(1,31));
    now.setMinutes( randNum(1,59) );
    now.setHours( randNum(1,23) );
  };

  for (var i=0; i <= 12; i++) {
    newDate();
    Calls.insert({
      timestamp: now.getTime(),
      user: false,
      date: now,
      locShare: true,
      loc: {lat: randNum(47,48,true), lon: randNum(8,9,true)},
      name: names[randNum(0,names.length-1)],
      number: false,
      age: false,
      sex: randNum(0,1),
      weight: false,
      status: "pending",
      urgency: 0,
      comments: [],
      operator: false
    });
  }
}*/

if (Tags.find().count() === 0) {
  var values = ["Minor","Delayed","Immediate","Morgue"];
  for (var i= 0; i <= 4; i++) {
    Tags.insert({number:i,value:values[i]});
  }
}
