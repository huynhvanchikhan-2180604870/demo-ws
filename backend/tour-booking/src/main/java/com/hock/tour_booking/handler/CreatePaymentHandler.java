//package com.hock.tour_booking.handler;
//
//import com.hock.tour_booking.config.ZaloPayConfig;
//import com.hock.tour_booking.dtos.BaseError;
//import com.hock.tour_booking.dtos.BaseResultWithData;
//import com.hock.tour_booking.dtos.PaymentLinkDtos;
//import com.hock.tour_booking.dtos.zalopay.request.CreatePayRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.util.UUID;
//
//@Service
//public class CreatePaymentHandler {
//    private final ZaloPayConfig zaloPayConfig;
//
//    @Autowired
//    public CreatePaymentHandler(ZaloPayConfig zaloPayConfig) {
//        this.zaloPayConfig = zaloPayConfig;
//    }
//
//    public BaseResultWithData<PaymentLinkDtos> createPayment(String paymentContent, long amount) {
//        BaseResultWithData<PaymentLinkDtos> result = new BaseResultWithData<>();
//        try {
//            // Tạo mã giao dịch duy nhất
//            String appTransId = UUID.randomUUID().toString();
//            String embedData = "{\"promotioninfo\":\"\",\"merchantinfo\":\"embeddata123\"}";
//            String item = "[{\"itemid\":\"knb\",\"itemname\":\"kim nguyen bao\",\"itemprice\":198400,\"itemquantity\":1}]";
//
//            CreatePayRequest request = new CreatePayRequest(
//                    zaloPayConfig.getAppId(),
//                    zaloPayConfig.getAppUser(),
//                    Instant.now().toEpochMilli(),
//                    amount,
//                    appTransId,
//                    paymentContent,
//                    embedData,
//                    item,
//                    zaloPayConfig.getRedirectUrl()
//            );
//
//            request.makeSignature(zaloPayConfig.getKey1());
//            String response = request.getLink(zaloPayConfig.getPaymentUrl());
//
//            if (response.contains("\"returncode\":1")) {
//                PaymentLinkDtos paymentLink = new PaymentLinkDtos();
//                paymentLink.setPaymentId(appTransId);
//                paymentLink.setPaymentUrl(response);
//                result.set(true, "Success", paymentLink);
//            } else {
//                result.set(false, "Failed to create payment link");
//                result.getErrors().add(new BaseError("ZaloPayError", response));
//            }
//        } catch (Exception e) {
//            result.set(false, "Error creating payment link");
//            result.getErrors().add(new BaseError("Exception", e.getMessage()));
//        }
//        return result;
//    }
//}
