import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const userList = useSelector((state) => state.userList);

  if (!userList) {
    return null;
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <td />
          <td>
            <strong>blogs created</strong>
          </td>
        </tr>
        {userList.map((u) => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default UserList;
