import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import LinkSharpIcon from "@mui/icons-material/LinkSharp"

import { WidgetInfos } from "../config"

export default function Welcome() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 10,
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Welcome Notion Widgets</Typography>

      <List>
        {WidgetInfos.map((item: any, index: number) => {
          return item.name !== "" ? (
            <ListItem disablePadding key={"item" + index}>
              <ListItemButton
                component="a"
                href={item.timestamp ? item.url + "?_=" + new Date().getTime() : item.url}
              >
                <ListItemIcon>
                  <LinkSharpIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ) : undefined
        })}
      </List>
    </Container>
  )
}
