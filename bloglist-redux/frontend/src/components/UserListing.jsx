import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { Table, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material"

const UserListing = () => {
  const users = useSelector(state => state.users)
  console.log('users: ', users)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
            <TableRow>
              <TableCell><h4>Username</h4></TableCell>
              <TableCell><h4>Blogs Created by User</h4></TableCell>
            </TableRow> 
            {users.map(u => (
              <TableRow key={u.id}>
                <TableCell>
                  <Link to={`/users/${u.id}`}>{u.username}</Link>
                </TableCell>
                <TableCell>
                  {u.blogs.length}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserListing