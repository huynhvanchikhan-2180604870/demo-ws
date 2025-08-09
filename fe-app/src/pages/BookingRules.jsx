import { Box, Button, Modal } from '@mui/material';
import React from 'react';
import '../shared/booking-rules.css'

const BookingRules = ({ open, handleClose }) => {
    const rules = [
        {
            title: "1. Đặt vé",
            description: [
                "Khách hàng phải đặt vé trước ít nhất 3 ngày trước ngày khởi hành.",
                "Để đảm bảo chỗ ngồi, khách hàng nên đặt vé sớm, đặc biệt trong mùa cao điểm."
            ]
        },
        {
            title: "2. Thanh toán",
            description: [
                "Khách hàng cần thanh toán toàn bộ số tiền tour trước ngày khởi hành ít nhất 1 ngày.",
                "Chúng tôi chấp nhận các hình thức thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng hoặc tiền mặt."
            ]
        },
        {
            title: "3. Hủy vé",
            description: [
                "Hủy vé trước 7 ngày trước ngày khởi hành: Hoàn lại 100% tiền vé.",
                "Hủy vé từ 3 đến 6 ngày trước ngày khởi hành: Hoàn lại 50% tiền vé.",
                "Hủy vé trong vòng 2 ngày trước ngày khởi hành: Không hoàn lại tiền."
            ]
        },
        {
            title: "4. Thay đổi lịch trình",
            description: [
                "Nếu khách hàng muốn thay đổi ngày khởi hành, vui lòng thông báo trước ít nhất 48 giờ.",
                "Các thay đổi có thể phát sinh phí dịch vụ tùy thuộc vào từng trường hợp cụ thể."
            ]
        },
        {
            title: "5. Chính sách về trẻ em",
            description: [
                "Trẻ em dưới 5 tuổi được miễn phí vé nếu không sử dụng chỗ ngồi riêng.",
                "Trẻ em từ 5 đến 12 tuổi được giảm 50% giá vé."
            ]
        },
        {
            title: "6. Quy định về hành lý",
            description: [
                "Khách hàng được phép mang theo 1 vali và 1 túi xách nhỏ. Mọi hành lý vượt quá quy định sẽ bị tính phí.",
                "Chúng tôi không chịu trách nhiệm về mất mát hoặc hư hỏng hành lý trong suốt chuyến đi."
            ]
        },
        {
            title: "7. Chính sách bảo hiểm",
            description: [
                "Khách hàng nên mua bảo hiểm du lịch trước khi tham gia tour để bảo vệ quyền lợi của mình.",
                "Chúng tôi khuyến nghị khách hàng kiểm tra kỹ các điều khoản bảo hiểm."
            ]
        },
        {
            title: "8. Quy định về sức khỏe",
            description: [
                "Khách hàng cần thông báo cho chúng tôi về bất kỳ vấn đề sức khỏe nào có thể ảnh hưởng đến chuyến đi.",
                "Chúng tôi có quyền từ chối phục vụ nếu khách hàng không đủ sức khỏe để tham gia tour."
            ]
        },
        {
            title: "9. Chính sách hoàn tiền",
            description: [
                "Trong trường hợp tour bị hủy do điều kiện thời tiết hoặc lý do bất khả kháng, khách hàng sẽ được hoàn lại toàn bộ tiền vé hoặc chuyển sang tour khác.",
                "Các khoản phí không hoàn lại sẽ được thông báo rõ ràng trước khi đặt tour."
            ]
        },
        {
            title: "10. Quy định khác",
            description: [
                "Chúng tôi có quyền thay đổi lịch trình tour trong trường hợp bất khả kháng.",
                "Khách hàng cần tuân thủ các quy định của hướng dẫn viên và công ty trong suốt chuyến đi."
            ]
        },
    ];

    return (
        <div className="booking__rules">
            <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="booking-rules-title"
          aria-describedby="booking-rules-description"
        >
          <Box sx={style}>
            <h2 id="booking-rules-title" className='text-center'>Quy định đặt vé</h2>
            <div style={{ maxHeight: "70vh", overflowY: "auto", maxWidth:'70vw' }}>
              {rules.map((rule, index) => (
                <div key={index} className="rule">
                  <h3>{rule.title}</h3>
                  <ul>
                    {rule.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-2 p-2">
            <button onClick={handleClose} className='text-center btn_accept p-3 ps-4 pe-4'style={{border: '1px solid #FFCFB3', background:"white", borderRadius:'13px', fontSize:"20px", minWidth:'200px'}}>
              Đồng ý
            </button>
            </div>
          </Box>
        </Modal>
        </div>
      );
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "none",
        boxShadow: 24,
        padding: "20px",
        borderRadius: "20px",
        overflowY: "auto",
      };

export default BookingRules;