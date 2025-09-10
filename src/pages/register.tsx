// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { TrendingUp, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import styles from './Register.module.css';

// const Register: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('rep');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register, user } = useAuth();
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

//     const success = await register(name, email, password, role);
    
//     if (success) {
//       router.push('/dashboard');
//     } else {
//       setError('Registration failed. Please try again.');
//     }
    
//     setLoading(false);
//   };

//   if (user) {
//     return null; // Will redirect
//   }

//   return (
//     <div className={styles["min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"]}>
//       <div className={styles["max-w-md w-full space-y-8"]}>
//         <div className={styles["text-center"]}>
//           <div className={styles["flex justify-center"]}>
//             <div className={styles["bg-blue-600 p-3 rounded-full"]}>
//               <TrendingUp className={styles["h-8 w-8 text-white"]} />
//             </div>
//           </div>
//           <h2 className={styles["mt-6 text-3xl font-bold text-gray-900"]}>
//             Create your account
//           </h2>
//           <p className={styles["mt-2 text-sm text-gray-600"]}>
//             Join our sales team and start managing leads
//           </p>
//         </div>

//         <div className={styles["bg-white rounded-lg shadow-lg p-8"]}>
//           <form className={styles["space-y-6"]} onSubmit={handleSubmit}>
//             {error && (
//               <div className={styles["bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"]}>
//                 {error}
//               </div>
//             )}

//             <div>
//               <label htmlFor="name" className={styles["block text-sm font-medium text-gray-700 mb-2"]}>
//                 Full Name
//               </label>
//               <div className={styles["relative"]}>
//                 <div className={styles["absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"]}>
//                   <User className={styles["h-5 w-5 text-gray-400"]} />
//                 </div>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className={styles["block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"]}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className={styles["block text-sm font-medium text-gray-700 mb-2"]}>
//                 Email Address
//               </label>
//               <div className={styles["relative"]}>
//                 <div className={styles["absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"]}>
//                   <Mail className={styles["h-5 w-5 text-gray-400"]} />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={styles["block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"]}
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className={styles["block text-sm font-medium text-gray-700 mb-2"]}>
//                 Password
//               </label>
//               <div className={styles["relative"]}>
//                 <div className={styles["absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"]}>
//                   <Lock className={styles["h-5 w-5 text-gray-400"]} />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="new-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={styles["block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"]}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   className={styles["absolute inset-y-0 right-0 pr-3 flex items-center"]}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className={styles["h-5 w-5 text-gray-400 hover:text-gray-600"]} />
//                   ) : (
//                     <Eye className={styles["h-5 w-5 text-gray-400 hover:text-gray-600"]} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="role" className={styles["block text-sm font-medium text-gray-700 mb-2"]}>
//                 Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className={styles["block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"]}
//               >
//                 <option value="rep">Sales Representative</option>
//                 <option value="manager">Sales Manager</option>
//                 <option value="admin">Administrator</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={styles["w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"]}
//             >
//               {loading ? 'Creating account...' : 'Create account'}
//             </button>
//           </form>

//           <div className={styles["mt-6 text-center"]}>
//             <p className={styles["text-sm text-gray-600"]}>
//               Already have an account?{' '}
//               <Link href="/login" className={styles["font-medium text-blue-600 hover:text-blue-500"]}>
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;









import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { TrendingUp, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import styles from './Register.module.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rep');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
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

    const success = await register(name, email, password, role);

    if (success) {
      router.push('/dashboard');
    } else {
      setError('Registration failed. Please try again.');
    }

    setLoading(false);
  };

  if (user) {
    return null; // Will redirect
  }

  return (
    <div className={styles.registerBg}>
      <div className={styles.registerWrapper}>
        <div className={styles.registerHeader}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconBg}>
              <TrendingUp className={styles.icon} />
            </div>
          </div>
          <h2>Create your account</h2>
          <p>Join our sales team and start managing leads</p>
        </div>

        <div className={styles.registerCard}>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            {error && (
              <div className={styles.errorBox}>
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Full Name
              </label>
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <User size={20} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                  placeholder="Enter your full name"
                  style={{ width: "100%", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                  placeholder="Enter your email"
                  style={{ width: "100%", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  placeholder="Enter your password"
                  style={{ width: "100%", boxSizing: "border-box" }}
                />
                <button
                  type="button"
                  className={styles.showPasswordBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.formLabel}>
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={styles.selectField}
              >
                <option value="rep">Sales Representative</option>
                <option value="manager">Sales Manager</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.registerBtn}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className={styles.registerFooter}>
            <p>
              Already have an account?{' '}
              <Link href="/login" className={styles.registerFooterLink}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;