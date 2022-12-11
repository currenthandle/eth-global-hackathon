import { useQuery, useMutation, gql } from '@apollo/client';

const allUsers = gql`
  query AllUsers {
    allUsers {
      email
    }
  }
`;
const createUser = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
    }
  }
`;

export const Sample = () => {
  // const { loading, error, data } = useQuery(allUsers);
  const [createUserMutation] = useMutation(createUser);

  return (
    <div
      onClick={async () => {
        const newUser = await createUserMutation({
          variables: {
            email: 'askfasahl@als.nom',
            password: '123456',
          },
        });
        console.log('newUser', newUser);
      }}
    >
      hello
    </div>
  );
};
