var B = backlash;

var firstName = B("Riten");
var lastName = B("Vagadiya");
var fullName = firstName.concat(lastName);
console.log(fullName); //Riten Vagadiya
firstName("Rahul");
console.log(fullName); //Rahul Vagadiya
var age = B(27);
var description = B("The fact is that {{firstName}} is {{age}} years old, and is born in the {{lastName}} family.");
console.log(description); //The fact is that Rahul is 27 years old, and is born in the Vagadiya family.
age(28);
console.log(description); //The fact is that Rahul is 28 years old, and is born in the Vagadiya family.
firstName.$watch(function(val) {
	console.log(description);
});
age.$watch(firstName.$watch);
firstName("Tamku"); //The fact is that Tamku is 28 years old, and is born in the Vagadiya family.
age("0"); //The fact is that Tamku is 0 years old, and is born in the Vagadiya family.