/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "splitapp/model/models",
    "sap/ui/model/odata/v2/ODataModel",
    'sap/ui/model/json/JSONModel',
    'sap/f/library',
    "sap/ui/model/resource/ResourceModel",
    "sap/m/BusyDialog",
    "sap/m/MessagePopover",
    "sap/m/MessagePopoverItem"
],
    function (UIComponent, Device, models, ODataModel, JSONModel, fioriLibrary, ResourceModel, BusyDialog, MessagePopover, MessagePopoverItem) {
        "use strict";

        return UIComponent.extend("splitapp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                this._busyDialog = new BusyDialog();

                var i18nModel = new ResourceModel({
                    bundleName: "studentproject.i18n.i18n" // adjust to your app structure
                });

                // Create a new instance of the ODataModel
                var oStudentModel = new ODataModel("/sap/opu/odata/sap/ZSTUDENT_SRV/", {
                    json: true,
                    loadMetadataAsync: true,
                    tokenHandling: true
                });

                // Set the model to the core of the application

                sap.ui.getCore().setModel(i18nModel, "i18n");
                sap.ui.getCore().setModel(oStudentModel, "oDataModel");

                this._busyDialog.open();

                oStudentModel.read("/StudentSet", {
                    urlParameters: {
                        "$expand": "StudentToUni",
                        "$format": "json"
                    },
                    success: (oData, oResponse) => {
                        var headers = oResponse.headers;
                        var jsonModel = new JSONModel(oData);
                        jsonModel.setProperty("/editable", false);
                        this.setModel(jsonModel, "students"); // setting the model data
                
                        this._busyDialog.close();
                    },
                    error: (oError) => {
                        this._busyDialog.close();
                        console.log("Error", oError);
                    }
                });
            }
        });
    }
);