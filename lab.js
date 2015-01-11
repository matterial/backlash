var Backlash = require("./backlash")();
var B = Backlash.creator;

/**
 * Initialze the variables
 */
var firstName 	= B("firstName"),
	lastName	= B("lastName"),
	fullName	= B("fullName"),
	age			= B("age"),
	description	= B("description");

/**
 * Set values
 */
firstName("Riten");
lastName("Vagadiya");
age(27);

/**
 * Create dependent values
 */
var fullName = B("fullName", "{{firstName}} {{lastName}}");
console.log(fullName()); //Riten Vagadiya

/**
 * Modify values
 */
firstName("Rahul");
console.log(fullName()); //Rahul Vagadiya
description("The fact is that {{firstName}} is {{age}} years old, and is born in the {{lastName}} family.");
console.log(description()); //The fact is that Rahul is 27 years old, and is born in the Vagadiya family.
age(28);
console.log(description()); //The fact is that Rahul is 28 years old, and is born in the Vagadiya family.
console.log(Backlash.variables.length() + " variables in memory. Now trashing firstName..."); //6 variables in memory. Now trashing firstName...
firstName.trash();
console.log(Backlash.variables.length() + " variables in memory."); //5 variables in memory.
console.log(description()); //The fact is that {{firstName}} is 28 years old, and is born in the Vagadiya family.

/**
 * Using the variable again should throw an error, we will catch it
 */
try {
	firstName("Yuvraaj");
} catch(e) {
	console.log(e);
}

/**
 * Let's check if a variable is trashed already
 */
if (!firstName.trashed()) {
	firstName("Yuvraaj");
	console.log("Modified firstName");
} else {
	console.log("Cannot use firstName anymore");
}