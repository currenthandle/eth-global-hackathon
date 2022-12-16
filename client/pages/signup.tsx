import SignUpForm from '../components/SignUpForm';
import ClientOnly from '../components/ClientOnly';
import { SelectRole } from '../components/SelectRole';
export default function signup() {
  return (
    <div>
      <ClientOnly>
        <SignUpForm />
        <SelectRole />
      </ClientOnly>
    </div>
  );
}
