import { useEffect, useState } from "react";
import { createWebSocket } from "../services/ws";

export const useLeakAlerts = (province) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!province) return;

    const socket = createWebSocket(
      `ws://localhost:8000/ws/leak-alerts/${province}/`,
      (alert) => setAlerts((prev) => [...prev, alert])
    );

    return () => socket.close();
  }, [province]);

  return alerts;
};
