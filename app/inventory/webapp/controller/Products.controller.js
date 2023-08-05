sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.apple.assign.inventory.controller.Products", {
            onInit: function () {
                var that = this;
        this.fnReadtableData();
                this.dataBindingVizCharts("/view_qty_stock_yoy");


                this.getOwnerComponent().getModel().read("/view_top_stocks_productname", {
                    success: function (oCompleteEntry) {

                        var oJTopProductModel = new sap.ui.model.json.JSONModel({ 'Product': oCompleteEntry.results });
                        that.getView().setModel(oJTopProductModel, "oJTopProductModel");
                    },
                    error: function (oError) { debugger; }
                });

                this.getOwnerComponent().getModel().read("/view_top_stocks_productcategory", {
                    success: function (oCompleteEntry) {

                        var oJTopProductModel1 = new sap.ui.model.json.JSONModel({ 'Product': oCompleteEntry.results });
                        that.getView().setModel(oJTopProductModel1, "oJTopProductModel1");
                    },
                    error: function (oError) { debugger; }
                });

                this.getOwnerComponent().getModel().read("/view_top_3_product_names", {
                    success: function (oCompleteEntry) {

                        var oJTopProductModel2 = new sap.ui.model.json.JSONModel({ 'Product': oCompleteEntry.results });
                        that.getView().setModel(oJTopProductModel2, "oJTopProductModel2");
                    },
                    error: function (oError) { debugger; }
                });

            },

            fnReadtableData : function(){
                var that = this;
                sap.ui.core.BusyIndicator.show();
                this.getOwnerComponent().getModel().read("/cv_inventory", {
                    success: function (oCompleteEntry) {
                        sap.ui.core.BusyIndicator.hide();
                        var oJProductsModel = new sap.ui.model.json.JSONModel({ 'Products': oCompleteEntry.results });
                        that.getView().setModel(oJProductsModel, "oJProductsModel");
                    },
                    error: function (oError) { 
                        sap.ui.core.BusyIndicator.hide();
                     }
                });
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
            dataBindingVizCharts: function (service) {

                var that = this;
                this.getOwnerComponent().getModel().read(service, {
                    success: function (oCompleteEntry) {
                        console.log(oCompleteEntry);
                        var oJChartsProductsModel = new sap.ui.model.json.JSONModel({ 'products': oCompleteEntry.results });
                        that.getView().setModel(oJChartsProductsModel, "oJChartsProductsModel");
                    },
                    error: function (oError) { debugger; }
                });
            },
            onSelectionChangeSegButton: function (oEvent) {

                var selectedItem = oEvent.getSource().getSelectedItem();
                switch (selectedItem) {
                    case "__item0":
                        this.dataBindingVizCharts("/view_qty_stock_yoy");
                        this.getView().byId("idColumnChartYoY").setVisible(true);
                        this.getView().byId("idColumnChartMTD").setVisible(false);
                        this.getView().byId("idColumnChartWTD").setVisible(false);
                        break;
                    case "__item1":
                        this.dataBindingVizCharts("/view_qty_stock_mtd");
                        this.getView().byId("idColumnChartYoY").setVisible(false);
                        this.getView().byId("idColumnChartMTD").setVisible(true);
                        this.getView().byId("idColumnChartWTD").setVisible(false);
                        break;
                    case "__item2":
                        this.dataBindingVizCharts("/view_qty_stock_wtd");
                        this.getView().byId("idColumnChartYoY").setVisible(false);
                        this.getView().byId("idColumnChartMTD").setVisible(false);
                        this.getView().byId("idColumnChartWTD").setVisible(true);
                        break;

                }

            },
            onClickAddProdMaster: function () {
                this.getOwnerComponent().getRouter().navTo("RouteAddProduct");
            },
            onClickAddProdInventory: function () {
                this.getOwnerComponent().getRouter().navTo("RouteAddInventory");
            },
            onClickAnlyticDashboard: function () {
                this.getOwnerComponent().getRouter().navTo("RouteTargetAnalytics");
            },
            onClickHome: function () {
                
                    this.getOwnerComponent().getRouter().navTo("RouteProducts");
                },
            enableTransfer: function (val) {
                if (val > 100) { return true; }
                else {
                    return false;
                }
            },

            fnOntransfer: function (oEvent) {

                this.selectedObj = oEvent.getSource().getParent().getBindingContext('oJProductsModel').getObject();
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                // create popover
                if (!this._fPopover) {
                    this._fPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.apple.assign.inventory.fragment.TransferProduct",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
                this._fPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },
            onClickTransfer: function (oEvent) {
                var that = this;
                var store = oEvent.getSource().getParent().getItems()[1].getSelectedKey();
                var stock = oEvent.getSource().getParent().getItems()[3].getValue();

                573

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; 
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var newdate = year + "/" + month + "/" + day;
                var obj = {
                    "StoredId": store,
                    "ProductId": this.selectedObj.PRODUCTID,
                    "ProductName": this.selectedObj.PRODUCTNAME,
                    "ProductCategory": this.selectedObj.PRODUCTCATEGORY,
                    "ProductType": this.selectedObj.PRODUCTTYPE,
                    "Qty": this.selectedObj.CC_QTY.toString(),
                    "Stock": stock.toString(),
                    "TrnsferOn":newdate,
                    "TransferBy": this.getView().getModel("oJLoginuserModel").getProperty("/User").Username,
                    "UOM":this.selectedObj.UOM
                }

                this.getOwnerComponent().getModel().create("/Products_Transfer", obj, {
                    success: function (oCompleteEntry) {
                        that.fnReadtableData();
                        sap.m.MessageToast.show("Transfer done Successfully");
                        that.getOwnerComponent().getRouter().navTo("ProductTransfer");
                       
                    },
                    error: function (oError) { }
                });
            }

        });
    });
