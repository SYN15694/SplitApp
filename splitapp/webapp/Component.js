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
            }

        });
    }
);