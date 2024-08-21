sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("splitapp.controller.Detail", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
                this.changedProperties = {};
            },
            _onRouteMatched: function (oEvent) {

                this._document = oEvent.getParameter("arguments").document;
                this.getView().bindElement({
                    // path: "/results/" + this._document,
                    path: "/" + this._document,
                    model: "documents"
                });

                this.getView().getModel("documents").refresh(true);
            },

            onAccept: function () {


                var payload = {
                    "Bukrs": "CTEL",
                    "Belnr": "4500000012",
                    "Gjahr": "2022",
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
            },

            onInputChange: function (oEvent) {
                var oInput = oEvent.getSource();
                var sValue = oEvent.getParameter("value");
                var sPath = oInput.getBindingInfo("value").parts[0].path;

                // Get the index from the context path
                var path = oInput.getBindingContext("documents").getPath();

                // keep track of changes
                // Check for the data array in changedProperties
                if (!this.changedProperties[path]) {
                    this.changedProperties[path] = {};
                }

                // Now keep track of each field change and its associated index
                this.changedProperties[path][sPath] = sValue;
            },

            onSave: function () {
                var oModel = this.getView().getModel("documents");

                // Set a new deferred group
                oModel.setDeferredGroups(["updatesGroup"]);

                // Loop over all paths in changedProperties
                for (var path in this.changedProperties) {
                    if (this.changedProperties.hasOwnProperty(path)) {
                        // Update the entity at this path by adding it to the "updatesGroup"
                        oModel.update(path, this.changedProperties[path], {
                            groupId: "updatesGroup",
                            changeSetId: path // Pass the path as the changeSetId to group all changes to the same entity into a single change set
                        });
                    }
                }

                // Submit the changes as part of the "updatesGroup"
                oModel.submitChanges({
                    groupId: "updatesGroup",
                    success: function () { /* Success handling */ },
                    error: function () { /* Error handling */ }
                });

                // Clear changes
                this.changedProperties = {};
            }

        });
    });
