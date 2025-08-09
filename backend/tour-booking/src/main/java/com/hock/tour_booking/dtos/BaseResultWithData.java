package com.hock.tour_booking.dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BaseResultWithData<T> {
    private boolean success;
    private String message;
    private T data;
    private List<BaseError> errors = new ArrayList<>();

    public void set(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public void set(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
