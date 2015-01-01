var B = backlash;

/**
 * Initialze the variables
 */
var firstName 	= B("firstName"),
	lastName	= B("lastName"),
	fullName	= B("fullName"),
	age			= B("age"),
	description	= B("description"),
	fullName	= "";

/**
 * Set values
 */
firstName("Riten");
lastName("Vagadiya");
age(27);

/**
 * Create dependent values
 */
fullName("{{firstName}} {{lastName}}");
console.log(fullName); //Riten Vagadiya

/**
 * Modify values
 */
firstName("Rahul");
console.log(fullName); //Rahul Vagadiya
description("The fact is that {{firstName}} is {{age}} years old, and is born in the {{lastName}} family.");
console.log(description); //The fact is that Rahul is 27 years old, and is born in the Vagadiya family.
age(28);
console.log(description); //The fact is that Rahul is 28 years old, and is born in the Vagadiya family.

/**
 * Setting watch event
 */
var customFunction = function(old, new) {
	var $this = this; //`this` will refer to the changed B object
	console.log(description);
};
firstName.$watch(customFunction);
age.$watch(customFunction);
firstName("Tamku"); //The fact is that Tamku is 28 years old, and is born in the Vagadiya family.
age("0"); //The fact is that Tamku is 0 years old, and is born in the Vagadiya family.
