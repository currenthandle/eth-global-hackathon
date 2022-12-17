import SignUpForm from '../components/SignUpForm';
import ClientOnly from '../components/ClientOnly';
import { SelectRole } from '../components/SelectRole';
import { useContext } from 'react';
import { StateContext } from '../utils/context';

export default function Signup() {
  const state = useContext(StateContext);
  return (
    <div>
      <ClientOnly>
        {!state?.signUpData ? <SignUpForm /> : <SelectRole />}
      </ClientOnly>
    </div>
  );
}
