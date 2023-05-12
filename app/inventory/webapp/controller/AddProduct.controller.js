sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
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
            intializeJSONModel : function(){
                var prodObject = {
                    ProductId: "",
                    ProductCategory: "",
                    ProductName: "",
                    ProductType: "",
                    CreatedOn: "",
                    CreatedBy: "",
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
                this.getOwnerComponent().getRouter().navTo("RouteAddInventory");
            },


        });
    });
