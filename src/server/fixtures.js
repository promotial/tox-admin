if (Calls.find().count() === 0) {
  var now = new Date().getTime();

  Calls.insert({
    name: "John Doe",
    submitted: now - 1 * 3600 * 1000,
    status: "pending",
    urgency: 0,
  });

  Calls.insert({
    name:"Mary Soap",
    submitted: now - 3 * 3600 * 1000,
    status:"pending",
    urgency: 0,
  });

  Calls.insert({
    name:"Joe Bloggs",
    submitted: now - 2 * 3600 * 1000,
    status:"active",
    urgency: 1,
  });

  Calls.insert({
    name:"John Smith",
    submitted: now - 5 * 3600 * 1000,
    status:"active",
    urgency: 3,
  });

  Calls.insert({
    name:"Billy Bob",
    submitted: now - 7 * 3600 * 1000,
    status:"active",
    urgency: 3,
  });
};