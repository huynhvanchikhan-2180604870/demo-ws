package com.hock.tour_booking.controllers;

import com.hock.tour_booking.config.ZaloPayConfig;
import com.hock.tour_booking.dtos.BookingDTO;
import com.hock.tour_booking.dtos.mapper.BookingDtoMapper;
import com.hock.tour_booking.dtos.response.PaymentRequest;
import com.hock.tour_booking.entities.Booking;
import com.hock.tour_booking.entities.Payment;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.services.*;
import com.hock.tour_booking.utils.helper.HashHelper;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/v2/payments")
public class PaymentController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private VNPayService vnPayService;

    public static String getCurrentTimeString(String format) {
        Calendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+7"));
        SimpleDateFormat fmt = new SimpleDateFormat(format);
        fmt.setCalendar(cal);
        return fmt.format(cal.getTimeInMillis());
    }

    @PostMapping("/create-order")
    public Map<String, Object> createPayment(@RequestHeader("Authorization") String jwt, @RequestBody PaymentRequest paymentRequest) throws Exception {
        Booking booking = bookingService.findBookingById(paymentRequest.getBookingId());
        Map<String, Object> response = new HashMap<>();
        switch (paymentRequest.getPaymentMethod()){
            case "ZALOPAY":
                response = createUrlZaloPay(booking, paymentRequest);
                break;
            case "VNPAY":
                response = vnPayService.createOrder(paymentRequest, booking);
                break;
            default:
                response.put("message", "Invalid payment method");
        }
        return response;
    }

    @PostMapping(value = "/getstatusbyapptransid")
    public Map<String, Object> getStatusByApptransid(@RequestHeader("Authorization") String jwt,
                                                     @RequestBody Map<String, Object> payload) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        String apptransid = (String) payload.get("apptransid");
        String qrBase64 = (String) payload.get("qrBase64");
        String appid = ZaloPayConfig.APP_ID;
        String key1 = ZaloPayConfig.KEY1;
        String data = appid + "|" + apptransid + "|" + key1; // appid|apptransid|key1
        String mac = HashHelper.hmacSHA256(data, key1);
        Payment payment = paymentService.findByTransactionId(apptransid);
        payment.setStatus("PAIED");
        paymentService.updatePayment(payment);
        Booking booking = bookingService.findBookingById(payment.getBooking().getId());

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("appid", appid));
        params.add(new BasicNameValuePair("apptransid", apptransid));
        params.add(new BasicNameValuePair("mac", mac));

        URIBuilder uri = new URIBuilder("https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid");
        uri.addParameters(params);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet get = new HttpGet(uri.build());

        CloseableHttpResponse res = client.execute(get);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;

        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }

        System.out.println("resultJsonStr - " +resultJsonStr.toString());

        JSONObject result = new JSONObject(resultJsonStr.toString());
        Map<String, Object> kq = new HashMap<String, Object>();
        kq.put("returncode", result.get("returncode"));
        kq.put("returnmessage", result.get("returnmessage"));
        kq.put("isprocessing", result.get("isprocessing"));
        kq.put("amount", result.get("amount"));
        kq.put("discountamount", result.get("discountamount"));
        kq.put("zptransid", result.get("zptransid"));
        String zptransid = result.get("zptransid").toString();
        if(booking != null){
            booking.setBookingStatus("PROCCESS");
            booking.setPaymentStatus("PAIED");
            booking.setPaymentMethod("ZALO_PAY");
            booking.setQrBase64(qrBase64);
            booking.setZtranstionId(zptransid);
            BookingDTO bookingDTO = BookingDtoMapper.toBookingDTO(booking);
            emailService.sendEmailWithBookingDetails(user.getEmail(), bookingDTO);
//            System.out.println("qrBase64: " + qrBase64);
            bookingService.updateBooking(bookingDTO);
        }
        kq.put("bookingId", booking.getId());
        kq.put("tour", booking.getTour());
        kq.put("user", booking.getUser());
        kq.put("paymentStatus", payment.getStatus());
        return kq;
    }

    @PostMapping(value = "/refund")
    public Map<String, Object> RefundPayment(@RequestHeader("Authorization") String jwt, @RequestBody UUID bookingId) throws Exception {

        Random rand = new Random();
        Booking booking = bookingService.findBookingById(bookingId);
        if (booking == null) {
            throw new Exception();
        }

        long timestamp = System.currentTimeMillis();
        String uid = timestamp + "" + (111 + rand.nextInt(888));

        Map<String, Object> order = new HashMap<String, Object>(){{
            put("appid", ZaloPayConfig.APP_ID);
            put("zptransid", booking.getZtranstionId());
            put("mrefundid", getCurrentTimeString("yyMMdd") +"_"+ ZaloPayConfig.APP_ID +"_"+uid);
            put("timestamp", timestamp);
            put("amount", booking.getTotalPrice());
            put("description", "ZaloPay Intergration Demo");
        }};

        String data = order.get("appid") +"|"+ order.get("zptransid") +"|"+ order.get("amount")
                +"|"+ order.get("description") +"|"+ order.get("timestamp");
        order.put("mac", HashHelper.hmacSHA256(ZaloPayConfig.KEY1, data));
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(ZaloPayConfig.REFUND);

        List<NameValuePair> params = new ArrayList<>();
        for (Map.Entry<String, Object> e : order.entrySet()) {
            params.add(new BasicNameValuePair(e.getKey(), e.getValue().toString()));
        }

        post.setEntity(new UrlEncodedFormEntity(params));

        CloseableHttpResponse res = client.execute(post);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }

        JSONObject result = new JSONObject(resultJsonStr.toString());
        if(result != null){
            booking.setPaymentStatus("REFUNDED");
            BookingDTO bookingDTO = BookingDtoMapper.toBookingDTO(booking);
            bookingService.updateBooking(bookingDTO);
        }
        Map<String, Object> kq = new HashMap<String, Object>();
        kq.put("returncode", result.get("returncode"));
        kq.put("returnmessage", result.get("returnmessage"));
        kq.put("refundid", result.get("refundid"));
        return order;
    }


    private Map<String, Object> createUrlZaloPay(Booking booking, PaymentRequest paymentRequest) throws IOException {
        String item1 = "[{\"itemid\":\"knb\",\"itemname\":\"kim nguyen bao\",\"itemprice\":198400,\"itemquantity\":1}]";
        System.out.println("current item"+ item1);
        String item = String.format(
                "[{\"itemid\":\"%s\",\"itemname\":\"%s\",\"itemprice\":%d,\"itemquantity\":%d}]",
                booking.getId().toString(),
                booking.getTour().getTitle(),
                booking.getTotalPrice(),
                booking.getNumPeople()
        );
        Map<String, Object> zalopay_Params = new HashMap<>();
        zalopay_Params.put("appid", ZaloPayConfig.APP_ID);
        zalopay_Params.put("apptransid", getCurrentTimeString("yyMMdd") + "_" + new Date().getTime());
        zalopay_Params.put("apptime", System.currentTimeMillis());
        zalopay_Params.put("appuser", paymentRequest.getAppuser());
        zalopay_Params.put("amount", paymentRequest.getAmount());
        zalopay_Params.put("description", "Thanh toan don hang #" + paymentRequest.getOrder_id());
        zalopay_Params.put("bankcode", "");
        zalopay_Params.put("item", item1);

        Map<String, String> embeddata = new HashMap<>();
        embeddata.put("merchantinfo", "eshop123");
        embeddata.put("promotioninfo", "");
        embeddata.put("redirecturl", ZaloPayConfig.REDIRECT_URL);

        Map<String, String> columninfo = new HashMap<String, String>();
        columninfo.put("store_name", "E-Shop");
        embeddata.put("columninfo", new JSONObject(columninfo).toString());
        zalopay_Params.put("embeddata", new JSONObject(embeddata).toString());


        String data = zalopay_Params.get("appid") + "|" + zalopay_Params.get("apptransid") + "|" + zalopay_Params.get("appuser") + "|" + zalopay_Params.get("amount") + "|" + zalopay_Params.get("apptime")  + "|" + zalopay_Params.get("embeddata") + "|" + zalopay_Params.get("item");
        zalopay_Params.put("mac", HashHelper.hmacSHA256(data, ZaloPayConfig.KEY1));
        System.out.println("data: " + data);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(ZaloPayConfig.CREATE_ORDER_URL);
        List<NameValuePair> params = new ArrayList<>();
        for (Map.Entry<String, Object> e : zalopay_Params.entrySet()) {
            params.add(new BasicNameValuePair(e.getKey(), e.getValue().toString()));
        }
        post.setEntity(new UrlEncodedFormEntity(params));
        CloseableHttpResponse res = client.execute(post);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }

        // save data payment
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(paymentRequest.getAmount());
        payment.setPaymentMethod("ZALO_PAY");
        payment.setTransactionId(zalopay_Params.get("apptransid").toString());
        Payment savePayment = paymentService.createPayment(payment);

        JSONObject result = new JSONObject(resultJsonStr.toString());
        Map<String, Object> kq = new HashMap<String, Object>();
        kq.put("returnmessage", result.get("returnmessage"));
        kq.put("orderurl", result.get("orderurl"));
        kq.put("returncode", result.get("returncode"));
        kq.put("zptranstoken", result.get("zptranstoken"));
        kq.put("transId", zalopay_Params.get("apptransid"));
        kq.put("bookingId", booking.getId());
        kq.put("paymentId", savePayment.getId());
        return kq;
    }
}
