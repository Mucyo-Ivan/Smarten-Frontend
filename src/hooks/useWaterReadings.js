import { useEffect, useState } from "react";
import { createWebSocket } from "../services/ws";

export const useWaterReadings = (province) => {
  const [waterData, setWaterData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [criticalReadings, setCriticalReadings] = useState([]);
  const [pastHour, setPastHour] = useState({ average: 0, status: 'normal' });
  const [dailyAverage, setDailyAverage] = useState({ average: 0, status: 'normal' });
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!province) {
      console.log("No province provided for WebSocket");
      setConnectionStatus('error');
      setErrorMessage('No province provided');
      return;
    }

    const normalizedProvince = province.charAt(0).toUpperCase() + province.slice(1).toLowerCase();
    const wsUrl = `ws://127.0.0.1:8000/ws/water-readings/${normalizedProvince}`;
    console.log(`Attempting to connect to WebSocket: ${wsUrl}`);

    const socket = createWebSocket(
      wsUrl,
      (newData) => {
        console.log("Received WebSocket data:", newData);
        // Validate message structure
        if (!newData) {
          console.error('Invalid WebSocket data format:', newData);
          setErrorMessage('Invalid WebSocket message format');
          return;
        }

        const { flow_rate_lph, status, timestamp, province: receivedProvince, districts, critical_readings, past_hour, daily_average } = newData;

        // Update province-level data
        setWaterData((prev) => [  
          ...prev,
          {
            flow_rate_lph: flow_rate_lph || 0,
            flow_rate: (flow_rate_lph || 0) / 3600, // Convert L/h to cm³/s
            status: status || 'normal',
            timestamp: timestamp || new Date().toISOString(),
            province: receivedProvince || normalizedProvince,
          },
        ].slice(-100));

        // Update district-level data
        if (districts && Array.isArray(districts)) {
          setDistrictData((prev) => {
            const newDistricts = districts.map((district, index) => ({
              id: prev.length + index + 1,
              district: district.district || 'Unknown',
              flow_rate: (district.flow_rate_lph || 0) / 3600, // Convert L/h to cm³/s
              status: district.status || 'normal',
              timestamp: timestamp || new Date().toISOString(),
            }));
            return [...newDistricts].slice(-10);
          });
        } else {
          console.warn('No valid districts data received:', districts);
        }

        // // Update criticalReadings
        // if (critical_readings) {
        //   setCriticalReadings({
        //     overflow: critical_readings.overflow !== null ? critical_readings.overflow / 3600 : null, // Convert L/h to cm³/s
        //     underflow: critical_readings.underflow !== null ? critical_readings.underflow / 3600 : null
        //   });
        // } else {
        //   console.warn('No critical_readings data received:', critical_readings);
        // }

           // Update criticalReadings
           if (critical_readings && Array.isArray(critical_readings)) {
            console.log("Processing critical_readings:", critical_readings);
            setCriticalReadings(critical_readings.map((reading, index) => {
              const waterflow = Number(reading.waterflow);
              console.log(`Reading ${index}: waterflow=${reading.waterflow}, converted=${waterflow}, isFinite=${isFinite(waterflow)}`);
              return {
                province: reading.province || normalizedProvince,
                district: reading.district || 'Unknown',
                status: reading.status || 'normal',
                waterflow: isFinite(waterflow) ? waterflow / 3600 : 0 // Convert L/h to cm³/s, fallback to 0
              };
            }));
          } else {
            console.warn('No valid critical_readings data received:', critical_readings);
            setCriticalReadings([]);
          }

        // Update pastHour (past minute in dev mode)
        if (past_hour) {
          setPastHour({
            average: (past_hour.average || 0) / 3600, // Convert L/h to cm³/s
            status: past_hour.status || 'normal'
          });
        } else {
          console.warn('No past_hour data received:', past_hour);
        }

        // Update dailyAverage
        if (daily_average) {
          setDailyAverage({
            average: (daily_average.average || 0) / 3600, // Convert L/h to cm³/s
            status: daily_average.status || 'normal'
          });
        } else {
          console.warn('No daily_average data received:', daily_average);
        }

        setConnectionStatus('connected');
        setErrorMessage(null);
      }
    );

    // WebSocket event handlers
    socket.onopen = () => {
      console.log(`✅ WebSocket connected: ${wsUrl}`);
      setConnectionStatus('connected');
      setErrorMessage(null);
    };

    socket.onerror = (error) => {
      console.error(`❌ WebSocket error: ${wsUrl}`, error);
      setConnectionStatus('error');
      setErrorMessage(`WebSocket error: ${error.message || 'Unknown error'}`);
    };

    socket.onclose = (event) => {
      console.log(`⚠️ WebSocket closed: ${wsUrl} (Code: ${event.code}, Reason: ${event.reason})`);
      setConnectionStatus('disconnected');
      setErrorMessage(`WebSocket closed: Code ${event.code}, Reason: ${event.reason || 'None'}`);
      // Retry logic
      const maxRetries = 5;
      let retryCount = 0;
      if (retryCount < maxRetries) {
        console.log(`Retrying WebSocket connection (${retryCount + 1}/${maxRetries})`);
        retryCount++;
        setTimeout(() => {
          setConnectionStatus('connecting');
        }, 3000 * retryCount);
      } else {
        console.error("Max WebSocket retries reached");
        setConnectionStatus('error');
        setErrorMessage('Max WebSocket retries reached');
      }
    };

    return () => {
      console.log(`Closing WebSocket for province: ${normalizedProvince}`);
      socket.close();
    };
  }, [province]);

  useEffect(() => {
    console.log("Updated waterData:", waterData);
    console.log("Updated districtData:", districtData);
    console.log("Updated criticalReadings:", criticalReadings);
    console.log("Updated pastHour:", pastHour);
    console.log("Updated dailyAverage:", dailyAverage);
    console.log("Connection status:", connectionStatus, "Error:", errorMessage);
  }, [waterData, districtData, criticalReadings, pastHour, dailyAverage, connectionStatus, errorMessage]);

  return { waterData, districtData, criticalReadings, pastHour, dailyAverage, connectionStatus, errorMessage };
};