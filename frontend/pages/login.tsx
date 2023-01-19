import { Button } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { resgisterMutation } from '@/graphql-client/mutations';
import { useEffect } from 'react';

const Login = () => {
  const auth = getAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
  };

  const [register, dataMutation] = useMutation(resgisterMutation);
  useEffect(() => {
    const callAPI = async () => {
      if (user && user.uid) {
        try {
          register({
            variables: {
              uid: user.uid,
              name: user.displayName,
            },
          });
        } catch (e) {}
        router.push('/folders');
      }
    };
    callAPI();
  }, [user]);

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-3xl mb-5">Welcome to Noto</h2>
      <Button
        className="bg-[#4285f4] h-[42px] flex w-48 items-center p-[1px] border-none rounded-sm"
        onClick={handleLoginWithGoogle}
      >
        <div className="flex">
          <div className="bg-white w-10 h-10 flex justify-center items-center rounded-sm">
            <FcGoogle size={20} />
          </div>
          <span className="text-white font-semibold text-base flex items-center px-2">
            Login with Google
          </span>
        </div>
      </Button>
    </div>
  );
};

export default Login;
