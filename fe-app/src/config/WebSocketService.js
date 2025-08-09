import { useDispatch } from "react-redux";
import { addNewMessage } from "../store/Message/Action";
import { WebSocketContext } from "./WebSocketContext";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { IP_PUBLIC } from "./baseUrl";

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const connectWebSocket = () => {
      const ip = `http://${IP_PUBLIC}:8080/ws`;
      const socket = new SockJS(ip);
      const client = Stomp.over(socket);

      client.connect({}, () => {
        console.log('WebSocket connected');
        setStompClient(client);
      }, (error) => {
        console.error('WebSocket connection error:', error);
      });

      return () => {
        if (client) {
          client.disconnect();
        }
      };
    };

    const disconnect = connectWebSocket();
    return disconnect;
  }, []);

  const subscribeToSession = (sessionId) => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        `/topic/messages/${sessionId}`, 
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          // Dispatch action to add new message to Redux store
          dispatch(addNewMessage(receivedMessage));
        }
      );
      return subscription;
    }
  };

  return (
    <WebSocketContext.Provider value={{ 
      stompClient, 
      subscribeToSession 
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};