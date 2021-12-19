{
    function openedInPhysicalBrowser(wifiData, bleData) {
        console.info("index.js: openedInPhysicalBrowser: Received networkData: " + JSON.stringify(wifiData));
        if (wifiData.isEnabled && storeUtils.isDeviceInside(wifiData)) {
            location.replace("/my-dear-shop/inside-store.html");
        }
    }
}
