import {
  ExpandMore,
  ExpandLess,
  Dashboard,
  LibraryBooks,
  Class,
  LocalLibrary,
  Group,
  Schedule,
  Assessment,
  LiveTv,
  Description,
  SettingsRounded,
} from "@mui/icons-material";
import { useState } from 'react';
import { List,ListItem,ListItemIcon,ListItemButton,ListItemText,Stack,Collapse, Divider, Typography } from '@mui/material';
import { Link } from "react-router-dom";
const menuItems = [
  {
    group: "Navigation",
    menus: [
      { menu: "Dashboard", route: "/admin-panel", icon: <Dashboard /> }
    ]
  },
  {
    group: "Acamedic",
    menus: [
      { menu: "Classes", route: "classes", icon: <Class /> },
      { menu: "Program Study", route: "program_study", icon: <LibraryBooks /> },
      { menu: "Courses", route: "courses", icon: <LocalLibrary /> },
      { menu: "Instructors", route: "instructors", icon: <Group /> },
      { menu: "Schedule", route: "schedule", icon: <Schedule /> },
      { menu: "Students", route: "students", icon: <Group /> },
      {
        menu: "Acamedic Progress",
        route: "#",
        icon: <Assessment />,
        sub_menu: [
          { menu: "Quizzes Report", route: "quizzes-report", icon: <Description /> },
          { menu: "Student Progress", route: "student-progress", icon: <Description /> },
        ],
      },
    ]
  },
  {
    group: "Media",
    menus: [
      { menu: "Online Class", route: "online_class", icon: <LiveTv /> },
    ]
  },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRounded /> },
];

export default function MenuContent() {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  // Toggle function for dropdown menus
  const handleToggle = (route:string) => {
    setOpenDropdowns((prevState:any) => ({
      ...prevState,
      [route]: !prevState[route],
    }));
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List>
        {menuItems.map((group, groupIndex) => (
          <div key={groupIndex}>
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'gray', textTransform: 'uppercase' }}>
              {group.group}
            </Typography>
            {group.menus.map((item, itemIndex) => (
              <div key={itemIndex}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  {item.sub_menu ? (
                    <ListItemButton onClick={() => handleToggle(item.route)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.menu} />
                      {openDropdowns[item.route] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  ) : (
                    <ListItemButton component={Link} to={item.route}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.menu} />
                    </ListItemButton>
                  )}
                </ListItem>

                {/* Dropdown Submenu */}
                {item.sub_menu && (
                  <Collapse in={openDropdowns[item.route]} timeout="auto" unmountOnExit>
                    <List sx={{ pl: 4 }}>
                      {item.sub_menu.map((subItem, subIndex) => (
                        <ListItem key={subIndex} disablePadding>
                          <ListItemButton component={Link} to={subItem.route}>
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            <ListItemText primary={subItem.menu} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
            <Divider />
          </div>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
