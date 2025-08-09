package com.hock.tour_booking.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userReport;


    // Lý do báo cáo liên quan đến tour
    private boolean descriptionMismatch; // Tour không đúng như mô tả
    private boolean scheduleMismatch; // Lịch trình tour không giống hợp đồng
    private boolean overpricing; // Kê giá

    // Lý do báo cáo liên quan đến hướng dẫn viên
    private boolean guideAttitude; // Thái độ không tốt
    private boolean guideOther; // Hướng dẫn viên không chuyên nghiệp

    // Các lý do khác
    private boolean other; // Đánh dấu nếu lý do khác
    @Column(length = 500) // Giới hạn độ dài
    private String otherReason; // Nội dung lý do khác

    // Ngày tạo báo cáo
    @Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = java.time.LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Report{" +
                "id=" + id +
                ", userReport=" + userReport +
                ", tourReport=" + tourReport +
                ", descriptionMismatch=" + descriptionMismatch +
                ", scheduleMismatch=" + scheduleMismatch +
                ", overpricing=" + overpricing +
                ", guideAttitude=" + guideAttitude +
                ", guideOther=" + guideOther +
                ", other=" + other +
                ", otherReason='" + otherReason + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    @ManyToOne
    @JoinColumn(name = "tour_id")
    @JsonBackReference // Ngăn vòng lặp khi serialize JSON
    private Tour tourReport;

}
