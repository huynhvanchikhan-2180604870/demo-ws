package com.hock.tour_booking.dtos.request;

import lombok.Data;

@Data
public class VerifyCodeRequest {
    private String email;       // Email của người dùng
    private String password;
    private String verify_code;  // Mã xác minh OTP
}
