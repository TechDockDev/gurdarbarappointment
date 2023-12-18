import { Dispatch, SetStateAction } from "react";
import { View, Heading, Text, TextAreaField } from "@aws-amplify/ui-react";
// import { useTheme } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";

type AvailableProps = {
  bookingReason: string;
  setBookingReason: Dispatch<SetStateAction<string>>;
  scheduleSettings: {
    endTime?: string;
    message: string;
    perDay?: string;
    startTime?: string;
    status: string;
  };
  loader: boolean;
};

const Availability = ({
  bookingReason,
  setBookingReason,
  scheduleSettings,
  loader,
}: AvailableProps) => {
  // const { tokens } = useTheme();

  if (loader) {
    return <Loader size="large" width={"50px"} />;
  }

  if (!scheduleSettings.startTime) {
    return (
      <Text margin={"10px 0px"}>No Booking is available for this day</Text>
    );
  }

  return (
    <View>
      <>
        <Heading
          level={3}
          fontSize={"24px"}
          fontWeight={"700"}
          textAlign={"left"}
          marginBottom={"20px"}
        >
          Available Slots
        </Heading>
        <View>
          <Text>
            Time Start : <Text as="span">{scheduleSettings.startTime}</Text>
          </Text>
          <Text>
            Time End : <Text as="span">{scheduleSettings.endTime}</Text>
          </Text>
        </View>
      </>

      <View>
        <Heading margin={"20px 0px"} level={5}>
          Please mention your reason for booking :
        </Heading>
        <TextAreaField
          label="booking reason"
          placeholder="I want to book because..."
          rows={3}
          labelHidden
          value={bookingReason}
          onChange={(e) => setBookingReason(e.target.value)}
        />
      </View>
    </View>
  );
};

export default Availability;
