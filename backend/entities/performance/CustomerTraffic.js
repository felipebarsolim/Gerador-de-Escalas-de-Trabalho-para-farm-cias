class CustomerTraffic {
    /**
     *
     * @param {Object} infoAboutTraffic
     */
    constructor({ id, dayOfWeek, hour, customerVolume }) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.hour = hour;
        this.customerVolume = customerVolume;
    }

    /**
     * Faz as verificações de erro necessárias vindas do input
     * @param {object} info
     * @returns {boolean}
     */

    static hasNoError(info) {
        const isHourOk = info.hour >= 7 && info.hour <= 23;
        const isVolumeOk =
            info.customerVolume >= 0 && Number.isInteger(info.customerVolume);

        return isHourOk && isVolumeOk;
    }
}

export default CustomerTraffic;
