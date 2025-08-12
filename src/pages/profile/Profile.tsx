import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout title="Profile">
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32">
        <div className="max-w-3xl mx-auto py-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>View your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">W</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-gray-500">Full Name</div>
                  <div className="text-sm font-medium">WASAC Admin</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm font-medium">admin@wasac.rw</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-sm font-medium">+250 788 123 456</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Timezone</div>
                  <div className="text-sm font-medium">Africa/Kigali</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => navigate('/profile/edit')}>Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
