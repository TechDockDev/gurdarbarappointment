import { useState, useEffect } from "react";
import { Card, Grid, Heading, Text, View } from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import dayjs from "dayjs";
import { getAppointmentsStats } from "../../../services/apiService";

const AppointmentStats = () => {
  const [stat, setStat] = useState<any>({});
  const { tokens } = useTheme();
  const [time, setTime] = useState(dayjs().format("hh:mm"));

  useEffect(() => {
    const timeZoneOffsetInMinutes = new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(timeZoneOffsetInMinutes) / 60);
    const minutes = Math.abs(timeZoneOffsetInMinutes % 60);
    const formattedOffset =
      (timeZoneOffsetInMinutes > 0 ? "-" : "+") +
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes;
    (async () => {
      const res = await getAppointmentsStats({
        time: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
        timeZone: formattedOffset,
      });
      setStat(res);
    })();
    const timeId = setInterval(() => {
      setTime(dayjs().format("hh:mm"));
    }, 10000);
    return () => {
      clearInterval(timeId);
    };
  }, []);

  return (
    <Grid
      flex={2}
      templateColumns={{
        base: "1fr",
        medium: " 1fr 1fr",
        large: "1fr 1fr",
        xl: "1fr 1fr",
      }}
      paddingTop={{ large: "20px", base: "20px" }}
      alignSelf={"center"}
      columnGap={{ xl: "70px", large: "50px", medium: "40px", base: "20px" }}
      rowGap={{ xl: "70px", large: "20px", medium: "20px", base: "20px" }}
    >
      <Card
        marginInline={"auto"}
        width={"12rem "}
        padding={"10px"}
        textAlign={"center"}
        backgroundColor={"white"}
        variation="elevated"
      >
        <Heading
          level={5}
          fontWeight={"bold"}
          style={{
            margin: "10px 0px",
          }}
        >
          Clock
        </Heading>
        {/* <View> */}
        <View as="div">
          <Text
            color={tokens.colors.font.primary}
            fontSize={"24px"}
            display={"inline"}
          >
            {time}
          </Text>
          <Text color={tokens.colors.font.primary} display={"inline"}>
            {" "}
            {dayjs().format("A")}
          </Text>
        </View>
        <Text color={tokens.colors.font.primary}>
          {dayjs().format("DD/MM/YYYY")}
        </Text>
      </Card>
      {stat?.schedule?.startTime && (
        <Card
          marginInline={"auto"}
          width={"12rem "}
          padding={"10px"}
          textAlign={"center"}
          backgroundColor={"white"}
          variation="elevated"
        >
          <Heading
            level={5}
            fontWeight={"bold"}
            style={{
              marginTop: "10px",
            }}
          >
            Schedule
          </Heading>
          {/* <View> */}
          <View margin={"10px 0px"} color={tokens.colors.font.primary}>
            <Text fontSize={"16px"}>
              Shift start:{" "}
              {dayjs(stat?.schedule?.startTime, "HH:mm").format("hh:mm A")}
            </Text>
            <Text fontSize={"16px"}>
              Shift end:{" "}
              {dayjs(stat?.schedule?.endTime, "HH:mm").format("hh:mm A")}
            </Text>
          </View>
        </Card>
      )}
      {/* card4 */}
      <Card
        marginInline={"auto"}
        width={"12rem "}
        padding={"10px"}
        textAlign={"center"}
        backgroundColor={"white"}
        variation="elevated"
      >
        <Heading level={5} fontWeight={"bold"}>
          Today's Booking
        </Heading>
        <Text
          fontSize={"24px"}
          marginTop={"10px"}
          color={tokens.colors.font.primary}
        >
          {stat?.todayBooking}
        </Text>
      </Card>
      <Card
        marginInline={"auto"}
        width={"12rem "}
        padding={"10px"}
        textAlign={"center"}
        backgroundColor={"white"}
        variation="elevated"
      >
        <Heading level={5} fontWeight={"bold"}>
          Total Bookings
        </Heading>
        <Text
          fontSize={"24px"}
          color={tokens.colors.font.primary}
          marginTop={"10px"}
        >
          {stat?.totalBooking}
        </Text>
      </Card>
    </Grid>
  );
};

export default AppointmentStats;
