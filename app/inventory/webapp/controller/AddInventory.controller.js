sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
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
                    var that = this;
                    this.getOwnerComponent().getModel().read("/Products", {
    
                        urlParameters: {
                            "$expand": "Inventory",
                        },
    
    
                        success: function (oCompleteEntry) {
    
                            var oJProductsModel = new sap.ui.model.json.JSONModel({ 'Products': oCompleteEntry.results });
                            that.getView().setModel(oJProductsModel, "oJProductsModel");
                        },
                        error: function (oError) { debugger; }
                    });
                   this.intializeJSONModel();
    
                },
                onproductselect: function (oEvent) {
                    debugger

                    var obj = oEvent.getSource().getSelectedItem().getBindingContext("oJProductsModel").getObject();
                    var analyticObject = {
                        ProductId: obj.ProductId,
                        ProductCategory:obj.ProductCategory,
                        ProductType: obj.ProductType,
                        AddedOn: "",
                        AddedBy: "",
                        Qty: "",
                        Stock: "",
                        UOM: obj.UOM,
                        ExpireDate: "",
                        BatchNo: "",
                    };
                    var addProdInvetoryModel = new sap.ui.model.json.JSONModel(analyticObject);
                    this.getView().setModel(addProdInvetoryModel, "addProdInvetoryModel");
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
                     this.getOwnerComponent().getRouter().navTo("RouteTargetAnalytics");
                },
                onClickHome: function () {
                
                    this.getOwnerComponent().getRouter().navTo("RouteProducts");
                },
    
    
            });
        });
    