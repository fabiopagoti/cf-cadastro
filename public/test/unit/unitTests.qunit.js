/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ovly/beta/users/beta-users/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});