sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.apple.assign.inventory.controller.AddInventory", {
           
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
                    var analyticObject = {
                        ProductId: "",
                        ProductCategory: "",
                        ProductType: "",
                        AddedOn: "",
                        AddedBy: "",
                        Qty: "",
                        Stock: "",
                        UOM: "",
                        ExpireDate: "",
                        BatchNo: "",
                    };
                    var addProdInvetoryModel = new sap.ui.model.json.JSONModel(analyticObject);
                    this.getView().setModel(addProdInvetoryModel, "addProdInvetoryModel");
                },
                onPressAddInventorySubmit: function () {
                    var data = this.getView().getModel("addProdInvetoryModel").getData();
                    console.log(data);
                    sap.m.MessageToast.show("Added Successfully");
                    this.intializeJSONModel();
                    var that = this;
                    this.getOwnerComponent().getModel().create("/ProductsInventory",data, {
                        success: function (oCompleteEntry) {
                        },
                        error: function (oError) { debugger; }
                    });    


                },
                onClickHomeBtn: function(){
                    this.getOwnerComponent().getRouter().navTo("RouteProducts");
                },
                onClickAddProdMaster: function(){
                    this.getOwnerComponent().getRouter().navTo("RouteAddProduct");
                },
                onClickAnlyticDashboard: function(){
                    // this.getOwnerComponent().getRouter().navTo("RouteAnalytics");
                },
    
    
            });
        });
    