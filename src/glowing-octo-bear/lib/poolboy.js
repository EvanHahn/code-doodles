(function() {

  var slice = Array.prototype.slice;

	function Swimmer(object, pool) {
		this._object = object;
		this.alive = true;
	}

	Swimmer.prototype.leave = function leave() {
		this.alive = false;
	};

	Swimmer.prototype.reenter = function enter() {
		var keys = Object.keys(this._object);
		for (var i = 0; i < keys.length; i ++) {
			delete this._object[keys];
		}
		this.alive = true;
	};

	function Poolboy(propertyName) {
    this.propertyName = propertyName || 'pool';
	}

  Poolboy.prototype = [];

	Poolboy.prototype.create = function create(type) {

		var newIndex;
		var len = this.length;
		for (var i = 0; i < len; i ++) {
			if (!this[i][this.propertyName].alive) {
				newIndex = i;
				break;
			}
		}

		var shouldMakeNew = newIndex === undefined;
		var result;

    var args;

		if (shouldMakeNew) {
      args = slice.call(arguments);
      args[0] = null;
      var ctor = type.bind.apply(type, args);
      result = new ctor();
			result[this.propertyName] = new Swimmer(result, this);
			this.push(result);
		} else {
			result = this[newIndex];
			result[this.propertyName].reenter();
      args = slice.call(arguments, 1);
      type.apply(result, args);
		}

		return result;

	};

  Poolboy.prototype.each = function each(fn) {
    var item;
		var len = this.length;
		for (var i = 0; i < len; i ++) {
      item = this[i];
      if (item[this.propertyName].alive) {
        fn(item, i);
      }
    }
  };

	if (typeof module !== 'undefined')
		module.exports = Poolboy;
  else
    this.Poolboy = Poolboy;

})();
