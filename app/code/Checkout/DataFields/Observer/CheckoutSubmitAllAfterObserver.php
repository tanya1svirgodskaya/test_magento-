<?php

namespace Checkout\DataFields\Observer;
class CheckoutSubmitAllAfterObserver implements \Magento\Framework\Event\ObserverInterface
{

    public function execute(\Magento\Framework\Event\Observer  $observer)
    {
        if(empty($observer->getEvent()->getOrder()) || empty($observer->getEvent()->getQuote())) {
            return $this;
        }
        $shippingAddress = $observer->getEvent()->getQuote()->getShippingAddress();
        if ($shippingAddress->getDeliveryDate()) {
          $orderShippingAddress = $observer->getEvent()->getOrder()->getShippingAddress();
          $orderShippingAddress->setDeliveryDate($shippingAddress->getDeliveryDate())->save();
        }
        return $this;
    }
}
