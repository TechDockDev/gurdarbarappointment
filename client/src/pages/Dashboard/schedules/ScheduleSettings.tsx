import { Heading, SelectField, Text, View } from "@aws-amplify/ui-react";
import BusinessHourSetting from "./BusinessHourSetting";
import { useRef, useState } from "react";

const ScheduleSettings = () => {
  const [perDay, setPerDay] = useState(1);
  const timePickerRef = useRef<HTMLDivElement | null>();
  return (
    <View className="container">
      <Heading className="main-heading">Schedule Management</Heading>
      <Heading className="sub-heading">Bookings Intake</Heading>
      <View
        display={"flex"}
        style={{ alignItems: "center" }}
        marginBottom={"30px"}
      >
        <Text color={"black"} fontWeight={"bold"}>
          Per Day:
        </Text>
        <SelectField
          label="Slot Time"
          labelHidden
          descriptiveText=""
          marginLeft={10}
          width={
            timePickerRef.current?.clientWidth
              ? timePickerRef.current?.clientWidth
              : "260px"
          }
          value={perDay.toString()}
          onChange={(e: any) => setPerDay(e.target.value)}
          style={{ borderColor: "#5DDDBE", backgroundColor: "transparent" }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </SelectField>
      </View>
      <BusinessHourSetting
        perDay={perDay}
        setPerDay={setPerDay}
        timePickerRef={timePickerRef}
      />
    </View>
  );
};

export default ScheduleSettings;
