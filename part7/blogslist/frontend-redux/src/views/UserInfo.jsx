import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material"
import FeedIcon from '@mui/icons-material/Feed';

const UserInfo = ({ user }) => {
  if(!user){
    return null
  }

  return(
    <Box marginY={2}>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6">Added blogs</Typography>
      <List>
        {user.blogs.map(b => (
          <ListItem key={b.id}>
            <ListItemIcon>
              <FeedIcon/>
            </ListItemIcon>
            {b.title}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default UserInfo