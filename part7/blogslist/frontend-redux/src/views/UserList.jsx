import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const userList = useSelector((state) => state.userList);

  if (!userList) {
    return null;
  }
  return (
    <>
      <Typography variant="h4" marginY={2}>Users</Typography>
      <TableContainer sx={{ width: 'max-content', marginX: 6}} component={Paper}>
        <Table aria-label="User list table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgb(0,0,0,0.1)'}}>
              <TableCell sx={{ padding:1}}/>
              <TableCell sx={{ padding:1}} align="center">
                <Typography variant="h5" fontSize={18}><strong>blogs created</strong></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {userList.map((u) => (
            <TableRow key={u.id}>
              <TableCell sx={{ padding:1}}>
                <Typography>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </Typography>
              </TableCell>
              <TableCell sx={{ padding:1}}>
                <Typography>
                  {u.blogs.length}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};

export default UserList;
