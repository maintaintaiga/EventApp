import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  Grid2,
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Tooltip,
  Box,
} from "@mui/material";
import "@fontsource/roboto";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ScheduleIcon from "@mui/icons-material/Event";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7382BC",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <Stack spacing={2}>
          <Typography variant="h3" className="header">
            <span> Event Manager</span>
          </Typography>
          <div style={{ height: 20 }}></div>
          {/* Event Form */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ p: 2, mb: 3, borderRadius: 1, width: "50%" }}>
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
          <Typography variant="h5" sx={{ mb: 5 }}>
            Upcoming Events
          </Typography>
          <Grid2 container spacing={2}>
            {events
              .sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
              })
              .map((event, index) => (
                <Grid2 size={{ xs: 12, sm: 6, xl: 4 }} key={index}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #7382BC 30%, #57679E 90%)",
                      color: "#ffffff",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                      overflow: "hidden",
                      //textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        p: 1,
                      }}
                    >
                      <ScheduleIcon />
                      <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                        {event.date}
                      </Typography>
                    </Box>
                    <CardContent>
                      <Tooltip title={event.name}>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "bold" }}
                          noWrap
                          gutterBottom
                        >
                          {event.name}
                        </Typography>
                      </Tooltip>
                      <Typography
                        sx={{
                          opacity: 0.8,
                          fontStyle: "italic",
                          fontSize: "0.9rem",
                        }}
                      >
                        Donec eu turpis nulla. Aenean ut suscipit ipsum. Mauris
                        felis velit, tempor quis augue at, fermentum rutrum
                        sapien. Curabitur lacus nulla, tempus quis consequat at,
                        lacinia non sapien. In mattis sapien dictum massa
                        gravida, non egestas nibh rhoncus.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
          </Grid2>
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
