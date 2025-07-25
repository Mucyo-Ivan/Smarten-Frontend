
import { useState } from 'react';
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

  return (
    <MainLayout title="Settings">
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-gray-800">
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
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
