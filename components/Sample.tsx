import { useQuery, gql } from '@apollo/client';

const allUsers = gql`
  query AllUsers {
    allUsers {
      email
    }
  }
`;
export const Sample = () => {
  const { loading, error, data } = useQuery(allUsers);
  return (
    <div>
      {data.allUsers.map((user) => {
        return <div key={user.email}>{user.email}</div>;
      })}
    </div>
  );
};
