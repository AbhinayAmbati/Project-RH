import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';
import Cookies from 'js-cookie';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from '@/components/ui/calendar';
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Filter, 
  Search,
  Calendar as CalendarIcon,
  BarChart,
  Users,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Consultation {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDetails: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
  consultationDate?: string;
  notes?: string;
}

interface Stats {
  total: number;
  pending: number;
  contacted: number;
  completed: number;
  cancelled: number;
}

const getAuthHeaders = () => {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    contacted: 0,
    completed: 0,
    cancelled: 0
  });
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchConsultations();
  }, [user, navigate]);

  useEffect(() => {
    // Calculate stats whenever consultations change
    const newStats = consultations.reduce((acc, consultation) => {
      acc.total++;
      acc[consultation.status]++;
      return acc;
    }, {
      total: 0,
      pending: 0,
      contacted: 0,
      completed: 0,
      cancelled: 0
    } as Stats);
    setStats(newStats);
  }, [consultations]);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(`${API_URL}/consultations`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch consultations');
      }

      const data = await response.json();
      if (data.success) {
        setConsultations(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch consultations');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch consultations');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (consultationId: string, newStatus: 'pending' | 'contacted' | 'completed' | 'cancelled') => {
    try {
      const response = await fetch(`${API_URL}/consultations/${consultationId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const data = await response.json();
      if (data.success) {
        setConsultations(prevConsultations =>
          prevConsultations.map(consultation =>
            consultation._id === consultationId
              ? { ...consultation, status: newStatus }
              : consultation
          )
        );
        toast.success('Status updated successfully');
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update status');
    }
  };

  const handleNotesUpdate = async () => {
    if (!selectedConsultation) return;

    try {
      const response = await fetch(`${API_URL}/consultations/${selectedConsultation._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      const data = await response.json();
      if (data.success) {
        setConsultations(prevConsultations =>
          prevConsultations.map(consultation =>
            consultation._id === selectedConsultation._id
              ? { ...consultation, notes }
              : consultation
          )
        );
        toast.success('Notes updated successfully');
      } else {
        throw new Error(data.message || 'Failed to update notes');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update notes');
    }
  };

  const handleConsultationDateUpdate = async (date: Date) => {
    if (!selectedConsultation) return;

    try {
      const response = await fetch(`${API_URL}/consultations/${selectedConsultation._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ consultationDate: date.toISOString() }),
      });

      if (!response.ok) {
        throw new Error('Failed to update consultation date');
      }

      const data = await response.json();
      if (data.success) {
        setConsultations(prevConsultations =>
          prevConsultations.map(consultation =>
            consultation._id === selectedConsultation._id
              ? { ...consultation, consultationDate: date.toISOString() }
              : consultation
          )
        );
        setShowCalendar(false);
        toast.success('Consultation date updated successfully');
      } else {
        throw new Error(data.message || 'Failed to update consultation date');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update consultation date');
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Project Type', 'Project Details', 'Status', 'Created At', 'Consultation Date', 'Notes'],
      ...consultations.map(c => [
        c.fullName,
        c.email,
        c.phone,
        c.projectType,
        c.projectDetails,
        c.status,
        new Date(c.createdAt).toLocaleString(),
        c.consultationDate ? new Date(c.consultationDate).toLocaleString() : '',
        c.notes || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `consultations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'contacted':
        return 'bg-blue-500/10 text-blue-500';
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredConsultations = consultations
    .filter(consultation => {
      const matchesSearch = 
        consultation.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.phone.includes(searchTerm) ||
        consultation.projectType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof Consultation];
      const bValue = b[sortField as keyof Consultation];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      
      <div className="py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card className="bg-[#111] border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
              </CardContent>
            </Card>
            <Card className="bg-[#111] border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-yellow-500">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.pending}</div>
              </CardContent>
            </Card>
            <Card className="bg-[#111] border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-blue-500">Contacted</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.contacted}</div>
              </CardContent>
            </Card>
            <Card className="bg-[#111] border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-green-500">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.completed}</div>
              </CardContent>
            </Card>
            <Card className="bg-[#111] border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-red-500">Cancelled</CardTitle>
                <BarChart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.cancelled}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Card */}
          <Card className="bg-[#111] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold text-white">Consultation Requests</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-800 text-gray-400 hover:bg-gray-800"
                  onClick={handleExport}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, email, phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-[#0A0A0A] border-gray-800 text-white"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#0A0A0A] border-gray-800 text-white rounded px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="text-gray-400 cursor-pointer"
                      onClick={() => {
                        if (sortField === 'fullName') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortField('fullName');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      Name {sortField === 'fullName' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead className="text-gray-400">Email</TableHead>
                    <TableHead className="text-gray-400">Phone</TableHead>
                    <TableHead className="text-gray-400">Project Type</TableHead>
                    <TableHead 
                      className="text-gray-400 cursor-pointer"
                      onClick={() => {
                        if (sortField === 'status') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortField('status');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      Status {sortField === 'status' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead 
                      className="text-gray-400 cursor-pointer"
                      onClick={() => {
                        if (sortField === 'createdAt') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortField('createdAt');
                          setSortDirection('desc');
                        }
                      }}
                    >
                      Date {sortField === 'createdAt' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation._id}>
                      <TableCell className="text-white">{consultation.fullName}</TableCell>
                      <TableCell className="text-white">{consultation.email}</TableCell>
                      <TableCell className="text-white">{consultation.phone}</TableCell>
                      <TableCell className="text-white">{consultation.projectType}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(consultation.status)}>
                          {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">
                        {formatDate(consultation.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-800 text-gray-400 hover:bg-gray-800"
                            onClick={() => {
                              setSelectedConsultation(consultation);
                              setNotes(consultation.notes || '');
                              setShowDetailsDialog(true);
                            }}
                          >
                            Details
                          </Button>
                          <select
                            value={consultation.status}
                            onChange={(e) => handleStatusUpdate(consultation._id, e.target.value as 'pending' | 'contacted' | 'completed' | 'cancelled')}
                            className="bg-[#0A0A0A] border-gray-800 text-white rounded px-2 py-1 text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-[#111] border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Consultation Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Full information about the consultation request
            </DialogDescription>
          </DialogHeader>
          {selectedConsultation && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Project Details</h4>
                <p className="mt-1 text-white whitespace-pre-wrap">{selectedConsultation.projectDetails}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Contact Information</h4>
                <div className="mt-1 space-y-1 text-white">
                  <p>Name: {selectedConsultation.fullName}</p>
                  <p>Email: {selectedConsultation.email}</p>
                  <p>Phone: {selectedConsultation.phone}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Status Information</h4>
                <div className="mt-1 space-y-1 text-white">
                  <p>Current Status: {selectedConsultation.status}</p>
                  <p>Submitted: {formatDate(selectedConsultation.createdAt)}</p>
                  <div className="flex items-center space-x-2">
                    <p>Consultation Date: {selectedConsultation.consultationDate 
                      ? formatDate(selectedConsultation.consultationDate)
                      : 'Not scheduled'}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-800 text-gray-400 hover:bg-gray-800"
                      onClick={() => setShowCalendar(true)}
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="notes" className="text-gray-400">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 bg-[#0A0A0A] border-gray-800 text-white"
                  rows={4}
                />
                <Button
                  onClick={handleNotesUpdate}
                  className="mt-2 bg-gold text-black hover:bg-gold/90"
                >
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Calendar Dialog */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="bg-[#111] border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule Consultation</DialogTitle>
          </DialogHeader>
          <Calendar
            mode="single"
            selected={selectedConsultation?.consultationDate ? new Date(selectedConsultation.consultationDate) : undefined}
            onSelect={(date) => date && handleConsultationDateUpdate(date)}
            className="bg-[#111] text-white"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin; 