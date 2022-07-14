import { useQuery } from "react-query";
import { fetchUsers } from "../services/user";
import { useAppDispatch } from "../app/hooks";
import { clearToken } from "../features/auth/authSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, data: users } = useQuery("users", fetchUsers);

  if (isLoading) return <>Loading</>;
  if (isError) return <>Error</>;

  return (
    <>
      <h1>Users</h1>
      <a href="#" onClick={(e) => dispatch(clearToken())}>
        Logout
      </a>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.id}:{user.email}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
