sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("ovly.beta.users.beta-users.controller.S0", {

		API_PATH: "../subscriber",

		onInit: function () {
			this._oUsersModel = new JSONModel(this.API_PATH);
			this.getView().setModel(this._oUsersModel, "users");

			this._oFormModel = new JSONModel();
			this.getView().setModel(this._oFormModel, "form");

		},

		onSave: function (oEvent) {

			this._oFormModel.attachEventOnce('requestCompleted', function () {
				this._oUsersModel.loadData(this.API_PATH);
			}, this);

			this._oFormModel.loadData(this.API_PATH, {
				email: this._oFormModel.getProperty("/email"),
				name: this._oFormModel.getProperty("/name")
			}, true, "POST");
		}
	});
});