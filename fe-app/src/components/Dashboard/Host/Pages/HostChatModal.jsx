import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { WebSocketContext } from "../../../../config/WebSocketContext";
import { API_BASE_URL } from "../../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMessage,
  fetchSessionMessages,
  loadMessagesForSession,
  sendMessages,
} from "../../../../store/Message/Action";

function HostChatModal({
  open,
  handleClose,
  hostId,
  hostName,
  userId,
  userName,
  sessionId,
}) {
  const wsConnection = useContext(WebSocketContext);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { message } = useSelector((state) => state);

  const dispatch = useDispatch();

  // Tách riêng logic fetch messages
  const fetchMessages = useCallback(() => {
    if (sessionId) {
      dispatch(fetchSessionMessages(sessionId))
        .catch(err => console.error("Error fetching messages:", err));
    }
  }, [sessionId, dispatch]);

  useEffect(() => {
    if (open&&sessionId) {
      fetchMessages();
    }
  }, [open, sessionId, fetchMessages,]);

  useEffect(() => {
  if (wsConnection && wsConnection.connected && sessionId) {
    const topic = `/topic/messages/${sessionId}`;
    const subscription = wsConnection.subscribe(topic, (message) => {
      const messageBody = JSON.parse(message.body);
      dispatch(addNewMessage(messageBody));
    });

    // Đảm bảo gửi phản hồi pong khi nhận ping từ server để giữ kết nối WebSocket
    wsConnection.on('ping', () => wsConnection.send('pong'));

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }
}, [wsConnection, sessionId, dispatch]);

  const sendMessage = () => {
    if (!sessionId) return;

    const values = {
      content: newMessage,
      senderId: hostId,
      receiverId: userId,
      chatSession: sessionId,
    };

    dispatch(sendMessages(values))
      .then((res) => {
        setNewMessage('');
        // Tự động fetch messages sau khi gửi
        fetchMessages();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        bottom: "20px",
      }}
    >
      <Box
        sx={{
          width: 400,
          height: 500,
          bgcolor: "background.paper",
          border: "none",
          outline: "none",
          borderRadius: "13px",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="h2" className="mb-4">
          Chat with {userName}
        </Typography>
        <hr />
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <List>
            {message?.messagesRoom?.map((msg, index) => {
              const isHostSender =msg.sender.id  === hostId;
              return (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: isHostSender ? "flex-end" : "flex-start",
                  }}
                >
                  <ListItemText
                    primary={msg.content}
                    sx={{
                      background: isHostSender ? "#e0f7fa" : "#ffebee",
                      borderRadius: "10px",
                      padding: "6px 12px",
                      maxWidth: "75%",
                      border: isHostSender ? "1px solid blue" : "1px solid red",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={sendMessage} variant="contained" sx={{ mt: 2 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default HostChatModal;
