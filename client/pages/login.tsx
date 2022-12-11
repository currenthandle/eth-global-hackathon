import LoginForm from '../components/LoginForm';
import ClientOnly from '../components/ClientOnly';
export default function login() {
  return (
    <div>
      <ClientOnly>
        <LoginForm />
      </ClientOnly>
    </div>
  );
}
