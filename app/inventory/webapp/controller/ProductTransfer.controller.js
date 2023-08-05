sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("com.apple.assign.inventory.controller.ProductTransfer", {
            onInit: function () {
                var that = this;
                this.getOwnerComponent().getModel().read("/Products_Transfer", {
                    success: function (oCompleteEntry) {
                        var oJProductsModel = new sap.ui.model.json.JSONModel({ 'Products': oCompleteEntry.results });
                        that.getView().setModel(oJProductsModel, "oJProductsModel");
                    },
                    error: function (oError) { debugger; }
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
            }

        });
    });
