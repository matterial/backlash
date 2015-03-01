# Backlash

The idea behind Backlash is to bring reactive literals into your web apps.
Imagine strings, numbers, and such literals being able to cascade-update their values everywhere across the app.

It works in Node.js and in the browser.

## The idea

The idea behind this simple module is to have literals / variables that update themselves where they are being used.

## Install

npm install backlash

## Usage

### Initializing Backlash

    var Backlash = require('backlash')();
    var B = Backlash.creator;

### Preparing Variables

    /**
     * Initialze the variables
     */
    var firstName   = B("firstName"),
      lastName  = B("lastName"),
      fullName  = B("fullName"),
      age     = B("age"),
      description = B("description");

### Setting & Modifying Variables

    /**
     * Set values
     */
    firstName("John");
    lastName("Doe");
    age(27);

### Using as Variables
    /**
     * Below code works as normal because
     * concatenation will automatically 
     * call firstName.toString()
     */
    console.log('Hello, I am ' + firstName);

### Creating Dependent Variables

    /**
     * Create dependent values
     */
    var fullName = B("fullName", "{{firstName}} {{lastName}}");
    console.log(fullName()); //John Doe

### Deleting Variables from Backlash Memory
    /**
     * Delete variables to free the memory, otherwise backlash holds them forever
     */
    firstName.trash();

### Using after Trashing
    /**
     * Using the variable again should throw an error, we will catch it
     */
    try {
      firstName('Janis');
    } catch(e) {
      console.log(e); //[Error: ERROR 101: variable used after being trashed]
    }

    /**
     * Let's check if a variable is trashed already
     */
    if (!firstName.trashed()) {
      firstName('Janis');
      console.log('Modified firstName');
    } else {
      console.log('Cannot use firstName anymore');
    }

## Todo

This is a very basic implementation. Other features to do when I have some free time:

1. UI binding: Update of backlash variable to cause UI bound elements to update (via DOM attributes)
2. AngularJS Module: Extend AngularJS with Backlash functionality

## Contributing

**Backlash** is created by <a href="https://twitter.com/ritenv" target="blank">@ritenv</a>. Contributions are open and welcome. For any issues, please raise it in the issues section and feel free to send pull requests to fix them.