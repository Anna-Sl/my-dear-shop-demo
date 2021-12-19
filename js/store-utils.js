const storeWifiNames = ['TP-LINK_1A7E', 'ne-5G', 'Network2', 'Network3'];

const wifiNameToStore = {
    "TP-LINK_1A7E": "na-naberezhnoy",
    "ne-5G": "na-naberezhnoy",
    "Network1": "na-kievskoy",
    "Network2": "na-kievskoy"
}

const storeUtils = {

    isDeviceInside: function (wifiData) {
        const filteredWifiPoints = netScanner.filter(wifiData.points, {"names":storeWifiNames});
        if (filteredWifiPoints.length !== 0) {
            console.info("isDeviceInside: The device is in store");
            return true;
        }
        console.info("isDeviceInside: No known network is detected. Means the device is NOT on store territory.");
        return false;
    },

    getStoreName: function (wifiData) {
        const filteredWifiPoints = netScanner.filter(wifiData.points, {"names": storeWifiNames});
        if (filteredWifiPoints.length !== 0) {
            const detectedWifi = filteredWifiPoints[0].name;
            return wifiNameToStore[detectedWifi];
        } else {
            console.error("No known wifi names");
        }
    },

    updateStoreNameOnPage: function (storeName) {

    },

    updateGoodsForStore: function (storeName) {
    let goods = $("#goods").children();
    // there should be call to server for data
    // ...
    if (!storeName) {
        goods.each(function () {
            $(this).find('div').html('В КОРЗИНУ')
        });
        // every card has name "В корзину"
    } else {
        // cards should be changed to one of 4 states with short delay
        // 1) "В корзину" - таких должно быть большинство
        // 2) "Отсутствует" и карточка белая
        // 3) "Акция!" надпись зеленая
        // 4) "Осталось мало" - надпись желтая
        goods.each(function () {
            let divTitle = $(this).find('div');
            let rnd = Math.floor(Math.random() * 8);

            $(this).removeClass('shop-image-grayed');
            $(this).removeClass('font-color-green');
            $(this).removeClass('font-color-yellow');

            if (rnd === 0) {
                divTitle.html('ЗАКОНЧИЛСЯ');
                $(this).addClass('shop-image-grayed');
            } else if (rnd === 1) {
                divTitle.html('СКИДКА 10%');
                $(this).addClass('font-color-green');
            } else if (rnd === 2) {
                divTitle.html('3 ШТ.');
                $(this).addClass('font-color-yellow');
            } else {
                divTitle.html('В КОРЗИНУ');
            }
        });
    }
},

    updateCategoriesOrder: function (bleData) {
        const wifiName = netScanner.wifi.getCached()
        const storeName = storeUtils.getStoreName(wifiName);

        // beacons = netScanner.ble.getDetectedNamesWithPrefix(storeName);
        // заглушка
        let beacons = ["na-naberezhnoy_3d-printer", "na-naberezhnoy_camera", "na-naberezhnoy_laptop", "na-naberezhnoy_smartphone"];
        beacons.sort(() => (Math.random() > .5) ? 1 : -1);


        $('#button_update_location').html("Обновляем ...");

        setTimeout(function () {
            $('#button_update_location').html("Обновить локацию");
            let goods = $("#shop-list").children();
            goods.each(function () {
                $(this).hide();
            });

            $($(beacons).get().reverse()).each(function (index, value) {
                $('#'+value.replace("na-naberezhnoy"+"_", "")).insertBefore($("#shop-list").children().first());
            });

            let delay = 0;
            goods.each(function () {
                let el = this;
                setTimeout(function () {
                    $(el).show();
                }, delay);
                delay += 100;
            });
        }, 1500);
    },

    updateLocation: function () {
        const options = {
            "sorted":true,
            "duration":1000,
            "scanIfOlder":5000,
            "names": ["LYWSD03MMC", "RMC-M92S"],
        };
        netScanner.ble.scan(this.updateCategoriesOrder, displayErrorMessage, options);
    },

    callConsultant: function () {
        let options = {
            "sorted":true,
            "duration":1000,
            "scanIfOlder":1000,
            // "names": ["LYWSD03MMC", "RMC-M92S"],
        };
        // netScanner.ble.scan(sendRequestToServerForConsultant, displayErrorMessage, options);
        netScanner.wifi.scan(function () {
            console.info("scan callback is called");
        }, displayErrorMessage, options);
    },

};

function displayErrorMessage(error) {
    // display sorry message
}

function sendRequestToServerForConsultant(points) {
    // ...
    // server.sendRequest(storeName, points);
    // ...
}

function selectCategory(category) {
    let goods = $("#goods").children();
    goods.each(function (index) {
        let text = $(this).attr('x-cat');
        //console.log( index + ": " + $(this).text() );
        if (text === category)
            $(this).show();
        else
            $(this).hide();
    });
}

