if (Calls.find().count() === 0) {
  var now = new Date().getTime();

  Calls.insert({
    name: "John Doe",
    number: "+61223344667",
    submitted: now - 1 * 3600 * 1000,
    status: "pending",
    urgency: 0,
  });

  Calls.insert({
    name:"Mary Soap",
    number: "0411223344",
    submitted: now - 3 * 3600 * 1000,
    status:"pending",
    urgency: 0,
  });

  Calls.insert({
    name:"Joe Bloggs",
    number: "0416323344",
    submitted: now - 2 * 3600 * 1000,
    status:"active",
    urgency: 1,
  });

  Calls.insert({
    name:"John Smith",
    number: "+8826255273",
    submitted: now - 5 * 3600 * 1000,
    status:"active",
    urgency: 3,
  });

  Calls.insert({
    name:"Billy Bob",
    number: "+9927725625",
    submitted: now - 7 * 3600 * 1000,
    status:"active",
    urgency: 3,
  });
};