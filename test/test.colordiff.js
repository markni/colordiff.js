var assert = require("assert");
var Colordiff = require('../colordiff.js');

describe('colordiff.js', function () {


	describe('#noConflict()', function () {
		it('should return Colordiff object', function () {
			var noconflictcolordiff = Colordiff.noConflict();
			assert.equal(Colordiff, noconflictcolordiff);
		})
	})

	it('should return 0 if two colors are identical', function () {
		var diff = Colordiff.compare({r:255,g:255,b:255},{r:255,g:255,b:255},'rgb');
		assert.equal(0, diff);
	})


	it ('should return bigger value for two colors that very different', function(){
		var diff1 = Colordiff.compare({r:255,g:255,b:255},{r:240,g:240,b:240},'rgb');
		var diff2 = Colordiff.compare({r:255,g:255,b:255},{r:100,g:100,b:100},'rgb');
		assert.ok(diff2>diff1);

	})



});
