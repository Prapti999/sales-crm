// // import '../styles/Dashboard.module.css'; 
// import styles from './Dashboard.module.css';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/context/AuthContext';
// import { DashboardStats } from '@/types';
// import { 
//   Users, 
//   Target, 
//   DollarSign, 
//   TrendingUp,
//   BarChart3,
//   PieChart
// } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';


// const Dashboard: React.FC = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [statsLoading, setStatsLoading] = useState(true);

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     if (user) {
//       fetchStats();
//     }
//   }, [user]);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/dashboard/stats', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         setStats(data.stats);
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     } finally {
//       setStatsLoading(false);
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className={styles["flex items-center justify-center min-h-screen"]}>
//         <div className={styles["animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"]}></div>
//       </div>
//     );
//   }

//   const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

//   return (
//     <div className={styles["space-y-6"]}>
//       <div className={styles["flex items-center justify-between"]}>
//         <div>
//           <h1 className={styles["text-2xl font-bold text-gray-900"]}>Dashboard</h1>
//           <p className={styles["text-gray-600"]}>Welcome back, {user.name}!</p>
//         </div>
//         <div className={styles["text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full"]}>
//           {user.role}
//         </div>
//       </div>

//       {statsLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//               <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           ))}
//         </div>
//       ) : stats ? (
//         <>
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//               <div className="flex items-center">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <Users className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Total Leads</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//               <div className="flex items-center">
//                 <div className="p-2 bg-green-100 rounded-lg">
//                   <Target className="h-6 w-6 text-green-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Opportunities</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalOpportunities}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//               <div className="flex items-center">
//                 <div className="p-2 bg-yellow-100 rounded-lg">
//                   <DollarSign className="h-6 w-6 text-yellow-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Total Value</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     ${stats.totalValue.toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//               <div className="flex items-center">
//                 <div className="p-2 bg-purple-100 rounded-lg">
//                   <TrendingUp className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stats.totalLeads > 0 
//                       ? Math.round((stats.totalOpportunities / stats.totalLeads) * 100)
//                       : 0}%
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Leads by Status */}
//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//               <div className="flex items-center mb-4">
//                 <BarChart3 className="h-5 w-5 text-gray-600 mr-2" />
//                 <h3 className="text-lg font-semibold text-gray-900">Leads by Status</h3>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={stats.leadsByStatus}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="status" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Opportunities by Stage */}
//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//               <div className="flex items-center mb-4">
//                 <PieChart className="h-5 w-5 text-gray-600 mr-2" />
//                 <h3 className="text-lg font-semibold text-gray-900">Opportunities by Stage</h3>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RechartsPieChart>
//                     <Tooltip formatter={(value, name) => [`${value} opportunities`, name]} />
//                     <RechartsPieChart data={stats.opportunitiesByStage}>
//                       {stats.opportunitiesByStage.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </RechartsPieChart>
//                   </RechartsPieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="mt-4 grid grid-cols-2 gap-2">
//                 {stats.opportunitiesByStage.map((item, index) => (
//                   <div key={item.stage} className="flex items-center">
//                     <div 
//                       className="w-3 h-3 rounded-full mr-2"
//                       style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                     />
//                     <span className="text-sm text-gray-600">
//                       {item.stage}: {item.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="p-6 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <button
//                   onClick={() => router.push('/leads')}
//                   className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <Users className="h-8 w-8 text-blue-600 mr-3" />
//                   <div className="text-left">
//                     <p className="font-medium text-gray-900">Manage Leads</p>
//                     <p className="text-sm text-gray-600">Add and track new leads</p>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => router.push('/opportunities')}
//                   className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <Target className="h-8 w-8 text-green-600 mr-3" />
//                   <div className="text-left">
//                     <p className="font-medium text-gray-900">View Opportunities</p>
//                     <p className="text-sm text-gray-600">Track your deals</p>
//                   </div>
//                 </button>

//                 {user.role === 'admin' && (
//                   <button
//                     onClick={() => router.push('/users')}
//                     className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <Users className="h-8 w-8 text-purple-600 mr-3" />
//                     <div className="text-left">
//                       <p className="font-medium text-gray-900">Manage Users</p>
//                       <p className="text-sm text-gray-600">Add team members</p>
//                     </div>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-gray-500">Failed to load dashboard data</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

















