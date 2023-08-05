sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.apple.assign.inventory.controller.AnalyticDashboard", {
            onInit: function () {
                var that = this;
                sap.ui.core.BusyIndicator.show();
                this.getOwnerComponent().getModel().read("/cv_inventory", {

                    // urlParameters: {
                    //     "$expand": "Inventory",
                    // },


                    success: function (oCompleteEntry) {
                            console.log(oCompleteEntry);
                        var oJProductsModel = new sap.ui.model.json.JSONModel({ 'products': oCompleteEntry.results });
                        that.getView().setModel(oJProductsModel, "oJProductsModel");
                        sap.ui.core.BusyIndicator.hide();
                    },
                    error: function (oError) { debugger; sap.ui.core.BusyIndicator.hide();}
                });
               


            },
           
            onClickAddProdMaster: function () {
                this.getOwnerComponent().getRouter().navTo("RouteAddProduct");
            },
            onClickAddProdInventory: function () {
                this.getOwnerComponent().getRouter().navTo("RouteAddInventory");
            },
            onClickAnlyticDashboard: function () {
                this.getOwnerComponent().getRouter().navTo("RouteAddInventory");
            },
            onClickHome: function () {
                
                this.getOwnerComponent().getRouter().navTo("RouteProducts");
            },

        });
    });
