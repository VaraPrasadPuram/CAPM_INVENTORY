sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("com.apple.assign.inventory.controller.AddProduct", {
            onInit: function () {
                var that = this;
                // this.getOwnerComponent().getModel().read("/Users", {
                //     success: function (oCompleteEntry) {
                //         var oJusersModel = new sap.ui.model.json.JSONModel({ 'Users': oCompleteEntry.results });
                //         that.getView().setModel(oJusersModel, "oJusersModel");
                //     },
                //     error: function (oError) { debugger; }
                // });

                this.intializeJSONModel();

            },
            onPress: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.apple.assign.inventory.fragment.popover",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        oPopover.bindElement("oJLoginuserModel>/User");
                        return oPopover;
                    });
                }
                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },
            intializeJSONModel : function(){
                var prodObject = {
                    ProductId: "",
                    ProductCategory: "",
                    ProductName: "",
                    ProductType: "",
                   
                    UOM: "",
                    Active:true
                    // Inventory:{
                    //     ProductId:'P103'
                    // }
                };
                var addProductsModel = new sap.ui.model.json.JSONModel(prodObject);
                this.getView().setModel(addProductsModel, "addProductsModel");
            },
            onPressAddProductSubmit: function () {
                var data = this.getView().getModel("addProductsModel").getData();
                var that = this;
                console.log(data);
                sap.m.MessageToast.show("Added Successfully");
                    this.intializeJSONModel();

                    this.getOwnerComponent().getModel().create("/Products",data, {
                        success: function (oCompleteEntry) {
                            var oJusersModel = new sap.ui.model.json.JSONModel({ 'Users': oCompleteEntry.results });
                            that.getView().setModel(oJusersModel, "oJusersModel");
                        },
                        error: function (oError) { debugger; }
                    });    
            },
            onClickHomeBtn: function(){
                this.getOwnerComponent().getRouter().navTo("RouteProducts");
            },
            onClickAddProdInventory: function(){
                this.getOwnerComponent().getRouter().navTo("RouteAddInventory");
            },
            onClickAnlyticDashboard: function(){
                this.getOwnerComponent().getRouter().navTo("RouteTargetAnalytics");
            },
            onClickHome: function () {
                
                this.getOwnerComponent().getRouter().navTo("RouteProducts");
            },


        });
    });
