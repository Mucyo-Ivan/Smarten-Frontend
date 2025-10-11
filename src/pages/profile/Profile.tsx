import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getUserDetails} from '@/services/api';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<null | {
    name: string;
    email: string;
    phone: string | null;
    registration_number: string | null;
    verified: boolean;
    is_active: boolean;
    profile_image: string | null;
  }>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getUserDetails();
        if (mounted) setUser(res.data);
      } catch (e: any) {
        setError(e?.response?.data?.error || 'Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || 'U';

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
              {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : error ? (
                <div className="text-sm text-red-600">{error}</div>
              ) : (
                <>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center">
                      {user?.profile_image ? (
                        <img
                          src={user.profile_image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold">{initial}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-xl font-semibold">{user?.name}</div>
                      <div className="text-sm text-gray-600">{user?.email}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-gray-500">Full Name</div>
                      <div className="text-sm font-medium">{user?.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm font-medium">{user?.email}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-sm font-medium">{user?.phone || '—'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Registration Number</div>
                      <div className="text-sm font-medium">{user?.registration_number || '—'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Verification Status</div>
                      <div className="text-sm font-medium">{user?.verified ? 'Verified' : 'Not verified'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Account Status</div>
                      <div className="text-sm font-medium">{user?.is_active ? 'Active' : 'Inactive'}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button onClick={() => navigate('/profile/edit')}>Edit Profile</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
export default Profile;