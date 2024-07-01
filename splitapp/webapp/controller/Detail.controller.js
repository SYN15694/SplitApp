sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("splitapp.controller.Detail", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {

                this._document = oEvent.getParameter("arguments").document;
                this.getView().bindElement({
                    // path: "/results/" + this._document,
                    path: "/" + this._document,
                    model: "documents"
                });
            },

            onAccept: function () {

                
                var payload = {
                    "Bukrs": "CTEL",
                    "Belnr": "4500000012",
                    "Gjahr": "2021",
                    "Buzei": "001",
                    "Buzid": "M"
                };

                var path = "/" + this._document + "/BkpfToBseg";
                var odataModel = this.getView().getModel("documents");

                var oPendingChanges = odataModel.getPendingChanges();
                // @ts-ignore
                odataModel.create(path, payload, {
                    success: function (data, response) {

                    },
                    error: function (error) {

                    }
                });

            },

            onDelete: function () {
                var odataModel = this.getView().getModel("documents");
                var oTable = this.getView().byId("BsegTable");
                var oSelectedItem = oTable.getSelectedItem();
                if (oSelectedItem) {
                    var oBindingContext = oSelectedItem.getBindingContext("documents");
                    var path = oBindingContext.getPath();
                   
                    odataModel.remove(path, {
                        success: function (data, response) {
                            // MessageBox.success("Deleted data");
                        },
                        error: function (error) {
                            // MessageBox.error("Deletion failed");
                        }
                    })

                } else {

                }
            }

        });
    });
