/**
 * Reactive programming.
 */
var returnFn =  function(instance) {
	return function(newValue) {
		var b = instance;
		if (typeof newValue === "undefined")
			return instance.value;
		instance.setValue(newValue);
	}
}
var backlashVariables = {};
var backlash = function(value) {
	var $this = this;
	if (!value) return $this;
	if ($this.constructor.name === "backlash") {
		$this.setValue(value);
		return returnFn($this);
	} else {
		var b = new backlash();
		b.setValue(value);
		return returnFn(b);
	}
}
backlash.prototype = (function(context) {
	return {
		setValue: function(value) {
			this.value = value;
		},
		toString: function() {
			return this.value;
		}
	};
})(this);

module.exports = function() {
	return {creator: backlash, variables: backlashVariables};
}