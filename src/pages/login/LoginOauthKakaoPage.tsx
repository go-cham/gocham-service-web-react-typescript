import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import useKakaoLogin from '@/apis/hooks/auth/useKakaoLogin';
import useUser from '@/apis/hooks/users/useUser';
import { USER_TYPE } from '@/constants/user-type';

export default function LoginOauthKakaoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { token, error } = useKakaoLogin(code);
  const { user } = useUser();

  useEffect(() => {
    document.body.style.height = `${window.innerHeight}px`;
  }, []);

  useEffect(() => {
    if (user) {
      switch (user.type) {
        case USER_TYPE.ONCE_USER:
        case USER_TYPE.ONCE_USER_WITHOUT_TERMS:
          return navigate('/register/term');
        case USER_TYPE.DEACTIVATED_USER:
        case USER_TYPE.DORMANT_USER:
          return navigate('/login');
        default:
          navigate('/');
      }
    }
  }, [user]);

  if (token) {
    localStorage.setItem('token', token);
  }

  if (error) {
    alert('로그인 과정에서 에러가 발생했습니다. 개발자에게 문의해주세요.');
    return <Navigate to={'/'} />;
  }

  return null;
}
