sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("splitapp.controller.Master", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("Master").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                /*
                * Navigate to the first item by default only on desktop and tablet (but not phone).
                * Note that item selection is not handled as it is
                * out of scope of this sample
                */
                // if (!Device.system.phone) {
                    this.getOwnerComponent().getRouter()
                        .navTo("Detail", { Id: 0 }, true);
                // }
            },
            onSelectionChange: function (oEvent) {

                var oItem = oEvent.getParameter("listItem");
                var oCtx = oItem.getBindingContext("students");
                var studentId = oCtx.getPath();
                // var student = studentPath.split("/").slice(-1).pop();

                // var studentId = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("Id");
                this.getOwnerComponent().getRouter()
                    .navTo("Detail",
                        { student: student })
            }


        });
    });
