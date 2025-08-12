import React, { useRef, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState('WASAC Admin');
  const [email, setEmail] = useState('admin@wasac.rw');
  const [phone, setPhone] = useState('+250 788 123 456');

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const onFileSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
    // Upload/persist file in real application
  };

  const handleSave: React.FormEventHandler = (e) => {
    e.preventDefault();
    // Persist profile values in real app
    navigate('/profile');
  };

  return (
    <MainLayout title="Edit Profile">
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32">
        <div className="max-w-3xl mx-auto py-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center">
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-2xl font-bold">W</span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={handleChangePhoto}>Change Photo</Button>
                    <input ref={fileInputRef} onChange={onFileSelected} type="file" accept="image/*" className="hidden" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => navigate('/profile')}>Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
