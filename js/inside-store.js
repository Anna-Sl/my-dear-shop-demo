function openedInPhysicalBrowser(wifiData, bleData) {
    if (!bleData.isEnabled) {
        document.getElementById("button_call_consultant").style.visibility="hidden";
    }
    const storeName = storeUtils.getStoreName(wifiData);
    storeUtils.updateStoreNameOnPage(storeName);
    storeUtils.updateGoodsForStore(storeName);
    netScanner.ble.onAvailabilityChanged = changeButtonVisibility;
    if (netScanner.ble.isEnabled) {
        startPeriodicScanTiUpdateCategories();
    }
}

function startPeriodicScanTiUpdateCategories() {
    setTimeout(function() {
        let options = {
            sort: true,
            duration: 1000,
            prefixName: [storeName]
        }
        netScanner.ble.scan(storeUtils.updateCategoriesOrder, null, options);
    }, 2000);
}

function changeButtonVisibility(isEnabled) {
    if (isEnabled) {
        document.getElementById("button_call_consultant").style.visibility="visible";
        startPeriodicScanTiUpdateCategories();
    } else {
        document.getElementById("button_call_consultant").style.visibility="hidden";
    }
}



