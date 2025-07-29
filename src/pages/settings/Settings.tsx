
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/hooks/use-theme';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Database, 
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Moon,
  Sun
} from 'lucide-react';
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

const Settings = () => {
  const [name, setName] = useState('WASAC Admin');
  const [email, setEmail] = useState('admin@wasac.rw');
  const [phone, setPhone] = useState('+250 788 123 456');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [leakageAlerts, setLeakageAlerts] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [realTimeAlerts, setRealTimeAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [monthlyReports, setMonthlyReports] = useState(true);
  
  // System settings
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Africa/Kigali');
  const [dataRetention, setDataRetention] = useState('365');
  const [autoBackup, setAutoBackup] = useState(true);
  const [dataCompression, setDataCompression] = useState(false);

  // History tab state
  const [historyTab, setHistoryTab] = useState<'leakage' | 'readings' | 'control'>('leakage');
  const [selectedProvince, setSelectedProvince] = useState('north');
  const [dateRange, setDateRange] = useState('yesterday');

  // Mock data for provinces and districts (from Figma)
  const provinceData = {
    north: {
      name: 'North',
      icon: NorthIcon,
      color: 'bg-yellow-100',
      districts: [
        { id: 1, name: 'Musanze', status: 'underflow', value: 24 },
        { id: 2, name: 'Gakenke', status: 'normal', value: 24 },
        { id: 3, name: 'Rulindo', status: 'overflow', value: 24 },
        { id: 4, name: 'Burera', status: 'underflow', value: 24 },
        { id: 5, name: 'Gicumbi', status: 'normal', value: 24 },
      ],
    },
    south: {
      name: 'South',
      icon: SouthIcon,
      color: 'bg-blue-100',
      districts: [
        { id: 1, name: 'Huye', status: 'underflow', value: 24 },
        { id: 2, name: 'Nyanza', status: 'normal', value: 24 },
        { id: 3, name: 'Gisagara', status: 'overflow', value: 24 },
        { id: 4, name: 'Nyaruguru', status: 'normal', value: 24 },
        { id: 5, name: 'Kamonyi', status: 'underflow', value: 24 },
        { id: 6, name: 'Ruhango', status: 'normal', value: 24 },
        { id: 7, name: 'Muhanga', status: 'overflow', value: 24 },
        { id: 8, name: 'Nyamagabe', status: 'normal', value: 24 },
      ],
    },
    east: {
      name: 'East',
      icon: EastIcon,
      color: 'bg-orange-100',
      districts: [
        { id: 1, name: 'Bugesera', status: 'underflow', value: 24 },
        { id: 2, name: 'Nyagatare', status: 'normal', value: 24 },
        { id: 3, name: 'Gatsibo', status: 'overflow', value: 24 },
        { id: 4, name: 'Kayonza', status: 'normal', value: 24 },
        { id: 5, name: 'Kirehe', status: 'underflow', value: 24 },
        { id: 6, name: 'Ngoma', status: 'normal', value: 24 },
        { id: 7, name: 'Rwamagana', status: 'overflow', value: 24 },
      ],
    },
    west: {
      name: 'West',
      icon: WestIcon,
      color: 'bg-green-100',
      districts: [
        { id: 1, name: 'Nyabihu', status: 'underflow', value: 24 },
        { id: 2, name: 'Karongi', status: 'normal', value: 24 },
        { id: 3, name: 'Ngororero', status: 'overflow', value: 24 },
        { id: 4, name: 'Nyamasheke', status: 'normal', value: 24 },
        { id: 5, name: 'Rubavu', status: 'underflow', value: 24 },
        { id: 6, name: 'Rusizi', status: 'normal', value: 24 },
        { id: 7, name: 'Rutsiro', status: 'overflow', value: 24 },
      ],
    },
    kigali: {
      name: 'Kigali',
      icon: KigaliIcon,
      color: 'bg-purple-100',
      districts: [
        { id: 1, name: 'Gasabo', status: 'underflow', value: 24 },
        { id: 2, name: 'Nyarugenge', status: 'normal', value: 24 },
        { id: 3, name: 'Kicukiro', status: 'overflow', value: 24 },
      ],
    },
  };

  const dateRanges = [
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'past-week', label: 'Past week' },
    { value: 'past-month', label: 'Past Month' },
  ];

  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Profile updated',
      description: 'Your profile information has been updated successfully.',
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure both password fields match.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Password updated',
      description: 'Your password has been updated successfully.',
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleNotificationSave = () => {
    toast({
      title: 'Notification settings saved',
      description: 'Your notification preferences have been updated.',
    });
  };

  const handleSystemSave = () => {
    toast({
      title: 'System settings saved',
      description: 'Your system preferences have been updated.',
    });
  };

  const handleDataExport = () => {
    toast({
      title: 'Export started',
      description: 'Your data export will be ready for download shortly.',
    });
  };

  const handleDataImport = () => {
    toast({
      title: 'Import started',
      description: 'Your data is being imported. This may take a few minutes.',
    });
  };

  // 1. Add mock leakage data
  const leakageHistory = [
    {
      id: 1,
      date: '2025-03-06',
      day: 'TUE',
      time: '12:00 AM',
      waterLoss: 20,
      location: 'Kigali, Kicukiro, Kamashahi',
      severity: 'High',
      action: 'Yes',
      status: 'Investigating',
      resolved: {
        date: '2025-04-06',
        plumber: 'Nshimiyumukiza Aimable',
        note: 'There was a massive leakage that damage the pipe in a great amount, but it has been fixed and water is flowing again',
        success: true,
      },
    },
    {
      id: 2,
      date: '2025-03-14',
      day: 'FRI',
      time: '12:00 AM',
      waterLoss: 15,
      location: 'Kigali, Gasabo, Remera',
      severity: 'Medium',
      action: 'Yes',
      status: 'Resolved',
      resolved: {
        date: '2025-04-15',
        plumber: 'Uwimana Jean',
        note: 'Leakage fixed, water flow normal.',
        success: true,
      },
    },
  ];

  // 2. Add CSV download function for leakage
  function downloadLeakageCSV() {
    const header = 'Location,Date,Time,Severity,Status,Water Loss (cm³),Action\n';
    const rows = leakageHistory.map(l => `${l.location},${l.date},${l.time},${l.severity},${l.status},${l.waterLoss},${l.action}`).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leakage_report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 3. In the History TabsContent, render Leakage section if historyTab === 'leakage'
  // 4. Set default tab to 'leakage' when opening History
  // (No replacement needed, just ensure historyTab is initialized to 'leakage')

  return (
    <MainLayout title="Settings">
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7 bg-white dark:bg-gray-800">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                System
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Data
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Manage your personal information and account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">W</span>
                      </div>
                      <div>
                        <Button variant="outline" className="mr-3">Change Photo</Button>
                        <Button variant="ghost" className="text-red-600">Remove</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Enter your full name" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Enter your email" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          placeholder="Enter your phone number" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="admin">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">System Administrator</SelectItem>
                            <SelectItem value="operator">Operator</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 gap-2">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Configure how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Delivery Methods</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive critical alerts via SMS</p>
                        </div>
                        <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Push Notifications</Label>
                          <p className="text-sm text-gray-500">Browser push notifications</p>
                        </div>
                        <Switch checked={realTimeAlerts} onCheckedChange={setRealTimeAlerts} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Alert Types</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Leakage Alerts</Label>
                          <p className="text-sm text-gray-500">Get notified about water leakage detection</p>
                        </div>
                        <Switch checked={leakageAlerts} onCheckedChange={setLeakageAlerts} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">System Updates</Label>
                          <p className="text-sm text-gray-500">Notifications about system updates and maintenance</p>
                        </div>
                        <Switch checked={systemUpdates} onCheckedChange={setSystemUpdates} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Maintenance Alerts</Label>
                          <p className="text-sm text-gray-500">Scheduled maintenance notifications</p>
                        </div>
                        <Switch checked={maintenanceAlerts} onCheckedChange={setMaintenanceAlerts} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Weekly Reports</Label>
                          <p className="text-sm text-gray-500">Weekly system performance reports</p>
                        </div>
                        <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Monthly Reports</Label>
                          <p className="text-sm text-gray-500">Monthly analytics and insights</p>
                        </div>
                        <Switch checked={monthlyReports} onCheckedChange={setMonthlyReports} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleNotificationSave} className="bg-blue-500 hover:bg-blue-600 gap-2">
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Password & Security
                  </CardTitle>
                  <CardDescription>Update your password and security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input 
                          id="current-password" 
                          type={showPassword ? "text" : "password"}
                          value={currentPassword} 
                          onChange={(e) => setCurrentPassword(e.target.value)} 
                          placeholder="Enter current password" 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)} 
                          placeholder="Enter new password" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          placeholder="Confirm new password" 
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Password Requirements</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Include at least one number</li>
                        <li>• Include at least one special character</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <Label className="text-base">Enable 2FA</Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline">Setup 2FA</Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 gap-2">
                        <Save className="w-4 h-4" />
                        Update Password
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance & Theme
                  </CardTitle>
                  <CardDescription>Customize the look and feel of your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Theme</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                        <div className="bg-white rounded border shadow-sm p-3 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          <span className="font-medium">Light</span>
                        </div>
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={toggleTheme}>
                        <div className="bg-gray-800 rounded border shadow-sm p-3 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          <span className="font-medium">Dark</span>
                        </div>
                      </div>

                      <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer opacity-50">
                        <div className="bg-gradient-to-br from-white to-gray-100 rounded border shadow-sm p-3 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span className="font-medium">Auto</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Display Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Compact Mode</Label>
                          <p className="text-sm text-gray-500">Reduce spacing and padding for more content</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">High Contrast</Label>
                          <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
                      <Save className="w-4 h-4" />
                      Save Appearance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    System Preferences
                  </CardTitle>
                  <CardDescription>Configure system-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="rw">Kinyarwanda</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Kigali">Africa/Kigali (CAT)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                          <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Data Retention (days)</Label>
                      <Select value={dataRetention} onValueChange={setDataRetention}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="1095">3 years</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="dd/mm/yyyy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Automation</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Auto Backup</Label>
                          <p className="text-sm text-gray-500">Automatically backup data daily</p>
                        </div>
                        <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Data Compression</Label>
                          <p className="text-sm text-gray-500">Compress stored data to save space</p>
                        </div>
                        <Switch checked={dataCompression} onCheckedChange={setDataCompression} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSystemSave} className="bg-blue-500 hover:bg-blue-600 gap-2">
                      <Save className="w-4 h-4" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Management */}
            <TabsContent value="data" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Export Data
                    </CardTitle>
                    <CardDescription>Download your data for backup or analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Export Format</Label>
                      <Select defaultValue="csv">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="xlsx">Excel</SelectItem>
                          <SelectItem value="pdf">PDF Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="1y">Last year</SelectItem>
                          <SelectItem value="all">All data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={handleDataExport} className="w-full bg-blue-500 hover:bg-blue-600 gap-2">
                      <Download className="w-4 h-4" />
                      Export Data
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Import Data
                    </CardTitle>
                    <CardDescription>Import data from external sources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>File Format</Label>
                      <Select defaultValue="csv">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="xlsx">Excel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Drop files here or click to browse</p>
                      <input type="file" className="hidden" />
                    </div>
                    
                    <Button onClick={handleDataImport} className="w-full bg-green-500 hover:bg-green-600 gap-2">
                      <Upload className="w-4 h-4" />
                      Import Data
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Irreversible actions for your account and data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Reset All Settings</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                        This will reset all your settings to default values. Your data will remain intact.
                      </p>
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        Reset Settings
                      </Button>
                    </div>

                    <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Delete All Data</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                        This will permanently delete all water monitoring data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                        Delete All Data
                      </Button>
                    </div>
                    
                    <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Delete Account</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    History
                  </CardTitle>
                  <CardDescription>View historical readings, leakage, and control data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    {/* Top Tabs for Leakage, Readings, Control */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-100 rounded-full flex p-1">
                        <button onClick={() => setHistoryTab('leakage')} className={`px-6 py-2 rounded-full text-sm font-medium transition ${historyTab === 'leakage' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}>Leakage</button>
                        <button onClick={() => setHistoryTab('readings')} className={`px-6 py-2 rounded-full text-sm font-medium transition ${historyTab === 'readings' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}>Readings</button>
                        <button onClick={() => setHistoryTab('control')} className={`px-6 py-2 rounded-full text-sm font-medium transition ${historyTab === 'control' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}>Control</button>
                      </div>
                    </div>
                    {/* Province Selector and Date Range Dropdown (optional for leakage) */}
                    {historyTab === 'leakage' && (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <img src={provinceData[selectedProvince].icon} alt={provinceData[selectedProvince].name} className="w-8 h-8" />
                          <span className="font-bold text-lg" style={{ color: '#FFD600' }}>{provinceData[selectedProvince].name}</span>
                          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                            <SelectTrigger className="w-32 ml-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="north">North</SelectItem>
                              <SelectItem value="south">South</SelectItem>
                              <SelectItem value="east">East</SelectItem>
                              <SelectItem value="west">West</SelectItem>
                              <SelectItem value="kigali">Kigali</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {dateRanges.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        {/* Leakage Report Card */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-lg">Leakage Report</span>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2" onClick={downloadLeakageCSV}><Download className="w-4 h-4" />Download</Button>
                        </div>
                        {leakageHistory.map((l, idx) => (
                          <div key={l.id} className="w-full max-w-5xl mx-auto mb-10">
                            {/* Digital date header */}
                            <div className="flex justify-center mb-2">
                              <span className="font-mono text-2xl tracking-widest text-black">{l.day}-{l.date.split('-').reverse().join('/')}</span>
                            </div>
                            <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-stretch">
                              {/* Left: Leakage Detection */}
                              <div className="flex-1 min-w-[260px] flex flex-col justify-between">
                                <div>
                                  <div className="font-semibold text-lg mb-2">Leakage Detection</div>
                                  <div className="mb-2">
                                    <div className="text-gray-700 text-sm">{l.date.split('-').reverse().join('/')}<span className="ml-2">{l.time}</span></div>
                                  </div>
                                  <div className="flex items-end mb-2">
                                    <span className="text-3xl font-bold text-black">{l.waterLoss}</span>
                                    <span className="ml-1 text-base font-medium text-gray-700">cm³</span>
                                  </div>
                                  <div className="text-xs text-gray-500 mb-2">water lost</div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-gray-700 text-sm">{l.location}</span>
                                  </div>
                                  <div className="flex flex-col gap-1 mb-2">
                                    <div className="flex items-center gap-2 text-sm"><span className="font-semibold">Severity:</span> <span className="text-red-600 font-bold">{l.severity}</span></div>
                                    <div className="flex items-center gap-2 text-sm"><span className="font-semibold">Action:</span> <span className="text-gray-700 font-bold">{l.action}</span></div>
                                    <div className="flex items-center gap-2 text-sm"><span className="font-semibold">Status:</span> <span className="text-blue-600 font-bold">{l.status}</span></div>
                                  </div>
                                </div>
                                {/* Radio buttons: default to Resolved checked */}
                                <div className="flex items-center gap-6 mt-4">
                                  <label className="flex items-center gap-1 text-sm font-medium">
                                    <input type="radio" checked={true} readOnly className="accent-blue-600" /> Resolved
                                  </label>
                                  <label className="flex items-center gap-1 text-sm font-medium">
                                    <input type="radio" checked={false} readOnly className="accent-blue-600" /> Investigating
                                  </label>
                                </div>
                              </div>
                              {/* Right: Resolved leakage card - match previous Leakage page style */}
                              <div className="flex-1 min-w-[260px] bg-[#338CF5] rounded-2xl p-8 text-white relative flex flex-col justify-between shadow-lg">
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-lg">Resolved leakage</span>
                                    <button className="text-white/80 hover:text-white text-xs underline">Edit</button>
                                  </div>
                                  <div className="flex gap-8 mb-2">
                                    <div>
                                      <div className="text-xs text-white/80">Date</div>
                                      <div className="font-bold text-base">{l.resolved.date.split('-').reverse().join('/')}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-white/80">Plumber</div>
                                      <div className="font-bold text-base">{l.resolved.plumber}</div>
                                    </div>
                                  </div>
                                  <div className="mb-2">
                                    <div className="text-xs text-white/80 mb-1">Resolved note</div>
                                    <div className="text-sm font-medium leading-snug">{l.resolved.note}</div>
                                  </div>
                                </div>
                                {/* Success watermark */}
                                {l.resolved.success && (
                                  <span className="absolute bottom-6 right-6 text-[2.5rem] font-extrabold opacity-20 select-none pointer-events-none font-mono">Success</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    {/* Readings Report Card */}
                    {historyTab === 'readings' && (
                      <div className="bg-white rounded-xl shadow p-6 w-full max-w-5xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-lg">Readings Report</span>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2"><Download className="w-4 h-4" />Download</Button>
                        </div>
                        {/* Digital Date/Time/Month label - mock for now */}
                        <div className="flex justify-center mb-6">
                          <span className="font-mono text-2xl tracking-widest text-gray-700">00:00 AM</span>
                        </div>
                        {/* District Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                          {provinceData[selectedProvince].districts.map(d => (
                            <div key={d.id} className={`${provinceData[selectedProvince].color} rounded-xl p-4 flex flex-col items-start shadow-md min-w-[180px]`}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="w-7 h-7 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold">{d.id}</span>
                                <span className="font-semibold text-lg">{d.name}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                                <span className="text-sm font-medium">Waterflow</span>
                                <span className="text-sm font-bold ml-2">{d.value} cm³/h</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">Status</span>
                                {d.status === 'normal' && <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full font-semibold">normal</span>}
                                {d.status === 'underflow' && <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded-full font-semibold">underflow</span>}
                                {d.status === 'overflow' && <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full font-semibold">overflow</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Control Section (future implementation) */}
                    {historyTab === 'control' && (
                      <div className="bg-white rounded-xl shadow p-6 w-full max-w-5xl mx-auto">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Control Data
                          </CardTitle>
                          <CardDescription>Manage and control water distribution systems</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Control data management and system monitoring features will be available here.</p>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2">
                            <Shield className="w-4 h-4" />
                            View Control Dashboard
                          </Button>
                        </CardContent>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
