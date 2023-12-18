import {
  Alert,
  Button,
  Flex,
  Heading,
  SwitchField,
  Text,
  View,
  useTheme,
} from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import BusinessHourSettingMobile from "./BusinessHourSettingMobile";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { getSchedule, saveSchedule } from "../../../services/apiService";

type TimeSlotConfig = {
  [key: string]: {
    startTime: string;
    endTime: string;
    open: boolean;
  };
};

let data: any = {
  schedule: {
    perDay: 30,
    Monday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Tuesday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Wednesday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Thursday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Friday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Saturday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Sunday: {
      startTime: "00:00",
      endTime: "00:00",
      open: false,
    },
  },
};
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let initialperDay: number;
const BusinessHourSetting = ({
  perDay,
  setPerDay,
  timePickerRef,
}: {
  perDay: number;
  setPerDay: any;
  timePickerRef: any;
}) => {
  useEffect(() => {
    fetchSchedule();
  }, []);
  const { tokens } = useTheme();
  const [schedule, setSchedule] = useState<TimeSlotConfig>({
    Monday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Tuesday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Wednesday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Thursday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Friday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Saturday: {
      startTime: "00:00",
      endTime: "00:00",
      open: true,
    },
    Sunday: {
      startTime: "00:00",
      endTime: "00:00",
      open: false,
    },
  });
  const [scheduleAvailable, setScheduleAvailable] = useState(true);
  const [showAlert, setShowAlert] = useState<{
    open: boolean;
    variant: "success" | "error";
  }>({
    open: false,
    variant: "success",
  });

  const fetchSchedule = async (): Promise<void> => {
    try {
      const data = await getSchedule();
      setPerDay(data?.schedule.perDay);
      initialperDay = data?.schedule.perDay;
      delete data.schedule.perDay;
      setSchedule(data?.schedule);
    } catch (error) {
      if (JSON.parse(JSON.stringify(error)).status === 404) {
        setScheduleAvailable(false);
      }
    }
  };

  const changeStartTime = (value: string, key: string): void => {
    setSchedule({
      ...schedule,
      [key]: { ...schedule[key], startTime: value },
    });
  };

  const changeEndTime = (value: string, key: string): void => {
    setSchedule({
      ...schedule,
      [key]: { ...schedule[key], endTime: value },
    });
  };

  const changeOpenStatus = (e: any): void => {
    const val: string = e.target.value;
    setSchedule({
      ...schedule,
      [val]: {
        ...schedule[val],
        open: e.target.checked,
      },
    });
  };

  const saveScheduleData = async () => {
    try {
      await saveSchedule(schedule, perDay, scheduleAvailable);
      setShowAlert({ open: true, variant: "success" });
      closeAlert();
    } catch (error) {
      setShowAlert({ open: true, variant: "error" });
      closeAlert();
      console.log(error);
    }
  };

  const closeAlert = () => {
    setTimeout(() => {
      setShowAlert({ open: false, variant: "success" });
    }, 2000);
  };

  return (
    <View width={"fit-content"}>
      <Flex margin={"20px 0px"} alignItems={"baseline"}>
        <Heading className="sub-heading">Business hours Setting</Heading>
        {!scheduleAvailable && (
          <Heading className="warning-heading">
            (Schedule isn't setup yet)
          </Heading>
        )}
      </Flex>
      {Object.entries(schedule)?.map(
        ([key, value]) =>
          days.includes(key) && (
            <View key={key} className="desktop-schedule-settings-container">
              <Text color={"black"} fontWeight={"bold"} width={"80px"}>
                {key}
              </Text>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  ref={(e) => (timePickerRef.current = e)}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  value={dayjs(value?.startTime, "HH:mm")}
                  disabled={!value?.open}
                  sx={{
                    "& .MuiInputBase-root": {
                      "&.Mui-focused fieldset": {
                        border: "2px solid #1C469A",
                      },
                    },
                  }}
                  onChange={(value: any) => {
                    changeStartTime(dayjs(value).format("HH:mm"), key);
                  }}
                />

                <TimePicker
                  label="End Time"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  value={dayjs(value.endTime, "HH:mm")}
                  disabled={!value.open}
                  sx={{
                    "& .MuiInputBase-root": {
                      "&.Mui-focused fieldset": {
                        border: "2px solid #1C469A",
                      },
                    },
                  }}
                  onChange={(value: any) => {
                    changeEndTime(dayjs(value).format("HH:mm"), key);
                  }}
                />
              </LocalizationProvider>
              <SwitchField
                value={key}
                size="small"
                isChecked={value.open}
                label="SwitchField"
                labelPosition="start"
                onChange={changeOpenStatus}
                trackCheckedColor={tokens.colors.font.primary}
              />
            </View>
          )
      )}
      {
        <BusinessHourSettingMobile
          schedule={schedule}
          setSchedule={setSchedule}
          timePickerRef={timePickerRef}
        />
      }
      <View marginLeft={{ medium: "108px" }}>
        {showAlert.open && (
          <Alert
            variation={showAlert.variant}
            marginBottom={"10px"}
            color={tokens.colors.font.tertiary}
            style={{
              backgroundColor: "transparent",
              padding: "0px",
              gap: "2px",
            }}
          >
            {" "}
            {showAlert.variant === "success"
              ? "Schedule has been saved Successfully"
              : "Something went wrong! Please try again"}
          </Alert>
        )}
        <Button
          variation="primary"
          width={{ medium: "200px" }}
          disabled={
            JSON.stringify(data?.schedule) === JSON.stringify(schedule) &&
            perDay === initialperDay
          }
          onClick={saveScheduleData}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

export default BusinessHourSetting;
