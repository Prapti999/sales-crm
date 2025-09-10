// import React, { ReactNode } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/context/AuthContext';
// import { 
//   Home, 
//   Users, 
//   Target, 
//   TrendingUp, 
//   Settings, 
//   LogOut,
//   Menu,
//   X
// } from 'lucide-react';
// import { useState } from 'react';

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { user, logout } = useAuth();
//   const router = useRouter();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   if (!user) {
//     return <>{children}</>;
//   }

//   const navigation = [
//     { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['rep', 'manager', 'admin'] },
//     { name: 'Leads', href: '/leads', icon: Users, roles: ['rep', 'manager', 'admin'] },
//     { name: 'Opportunities', href: '/opportunities', icon: Target, roles: ['rep', 'manager', 'admin'] },
//     { name: 'Users', href: '/users', icon: Settings, roles: ['admin'] },
//   ];

//   const filteredNavigation = navigation.filter(item => 
//     item.roles.includes(user.role)
//   );

//   const handleLogout = () => {
//     logout();
//     router.push('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile sidebar */}
//       <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
//         <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
//           <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
//             <h1 className="text-xl font-bold text-gray-900">Sales CRM</h1>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//           <nav className="flex-1 px-4 py-4 space-y-2">
//             {filteredNavigation.map((item) => {
//               const Icon = item.icon;
//               const isActive = router.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     isActive
//                       ? 'bg-blue-100 text-blue-700'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <Icon className="mr-3 h-5 w-5" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>
//           <div className="border-t border-gray-200 p-4">
//             <div className="flex items-center mb-3">
//               <div className="flex-shrink-0">
//                 <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-sm font-medium text-white">
//                     {user.name.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                 <p className="text-xs text-gray-500 capitalize">{user.role}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <LogOut className="mr-3 h-4 w-4" />
//               Sign out
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Desktop sidebar */}
//       <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
//         <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
//           <div className="flex h-16 items-center px-6 border-b border-gray-200">
//             <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
//             <h1 className="text-xl font-bold text-gray-900">Sales CRM</h1>
//           </div>
//           <nav className="flex-1 px-4 py-6 space-y-2">
//             {filteredNavigation.map((item) => {
//               const Icon = item.icon;
//               const isActive = router.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     isActive
//                       ? 'bg-blue-100 text-blue-700'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <Icon className="mr-3 h-5 w-5" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>
//           <div className="border-t border-gray-200 p-4">
//             <div className="flex items-center mb-3">
//               <div className="flex-shrink-0">
//                 <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
//                   <span className="text-sm font-medium text-white">
//                     {user.name.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                 <p className="text-xs text-gray-500 capitalize">{user.role}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <LogOut className="mr-3 h-4 w-4" />
//               Sign out
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         {/* Mobile header */}
//         <div className="lg:hidden flex h-16 items-center justify-between px-4 bg-white border-b border-gray-200">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <Menu className="h-6 w-6" />
//           </button>
//           <h1 className="text-lg font-semibold text-gray-900">Sales CRM</h1>
//           <div className="w-6" /> {/* Spacer */}
//         </div>

//         <main className="flex-1">
//           <div className="py-6">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               {children}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;














import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, 
  Users, 
  Target, 
  TrendingUp, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <>{children}</>;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['rep', 'manager', 'admin'] },
    { name: 'Leads', href: '/leads', icon: Users, roles: ['rep', 'manager', 'admin'] },
    { name: 'Opportunities', href: '/opportunities', icon: Target, roles: ['rep', 'manager', 'admin'] },
    { name: 'Users', href: '/users', icon: Settings, roles: ['admin'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className={styles.layoutBg}>
      {/* Mobile sidebar */}
      <div className={`${styles.mobileSidebarOverlay} ${sidebarOpen ? styles.show : ''}`}>
        <div className={styles.mobileSidebarBackdrop} onClick={() => setSidebarOpen(false)} />
        <div className={styles.mobileSidebar}>
          <div className={styles.mobileSidebarHeader}>
            <h1 className={styles.logoText}>Sales CRM</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className={styles.closeBtn}
            >
              <X className={styles.closeIcon} />
            </button>
          </div>
          <nav className={styles.sidebarNav}>
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.sidebarNavLink} ${isActive ? styles.activeNavLink : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={styles.sidebarNavIcon} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className={styles.sidebarFooter}>
            <div className={styles.userInfoRow}>
              <div className={styles.userAvatarSm}>
                <span className={styles.userAvatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className={styles.userInfoText}>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.userRole}>{user.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={styles.logoutBtn}
            >
              <LogOut className={styles.logoutIcon} />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={styles.desktopSidebarWrapper}>
        <div className={styles.desktopSidebar}>
          <div className={styles.desktopSidebarHeader}>
            <TrendingUp className={styles.logoIcon} />
            <h1 className={styles.logoText}>Sales CRM</h1>
          </div>
          <nav className={styles.sidebarNav}>
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.sidebarNavLink} ${isActive ? styles.activeNavLink : ''}`}
                >
                  <Icon className={styles.sidebarNavIcon} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className={styles.sidebarFooter}>
            <div className={styles.userInfoRow}>
              <div className={styles.userAvatarLg}>
                <span className={styles.userAvatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className={styles.userInfoText}>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.userRole}>{user.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={styles.logoutBtn}
            >
              <LogOut className={styles.logoutIcon} />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.mainContentWrapper}>
        {/* Mobile header */}
        <div className={styles.mobileHeader}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={styles.menuBtn}
          >
            <Menu className={styles.menuIcon} />
          </button>
          <h1 className={styles.mobileHeaderTitle}>Sales CRM</h1>
          <div style={{ width: 24 }} /> {/* Spacer */}
        </div>

        <main className={styles.mainContent}>
          <div className={styles.mainContentInner}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
