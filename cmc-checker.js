/**
 * class CmcChecker
 */
const CmcChecker = {

    isDeviceInside: function (networksArray) {
        for (const network of networksArray) {
            let net = network.SSID;
            if (CmsWifiNames.includes(net)) {
                console.info("CmcChecker.isDeviceInside: Detected CMC network " + net + ". Means the device is on CMC territory.");
                return true;
            }
        }
        console.info("CmcChecker.isDeviceInside: no CMC network is detected. Means the device is NOT on CMC territory.");
        return false;
    },

    initAvailableNetworks: function (networksArray) {
        if (this.isDeviceInside(networksArray)) {
            document.getElementById("welcomeMessage").innerText = messageWhenInside;
        } else {
            document.getElementById("welcomeMessage").innerText = messageWhenOutside;
        }
    },

};

/**
 *   CmcChecker Initialisation
 */

{
    console.info("Start process cmc-checker.js");
    try {
        if (PhysicalBrowserWifiChecker.isPhysicalBrowser())
            PhysicalBrowserWifiChecker.startScanForAvailableNetworks(CmcChecker);
    } catch (e) {
        console.error('PhysicalBrowserWifiChecker startScanForAvailableNetworks ERROR: ' + e.toString());
    }
    console.info("End process cmc-checker.js");
}