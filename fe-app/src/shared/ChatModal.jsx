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
import { WebSocketContext } from "../config/WebSocketContext";
import { useDispatch, useSelector } from "react-redux";
import { sendMessages, addNewMessage, createSession, loadMessagesForSession, fetchSessionMessages } from "../store/Message/Action";
import { API_BASE_URL } from "../config/api";

function ChatModal({ open, handleClose, hostName, userName, hostId, userId }) {
  const wsConnection = useContext(WebSocketContext);
  const [newMessage, setNewMessage] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState();
  const { message } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Tách riêng logic fetch messages
  const fetchMessages = useCallback(() => {
    if (currentSessionId) {
      dispatch(fetchSessionMessages(currentSessionId))
        .catch(err => console.error("Error fetching messages:", err));
    }
  }, [currentSessionId, dispatch]);

  // Fetch messages khi mở modal và có session
  useEffect(() => {
    if (open) {
      const existingSession = message?.sessionsByHost?.[hostId];
      if (existingSession) {
        setCurrentSessionId(existingSession.id);
      } else {
        dispatch(createSession(hostId))
          .then((data) => {
            setCurrentSessionId(data.id);
          })
          .catch((error) => {
            console.error("Error creating or retrieving session:", error);
          });
      }
    }
  }, [open, hostId, dispatch, message?.sessionsByHost]);

  useEffect(() => {
    if (open&&currentSessionId) {
      fetchMessages();
    }
  }, [open, currentSessionId, fetchMessages]);

  // WebSocket subscription
  useEffect(() => {
    if (wsConnection && wsConnection.connected && currentSessionId) {
      const topic = `/topic/messages/${currentSessionId}`;
      const subscription = wsConnection.subscribe(topic, (message) => {
        const messageBody = JSON.parse(message.body);
        // Thay vì tải lại, thêm trực tiếp tin nhắn vào store
        dispatch(addNewMessage(messageBody));
      });
      return () => {
        if (subscription) subscription.unsubscribe();
      };
    }
  }, [wsConnection, currentSessionId]);

  const sendMessage = () => {
    if (!currentSessionId) return;

    const values = {
      content: newMessage,
      senderId: userId,
      receiverId: hostId,
      chatSession: currentSessionId,
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

  // Lọc tin nhắn theo session hiện tại
  const sortedMessages = (message?.messagesRoom || []).sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
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
          Chat with {hostName}
        </Typography>
        <hr />

        <Box sx={{ flex: 1, overflow: "auto" }}>
          <List>
            {message?.messagesRoom?.map((msg, index) => {
              const isUserSender = (msg.sender.id === userId);
              return (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: isUserSender ? "flex-end" : "flex-start",
                  }}
                >
                  <ListItemText
                    primary={msg?.content}
                    sx={{
                      background: isUserSender ? "#e0f7fa" : "#ffebee",
                      borderRadius: "10px",
                      padding: "6px 12px",
                      maxWidth: "75%",
                      border: isUserSender ? "1px solid blue" : "1px solid red",
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

export default ChatModal;
