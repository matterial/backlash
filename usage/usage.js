var B = backlash;
var v = backlash.variable;

v.firstName = B("Riten");
v.lastName = B("Vagadiya");
v.fullName = v.firstName.concat(v.lastName);
console.log(v.fullName); //Riten Vagadiya
v.firstName("Rahul");
console.log(v.fullName); //Rahul Vagadiya
var v.age = B(27);
var v.description = B("The fact is that {{firstName}} is {{age}} years old, and is born in the {{lastName}} family.");
console.log(v.description); //The fact is that Rahul is 27 years old, and is born in the Vagadiya family.
v.age(28);
console.log(v.description); //The fact is that Rahul is 28 years old, and is born in the Vagadiya family.
v.firstName.$watch(function(val) {
	console.log(v.description);
});
v.age.$watch(v.firstName.$watch);
v.firstName("Tamku"); //The fact is that Tamku is 28 years old, and is born in the Vagadiya family.
v.age("0"); //The fact is that Tamku is 0 years old, and is born in the Vagadiya family.