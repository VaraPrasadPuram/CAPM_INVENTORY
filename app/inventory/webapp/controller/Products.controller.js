sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.apple.assign.inventory.controller.Products", {
            onInit: function () {
                var that = this;
                this.getOwnerComponent().getModel().read("/Products",{
                   
                    urlParameters: {
                        "$expand": "Inventory",
                    },
                    
                     
                success: function(oCompleteEntry) {

                   var oJProductsModel = new sap.ui.model.json.JSONModel({'Products':oCompleteEntry.results});
                   that.getView().setModel(oJProductsModel,"oJProductsModel");
                    },
                    error: function(oError) { debugger;}
                  });
                var data = [{
                    ProductID: "10011",
                    ProductName: "Toothpaste",
                    Category: "Oral Care",
                    AddedOn: "06/01/2023",
                    ExpiryDate: "06/01/2023",
                    NetQty: "180",
                    UOM: "gm",
                    Stocks: "1200",
                    Units: "Pieces"
                },
                {
                    ProductID: "20011",
                    ProductName: "Surf Excel",
                    Category: "Detergent",
                    AddedOn: "16/01/2023",
                    ExpiryDate: "26/01/2023",
                    NetQty: "150",
                    UOM: "gm",
                    Stocks: "2000",
                    Units: "Kg"
                },
                {
                    ProductID: "20021",
                    ProductName: "Lifebuoy",
                    Category: "Soap",
                    AddedOn: "06/01/2023",
                    ExpiryDate: "06/01/2023",
                    NetQty: "180",
                    UOM: "gm",
                    Stocks: "1900",
                    Units: "Pieces"
                },
                {
                    ProductID: "30011",
                    ProductName: "Face wash",
                    Category: "Skin Care",
                    AddedOn: "16/01/2023",
                    ExpiryDate: "26/01/2023",
                    NetQty: "50",
                    UOM: "ml",
                    Stocks: "200",
                    Units: "Pieces"
                },
                {
                    ProductID: "40011",
                    ProductName: "Toothpaste",
                    Category: "Oral Care",
                    AddedOn: "06/01/2023",
                    ExpiryDate: "06/01/2023",
                    NetQty: "180",
                    UOM: "gm",
                    Stocks: "1200",
                    Units: "Pieces"
                },
                {
                    ProductID: "50011",
                    ProductName: "Surf Excel",
                    Category: "Detergent",
                    AddedOn: "16/01/2023",
                    ExpiryDate: "26/01/2023",
                    NetQty: "150",
                    UOM: "gm",
                    Stocks: "2000",
                    Units: "Kg"
                },
                {
                    ProductID: "60021",
                    ProductName: "Lifebuoy",
                    Category: "Soap",
                    AddedOn: "06/01/2023",
                    ExpiryDate: "06/01/2023",
                    NetQty: "180",
                    UOM: "gm",
                    Stocks: "1900",
                    Units: "Pieces"
                },
                {
                    ProductID: "70011",
                    ProductName: "Face wash",
                    Category: "Skin Care",
                    AddedOn: "16/01/2023",
                    ExpiryDate: "26/01/2023",
                    NetQty: "50",
                    UOM: "ml",
                    Stocks: "200",
                    Units: "Pieces"
                },
                {
                    ProductID: "80021",
                    ProductName: "Lifebuoy",
                    Category: "Soap",
                    AddedOn: "06/01/2023",
                    ExpiryDate: "06/01/2023",
                    NetQty: "180",
                    UOM: "gm",
                    Stocks: "1900",
                    Units: "Pieces"
                },
                {
                    ProductID: "90011",
                    ProductName: "Face wash",
                    Category: "Skin Care",
                    AddedOn: "16/01/2023",
                    ExpiryDate: "26/01/2023",
                    NetQty: "50",
                    UOM: "ml",
                    Stocks: "200",
                    Units: "Pieces"
                }
                ];
               // var oJProductsModel = new sap.ui.model.json.JSONModel(data);
                // that.getView().setModel(oJProductsModel, "oJProductsModel");


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

        });
    });
