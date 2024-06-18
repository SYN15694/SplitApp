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

                // Create a new instance of the ODataModel
                this.oModel = new ODataModel("/sap/opu/odata/sap/ZFIDOC_SRV/", {
                    json: true,
                    loadMetadataAsync: true,
                    tokenHandling: true
                });

                // Set the model to the core of the application

                sap.ui.getCore().setModel(i18nModel, "i18n");
                sap.ui.getCore().setModel(this.oModel, "oDataModel");


                this.top = 10;
                this.skip = 0;



            },

            loadData: function () {
                this._busyDialog.open();
                this.oModel.read("/BkpfSet", {
                    urlParameters: {
                        "$expand": "BkpfToBseg",
                        "$format": "json",
                        "$top": this.top,
                        "$skip": this.skip
                    },
                    success: function (oData, oResponse) {
                        var jsonModel = this.getModel("documents");
                        if (!jsonModel) {
                            jsonModel = new sap.ui.model.json.JSONModel();
                            jsonModel.setProperty("/editable", false);
                            this.setModel(jsonModel, "documents");
                        }
                        var oOldData = jsonModel.getData();
                        var oNewData = jQuery.extend(true, {}, oOldData, oData);
                        jsonModel.setData(oNewData);
                        this.skip += 10;
                    }.bind(this),
                    error: function (oError) {
                        console.log("Error", oError);
                    }.bind(this)
                });
                this._busyDialog.close();
            }

            // loadData: function (oOwnerComponent) {
            //     oOwnerComponent._busyDialog.open();

            //     oOwnerComponent.oModel.read("/BkpfSet", {
            //         urlParameters: {
            //             "$expand": "BkpfToBseg",
            //             "$format": "json",
            //             "$top": oOwnerComponent.top,
            //             "$skip": oOwnerComponent.skip
            //         },

            //         success: (oData, oResponse) => {
            //             var jsonModel = oOwnerComponent.getView().getModel("documents");

            //             if (!jsonModel) {
            //                 jsonModel = new JSONModel();
            //                 jsonModel.setProperty("/editable", false);
            //                 oOwnerComponent.setModel(jsonModel, "documents"); // setting the model data
            //             }

            //             var oOldData = jsonModel.getData();
            //             var oNewData = jQuery.extend(true, {}, oOldData, oData); //merge old data with new data
            //             jsonModel.setData(oNewData); //set new data
            //             oOwnerComponent.skip += 10;
            //         },

            //         error: (oError) => {
            //             console.log("Error", oError);
            //         }
            //     });

            //     oOwnerComponent._busyDialog.close();
            // }

        });
    }
);