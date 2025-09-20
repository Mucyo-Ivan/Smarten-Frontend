import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { globalWebSocketService } from '../services/GlobalWebSocketService';

interface WaterDataPoint {
  flow_rate_lph: number;
  status: string;
  timestamp: string;
  province: string;
}

interface DistrictDataPoint {
  id: number;
  district: string;
  flow_rate: number;
  status: string;
  timestamp: string;
  province: string;
}

interface CriticalReading {
  province: string;
  district: string;
  status: string;
  waterflow: number;
}

interface PastHourData {
  average: number;
  status: string;
}

interface DailyAverageData {
  average: number;
  status: string;
}

interface MonitorData {
  waterData: WaterDataPoint[];
  districtData: DistrictDataPoint[];
  criticalReadings: CriticalReading[];
  pastHour: { [province: string]: PastHourData };
  dailyAverage: { [province: string]: DailyAverageData };
  lastUpdated: string;
  currentDay: string;
}

interface MonitorDataContextType {
  monitorData: MonitorData;
  clearData: () => void;
  isDataStale: boolean;
  getConnectionStatus: () => Record<string, { isConnected: boolean; lastMessageTime: number }>;
}

const MonitorDataContext = createContext<MonitorDataContextType | undefined>(undefined);

const STORAGE_KEY = 'smarten_monitor_data';
const MAX_WATER_DATA_POINTS = 100;
const MAX_DISTRICT_DATA_POINTS = 10;

const getCurrentDay = () => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
};

const getDefaultData = (): MonitorData => ({
  waterData: [],
  districtData: [],
  criticalReadings: [],
  pastHour: {},
  dailyAverage: {},
  lastUpdated: new Date().toISOString(),
  currentDay: getCurrentDay(),
});

const loadDataFromStorage = (): MonitorData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultData();
    
    const parsed = JSON.parse(stored);
    const currentDay = getCurrentDay();
    
    // Check if data is from a different day
    if (parsed.currentDay !== currentDay) {
      console.log('New day detected, clearing old data');
      return getDefaultData();
    }
    
    // Check if data is too old (more than 24 hours)
    const lastUpdated = new Date(parsed.lastUpdated);
    const now = new Date();
    const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      console.log('Data is too old, clearing');
      return getDefaultData();
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading monitor data from storage:', error);
    return getDefaultData();
  }
};

const saveDataToStorage = (data: MonitorData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving monitor data to storage:', error);
  }
};

export const MonitorDataProvider = ({ children }: { children: ReactNode }) => {
  const [monitorData, setMonitorData] = useState<MonitorData>(getDefaultData);
  const [isDataStale, setIsDataStale] = useState(false);

  // Load data from storage on mount
  useEffect(() => {
    const loadedData = loadDataFromStorage();
    setMonitorData(loadedData);
  }, []);

  // Subscribe to global WebSocket service for all provinces
  useEffect(() => {
    const provinces = ['Northern', 'Southern', 'Eastern', 'Western', 'Kigali'];
    const unsubscribeFunctions: (() => void)[] = [];

    provinces.forEach(province => {
      const unsubscribe = globalWebSocketService.subscribe(province, (data) => {
        console.log(`📊 Received data for ${province}:`, data);
        
        // Update water data
        const waterDataPoint: WaterDataPoint = {
          flow_rate_lph: data.flow_rate_lph || 0,
          status: data.status || 'normal',
          timestamp: data.timestamp || new Date().toISOString(),
          province: data.province || province,
        };
        
        setMonitorData(prev => {
          const updatedData = {
            ...prev,
            waterData: [
              ...prev.waterData.filter(item => item.province !== province),
              waterDataPoint
            ].slice(-MAX_WATER_DATA_POINTS),
            lastUpdated: new Date().toISOString(),
            currentDay: getCurrentDay(),
          };
          return updatedData;
        });

        // Update district data
        if (data.districts && Array.isArray(data.districts)) {
          const newDistricts = data.districts.map((district, index) => ({
            id: Date.now() + index,
            district: district.district || 'Unknown',
            flow_rate: district.flow_rate_lph || 0, // Keep as lph to match backend
            status: district.status || 'normal',
            timestamp: data.timestamp || new Date().toISOString(),
            province: data.province || province,
          }));
          
          setMonitorData(prev => ({
            ...prev,
            districtData: [
              ...prev.districtData.filter(item => item.province !== province),
              ...newDistricts
            ].slice(-MAX_DISTRICT_DATA_POINTS),
            lastUpdated: new Date().toISOString(),
          }));
        }

        // Update critical readings
        if (data.critical_readings && Array.isArray(data.critical_readings)) {
          const processedReadings = data.critical_readings.map(reading => ({
            province: reading.province || province,
            district: reading.district || 'Unknown',
            status: reading.status || 'normal',
            waterflow: Number(reading.waterflow) || 0, // Keep as number for calculations
          }));
          
          setMonitorData(prev => ({
            ...prev,
            criticalReadings: [
              ...prev.criticalReadings.filter(item => item.province !== province),
              ...processedReadings
            ],
            lastUpdated: new Date().toISOString(),
          }));
        }

        // Update past hour
        if (data.past_hour) {
          setMonitorData(prev => ({
            ...prev,
            pastHour: {
              ...prev.pastHour,
              [province]: {
                average: (data.past_hour.average || 0),
                status: data.past_hour.status || 'normal'
              }
            },
            lastUpdated: new Date().toISOString(),
          }));
        }

        // Update daily average
        if (data.daily_average) {
          setMonitorData(prev => ({
            ...prev,
            dailyAverage: {
              ...prev.dailyAverage,
              [province]: {
                average: (data.daily_average.average || 0),
                status: data.daily_average.status || 'normal'
              }
            },
            lastUpdated: new Date().toISOString(),
          }));
        }
      });
      
      unsubscribeFunctions.push(unsubscribe);
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }, []);

  // Save data to storage whenever it changes
  useEffect(() => {
    saveDataToStorage(monitorData);
  }, [monitorData]);

  // Check for day changes and server disconnection
  useEffect(() => {
    const checkDataFreshness = () => {
      const currentDay = getCurrentDay();
      const now = new Date();
      const lastUpdated = new Date(monitorData.lastUpdated);
      const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
      
      // Mark as stale if data is older than 1 hour or from a different day
      if (monitorData.currentDay !== currentDay || hoursDiff > 1) {
        setIsDataStale(true);
      } else {
        setIsDataStale(false);
      }
    };

    checkDataFreshness();
    const interval = setInterval(checkDataFreshness, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [monitorData.lastUpdated, monitorData.currentDay]);

  const getConnectionStatus = () => {
    return globalWebSocketService.getConnectionStatus();
  };

  const clearData = () => {
    setMonitorData(getDefaultData());
    setIsDataStale(false);
  };

  return (
    <MonitorDataContext.Provider
      value={{
        monitorData,
        clearData,
        isDataStale,
        getConnectionStatus,
      }}
    >
      {children}
    </MonitorDataContext.Provider>
  );
};

export const useMonitorData = () => {
  const context = useContext(MonitorDataContext);
  if (context === undefined) {
    throw new Error('useMonitorData must be used within a MonitorDataProvider');
  }
  return context;
};
