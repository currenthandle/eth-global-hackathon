import SignUpForm from '../components/SignUpForm';
import ClientOnly from '../components/ClientOnly';
export default function signup() {
  return (
    <div>
      <ClientOnly>
        <SignUpForm />
      </ClientOnly>
    </div>
  );
}
