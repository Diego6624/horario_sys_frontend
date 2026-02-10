import { Client } from "@stomp/stompjs";

let stompClient = null;

// ===============================
// 🔌 Conectar
// ===============================
export const connectSocket = (onMessage) => {

  stompClient = new Client({
    brokerURL:
      "wss://horario-sys-backend.onrender.com/ws-horarios",

    reconnectDelay: 5000,
    debug: (str) => console.log(str),
  });

  stompClient.onConnect = () => {

    console.log("🟢 Socket conectado");

    stompClient.subscribe(
      "/topic/horarios",
      (message) => {
        onMessage(JSON.parse(message.body));
      }
    );
  };

  stompClient.activate();
};

// ===============================
// 🔌 Desconectar
// ===============================
export const disconnectSocket = () => {

  if (stompClient) {
    stompClient.deactivate();
    console.log("🔴 Socket desconectado");
  }
};
