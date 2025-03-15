import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import "@fontsource/rubik";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WindowIcon from "@mui/icons-material/Window";
import ListIcon from "@mui/icons-material/List";
import "./App.css";
import { EventList } from "./eventList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7382BC",
    },
  },
  typography: {
    fontFamily: "Rubik, Arial, sans-serif",
    letterSpacing: "0.02em",
  },
});

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [nameError, setNameError] = useState(null);
  const [dateError, setDateError] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(sessionStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleAddEvent = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("loading");
    }, 3000);
    if (!eventName || !eventDate) {
      if (!eventName) setNameError("Event name is required");
      if (!eventDate) setDateError("Event date is required");
      setLoading(false);
      return;
    }
    const newEvent = { name: eventName, date: eventDate };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    sessionStorage.setItem("events", JSON.stringify(updatedEvents));
    setEventName("");
    setNameError(null);
    setDateError(null);
    setEventDate("");
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ p: 3, mt: 1 }} maxWidth="md">
        <AppBar
          sx={{
            boxShadow: 0,
            //  bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          <Toolbar>
            <Typography variant="h3" className="header" sx={{ color: "#fff" }}>
              <span> Event Manager</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Stack spacing={2}>
          <div style={{ height: 20 }}></div>
          {/* Event Form */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 1,
                width: { lg: "50%", md: "70%", sm: "80%" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Add New Event
              </Typography>
              <TextField
                fullWidth
                label="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                sx={{ mb: 2 }}
                helperText={
                  nameError && (
                    <>
                      <ErrorOutlineIcon
                        fontSize="small"
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      Event name is required.
                    </>
                  )
                }
                error={Boolean(nameError)}
              />
              <TextField
                fullWidth
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                sx={{ mb: 2 }}
                helperText={
                  dateError && (
                    <>
                      <ErrorOutlineIcon
                        fontSize="small"
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      Event date is required.
                    </>
                  )
                }
                error={Boolean(dateError)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddEvent}
                sx={{ color: "#fff" }}
              >
                Add Event
              </Button>
            </Box>
          </Box>
          <Divider sx={{ color: (theme) => theme.palette.primary }} />
          {/* Event List */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h5">Upcoming Events</Typography>
            <IconButton onClick={() => setList((prev) => !prev)}>
              {list ? <WindowIcon /> : <ListIcon />}
            </IconButton>
          </Box>
          <EventList events={events} list={list} />
        </Stack>
      </Container>
      <Backdrop
        open={loading}
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
