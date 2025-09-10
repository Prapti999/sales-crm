// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/context/AuthContext';
// import { Opportunity } from '@/types';
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   DollarSign,
//   Target,
//   Search,
//   Filter
// } from 'lucide-react';

// const Opportunities: React.FC = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
//   const [opportunitiesLoading, setOpportunitiesLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [stageFilter, setStageFilter] = useState('');

//   const [formData, setFormData] = useState({
//     title: '',
//     value: '',
//     stage: 'Discovery' as 'Discovery' | 'Proposal' | 'Won' | 'Lost',
//   });

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     if (user) {
//       fetchOpportunities();
//     }
//   }, [user]);

//   const fetchOpportunities = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/opportunities', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         setOpportunities(data.opportunities);
//       }
//     } catch (error) {
//       console.error('Error fetching opportunities:', error);
//     } finally {
//       setOpportunitiesLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('token');
//       const url = editingOpportunity ? `/api/opportunities/${editingOpportunity.id}` : '/api/opportunities';
//       const method = editingOpportunity ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ...formData,
//           value: Number(formData.value),
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         fetchOpportunities();
//         setShowModal(false);
//         setEditingOpportunity(null);
//         setFormData({ title: '', value: '', stage: 'Discovery' });
//       }
//     } catch (error) {
//       console.error('Error saving opportunity:', error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this opportunity?')) return;

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/opportunities/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         fetchOpportunities();
//       }
//     } catch (error) {
//       console.error('Error deleting opportunity:', error);
//     }
//   };

//   const handleStageUpdate = async (id: string, newStage: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/opportunities/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ stage: newStage }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         fetchOpportunities();
//       }
//     } catch (error) {
//       console.error('Error updating opportunity stage:', error);
//     }
//   };

//   const openEditModal = (opportunity: Opportunity) => {
//     setEditingOpportunity(opportunity);
//     setFormData({
//       title: opportunity.title,
//       value: opportunity.value.toString(),
//       stage: opportunity.stage,
//     });
//     setShowModal(true);
//   };

//   const filteredOpportunities = opportunities.filter(opp => {
//     const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStage = !stageFilter || opp.stage === stageFilter;
//     return matchesSearch && matchesStage;
//   });

//   const getStageColor = (stage: string) => {
//     switch (stage) {
//       case 'Discovery': return 'bg-blue-100 text-blue-800';
//       case 'Proposal': return 'bg-yellow-100 text-yellow-800';
//       case 'Won': return 'bg-green-100 text-green-800';
//       case 'Lost': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const totalValue = filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0);
//   const wonValue = filteredOpportunities
//     .filter(opp => opp.stage === 'Won')
//     .reduce((sum, opp) => sum + opp.value, 0);

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
//           <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
//           <p className="text-gray-600">Track your sales opportunities</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Opportunity
//         </button>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Target className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Opportunities</p>
//               <p className="text-2xl font-bold text-gray-900">{filteredOpportunities.length}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <DollarSign className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Value</p>
//               <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-yellow-100 rounded-lg">
//               <DollarSign className="h-6 w-6 text-yellow-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Won Value</p>
//               <p className="text-2xl font-bold text-gray-900">${wonValue.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search opportunities..."
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
//                 value={stageFilter}
//                 onChange={(e) => setStageFilter(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">All Stages</option>
//                 <option value="Discovery">Discovery</option>
//                 <option value="Proposal">Proposal</option>
//                 <option value="Won">Won</option>
//                 <option value="Lost">Lost</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Opportunities Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         {opportunitiesLoading ? (
//           <div className="p-8 text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-2 text-gray-600">Loading opportunities...</p>
//           </div>
//         ) : filteredOpportunities.length === 0 ? (
//           <div className="p-8 text-center">
//             <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600">No opportunities found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Opportunity
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Value
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Stage
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
//                 {filteredOpportunities.map((opportunity) => (
//                   <tr key={opportunity.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
//                           <Target className="h-5 w-5 text-green-600" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{opportunity.title}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <DollarSign className="h-4 w-4 mr-1 text-green-600" />
//                         {opportunity.value.toLocaleString()}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <select
//                         value={opportunity.stage}
//                         onChange={(e) => handleStageUpdate(opportunity.id, e.target.value)}
//                         className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${getStageColor(opportunity.stage)}`}
//                       >
//                         <option value="Discovery">Discovery</option>
//                         <option value="Proposal">Proposal</option>
//                         <option value="Won">Won</option>
//                         <option value="Lost">Lost</option>
//                       </select>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {new Date(opportunity.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex items-center justify-end space-x-2">
//                         <button
//                           onClick={() => openEditModal(opportunity)}
//                           className="text-blue-600 hover:text-blue-900 p-1 rounded"
//                           title="Edit"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(opportunity.id)}
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

//       {/* Add/Edit Opportunity Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               {editingOpportunity ? 'Edit Opportunity' : 'Add New Opportunity'}
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Value ($)
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   min="0"
//                   step="0.01"
//                   value={formData.value}
//                   onChange={(e) => setFormData({ ...formData, value: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Stage
//                 </label>
//                 <select
//                   value={formData.stage}
//                   onChange={(e) => setFormData({ ...formData, stage: e.target.value as 'Discovery' | 'Proposal' | 'Won' | 'Lost' })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="Discovery">Discovery</option>
//                   <option value="Proposal">Proposal</option>
//                   <option value="Won">Won</option>
//                   <option value="Lost">Lost</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     setEditingOpportunity(null);
//                     setFormData({ title: '', value: '', stage: 'Discovery' });
//                   }}
//                   className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   {editingOpportunity ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Opportunities;











import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Opportunity } from '@/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign,
  Target,
  Search,
  Filter
} from 'lucide-react';
import styles from './Opportunities.module.css';

