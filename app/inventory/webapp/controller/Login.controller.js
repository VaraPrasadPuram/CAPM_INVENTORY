sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.apple.assign.inventory.controller.Login", {
            onInit: function () {
                var that = this;
                //var oJLoginuserModel = new sap.ui.model.json.JSONModel({ 'User': {}});
                var oJLoginuserModel = new sap.ui.model.json.JSONModel({ 'User': {}, 'NewUser': { 'Username': "", 'Password': "", 'EmailId': "", 'ImageURL': "" }, 'ResetPassword': { 'NewPassword': "", 'ConfirmPassword': "", 'EmailId': "" } });
                this.getOwnerComponent().setModel(oJLoginuserModel, "oJLoginuserModel");
this.fnReadUsers();
           
            },

            fnReadUsers: function(){
                var that = this;
                this.getOwnerComponent().getModel().read("/Users", {
                    success: function (oCompleteEntry) {
                        var oJusersModel = new sap.ui.model.json.JSONModel({ 'Users': oCompleteEntry.results });
                        that.getView().setModel(oJusersModel, "oJusersModel");
                    },
                    error: function (oError) { debugger; }
                });
            },
            AddNewUser: function (oEvent) {
                var that = this;
                var ouser = this.getOwnerComponent().getModel('oJLoginuserModel').getProperty("/NewUser")
                this.getOwnerComponent().getModel().create("/Users", ouser, {
                    success: function (oCompleteEntry) {
                        sap.m.MessageToast.show("User Signed IN Successfull");
                        that.fnReadUsers();
                        // var oJusersModel = new sap.ui.model.json.JSONModel({ 'Users': oCompleteEntry.results });
                        // that.getView().setModel(oJusersModel, "oJusersModel");
                    },
                    error: function (oError) { debugger; }
                });
            },
            onAdduser: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.apple.assign.inventory.fragment.Adduser",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        oPopover.bindElement("oJLoginuserModel>/NewUser");
                        return oPopover;
                    });
                }
                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },
            onClickForgotPassword: function (oEvent) {
              
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                // create popover
                if (!this._fPopover) {
                    this._fPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.apple.assign.inventory.fragment.ForgotPassword",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        oPopover.bindElement("oJLoginuserModel>/ResetPassword");
                        return oPopover;
                    });
                }
                this._fPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            
            },
            onClickResetPassword: function () {
                var ouser = this.getOwnerComponent().getModel('oJLoginuserModel').getProperty("/ResetPassword")
                
                if(ouser.NewPassword =="" || ouser.ConfirmPassword == "" || ouser.EmailId == "" ){
                    sap.m.MessageToast.show("Please fill all the details");
                }
                else{
                    var obj = {'Password': ouser.NewPassword, 'EmailId': ouser.EmailId};
                this.getOwnerComponent().getModel().update("/Users(EmailId='"+ouser.EmailId+"')", obj, {
                    success: function (oCompleteEntry) {
                        sap.m.MessageToast.show("Password reset successful");

                    },
                    error: function (oError) { debugger; }
                });
            }
            },
            validateEmailID: function () {
                var email = this.getOwnerComponent().getModel('oJLoginuserModel').getProperty("/ResetPassword/EmailId");
                var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (! email.match(validate)){
                    sap.m.MessageToast.show("Please enter valid email id");
                }
            },
            validateNewPassword: function () {
                var password = this.getOwnerComponent().getModel('oJLoginuserModel').getProperty("/ResetPassword/NewPassword");
                var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                if (!password.match(passw)) {
                    sap.m.MessageToast.show("Your should password be between 8 to 15 characters, which should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");
                    this.getOwnerComponent().getModel('oJLoginuserModel').setProperty("/ResetPassword/NewPassword", "");
                }

            },

            validateConfirmPassword: function () {
                var ouser = this.getOwnerComponent().getModel('oJLoginuserModel').getProperty("/ResetPassword");
                if(ouser.NewPassword == ""){
                    sap.m.MessageToast.show("Please enter new password");
                    this.getOwnerComponent().getModel('oJLoginuserModel').setProperty("/ResetPassword/ConfirmPassword", "");
                }else{
                    if(ouser.NewPassword !== ouser.ConfirmPassword){
                        sap.m.MessageToast.show("New password and Confirm password is not matching");
                        this.getOwnerComponent().getModel('oJLoginuserModel').setProperty("/ResetPassword/ConfirmPassword", "");
                    }
                }
               

            },
            fnSubmitFunction: function (oEvent) {
                var userName = this.getView().byId("sIdUserName").getValue();
                var pwd = this.getView().byId("sIdPwde").getValue();
                if(userName == "" || pwd == ""){
                    sap.m.MessageToast.show("Please enter user name and password");
                }
                else{
                
                var aUsers = this.getView().getModel("oJusersModel").getProperty("/Users");
                var bFlag = false;
                for (var i = 0; i < aUsers.length; i++) {
                    if (aUsers[i].Username === userName && aUsers[i].Password === pwd) {
                        bFlag = true;
                        this.getOwnerComponent().getModel("oJLoginuserModel").setProperty("/User", aUsers[i]);
                    }
                }
                if (bFlag) {
                    sap.m.MessageToast.show("Login Successfull");
                    this.getOwnerComponent().getRouter().navTo("RouteProducts");
                } else {
                    sap.m.MessageToast.show("Enter Valid User Details")
                }
            }
            }
            
        });
    });
