import LoginForm from '../components/LoginForm';
import ClientOnly from '../components/ClientOnly';
import { NextPage } from 'next';
const login: NextPage = () => {
  return (
    <div>
      <ClientOnly>
        <LoginForm />
      </ClientOnly>
    </div>
  );
};

export default login;