const Opportunities: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [opportunitiesLoading, setOpportunitiesLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage: 'Discovery' as 'Discovery' | 'Proposal' | 'Won' | 'Lost',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchOpportunities();
    }
  }, [user]);

  const fetchOpportunities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/opportunities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setOpportunities(data.opportunities);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setOpportunitiesLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const url = editingOpportunity ? `/api/opportunities/${editingOpportunity.id}` : '/api/opportunities';
      const method = editingOpportunity ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          value: Number(formData.value),
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchOpportunities();
        setShowModal(false);
        setEditingOpportunity(null);
        setFormData({ title: '', value: '', stage: 'Discovery' });
      }
    } catch (error) {
      console.error('Error saving opportunity:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/opportunities/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchOpportunities();
      }
    } catch (error) {
      console.error('Error deleting opportunity:', error);
    }
  };

  const handleStageUpdate = async (id: string, newStage: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/opportunities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stage: newStage }),
      });

      const data = await response.json();
      if (data.success) {
        fetchOpportunities();
      }
    } catch (error) {
      console.error('Error updating opportunity stage:', error);
    }
  };

  const openEditModal = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setFormData({
      title: opportunity.title,
      value: opportunity.value.toString(),
      stage: opportunity.stage,
    });
    setShowModal(true);
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = !stageFilter || opp.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  // Map stage to CSS module classes
  const getStageClass = (stage: string) => {
    switch (stage) {
      case 'Discovery': return styles.stageDiscovery;
      case 'Proposal': return styles.stageProposal;
      case 'Won': return styles.stageWon;
      case 'Lost': return styles.stageLost;
      default: return styles.stageDefault;
    }
  };

  const totalValue = filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const wonValue = filteredOpportunities
    .filter(opp => opp.stage === 'Won')
    .reduce((sum, opp) => sum + opp.value, 0);

  if (loading || !user) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.opportunitiesContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Opportunities</h1>
          <p className={styles.pageSubtitle}>Track your sales opportunities</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className={styles.addOpportunityBtn}
        >
          <Plus className={styles.addOpportunityIcon} />
          Add Opportunity
        </button>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryCardRow}>
            <div className={styles.summaryCardIconBgBlue}>
              <Target className={styles.summaryCardIconBlue} />
            </div>
            <div className={styles.summaryCardText}>
              <p className={styles.summaryCardLabel}>Total Opportunities</p>
              <p className={styles.summaryCardValue}>{filteredOpportunities.length}</p>
            </div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryCardRow}>
            <div className={styles.summaryCardIconBgGreen}>
              <span className={styles.summaryCardIconGreen} style={{ fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ₹
              </span>
            </div>
            <div className={styles.summaryCardText}>
              <p className={styles.summaryCardLabel}>Total Value</p>
              {/* <p className={styles.summaryCardValue}>${totalValue.toLocaleString()}</p> */
              <p className={styles.summaryCardValue}>
  {totalValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
</p>}
            </div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryCardRow}>
            <div className={styles.summaryCardIconBgYellow}>
              <span className={styles.summaryCardIconYellow} style={{ fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ₹
              </span>
            </div>
            <div className={styles.summaryCardText}>
              <p className={styles.summaryCardLabel}>Won Value</p>
              {/* <p className={styles.summaryCardValue}>${wonValue.toLocaleString()}</p> */
              <p className={styles.summaryCardValue}>
  {wonValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersCard}>
        <div className={styles.filtersRow}>
          <div className={styles.filtersCol}>
            <div className={styles.inputWrapper}>
              <Search className={styles.inputIcon} />
              <input
                type="text"
                placeholder="Search opportunities..."
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
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className={styles.inputField}
              >
                <option value="">All Stages</option>
                <option value="Discovery">Discovery</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className={styles.tableCard}>
        {opportunitiesLoading ? (
          <div className={styles.tableLoading}>
            <div className={styles.loadingSpinnerSmall}></div>
            <p className={styles.tableLoadingText}>Loading opportunities...</p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className={styles.tableEmpty}>
            <Target className={styles.tableEmptyIcon} />
            <p className={styles.tableEmptyText}>No opportunities found</p>
          </div>
        ) : (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableTh}>Opportunity</th>
                  <th className={styles.tableTh}>Value</th>
                  <th className={styles.tableTh}>Stage</th>
                  <th className={styles.tableTh}>Created</th>
                  <th className={styles.tableThRight}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredOpportunities.map((opportunity) => (
                  <tr key={opportunity.id} className={styles.tableRow}>
                    <td className={styles.tableTd}>
                      <div className={styles.oppInfo}>
                        <div className={styles.oppAvatar}>
                          <Target className={styles.oppAvatarIcon} />
                        </div>
                        <div className={styles.oppNameWrap}>
                          <div className={styles.oppName}>{opportunity.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableTd}>
                      <div className={styles.oppValue}>
                        <DollarSign className={styles.oppValueIcon} />
                        {opportunity.value.toLocaleString()}
                      </div>
                    </td>
                    <td className={styles.tableTd}>
                      <select
                        value={opportunity.stage}
                        onChange={(e) => handleStageUpdate(opportunity.id, e.target.value)}
                        className={`${styles.stageSelect} ${getStageClass(opportunity.stage)}`}
                      >
                        <option value="Discovery">Discovery</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                    <td className={styles.tableTd}>
                      {new Date(opportunity.createdAt).toLocaleDateString()}
                    </td>
                    <td className={styles.tableTdRight}>
                      <div className={styles.actionsRow}>
                        <button
                          onClick={() => openEditModal(opportunity)}
                          className={styles.actionBtnBlue}
                          title="Edit"
                        >
                          <Edit className={styles.actionIcon} />
                        </button>
                        <button
                          onClick={() => handleDelete(opportunity.id)}
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

      {/* Add/Edit Opportunity Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>
              {editingOpportunity ? 'Edit Opportunity' : 'Add New Opportunity'}
            </h3>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div>
                <label className={styles.modalLabel}>
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={styles.modalInput}
                />
              </div>
              <div>
                <label className={styles.modalLabel}>
                  Value ($)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className={styles.modalInput}
                />
              </div>
              <div>
                <label className={styles.modalLabel}>
                  Stage
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value as 'Discovery' | 'Proposal' | 'Won' | 'Lost' })}
                  className={styles.modalInput}
                >
                  <option value="Discovery">Discovery</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingOpportunity(null);
                    setFormData({ title: '', value: '', stage: 'Discovery' });
                  }}
                  className={styles.modalCancelBtn}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.modalSubmitBtn}
                >
                  {editingOpportunity ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opportunities;