import styles from './Dashboard.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { DashboardStats } from '@/types';
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#A78BFA', '#EF4444'];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Dashboard</h1>
          <p className={styles.dashboardWelcome}>Welcome back, {user.name}!</p>
        </div>
        <div className={styles.roleBadge}>
          {user.role}
        </div>
      </div>

      {statsLoading ? (
        <div className={styles.statsGrid}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.statCardLoading}>
              <div className={styles.statCardLoadingBarShort}></div>
              <div className={styles.statCardLoadingBarTall}></div>
            </div>
          ))}
        </div>
      ) : stats ? (
        <>
          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statCardIcon + " " + styles.statCardIconBlue}>
                <Users className={styles.statIconSvg + " " + styles.statIconBlue} />
              </div>
              <div>
                <p className={styles.statLabel}>Total Leads</p>
                <p className={styles.statValue}>{stats.totalLeads}</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardIcon + " " + styles.statCardIconGreen}>
                <Target className={styles.statIconSvg + " " + styles.statIconGreen} />
              </div>
              <div>
                <p className={styles.statLabel}>Opportunities</p>
                <p className={styles.statValue}>{stats.totalOpportunities}</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardIcon + " " + styles.statCardIconYellow}>
                <span className={styles.statIconSvg + " " + styles.statIconYellow} style={{ fontSize: 24, lineHeight: 1 }}>
                  ₹
                </span>
                </div>
              <div>
                <p className={styles.statLabel}>Total Value</p>
                <p className={styles.statValue}>{stats.totalValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardIcon + " " + styles.statCardIconPurple}>
                <TrendingUp className={styles.statIconSvg + " " + styles.statIconPurple} />
              </div>
              <div>
                <p className={styles.statLabel}>Conversion Rate</p>
                <p className={styles.statValue}>
                  {stats.totalLeads > 0 
                    ? Math.round((stats.totalOpportunities / stats.totalLeads) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className={styles.chartsGrid}>
            {/* Leads by Status */}
            <div className={styles.chartCard}>
              <div className={styles.chartCardHeader}>
                <BarChart3 className={styles.chartCardHeaderIcon} />
                <h3 className={styles.chartCardHeaderTitle}>Leads by Status</h3>
              </div>
              <div className={styles.chartCardBody}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.leadsByStatus}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Opportunities by Stage */}
            <div className={styles.chartCard}>
              <div className={styles.chartCardHeader}>
                <PieChart className={styles.chartCardHeaderIcon} />
                <h3 className={styles.chartCardHeaderTitle}>Opportunities by Stage</h3>
              </div>
              <div className={styles.chartCardBody}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={stats.opportunitiesByStage}
                      dataKey="count"
                      nameKey="stage"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {stats.opportunitiesByStage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} opportunities`, name]} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className={styles.pieLegendGrid}>
                {stats.opportunitiesByStage.map((item, index) => (
                  <div key={item.stage} className={styles.pieLegendItem}>
                    <div 
                      className={styles.pieLegendColor}
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className={styles.pieLegendLabel}>
                      {item.stage}: {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <div className={styles.quickActionsHeader}>
              <h3>Quick Actions</h3>
            </div>
            <div className={styles.quickActionsGrid}>
              <button
                onClick={() => router.push('/leads')}
                className={styles.quickActionBtn}
              >
                <Users className={styles.quickActionIcon + " " + styles.quickActionIconBlue} />
                <div>
                  <p className={styles.quickActionLabel}>Manage Leads</p>
                  <p className={styles.quickActionDesc}>Add and track new leads</p>
                </div>
              </button>

              <button
                onClick={() => router.push('/opportunities')}
                className={styles.quickActionBtn}
              >
                <Target className={styles.quickActionIcon + " " + styles.quickActionIconGreen} />
                <div>
                  <p className={styles.quickActionLabel}>View Opportunities</p>
                  <p className={styles.quickActionDesc}>Track your deals</p>
                </div>
              </button>

              {user.role === 'admin' && (
                <button
                  onClick={() => router.push('/users')}
                  className={styles.quickActionBtn}
                >
                  <Users className={styles.quickActionIcon + " " + styles.quickActionIconPurple} />
                  <div>
                    <p className={styles.quickActionLabel}>Manage Users</p>
                    <p className={styles.quickActionDesc}>Add team members</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.dashboardError}>
          <p>Failed to load dashboard data</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;