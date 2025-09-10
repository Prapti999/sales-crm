// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { TrendingUp, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login, user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       router.push('/dashboard');
//     }
//   }, [user, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const success = await login(email, password);
    
//     if (success) {
//       router.push('/dashboard');
//     } else {
//       setError('Invalid email or password');
//     }
    
//     setLoading(false);
//   };

//   const demoAccounts = [
//     { email: 'admin@demo.com', password: 'password', role: 'Admin' },
//     { email: 'manager@demo.com', password: 'password', role: 'Manager' },
//     { email: 'rep@demo.com', password: 'password', role: 'Sales Rep' },
//   ];

//   const fillDemoAccount = (email: string, password: string) => {
//     setEmail(email);
//     setPassword(password);
//   };

//   if (user) {
//     return null; // Will redirect
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <div className="bg-blue-600 p-3 rounded-full">
//               <TrendingUp className="h-8 w-8 text-white" />
//             </div>
//           </div>
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">
//             Welcome to Sales CRM
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Sign in to your account to continue
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
//               </div>
//             </div>

//             <div className="mt-4 space-y-2">
//               {demoAccounts.map((account, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   onClick={() => fillDemoAccount(account.email, account.password)}
//                   className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
//                 >
//                   <div className="font-medium">{account.role}</div>
//                   <div className="text-xs text-gray-500">{account.email}</div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
















import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { TrendingUp, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import styles from './Login.module.css';
// import './Login.css'; // Import CSS
// import "@/styles/Login.css";


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  const demoAccounts = [
    { email: 'admin@demo.com', password: 'password', role: 'Admin' },
    { email: 'manager@demo.com', password: 'password', role: 'Manager' },
    { email: 'rep@demo.com', password: 'password', role: 'Sales Rep' },
  ];

  const fillDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  if (user) return null;

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <div className={styles["login-header"]}>
          <div className={styles["icon-wrapper"]}>
            <TrendingUp className={styles["icon"]} />
          </div>
          <h2>Welcome to Sales CRM</h2>
          <p>Sign in to your account to continue</p>
        </div>

        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          {error && <div className={styles["error-box"]}>{error}</div>}

          <label>Email Address</label>
            <div className={styles["input-group"]} style={{ width: "100%" }}>
            <Mail className={styles["input-icon"]} />
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: "100%", boxSizing: "border-box" }}
            />
            </div>

          <label>Password</label>
          <div className={styles["input-group"]}>
            <Lock className={styles["input-icon"]} />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: "100%", boxSizing: "border-box" }}
            />
            <button
              type="button"
              className={styles["show-password"]}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button type="submit" disabled={loading} className={styles["btn-primary"]}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className={styles["demo-section"]}>
          <span className={styles["divider"]}>Demo Accounts</span>
          {demoAccounts.map((account, i) => (
            <button
              key={i}
              className={styles["demo-btn"]}
              onClick={() => fillDemoAccount(account.email, account.password)}
            >
              <strong>{account.role}</strong>
              <div>{account.email}</div>
            </button>
          ))}
        </div>

        <p className={styles["signup-text"]}>
          Don’t have an account? <Link href="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;