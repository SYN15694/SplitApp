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
        "sap/m/MessagePopoverItem",
        "sap/m/DatePicker",
        "sap/m/Dialog",
        "sap/m/Button",
        "sap/m/Text"
    ],
    function (UIComponent, Device, models, ODataModel, JSONModel, fioriLibrary,
        ResourceModel, BusyDialog, MessagePopover, MessagePopoverItem, DatePicker, Dialog, Button, Text) {
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
                this.setModel(i18nModel, "i18n");

                // Create a new instance of the ODataModel
                // var oModel = new ODataModel("/sap/opu/odata/sap/ZFIDOC_SRV/", {
                //     json: true,
                //     loadMetadataAsync: true
                // });
                // sap.ui.getCore().setModel(oModel);

                // // Read data from the OData model
                // oModel.read("/BkpfSet", {
                //     urlParameters: {
                //         // "$expand": "BkpfToBseg",
                //         "$format": "json"
                //     },
                //     success: function (oData) {
                //         console.log("Data read successfully:", oData);
                //     },
                //     error: function (oError) {
                //         console.error("Error reading data:", oError);
                //     }
                // });

                // Set the model to the core of the application

            }

        });
    }
);