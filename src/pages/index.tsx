// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/context/AuthContext';

// export default function Home() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (user) {
//         router.push('/dashboard');
//       } else {
//         router.push('/login');
//       }
//     }
//   }, [user, loading, router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//     </div>
//   );
// }










import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import styles from './Index.module.css';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className={styles.centerScreen}>
      <div className={styles.spinner}></div>
    </div>
  );
}