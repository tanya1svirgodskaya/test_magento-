/**
 * This file is part of the Klarna Onsitemessaging module
 *
 * (c) Klarna Bank AB (publ)
 *
 * For the full copyright and license information, please view the NOTICE
 * and LICENSE files that were distributed with this source code.
 */
define(['jquery'], function ($) {
    'use strict';

    var priceBoxWidget = {

        /**
         * Updating the price
         * @param {String} newPrices
         * @returns {*}
         */
        updatePrice: function (newPrices) {
            var ret = this._super(newPrices);

            if (document.querySelector('klarna-placement')) {
                // jscs:disable requireMultipleVarDecl
                // eslint-disable-next-line vars-on-top
                var price = Math.round(this.cache.displayPrices.finalPrice.amount * 100);

                document.querySelector('klarna-placement').dataset.purchaseAmount = price;
                window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
                window.KlarnaOnsiteService.push({
                    eventName: 'refresh-placements'
                });
            }

            return ret;
        }
    };

    return function (targetWidget) {
        $.widget('mage.priceBox', targetWidget, priceBoxWidget);

        return $.mage.priceBox;
    };
});
