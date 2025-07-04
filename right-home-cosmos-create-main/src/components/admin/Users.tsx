import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';
import Cookies from 'js-cookie';
import { Search, UserPlus, Shield } from 'lucide-react';
import { Loading } from '@/components/ui/loading';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from '@/context/AuthContext';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  isAdmin: boolean;
}

const Users = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user: currentUser } = useAuth();
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    isAdmin: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'delete' | 'promote' | 'demote') => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_URL}/admin/users/${userId}${action === 'delete' ? '' : `/${action}`}`, {
        method: action === 'delete' ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Failed to ${action} user`);
      }

      const data = await response.json();
      if (data.success) {
        fetchUsers(); // Refresh user list
        toast.success(data.message || `User ${action}d successfully`);
      } else {
        throw new Error(data.message || `Failed to ${action} user`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Failed to ${action} user`);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          phone: newUser.phone,
          address: newUser.address,
          role: newUser.isAdmin ? 'admin' : 'user',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('User added successfully');
        setIsDialogOpen(false);
        setNewUser({
          name: '',
          email: '',
          password: '',
          phone: '',
          address: '',
          isAdmin: false,
        });
        fetchUsers(); // Refresh user list
      } else {
        throw new Error(data.message || 'Failed to add user');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading loading={loading} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Loading loading={loading} />
      <Card className="bg-[#111] border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-white">User Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold text-black hover:bg-gold/90">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#111] border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new user account and set their permissions.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="bg-[#0A0A0A] border-gray-800 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="bg-[#0A0A0A] border-gray-800 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="bg-[#0A0A0A] border-gray-800 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="bg-[#0A0A0A] border-gray-800 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newUser.address}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    className="bg-[#0A0A0A] border-gray-800 text-white"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isAdmin">Admin Privileges</Label>
                  <Switch
                    id="isAdmin"
                    checked={newUser.isAdmin}
                    onCheckedChange={(checked) => setNewUser({ ...newUser, isAdmin: checked })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-gray-800 text-gray-400 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gold text-black hover:bg-gold/90">
                    Add User
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0A0A0A] border-gray-800 text-white"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Role</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Created</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="text-white">{user.name}</TableCell>
                  <TableCell className="text-white">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={user.role === 'admin' ? 'bg-gold/10 text-gold' : 'bg-blue-500/10 text-blue-500'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.isVerified ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}>
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {user.role === 'user' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-800 text-gray-400 hover:bg-gray-800"
                          onClick={() => handleUserAction(user._id, 'promote')}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Promote
                        </Button>
                      ) : user._id !== currentUser?._id && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-800 text-gray-400 hover:bg-gray-800"
                          onClick={() => handleUserAction(user._id, 'demote')}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Demote
                        </Button>
                      )}
                      {user._id !== currentUser?._id && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-800 text-red-400 hover:bg-red-500/10"
                          onClick={() => handleUserAction(user._id, 'delete')}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users; 