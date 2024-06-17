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
                    path: "/results/" + this._document,
                    model: "documents"
                });
            },

            onAccept: function () {

                this.getOwnerComponent().getRouter()
                    .navTo("About",
                        { student: this._document, name: "abc" })
            },

        });
    });
