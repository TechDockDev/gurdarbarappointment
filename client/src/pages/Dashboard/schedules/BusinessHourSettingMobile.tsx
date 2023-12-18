import {
  SelectField,
  SwitchField,
  Text,
  View,
  useTheme,
} from "@aws-amplify/ui-react";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BusinessHourSettingMobile = ({
  schedule,
  setSchedule,
  timePickerRef,
}: {
  schedule: {
    [key: string]: { startTime: string; endTime: string; open: boolean };
  };
  setSchedule: any;
  timePickerRef: any;
}) => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const { tokens } = useTheme();
  const changeStartTime = (value: string): void => {
    setSchedule({
      ...schedule,
      [selectedDay]: { ...schedule[selectedDay], startTime: value },
    });
  };

  const changeEndTime = (value: string): void => {
    setSchedule({
      ...schedule,
      [selectedDay]: { ...schedule[selectedDay], endTime: value },
    });
  };

  const changeOpenStatus = (e: any): void => {
    setSchedule({
      ...schedule,
      [selectedDay]: {
        ...schedule[selectedDay],
        open: e.target.checked,
      },
    });
  };
  return (
    <View maxWidth={"320px"} display={{ medium: "none" }}>
      <SelectField
        label="Select day"
        onChange={(e) => setSelectedDay(e.target.value)}
        style={{ borderColor: "#5DDDBE", backgroundColor: "transparent" }}
      >
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </SelectField>
      <View className="mobile-schedule-settings-container">
        <Text fontSize={20}>Starting Time</Text>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            ref={(e) => (timePickerRef.current = e)}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            value={dayjs(schedule[selectedDay].startTime, "HH:mm")}
            disabled={!schedule[selectedDay].open}
            sx={{
              "& .MuiInputBase-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid #1C469A",
                },
              },
            }}
            onChange={(value: any) => {
              changeStartTime(dayjs(value).format("HH:MM"));
            }}
          />
          <Text fontSize={20}>Ending Time</Text>
          <TimePicker
            label="Start Time"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            value={dayjs(schedule[selectedDay].endTime, "HH:mm")}
            disabled={!schedule[selectedDay].open}
            sx={{
              "& .MuiInputBase-root": {
                "&.Mui-focused fieldset": {
                  border: "2px solid #1C469A",
                },
              },
            }}
            onChange={(value: any) => {
              changeEndTime(dayjs(value).format("HH:MM"));
            }}
          />
        </LocalizationProvider>
        <SwitchField
          isDisabled={false}
          isChecked={schedule[selectedDay].open}
          label="SwitchField"
          labelPosition="start"
          onChange={changeOpenStatus}
          trackCheckedColor={tokens.colors.grey}
          trackColor={tokens.colors.background.secondary}
        />
      </View>
    </View>
  );
};

export default BusinessHourSettingMobile;
