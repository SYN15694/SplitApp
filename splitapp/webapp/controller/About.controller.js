sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("splitapp.controller.About", {
        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("About").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            this._student = oEvent.getParameter("arguments").student;
            
            // Now this._student contains the passed student parameter
        },
    });
});