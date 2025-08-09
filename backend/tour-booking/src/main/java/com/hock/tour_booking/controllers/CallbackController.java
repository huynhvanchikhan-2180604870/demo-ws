package com.hock.tour_booking.controllers;

import com.hock.tour_booking.utils.helper.HashHelper;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
public class CallbackController {
    private static final String KEY2 = "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny";

    @GetMapping("/api/v1/payment/callback")
    public Map<String, Object> handleCallback(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();

        try {
            String data = (String) payload.get("data");
            String receivedMac = (String) payload.get("mac");

            // Tạo chữ ký HMAC từ `data` sử dụng `KEY2`
            String calculatedMac = HashHelper.hmacSHA256(data, KEY2);
            System.out.println("Calculated MAC: " + calculatedMac);
            System.out.println("Received MAC: " + receivedMac);

            if (!calculatedMac.equals(receivedMac)) {
                // Chữ ký không khớp
                response.put("returncode", -1);
                response.put("returnmessage", "Invalid MAC");
                return response;
            }

            // Chữ ký hợp lệ, xử lý giao dịch
            JSONObject dataJson = new JSONObject(data);
            String appTransId = dataJson.getString("apptransid");

            // TODO: Xử lý logic cập nhật trạng thái đơn hàng tại đây
            System.out.println("Payment successful for transaction: " + appTransId);

            response.put("returncode", 1);
            response.put("returnmessage", "Success");
        } catch (Exception e) {
            response.put("returncode", 0);
            response.put("returnmessage", "Callback processing error: " + e.getMessage());
        }

        return response;
    }
}