var expect = require('chai').expect;
var assert = require('chai').assert;
var dataGroup = require('../datagroup');

var dg = new dataGroup({
	host: '10.128.1.128',
	proto: 'https',
	port: '443',
	username: 'admin',
	pass: 'admin',
	strict: false,
	debug: false
});

describe("Data group access via iControl REST", function() {
	it("create a data groupt", function(done) {
		// set API connection and authentication
		dg.create('test_dg', 'string', 'internal', 'Common', function(data) {
			assert.isDefined(data);
			expect({data}).to.be.an('object');
			done();
		});
	});
	it("delete a data groupt", function(done) {
		// set API connection and authentication
		dg.delete("test_dg", 'internal', 'Common', function(data) {
			assert.isUndefined(data);
			expect({data}).to.be.an('object');
			done();
		});
	});
});
