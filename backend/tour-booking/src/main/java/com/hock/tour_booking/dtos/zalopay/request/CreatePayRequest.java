package com.hock.tour_booking.dtos.zalopay.request;

import com.hock.tour_booking.utils.helper.HashHelper;
import lombok.Data;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

@Data
public class CreatePayRequest {
    private int appId;
    private String appUser;
    private long appTime;
    private long amount;
    private String appTransId;
    private String description;
    private String embedData;
    private String item;
    private String returnUrl;
    private String mac;

    public CreatePayRequest(int appId, String appUser, long appTime, long amount, String appTransId, String description, String embedData, String item, String returnUrl) {
        this.appId = appId;
        this.appUser = appUser;
        this.appTime = appTime;
        this.amount = amount;
        this.appTransId = appTransId;
        this.description = description;
        this.embedData = embedData;
        this.item = item;
        this.returnUrl = returnUrl;
    }

    // Tạo chữ ký HMAC
    public void makeSignature(String key) {
        String data = appId + "|" + appTransId + "|" + appUser + "|" + amount + "|" + appTime + "|" + embedData + "|" + item;
        System.out.println("Data for MAC: " + data); // Log chuỗi dữ liệu
        this.mac = HashHelper.hmacSHA256(data, key);
        System.out.println("Generated MAC: " + this.mac); // Log chữ ký
    }

    // Chuyển Map thành chuỗi x-www-form-urlencoded
    private String buildFormUrlEncoded(Map<String, String> params) {
        StringJoiner joiner = new StringJoiner("&");
        params.forEach((key, value) -> {
            try {
                joiner.add(URLEncoder.encode(key, StandardCharsets.UTF_8) + "=" + URLEncoder.encode(value, StandardCharsets.UTF_8));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        return joiner.toString();
    }

    // Phương thức gửi yêu cầu tới ZaloPay
    public String getLink(String paymentUrl) throws Exception {
        Map<String, String> content = new HashMap<>();
        content.put("appid", String.valueOf(appId));
        content.put("appuser", appUser);
        content.put("apptime", String.valueOf(appTime));
        content.put("amount", String.valueOf(amount));
        content.put("apptransid", appTransId);
        content.put("description", description);
        content.put("embeddata", embedData);
        content.put("item", item);
        content.put("returnurl", returnUrl);
        content.put("mac", mac);

        String formEncodedData = buildFormUrlEncoded(content);
        System.out.println("Sending Request to ZaloPay: " + formEncodedData); // Log dữ liệu gửi đi

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(paymentUrl))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(formEncodedData))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response: " + response.body()); // Log phản hồi
        return response.body();
    }
}
