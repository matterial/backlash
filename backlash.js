/**
 * Reactive programming.
 * By Riten Vagadiya
 */

/**
 * Backlash depends on reckonjs for providing string interpolations (also developed by matterial and MIT licensed)
 */
if (typeof window == "undefined" ) {
	var reckon = require("reckonjs");
}

/**
 * Object to store utility functions for backlash
 * @type {Object}
 */
var bGlobal = {
	/**
	 * List of all backlash initiated variables
	 * @type {Object}
	 */
	backlashVariables: {},
	backlashEvents: {},

	/**
	 * Evaluate a given backlash expression and return final value
	 * @param  {String} backlashString The backlash expression in its format
	 * @return {String}                The final presentable, usable value
	 */
	evaluate: function(backlashString) {
		return backlashString.reckon(this.backlashVariables);
	},

	/**
	 * Evaluate a given variable name and return final value
	 * @param  {String} string The name of the backlash-initiated variable
	 * @return {String}        The final presentable, usable value
	 */
	getEvaluated: function(string) {
		return this.evaluate(this.backlashVariables[string]);
	}
}
bGlobal.backlashVariables.length = function() {
	var len = 0;
	for (var i in this) {
		len++;
	}
	return len;
}

/**
 * The returned function which goes into the reference variables for further manipulation of the backlash-initiated object
 * @param  {Object} instance Backlash instance
 * @return {Function}        Return a decorated function with extra arms
 */
var returnFn =  function(instance) {
	if (typeof instance.backlashRef === "undefined") {
		throw new Error("ERROR 101: variable used after being trashed");
	}
	/**
	 * The returned function will accept a value, this is how mutability is achieved for backlash objects
	 * @param  {Any}   newValue Update the backlash value to this value
	 * @return {Function}       Return back the same function for chaining
	 */
	var fn = function(newValue) {
		var b = instance;
		/**
		 * Assumption is, if no value is provided, it is a call to fetch the value
		 */
		if (typeof newValue === "undefined") {
			return bGlobal.getEvaluated(instance.backlashRef);
		}
		instance.setValue(newValue);

		/**
		 * This magic line enables chaining infinitely - try firstName("Jonh")("Joan")("John") to have the final value set as "John".
		 */
		return returnFn(instance);
	};
	/**
	 * Extend this function with it's own set of extended functions
	 */
	instance.initReturnFunction.apply(fn, [instance]);

	return fn;
};

/**
 * The actual backlash object that is instantiated once for every variable
 * @param  {Object} value If this is the first time, this argument will be the name of the variable
 * @param  {Object} arg   If this is the second time, this argument will be undefined, else it will be the value to be used during initiation (shorthand)
 * @return {Function}     Return the chaininable reference function for manipulating the variable
 */
var backlash = function(value, arg) {
	var $this = this;
	
	/**
	 * Reading a value
	 */
	if (typeof value === "undefined") return $this;

	/**
	 * If already defined, it should now set the value
	 */
	if ($this.constructor.name === "backlash") {
		$this.setValue(value);
		return returnFn($this);
	} else {
		/**
		 * Initialize a backlash variable
		 * @type {backlash}
		 */
		var b = new backlash();
		
		/**
		 * Store a reference to the variable name passed in the 'value' argument
		 * @type {String}
		 */
		b.backlashRef = value;

		if (typeof arg !== "undefined") {
			b.setValue(arg);
		}

		return returnFn(b);
	}
};

/**
 * Prototype of the backlash instance
 * Initializes in the context of the window for browser, and as root for nodejs
 */
backlash.prototype = (function(context) {
	return {
		initReturnFunction: function(instance) {
			var $this = this;
			/**
			 * If the function is used directly in a string, get the toString equivalent to simulate a normal variable
			 * @return {String}
			 */
			$this.toString = function() {
				return $this();
			};
			$this.eventHandlers = [];
			$this.$watch = function(fn) {
				$this.eventHandlers.push({"change": fn});
			};
			$this.trash = function() {
				delete bGlobal.backlashVariables[instance.backlashRef];
				delete instance.backlashRef;
			};
			$this.trashed = function() {
				return (typeof instance.backlashRef === "undefined");
			}
		},
		setValue: function(value) {
			bGlobal.backlashVariables[this.backlashRef] = value;
		},
		toString: function() {
			return bGlobal.evaluate(this.backlashRef).toString();
		},
		get: function() {
			return bGlobal.backlashVariables[this.backlashRef];
		}
	};
})(this);

/**
 * Interface both the creating function, and the list of all variables for direct usage
 * @return {Object}
 */
if (typeof window !== "undefined" ) {
	window.backlash = backlash;
	window.backlashVars = bGlobal.backlashVariables;
} else {
	module.exports = function() {
		return {creator: backlash, variables: bGlobal.backlashVariables};
	};
}