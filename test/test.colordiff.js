var assert = require("assert");
var Colordiff = require('../colordiff.js');

describe('Colordiff.noConflict()', function () {
	it('should return Colordiff object', function () {
		var noconflictcolordiff = Colordiff.noConflict();
		assert.equal(Colordiff, noconflictcolordiff);
	})
});

describe('Colordiff.compare()', function () {
	it('should return 0 if two colors are identical', function () {
		var diff = Colordiff.compare({r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}, 'rgb');
		assert.equal(0, diff);
	});

	it('should return bigger value for two colors that very different', function () {
		var diff1 = Colordiff.compare({r: 255, g: 255, b: 255}, {r: 240, g: 240, b: 240}, 'rgb');
		var diff2 = Colordiff.compare({r: 255, g: 255, b: 255}, {r: 100, g: 100, b: 100}, 'rgb');
		assert.ok(diff2 > diff1);

	});

	it("should use the true chroma difference", function () {
		var diff = Colordiff.compare({L: 50, a: 2.6772, b: -79.7751}, {L: 50, a: 0, b: -82.7485});
		assert.equal(2.0424722377692155, diff);
	});

	it("should use the true hue difference", function () {
		var diff = Colordiff.compare({L: 50, a: -1.1848, b: -84.8006}, {L: 50, a: 0, b: -82.7485});
		assert.equal(1.0000104934873384, diff);
	});

	it("should use the correct arctangent computation", function () {
		var diff = Colordiff.compare({L: 50, a: 2.49, b: -0.001}, {L: 50, a: -2.49, b: 0.0009});
		assert.equal(7.179172011345338, diff);
	});


});
