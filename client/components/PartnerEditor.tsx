import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../graphql/mutations';
import { UserSsr } from '../utils/types';
import { SubmitButton } from './SubmitButton';
import { PartnerForm, partnerFormValidator } from '../utils/validators';

const PartnerEditor = ({ userSsr }: UserSsr) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PartnerForm>({
    resolver: zodResolver(partnerFormValidator),
    defaultValues: {
      firstName: userSsr.firstName || '',
      lastName: userSsr.lastName || '',
      website: userSsr.website || '',
      organization: userSsr.organization || '',
      linkedin: userSsr.linkedin || '',
      telegram: userSsr.telegram || '',
      twitter: userSsr.twitter || '',
      otherEvents: userSsr.otherEvents || '',
      reasonForSupporting: userSsr.reasonForSupporting || '',
      rules: userSsr.rules || false,
    },
  });

  const [updateUser, { data: updatedUser, error: updatedUserErr }] =
    useMutation(UPDATE_USER);

  const onSubmit = async () => {
    try {
      const formValues = getValues();
      const variables = {
        userUpdate: {
          firstName: formValues.firstName || '',
          lastName: formValues.lastName || '',
          website: formValues.website || '',
          linkedin: formValues.linkedin || '',
          rules: formValues.rules || false,
        },
        partnerProfile: {
          organization: formValues.organization || '',
          telegram: formValues.telegram || '',
          twitter: formValues.twitter || '',
          otherEvents: formValues.otherEvents || '',
          reasonForSupporting: formValues.reasonForSupporting || '',
        },
      };
      const updatedUser = await updateUser({
        variables,
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col items-center'>
        <form
          action=''
          className='flex flex-col'
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>Email</p>
          <div className='bg-[#f4f4f5] mb-6 rounded-lg border-2 border-[#dadadb] h-14 px-4 flex items-center cursor-no-drop text-sm w-full'>
            {userSsr.email}
          </div>

          <p>Application Status</p>
          <div className='bg-[#f4f4f5] mb-6 rounded-lg border-2 border-[#dadadb] h-14 px-4 flex items-center cursor-no-drop text-sm w-full'>
            {userSsr.applicationStatus ? 'Approved' : 'Pending'}
          </div>

          <div className='flex flex-row justify-between mb-6'>
            <div className='flex flex-col grow mr-2'>
              <label htmlFor='firstName'>First name</label>
              <input
                className='rounded-lg border-2 border-[#dadadb] h-14 px-4 text-sm'
                {...register('firstName')}
                type='text'
                name='firstName'
                id='firstName'
                placeholder='First name'
              />
            </div>
            <div className='flex flex-col grow ml-2'>
              <label htmlFor='lastName'>Last name</label>
              <input
                className='rounded-lg border-2 border-[#dadadb] h-14 px-4 text-sm'
                {...register('lastName')}
                type='text'
                name='lastName'
                id='lastName'
                placeholder='Last name'
              />
            </div>
          </div>

          <label htmlFor='website'>Website</label>
          <input
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
            {...register('website')}
            type='text'
            name='website'
            id='website'
            placeholder='Website'
          />

          <label htmlFor='github'>Organization</label>
          <input
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
            {...register('organization')}
            type='text'
            name='organization'
            id='organization'
            placeholder='Organization'
          />

          <label htmlFor='linkedin'>Linkedin</label>
          <input
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
            {...register('linkedin')}
            type='text'
            name='linkedin'
            id='linkedin'
            placeholder='Linkedin'
          />

          <label htmlFor='telegram'>Telegram</label>
          <input
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
            {...register('telegram')}
            type='text'
            name='telegram'
            id='telegram'
            placeholder='Telegram'
          />

          <label htmlFor='twitter'>Twitter</label>
          <input
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
            {...register('twitter')}
            type='text'
            name='twitter'
            id='twitter'
            placeholder='Twitter'
          />

          <label htmlFor='otherEvents'>
            Have you supported other Ethereum events before? If yes, which ones?
          </label>
          <textarea
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-44 resize-none px-4 py-2 text-sm'
            {...register('otherEvents')}
            name='otherEvents'
            id='otherEvents'
            placeholder='Other Events'
          />

          <label htmlFor='reasonForSupporting'>
            Why do you want to support this hackathon?
          </label>
          <textarea
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-44 resize-none px-4 py-2 text-sm'
            {...register('reasonForSupporting')}
            name='reasonForSupporting'
            id='reasonForSupporting'
            placeholder='Reason For Supporting'
          />

          <label htmlFor='rules'>
            Do you accept the rules and code of conduct for the event?
          </label>
          <div className='mt-2 flex justify-start items-center'>
            <input
              {...register('rules')}
              type='checkbox'
              name='rules'
              id='rules'
              placeholder='false'
              className='h-4 w-4  cursor-pointer'
            />
            <p className='ml-4  text-sm'>
              Yes I accept the rules and code of conduct for this event
            </p>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
};
export default PartnerEditor;
