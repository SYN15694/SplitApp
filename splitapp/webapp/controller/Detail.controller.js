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

                this._student = oEvent.getParameter("arguments").student;
                this.getView().bindElement({
                    path: "/results/" + this._student,
                    model: "students"
                });
            }
            // onSelectionChange: function (oEvent) {
            //     var sProductId = oEvent.getSource().getBindingContext().getProperty("productId");
            //     this.getOwnerComponent().getRouter()
            //         .navTo("details",
            //             { orderId: this._orderId, productId: sProductId });
            // },
        });
    });
