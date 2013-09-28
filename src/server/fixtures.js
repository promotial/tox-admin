if (Calls.find().count() === 0) {
  var randNum = function(a,b,decimal) {
    if (decimal) {return (Math.random() * (b-a+1)) + a}; 
    return (Math.floor(Math.random() * (b-a+1)) + a);
  };

  var now = new Date();
  var name = ["John Doe", "Mary Soap", "Joe Bloggs", "John Smith", "Billy Bob", "Johnny Davis", "Tim Cunning" ];
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
      ago: {hrs:randNum(1,7), min:randNum(1,59)},
      date: now,
      loc: {lat: randNum(47,48,true), lon: randNum(8,9,true)},
      name: name[randNum(0,name.length-1)],
      number: randNum(1000000009,9999999999),
      age: randNum(4,94),
      sex: sex[randNum(0,1)],
      weight: randNum(15,98),
      status: "pending",
      urgency: randNum(0,4),
      operator: false,
    });
  };

  Accounts.createUser({email:"test@example.com",password:"test",username:"Danny Smith"});
  Accounts.createUser({email:"test1@example.com",password:"test",username:"Robert Lark"});
  Accounts.createUser({email:"test2@example.com",password:"test",username:"Alex Doe"});
  Accounts.createUser({email:"test3@example.com",password:"test",username:"Tim Wright"});
  Accounts.createUser({email:"test4@example.com",password:"test",username:"Daniel Bodle"});
};