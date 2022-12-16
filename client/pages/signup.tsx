import SignUpForm from '../components/SignUpForm';
import ClientOnly from '../components/ClientOnly';
import { SelectRole } from '../components/SelectRole';
import { useContext } from 'react';
import { StateContext } from '../utils/context';
import { memo } from 'react';

export default memo(function Signup(props) {
  console.log('props memo', props);
  const state = useContext(StateContext);
  console.log('state', state);
  return (
    <div>
      <ClientOnly>
        {!state?.signUpData ? <SignUpForm /> : <SelectRole />}
      </ClientOnly>
    </div>
  );
});
