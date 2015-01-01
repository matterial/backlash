var Backlash = require('./index')();
var B = Backlash.creator;
var v = Backlash.variables;

v.firstName = B("Riten");
v.firstName2 = v.firstName;
console.log(v.firstName());
v.firstName("Rahul");
console.log(v.firstName());
