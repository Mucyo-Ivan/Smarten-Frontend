import { useEffect, useState } from "react";
import { createWebSocket } from "../services/ws";

export const useWaterReadings = (province) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!province) return;

    const socket = createWebSocket(
      `ws://localhost:8000/ws/water-readings/${province}/`,
      (newData) => setData((prev) => [...prev, newData])
    );

    return () => socket.close();
  }, [province]);

  return data;
};
