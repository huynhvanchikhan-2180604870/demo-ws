package com.hock.tour_booking.utils.settings;

public class VerifyCode {
    public static String generateVerificationCode() {
        int code = 1000 + (int)(Math.random() * 9000); // Tạo số ngẫu nhiên từ 1000 đến 9999
        return String.valueOf(code);
    }
    public static boolean codeMatches(String inputCode, String storedCode) {
        return inputCode.equals(storedCode);
    }

}
