import React, { useState } from "react";
import { Card, Grid, Heading, Text, Flex } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useTheme } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";
import { getAppointmentsStatsToday } from "../../../services/apiService";

const TodayAppointment = () => {
  const [TodayAppointment, setTodayAppointment] = useState<[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
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
      const res = await getAppointmentsStatsToday({
        time: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
        timeZone: formattedOffset,
      });

      // const appointments = res.appointments.filter(
      //   ({
      //     gurudwara_appointment_date,
      //   }: {
      //     gurudwara_appointment_date: Date;
      //   }) => {
      //     return (
      //       new Date(gurudwara_appointment_date).getTime() >
      //       new Date().getTime()
      //     );
      //   }
      // );
      setTodayAppointment(res.appointments);
      setLoader(false);
    })().catch(() => setLoader(false));
  }, []);

  const { tokens } = useTheme();
  return (
    <Card
      variation="elevated"
      maxHeight={"80vh"}
      paddingBlock={"20px"}
      flex={2}
      style={{
        overflowY: "scroll",
      }}
    >
      <Heading
        level={5}
        fontWeight={"bold"}
        display={"flex"}
        paddingBottom={"20px"}
        style={{
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        Today's Appointment
      </Heading>
      <Flex justifyContent={"center"} alignItems={"center"} width={"100%"}>
        {TodayAppointment.length === 0 ? (
          loader ? (
            <Loader
              width={"20px"}
              filledColor={tokens.colors.font.primary}
              marginInline={"auto"}
            />
          ) : (
            <Text
              marginInline={"auto"}
              fontSize={"18px"}
              fontWeight={100}
              color={tokens.colors.font.primary}
            >
              No Appointment Today
            </Text>
          )
        ) : (
          <></>
        )}
      </Flex>
      <Grid columnGap={"15px"} rowGap={"25px"} textAlign={"center"}>
        {TodayAppointment.length !== 0 ? (
          <>
            <Text color={"grey"} fontWeight={"bold"}>
              Client Name
            </Text>
          </>
        ) : (
          ""
        )}
        {TodayAppointment?.map((appointment: any) => {
          return (
            <React.Fragment key={appointment.gurudwara_appointment_id}>
              <Text fontWeight={"600"} textTransform={"capitalize"}>
                {appointment.sangat.fullName}
              </Text>
            </React.Fragment>
          );
        })}
      </Grid>
    </Card>
  );
};

export default TodayAppointment;
