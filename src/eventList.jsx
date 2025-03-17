import {
  Typography,
  Grid2,
  Card,
  Box,
  CardContent,
  Tooltip,
  List,
  ListItem,
  Divider,
  Stack,
  CardActions,
  Button,
} from "@mui/material";

import ScheduleIcon from "@mui/icons-material/Event";
import { Person, PersonAdd, Place } from "@mui/icons-material";

const getTime = () => {
  const date = new Date();
  const options = { weekday: "short" };
  const day = new Intl.DateTimeFormat("en-US", options).format(date);
  return `${day} . ${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};
const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return (
    <Stack>
      <Typography color="primary">
        {day}
        {suffix}
      </Typography>
      <Typography color="primary">{month}</Typography>
      <Typography color="primary">'{year}</Typography>
    </Stack>
  );
};

export const EventList = ({ events = [], list = false }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      {list ? (
        <List sx={{ width: { sm: "100%", md: "50%" } }}>
          {events
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((event, index) => (
              <>
                <ListItem key={index} sx={{ maxWidth: "100%" }}>
                  <Stack
                    spacing={2}
                    direction="row"
                    alignItems={"flex-start"}
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="p2">{getDate(event.date)}</Typography>
                    <Stack spacing={1} sx={{ width: "100%" }}>
                      <Typography variant="p2">
                        {getTime(event.date)}
                      </Typography>
                      <Tooltip title={event.name}>
                        <Typography
                          variant="h5"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {event.name}
                        </Typography>
                      </Tooltip>
                      <Typography variant="p2">
                        Donec eu turpis nulla. Aenean ut suscipit ipsum. Mauris
                        felis velit, tempor quis augue at, fermentum rutrum
                        sapien. Curabitur lacus nulla, tempus quis consequat at,
                        lacinia non sapien. In mattis sapien dictum massa
                        gravida, non egestas nibh rhoncus.
                      </Typography>
                    </Stack>
                  </Stack>
                </ListItem>
                {index !== events.length - 1 ? (
                  <Divider sx={{ mb: 1 }} />
                ) : null}
              </>
            ))}
        </List>
      ) : (
        <Grid2 container spacing={2}>
          {events
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((event, index) => (
              <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
                <Card
                  sx={{
                    //   background:
                    //     "linear-gradient(135deg, #7382BC 30%, #57679E 90%)",
                    // color: "#ffffff",
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
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "#fff",
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
                    <Stack direction="row">
                      <Place size="small" />
                      <Typography>{event?.location || "London"}</Typography>
                    </Stack>
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
                      lacinia non sapien. In mattis sapien dictum massa gravida,
                      non egestas nibh rhoncus.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined" color="primary">
                      Manage
                    </Button>
                    <Button
                      startIcon={<PersonAdd />}
                      sx={{ textTransform: "none" }}
                    >
                      Invite
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
        </Grid2>
      )}
    </div>
  );
};
