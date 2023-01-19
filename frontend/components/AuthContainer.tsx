import { useAppDispatch } from '@/app/hook';
import { authActions } from '@/features/auth';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../firebase/config';

const AuthContainer = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.push('/login');
    }
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user && user?.uid) {
        dispatch(
          authActions.setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            auth: user.auth,
          })
        );
        localStorage.setItem('accessToken', user.accessToken);
        return;
      }
      dispatch(authActions.setUser({}));
      localStorage.removeItem('accessToken');
      router.push('/login');
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  return <>{children}</>;
};

export default AuthContainer;
