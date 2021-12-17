/**
 * class PhysicalBrowserWifiChecker
 */
const PhysicalBrowserWifiChecker = {

    androidInterface: null,
    availableNetworks: null,
    whenScanned: null,

    initialize: function (androidInterface) {
        if (androidInterface == null) {
            console.error("PhysicalBrowserWifiChecker.initialize: androidInterface is null");
            return;
        }
        console.info("PhysicalBrowserWifiChecker.initialize: androidInterface is not null")
        this.androidInterface = androidInterface;
    },

    isPhysicalBrowser: function () {
        return this.androidInterface != null;
    },

    startScanForAvailableNetworks: function (whenScannedObject) {
        if (!this.androidInterface) {
            console.error('PhysicalBrowserWifiChecker.startScanForAvailableNetworks: androidInterface is not defined');
            return;
        }
        this.whenScanned = whenScannedObject;
        this.androidInterface.startScanForAvailableWiFis();
        console.info("PhysicalBrowserWifiChecker.startScanForAvailableNetworks: started");
    },

    initAvailableNetworks: function (networks) {
        console.info("PhysicalBrowserWifiChecker.initAvailableNetworks: networks = " + networks);
        this.availableNetworks = JSON.parse(networks);
        console.info("PhysicalBrowserWifiChecker.initAvailableNetworks: networks parsed to array with len = " + this.availableNetworks.length);
        this.whenScanned.initAvailableNetworks(this.availableNetworks);
    }

};

/**
 *   PhysicalBrowserWifiChecker Initialisation
 */
{
    try {
        if (typeof androidInterface != "undefined") {
            PhysicalBrowserWifiChecker.initialize(androidInterface);
        } else {
            console.info("Object androidInterface is not defined");
        }
    } catch (e) {
        console.error('PhysicalBrowserWifiChecker initialisation ERROR: ' + e.toString());
    }
}