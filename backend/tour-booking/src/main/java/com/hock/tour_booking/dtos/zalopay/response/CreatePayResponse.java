package com.hock.tour_booking.dtos.zalopay.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CreatePayResponse {
    @JsonProperty("return_code")
    private int returnCode;

    @JsonProperty("return_message")
    private String returnMessage;

    @JsonProperty("order_url")
    private String orderUrl;

    @JsonProperty("sub_return_code")
    private String subReturnCode;

    @JsonProperty("sub_return_message")
    private String subReturnMessage;
}
