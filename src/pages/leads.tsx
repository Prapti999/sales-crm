// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/context/AuthContext';
// import { Lead } from '@/types';
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   ArrowRight,
//   Phone,
//   Mail,
//   User,
//   Search,
//   Filter
// } from 'lucide-react';

// const Leads: React.FC = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [leadsLoading, setLeadsLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [showConvertModal, setShowConvertModal] = useState(false);
//   const [editingLead, setEditingLead] = useState<Lead | null>(null);
//   const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     status: 'New' as 'New' | 'Contacted' | 'Qualified',
//   });

//   const [convertData, setConvertData] = useState({
//     title: '',
//     value: '',
//   });

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     if (user) {
//       fetchLeads();
//     }
//   }, [user]);

//   const fetchLeads = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/leads', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         setLeads(data.leads);
//       }
//     } catch (error) {
//       console.error('Error fetching leads:', error);
//     } finally {
//       setLeadsLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('token');
//       const url = editingLead ? `/api/leads/${editingLead.id}` : '/api/leads';
//       const method = editingLead ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (data.success) {
//         fetchLeads();
//         setShowModal(false);
//         setEditingLead(null);
//         setFormData({ name: '', email: '', phone: '', status: 'New' });
//       }
//     } catch (error) {
//       console.error('Error saving lead:', error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this lead?')) return;

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/leads/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         fetchLeads();
//       }
//     } catch (error) {
//       console.error('Error deleting lead:', error);
//     }
//   };

//   const handleConvert = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!convertingLead) return;

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/leads/${convertingLead.id}/convert`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(convertData),
//       });

//       const data = await response.json();
//       if (data.success) {
//         fetchLeads();
//         setShowConvertModal(false);
//         setConvertingLead(null);
//         setConvertData({ title: '', value: '' });
//         alert('Lead converted to opportunity successfully!');
//       }
//     } catch (error) {
//       console.error('Error converting lead:', error);
//     }
//   };

//   const openEditModal = (lead: Lead) => {
//     setEditingLead(lead);
//     setFormData({
//       name: lead.name,
//       email: lead.email,
//       phone: lead.phone,
//       status: lead.status,
//     });
//     setShowModal(true);
//   };

//   const openConvertModal = (lead: Lead) => {
//     setConvertingLead(lead);
//     setConvertData({
//       title: `${lead.name} - Deal`,
//       value: '',
//     });
//     setShowConvertModal(true);
//   };

//   const filteredLeads = leads.filter(lead => {
//     const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = !statusFilter || lead.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'New': return 'bg-blue-100 text-blue-800';
//       case 'Contacted': return 'bg-yellow-100 text-yellow-800';
//       case 'Qualified': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
//           <p className="text-gray-600">Manage your sales leads</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Lead
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search leads..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//           <div className="sm:w-48">
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">All Status</option>
//                 <option value="New">New</option>
//                 <option value="Contacted">Contacted</option>
//                 <option value="Qualified">Qualified</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Leads Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         {leadsLoading ? (
//           <div className="p-8 text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-2 text-gray-600">Loading leads...</p>
//           </div>
//         ) : filteredLeads.length === 0 ? (
//           <div className="p-8 text-center">
//             <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600">No leads found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Lead
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Created
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredLeads.map((lead) => (
//                   <tr key={lead.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                           <User className="h-5 w-5 text-blue-600" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{lead.name}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="space-y-1">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Mail className="h-4 w-4 mr-2" />
//                           {lead.email}
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Phone className="h-4 w-4 mr-2" />
//                           {lead.phone}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
//                         {lead.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {new Date(lead.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex items-center justify-end space-x-2">
//                         {lead.status !== 'Qualified' && (
//                           <button
//                             onClick={() => openConvertModal(lead)}
//                             className="text-green-600 hover:text-green-900 p-1 rounded"
//                             title="Convert to Opportunity"
//                           >
//                             <ArrowRight className="h-4 w-4" />
//                           </button>
//                         )}
//                         <button
//                           onClick={() => openEditModal(lead)}
//                           className="text-blue-600 hover:text-blue-900 p-1 rounded"
//                           title="Edit"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(lead.id)}
//                           className="text-red-600 hover:text-red-900 p-1 rounded"
//                           title="Delete"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Lead Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               {editingLead ? 'Edit Lead' : 'Add New Lead'}
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value as 'New' | 'Contacted' | 'Qualified' })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="New">New</option>
//                   <option value="Contacted">Contacted</option>
//                   <option value="Qualified">Qualified</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     setEditingLead(null);
//                     setFormData({ name: '', email: '', phone: '', status: 'New' });
//                   }}
//                   className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   {editingLead ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Convert Lead Modal */}
//       {showConvertModal && convertingLead && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Convert Lead to Opportunity
//             </h3>
//             <p className="text-sm text-gray-600 mb-4">
//               Converting: <strong>{convertingLead.name}</strong>
//             </p>
//             <form onSubmit={handleConvert} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Opportunity Title
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={convertData.title}
//                   onChange={(e) => setConvertData({ ...convertData, title: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Estimated Value ($)
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   min="0"
//                   step="0.01"
//                   value={convertData.value}
//                   onChange={(e) => setConvertData({ ...convertData, value: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowConvertModal(false);
//                     setConvertingLead(null);
//                     setConvertData({ title: '', value: '' });
//                   }}
//                   className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 >
//                   Convert
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leads;













import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Lead } from '@/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowRight,
  Phone,
  Mail,
  User,
  Search,
  Filter
} from 'lucide-react';
import styles from './Leads.module.css';

const Leads: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'New' as 'New' | 'Contacted' | 'Qualified',
  });

  const [convertData, setConvertData] = useState({
    title: '',
    value: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchLeads();
    }
  }, [user]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/leads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const url = editingLead ? `/api/leads/${editingLead.id}` : '/api/leads';
      const method = editingLead ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        fetchLeads();
        setShowModal(false);
        setEditingLead(null);
        setFormData({ name: '', email: '', phone: '', status: 'New' });
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingLead) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/leads/${convertingLead.id}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(convertData),
      });

      const data = await response.json();
      if (data.success) {
        fetchLeads();
        setShowConvertModal(false);
        setConvertingLead(null);
        setConvertData({ title: '', value: '' });
        alert('Lead converted to opportunity successfully!');
      }
    } catch (error) {
      console.error('Error converting lead:', error);
    }
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
    });
    setShowModal(true);
  };

  const openConvertModal = (lead: Lead) => {
    setConvertingLead(lead);
    setConvertData({
      title: `${lead.name} - Deal`,
      value: '',
    });
    setShowConvertModal(true);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Map status to CSS module classes
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'New': return styles.statusNew;
      case 'Contacted': return styles.statusContacted;
      case 'Qualified': return styles.statusQualified;
      default: return styles.statusDefault;
    }
  };

  if (loading || !user) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.leadsContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Leads</h1>
          <p className={styles.pageSubtitle}>Manage your sales leads</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className={styles.addLeadBtn}
        >
          <Plus className={styles.addLeadIcon} />
          Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filtersCard}>
        <div className={styles.filtersRow}>
          <div className={styles.filtersCol}>
            <div className={styles.inputWrapper}>
              <Search className={styles.inputIcon} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.inputField}
              />
            </div>
          </div>
          <div className={styles.filtersColFixed}>
            <div className={styles.inputWrapper}>
              <Filter className={styles.inputIcon} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.inputField}
              >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className={styles.tableCard}>
        {leadsLoading ? (
          <div className={styles.tableLoading}>
            <div className={styles.loadingSpinnerSmall}></div>
            <p className={styles.tableLoadingText}>Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className={styles.tableEmpty}>
            <User className={styles.tableEmptyIcon} />
            <p className={styles.tableEmptyText}>No leads found</p>
          </div>
        ) : (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableTh}>Lead</th>
                  <th className={styles.tableTh}>Contact</th>
                  <th className={styles.tableTh}>Status</th>
                  <th className={styles.tableTh}>Created</th>
                  <th className={styles.tableThRight}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className={styles.tableRow}>
                    <td className={styles.tableTd}>
                      <div className={styles.leadInfo}>
                        <div className={styles.leadAvatar}>
                          <User className={styles.leadAvatarIcon} />
                        </div>
                        <div className={styles.leadNameWrap}>
                          <div className={styles.leadName}>{lead.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableTd}>
                      <div className={styles.leadContact}>
                        <div className={styles.leadContactRow}>
                          <Mail className={styles.leadContactIcon} />
                          {lead.email}
                        </div>
                        <div className={styles.leadContactRow}>
                          <Phone className={styles.leadContactIcon} />
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableTd}>
                      <span className={`${styles.statusBadge} ${getStatusClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className={styles.tableTd}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className={styles.tableTdRight}>
                      <div className={styles.actionsRow}>
                        {lead.status !== 'Qualified' && (
                          <button
                            onClick={() => openConvertModal(lead)}
                            className={styles.actionBtnGreen}
                            title="Convert to Opportunity"
                          >
                            <ArrowRight className={styles.actionIcon} />
                          </button>
                        )}
                        <button
                          onClick={() => openEditModal(lead)}
                          className={styles.actionBtnBlue}
                          title="Edit"
                        >
                          <Edit className={styles.actionIcon} />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className={styles.actionBtnRed}
                          title="Delete"
                        >
                          <Trash2 className={styles.actionIcon} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Lead Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>
              {editingLead ? 'Edit Lead' : 'Add New Lead'}
            </h3>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div>
                <label className={styles.modalLabel}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.modalInput}
                />
              </div>
              <div>
                <label className={styles.modalLabel}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={styles.modalInput}
                />
              </div>
              <div>
                <label className={styles.modalLabel}>
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={styles.modalInput}
                />
              </div>
              <div>
                <label className={styles.modalLabel}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'New' | 'Contacted' | 'Qualified' })}
                  className={styles.modalInput}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingLead(null);
                    setFormData({ name: '', email: '', phone: '', status: 'New' });
                  }}
                  className={styles.modalCancelBtn}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.modalSubmitBtn}
                >
                  {editingLead ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Convert Lead Modal */}
      {showConvertModal && convertingLead && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>
              Convert Lead to Opportunity
            </h3>
            <p className={styles.modalSubtitle}>
              Converting: <strong>{convertingLead.name}</strong>
            </p>
            <form onSubmit={handleConvert} className={styles.modalForm}>
              <div>
                <label className={styles.modalLabel}>
                  Opportunity Title
                </label>
                <input
                  type="text"
                  required
                  value={convertData.title}
                  onChange={(e) => setConvertData({ ...convertData, title: e.target.value })}
                  className={styles.modalInput}
                />
              </div>
              <div>
                <label className={styles.modalLabel}>
                  Estimated Value ($)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={convertData.value}
                  onChange={(e) => setConvertData({ ...convertData, value: e.target.value })}
                  className={styles.modalInput}
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowConvertModal(false);
                    setConvertingLead(null);
                    setConvertData({ title: '', value: '' });
                  }}
                  className={styles.modalCancelBtn}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.modalSubmitBtnGreen}
                >
                  Convert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;