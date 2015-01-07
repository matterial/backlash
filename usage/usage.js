var Backlash = require("../index")();
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
console.log(Backlash.variables.length() + " variables in memory. Now trashing firstName...");
firstName.trash();
console.log(Backlash.variables.length() + " variables in memory.");
console.log(description());

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

/**
 * Setting watch event
 */
var customFunction = function(update) {
	var $this = this; //`this` will refer to the changed B object
	console.log(update.older, update.current);
};
firstName.$watch(customFunction);
age.$watch(customFunction);
firstName("Tamku"); //The fact is that Tamku is 28 years old, and is born in the Vagadiya family.
age("0"); //The fact is that Tamku is 0 years old, and is born in the Vagadiya family.
