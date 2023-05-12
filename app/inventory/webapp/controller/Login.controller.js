sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.apple.assign.inventory.controller.Login", {
            onInit: function () {
                var that = this;
                this.getOwnerComponent().getModel().read("/Users", {
                    success: function (oCompleteEntry) {
                        var oJusersModel = new sap.ui.model.json.JSONModel({ 'Users': oCompleteEntry.results });
                        that.getView().setModel(oJusersModel, "oJusersModel");
                    },
                    error: function (oError) { debugger; }
                });
            },

            fnSubmitFunction: function (oEvent) {
                var userName = this.getView().byId("sIdUserName").getValue();
                var pwd = this.getView().byId("sIdPwde").getValue();
                var aUsers = this.getView().getModel("oJusersModel").getProperty("/Users");
                var bFlag = false;
                for (var i = 0; i < aUsers.length; i++) {
                    if (aUsers[i].Username === userName && aUsers[i].Password === pwd) {
                        bFlag = true;
                    }
                }
                if (bFlag) {
                    sap.m.MessageToast.show("Login Successfull");
                    this.getOwnerComponent().getRouter().navTo("RouteProducts");
                } else {
                    sap.m.MessageToast.show("Enter Valid User Details")
                }

            }
        });
    });
