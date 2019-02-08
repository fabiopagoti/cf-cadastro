/*global QUnit*/

sap.ui.define([
	"ovly/beta/users/beta-users/controller/S0.controller"
], function (oController) {
	"use strict";

	QUnit.module("S0 Controller");

	QUnit.test("I should test the S0 controller", function (assert) {
		var oAppController = new oController();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});