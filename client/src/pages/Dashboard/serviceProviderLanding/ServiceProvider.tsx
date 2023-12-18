import { Grid, Heading, View } from "@aws-amplify/ui-react";
import AppointmentHistory from "./AppointmentHistory";
import TodayAppointment from "./TodayAppointments";
import AppointmentStats from "./AppointmentStats";

const ServiceProvider = () => {
  return (
    <View className="container">
      <Heading className="main-heading">Dashboard</Heading>
      <Grid
        templateColumns={{ xl: "1fr 1fr", base: "1fr", medium: "1fr" }}
        columnGap={{ large: "20px", base: "0px" }}
        paddingTop={"20px"}
      >
        <TodayAppointment />
        <AppointmentStats />
      </Grid>
      <AppointmentHistory />
    </View>
  );
};

export default ServiceProvider;
