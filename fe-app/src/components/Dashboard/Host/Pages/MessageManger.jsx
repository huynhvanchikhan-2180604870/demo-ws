import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { API_BASE_URL } from "../../../../config/api";
import { useSelector } from "react-redux";
import HostChatModal from "./HostChatModal";

import { formatDate, formatDateTime } from "../../../../utils/formatDateTime";
function MessageManager() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${API_BASE_URL}/api/v1/chats/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setChats(data);
  };

  const handleOpenChat = (chat) => {
    setSelectedChat(chat);
    console.log("selected chat: ", chats);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedChat(null);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chat ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Last Message</TableCell>
              <TableCell>Respond</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chats?.map((chat) => (
              <TableRow key={chat.id}>
                <TableCell>{chat.id}</TableCell>
                <TableCell>{chat?.createBy?.username}</TableCell>
                <TableCell>
                  {chat.messages && chat.messages.length > 0
                    ? formatDate(
                        chat.messages[chat.messages.length - 1].sentAt
                      )
                    : "No messages"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenChat(chat)}
                  >
                    Respond
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedChat && (
        <HostChatModal
          open={openModal}
          handleClose={handleCloseModal}
          hostName={auth.user.username} // Assuming auth.user is the host logged in
          hostId={auth.user.id}
          userName={selectedChat?.messages[0]?.sender?.username} // Example: The sender of the first message
          userId={selectedChat?.messages[0]?.sender?.id} // Assuming sender is the user to respond to
          sessionId={selectedChat?.id}
        />
      )}
    </div>
  );
}

export default MessageManager;
