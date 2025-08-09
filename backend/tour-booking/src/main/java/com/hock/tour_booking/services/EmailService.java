package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.BookingDTO;
import com.hock.tour_booking.dtos.UserDTO;
import com.hock.tour_booking.entities.*;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;
    @Autowired
    private TourService tourService;
    @Autowired
    private BookingService bookingService;

    public void sendVerificationCode(String toEmail, String code, String title) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(code);
        mailSender.send(message);
    }

    public void sendEmailWithBookingDetails(String toEmail, BookingDTO bookingDto) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Set recipient and subject
        helper.setTo(toEmail);
        helper.setSubject("Booking Confirmation - Order #" + bookingDto.getId());

        // Build the HTML email content
        String emailContent = buildBookingEmailContent(bookingDto);

        // Set the email content
        helper.setText(emailContent, true); // The second argument `true` indicates HTML content

        // Send the email
        mailSender.send(mimeMessage);
    }

    private String buildBookingEmailContent(BookingDTO bookingDto) throws Exception {
        User user = userService.findUserById(bookingDto.getUser());
        Tour tour = tourService.findTourById(bookingDto.getTour());

        // Tạo bảng hành trình tour
        StringBuilder itineraryTable = new StringBuilder();
        itineraryTable.append("<table style='width: 100%; border-collapse: collapse;'>");
        itineraryTable.append("<tr><th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Day</th>")
                .append("<th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Description</th></tr>");

        List<String> itinerary = tour.getItinerary();
        for (int i = 0; i < itinerary.size(); i++) {
            itineraryTable.append("<tr>")
                    .append("<td style='border: 1px solid #ddd; padding: 8px;'>Day ").append(i + 1).append("</td>")
                    .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(itinerary.get(i))
                    .append("</td>")
                    .append("</tr>");
        }
        itineraryTable.append("</table>");

        // Tạo nội dung email
        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Booking Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
                    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border: 1px solid #ddd;">
                        <h1 style="color: #333;">Thank you for booking with us!</h1>
                        <p>Dear <strong>%s</strong>,</p>
                        <p>We are pleased to confirm your booking with the following details:</p>
                        <ul>
                            <li><strong>Booking ID:</strong> %s</li>
                            <li><strong>Tour Name:</strong> %s</li>
                            <li><strong>Booking Date:</strong> %s</li>
                            <li><strong>Payment Status:</strong> %s</li>
                            <li><strong>Total Amount:</strong> %s VND</li>
                        </ul>
                        <h2 style="color: #333;">Tour Itinerary</h2>
                        %s
                        <h2 style="color: #333;">QR Code for Check-In</h2>
                        <img src="%s" alt="QR Code" style="display: block; margin: auto; max-width: 256px;" />
                        <p style="color: #555;">If you have any questions, please contact us at support@tourbooking.com.</p>
                        <p style="font-size: 14px; color: #999;">Thank you for choosing us!</p>
                    </div>
                </body>
                </html>
                """
                .formatted(
                        user.getUsername(), // Tên người dùng
                        bookingDto.getId(), // Booking ID
                        tour.getTitle(), // Tên tour
                        bookingDto.getBookingDate(), // Ngày đặt
                        bookingDto.getPaymentStatus(), // Trạng thái thanh toán
                        bookingDto.getTotalPrice(), // Tổng tiền
                        itineraryTable.toString(), // Bảng hành trình
                        bookingDto.getQrBase64() // QR Code dưới dạng Base64
                );
    }

    public void sendEmailReportToUser(String emailUser, Report report) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Đặt thông tin người nhận và tiêu đề
        helper.setTo(emailUser);
        helper.setSubject("Xác nhận gửi báo cáo - Mã báo cáo: " + report.getId());

        // Tạo nội dung email
        String noiDungEmail = taoNoiDungEmailBaoCao(report);

        // Đặt nội dung email
        helper.setText(noiDungEmail, true); // Tham số `true` để xác định nội dung HTML

        // Gửi email
        mailSender.send(mimeMessage);
    }

    private String taoNoiDungEmailBaoCao(Report report) {
        // Định dạng ngày giờ theo dd-MM-yyyy và HH:mm
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        // Định dạng ngày và thời gian từ createdAt
        String formattedDate = report.getCreatedAt().format(dateFormatter);
        String formattedTime = report.getCreatedAt().format(timeFormatter);

        // Chuẩn bị danh sách lý do báo cáo
        StringBuilder lyDo = new StringBuilder();
        if (report.isDescriptionMismatch()) {
            lyDo.append("<li>Tour không đúng như mô tả</li>");
        }
        if (report.isScheduleMismatch()) {
            lyDo.append("<li>Lịch trình tour không giống hợp đồng</li>");
        }
        if (report.isOverpricing()) {
            lyDo.append("<li>Kê giá</li>");
        }
        if (report.isGuideAttitude()) {
            lyDo.append("<li>Hướng dẫn viên có thái độ không tốt</li>");
        }
        if (report.isGuideOther()) {
            lyDo.append("<li>Hướng dẫn viên không chuyên nghiệp</li>");
        }
        if (report.isOther()) {
            lyDo.append("<li>Lý do khác: ").append(report.getOtherReason()).append("</li>");
        }

        return """
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Xác nhận gửi báo cáo</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
                    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border: 1px solid #ddd;">
                        <h1 style="color: #333;">Báo cáo của bạn đã được gửi thành công!</h1>
                        <p>Xin chào quý khách,</p>
                        <p>Chúng tôi đã nhận được báo cáo của bạn cho tour:</p>
                        <ul>
                            <li><strong>Tên tour:</strong> %s</li>
                            <li><strong>Mã báo cáo:</strong> %s</li>
                            <li><strong>Ngày báo cáo:</strong> %s</li>
                            <li><strong>Thời gian:</strong> %s</li>
                        </ul>
                        <h2 style="color: #333;">Chi tiết lý do báo cáo:</h2>
                        <ul>
                            %s
                        </ul>
                        <p style="color: #555;">Chúng tôi xin lỗi vì những bất tiện mà bạn đã gặp phải. Đội ngũ của chúng tôi sẽ xem xét báo cáo này và xử lý nhanh nhất có thể.</p>
                        <p style="color: #555;">Nếu cần hỗ trợ thêm, vui lòng liên hệ chúng tôi qua email: support@tourbooking.com.</p>
                        <p style="font-size: 14px; color: #999;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
                    </div>
                </body>
                </html>
                """
                .formatted(
                        report.getTourReport().getTitle(), // Tên tour
                        report.getId(), // Mã báo cáo
                        formattedDate, // Ngày báo cáo định dạng dd-MM-yyyy
                        formattedTime, // Thời gian định dạng HH:mm
                        lyDo.toString() // Danh sách lý do
                );
    }

    public void sendHostRegistrationPendingEmail(UserDTO userDto) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Đặt thông tin người nhận và tiêu đề
        helper.setTo(userDto.getEmail());
        helper.setSubject("Thông báo: Yêu cầu đăng ký host đang chờ duyệt");

        // Tạo nội dung email
        String emailContent = buildHostRegistrationPendingEmailContent(userDto);

        // Đặt nội dung email
        helper.setText(emailContent, true); // Tham số `true` để xác định nội dung HTML

        // Gửi email
        mailSender.send(mimeMessage);
    }

    private String buildHostRegistrationPendingEmailContent(UserDTO userDto) {
        return """
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thông báo đăng ký host</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
                    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border: 1px solid #ddd;">
                        <h1 style="color: #333;">Cảm ơn bạn đã đăng ký làm host!</h1>
                        <p>Xin chào <strong>%s</strong>,</p>
                        <p>Chúng tôi xin thông báo rằng yêu cầu đăng ký host của bạn đang chờ được duyệt. Đội ngũ của chúng tôi sẽ xem xét yêu cầu của bạn trong thời gian sớm nhất.</p>
                        <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email: support@tourbooking.com.</p>
                        <p style="font-size: 14px; color: #999;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
                    </div>
                </body>
                </html>
                """
                .formatted(userDto.getUsername()); // Tên người dùng
    }

    public void sendTourStatusUpdateToHost(Tour tour) throws Exception {
        // Lấy thông tin người chủ sở hữu tour (Host) từ đối tượng Tour
        User host = tour.getHost(); // Giả sử Tour có một trường 'host' là đối tượng User

        if (host != null) {
            // Tạo MimeMessage cho email
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            // Đặt thông tin người nhận và tiêu đề
            helper.setTo(host.getEmail());
            helper.setSubject("Cập nhật trạng thái tour - " + tour.getTitle());

            // Tạo nội dung email
            String emailContent = buildTourStatusUpdateEmailContent(tour);

            // Đặt nội dung email (HTML)
            helper.setText(emailContent, true);

            // Gửi email
            mailSender.send(mimeMessage);
        } else {
            throw new Exception("Host information is not available for the tour.");
        }
    }

    // Phương thức tạo nội dung email
    private String buildTourStatusUpdateEmailContent(Tour tour) {
        // Dịch trạng thái tour sang tiếng Việt
        String statusDescription = switch (tour.getStatus()) {
            case "CREATED" -> "Mới tạo";
            case "APPROVED" -> "Đã duyệt";
            case "CANCELLED" -> "Đã hủy";
            default -> "Chưa xác định";
        };

        // Tạo nội dung email HTML
        return """
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cập nhật trạng thái tour</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
                    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border: 1px solid #ddd;">
                        <h1 style="color: #333;">Cập nhật trạng thái tour</h1>
                        <p>Xin chào <strong>%s</strong>,</p>
                        <p>Chúng tôi xin thông báo rằng trạng thái của tour <strong>%s</strong> của bạn đã thay đổi. Dưới đây là chi tiết:</p>
                        <ul>
                            <li><strong>Mã tour:</strong> %s</li>
                            <li><strong>Tên tour:</strong> %s</li>
                            <li><strong>Trạng thái hiện tại:</strong> %s</li>
                        </ul>
                        <p style="color: #555;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email: support@tourbooking.com.</p>
                        <p style="font-size: 14px; color: #999;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
                    </div>
                </body>
                </html>
                """
                .formatted(
                        tour.getHost().getUsername(), // Tên Host
                        tour.getTitle(), // Tên Tour
                        tour.getId(), // Mã Tour
                        tour.getTitle(), // Tên Tour
                        statusDescription // Trạng thái Tour
                );
    }

    public void sendTourPostedToHost(Tour tour) throws Exception {
        // Lấy thông tin người chủ sở hữu tour (Host) từ đối tượng Tour
        User host = tour.getHost(); // Giả sử Tour có một trường 'host' là đối tượng User

        if (host != null) {
            // Tạo MimeMessage cho email
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            // Đặt thông tin người nhận và tiêu đề
            helper.setTo(host.getEmail());
            helper.setSubject("Tour mới của bạn đã được đăng tải thành công - " + tour.getTitle());

            // Tạo nội dung email
            String emailContent = buildTourPostedEmailContent(tour);

            // Đặt nội dung email (HTML)
            helper.setText(emailContent, true);

            // Gửi email
            mailSender.send(mimeMessage);
        } else {
            throw new Exception("Host information is not available for the tour.");
        }
    }

    // Phương thức tạo nội dung email
    private String buildTourPostedEmailContent(Tour tour) {
        // Tạo nội dung email HTML
        return """
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thông báo tour mới</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
                    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border: 1px solid #ddd;">
                        <h1 style="color: #333;">Tour của bạn đã được đăng tải thành công!</h1>
                        <p>Xin chào <strong>%s</strong>,</p>
                        <p>Chúng tôi xin thông báo rằng tour <strong>%s</strong> của bạn đã được đăng tải thành công và hiện có sẵn trên hệ thống. Dưới đây là các chi tiết:</p>
                        <ul>
                            <li><strong>Mã tour:</strong> %s</li>
                            <li><strong>Tên tour:</strong> %s</li>
                            <li><strong>Ngày khởi hành:</strong> %s</li>
                            <li><strong>Trạng thái:</strong> %s</li>
                            <li><strong>Mô tả tour:</strong> %s</li>
                        </ul>
                        <p style="color: #555;">Chúng tôi sẽ tiếp tục theo dõi và hỗ trợ nếu cần thiết. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email: support@tourbooking.com.</p>
                        <p style="font-size: 14px; color: #999;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
                    </div>
                </body>
                </html>
                """
                .formatted(
                        tour.getHost().getUsername(), // Tên Host
                        tour.getTitle(), // Tên Tour
                        tour.getId(), // Mã Tour
                        tour.getTitle(), // Tên Tour
                        tour.getDepartureDate(), // Ngày khởi hành
                        "Mới tạo", // Trạng thái Tour, giả sử tour mới có trạng thái "Mới tạo"
                        tour.getDescription() // Mô tả Tour
                );
    }

    public void sendHostRegistrationApprovalPending(HostRegister hostRegister) throws Exception {
        // Ensure that we have a valid email address to send the email to
        if (hostRegister.getEmail() == null || hostRegister.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email address is required.");
        }

        // Create a MimeMessage for the email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Set the recipient and the subject of the email
        helper.setTo(hostRegister.getEmail());
        helper.setSubject("Your Host Registration is Pending Approval");

        // Build the content of the email
        String emailContent = buildHostRegistrationApprovalPendingEmailContent(hostRegister);

        // Set the content of the email (HTML format)
        helper.setText(emailContent, true);

        // Send the email
        mailSender.send(mimeMessage);
    }

    // Helper method to build the HTML content for the registration pending approval
    // email
    private String buildHostRegistrationApprovalPendingEmailContent(HostRegister hostRegister) {
        return """
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thông báo đăng ký chờ duyệt</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
                    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border: 1px solid #ddd;">
                        <h1 style="color: #333;">Yêu cầu đăng ký của bạn đang chờ duyệt</h1>
                        <p>Xin chào <strong>%s</strong>,</p>
                        <p>Cảm ơn bạn đã đăng ký trở thành nhà cung cấp tour tại công ty chúng tôi. Yêu cầu đăng ký của bạn đang được xem xét và chờ duyệt.</p>
                        <h2>Thông tin đăng ký:</h2>
                        <ul>
                            <li><strong>Tên người dùng:</strong> %s</li>
                            <li><strong>CMND/CCCD:</strong> %s</li>
                            <li><strong>Email:</strong> %s</li>
                            <li><strong>Địa chỉ:</strong> %s</li>
                            <li><strong>Số điện thoại:</strong> %s</li>
                        </ul>
                        <p>Nếu có bất kỳ thắc mắc hoặc cần thêm thông tin, vui lòng liên hệ qua email: support@tourbooking.com.</p>
                        <p style="font-size: 14px; color: #999;">Trân trọng!</p>
                    </div>
                </body>
                </html>
                """
                .formatted(
                        hostRegister.getUsername(), // Tên người dùng
                        hostRegister.getUsername(), // Tên người dùng
                        hostRegister.getCin(), // CMND/CCCD
                        hostRegister.getEmail(), // Email
                        hostRegister.getAddress(), // Địa chỉ
                        hostRegister.getPhoneNumber() // Số điện thoại
                );
    }

    public void sendPromotionEmail(String toEmail, Promotion promotion) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("Khuyến mãi hấp dẫn: " + promotion.getDescription());

        // Tạo nội dung HTML
        String htmlContent = String.format(
                "<html>" +
                        "<head>" +
                        "<style>" +
                        "body {font-family: Arial, sans-serif;}" +
                        "h1 {color: #333;}" +
                        ".code {background-color: #f8d7da; color: #721c24; padding: 8px; font-size: 16px; border-radius: 4px;}" +
                        "p {color: #666;}" +
                        "</style>" +
                        "</head>" +
                        "<body>" +
                        "<h1>Khuyến mãi hấp dẫn!</h1>" +
                        "<p>Xin chào,</p>" +
                        "<p>Chúng tôi rất vui được thông báo về chương trình khuyến mãi mới: <strong>%s</strong>!</p>" +
                        "<p>Hãy sử dụng mã khuyến mãi <span class='code'><strong>%s</strong></span> để nhận được mức giảm giá <strong>%s</strong>% cho đến ngày <strong>%s</strong>.</p>" +
                        "<p>Áp dụng điều khoản và điều kiện.</p>" +
                        "<p>Trân trọng,<br/>Đội ngũ của bạn</p>" +
                        "</body>" +
                        "</html>",
                promotion.getDescription(),
                promotion.getCode(),
                promotion.getDiscountValue().toString(),
                promotion.getEndDate().toString()
        );

        helper.setText(htmlContent, true); // True indicates HTML email
        mailSender.send(mimeMessage);
    }


}
