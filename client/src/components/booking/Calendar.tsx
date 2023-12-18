import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { IoMdClose } from "react-icons/io";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import {
  Heading,
  Grid,
  View,
  Button,
  Flex,
  Text,
  Card,
  useTheme,
} from "@aws-amplify/ui-react";
import ModalWrapper from "../globals/ModalWrapper";
import Availability from "./Availability";
import { getServiceProviderSlots } from "../../services/apiService";
import { useGlobalContext } from "../../context/GlobalContext";
import { getMonth } from "../../utils/GetMonth";
import { bookAppointment } from "../../services/apiService";

dayjs.extend(utc);
dayjs.extend(timezone);

const Calendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    dayjs().month()
  );
  const [hideCalender, setHideCalender] = useState<boolean>(false);
  const [bookingReason, setBookingReason] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<any>(getMonth());
  const [isloader, setIsLoader] = useState<boolean>(true);
  const {
    monthIndex,
    setSmallCalendar,
    daySelected,
    setDaySelected,
    calendarModal,
    setCalendarModal,
    setSuccessModal,
  } = useGlobalContext();

  interface ScheduleSettingsResponse {
    endTime?: string;
    message: string;
    perDay?: string;
    startTime?: string;
    status: string;
  }

  const [scheduleSettings, setScheduleSettings] =
    useState<ScheduleSettingsResponse>({
      message: "",
      perDay: "",
      status: "",
    });

  const { tokens } = useTheme();

  const handlePrevMonth = () => {
    if (currentMonthIdx !== dayjs().month()) {
      setCurrentMonthIdx(currentMonthIdx === 0 ? 11 : currentMonthIdx - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonth === 11 ? 0 : currentMonthIdx + 1);
  };

  const getDay = (day: any) => {
    if (
      !lessThanCurrentDate(day) &&
      day.format("DD-MM-YY") === daySelected.format("DD-MM-YY")
    ) {
      return true;
    }
    return false;
  };

  const lessThanCurrentDate = (day: any) => {
    if (`${day.format("YYYY")}` === `${dayjs().year()}`) {
      if (
        (day.month() === dayjs().month() &&
          day.format("DD-MM-YY") < dayjs().format("DD-MM-YY")) ||
        dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM-YYYY") !==
          day.format("MMMM-YYYY")
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const handleAppointment = async () => {
    setIsLoader(true);

    try {
      const response = await getServiceProviderSlots(
        calendarModal.id,
        daySelected.format("YYYY-MM-DD")
      );
      setScheduleSettings(response);
      // let appointments: any = response?.appointments?.map(
      //   (appointment: any) => {
      //     if (new Date(appointment).getTime() < Date.now()) return null;
      //     return `${String(new Date(appointment).getHours()).padStart(
      //       2,
      //       "0"
      //     )}:${String(new Date(appointment).getMinutes()).padStart(2, "0")}`;
      //   }
      // );

      // const formattedTimeSlotArray = response.timeSlotArray.map(
      //   (value: string) =>
      //     String(value.split(":")[0]).padStart(2, "0") +
      //     ":" +
      //     String(value.split(":")[1]).padStart(2, "0")
      // );

      // const availableSlots = formattedTimeSlotArray?.filter((value: string) => {
      //   const [hour, minutes] = value.split(":");
      //   const selectedTime = daySelected
      //     .hour(Number(hour))
      //     .minute(Number(minutes))
      //     .valueOf();
      //   const currentTime = new Date().getTime();

      //   if (selectedTime >= currentTime) {
      //     return !appointments.includes(value);
      //   }

      //   return false;
      // });

      // setTimeSlotArray(availableSlots);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    handleAppointment();
  }, [daySelected]);

  const handleConfirmBooking = () => {
    bookAppointment(daySelected, bookingReason, calendarModal.id);
    document.body.style.overflow = "hidden";
    setSuccessModal({
      provider: calendarModal?.name,
      service: calendarModal.service,
      date: daySelected.toString(),
      bookingReason,
      open: true,
    });
    setCalendarModal({
      provider: "",
      service: "",
      date: "",
      bookingReason: "",
      open: false,
    });
  };

  return (
    <ModalWrapper>
      <View
        overflow={"visible"}
        backgroundColor={"white"}
        width={{ large: "70vw", base: "100%" }}
        paddingTop={"15px"}
        borderRadius={"10px"}
      >
        <Text
          fontSize={{ large: "36px", base: "24px" }}
          fontWeight={600}
          textAlign={"center"}
        >
          Book Appointment
        </Text>
        <View
          className="cancel-icon"
          onClick={() => {
            setBookingReason("");
            setCurrentMonth(getMonth());
            setDaySelected(dayjs());
            setCalendarModal({ open: false, id: null });
            document.body.style.overflow = "auto";
          }}
        >
          <IoMdClose className="close-button" />
        </View>

        <Flex
          justifyContent={"center"}
          alignItems={"left"}
          direction={"column"}
          gap={"1px"}
        >
          {/* <Text fontSize={"14px"} fontWeight={"bold"} textAlign={"left"}>
            Service name :{" "}
            <View as="span" fontWeight={400}>
              {calendarModal?.service?.charAt(0).toUpperCase() +
                calendarModal?.service?.slice(1)}
            </View>
          </Text> */}
          <Text fontSize={"14px"} fontWeight={"bold"} textAlign={"left"}>
            Gurudwara Sahib:{" "}
            <View as="span" fontWeight={400}>
              {calendarModal?.name}
            </View>
          </Text>
        </Flex>

        <Grid templateColumns={{ large: "1fr 1fr" }} columnGap={"20px"}>
          <View
            display={{ large: "", base: hideCalender ? "none" : "" }}
            style={{
              flexBasis: "3",
            }}
          >
            <Heading
              level={3}
              fontSize={{ large: "24px", base: "18px" }}
              fontWeight={"700"}
              paddingBlock={"10px"}
              textAlign={"left"}
            >
              Choose a Date
            </Heading>
            <Card
              backgroundColor={"white"}
              variation="elevated"
              boxShadow={"medium"}
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"24px"} fontWeight={600}>
                  {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                    "MMMM-YYYY"
                  )}
                </Text>
                <Flex>
                  <MdOutlineNavigateBefore
                    fontSize={"30px"}
                    color={tokens.colors.font.tertiary}
                    style={{
                      color: `${
                        currentMonthIdx !== dayjs().month()
                          ? tokens.colors.font.primary
                          : "grey"
                      }`,
                      cursor: "pointer",
                    }}
                    onClick={handlePrevMonth}
                  />
                  <MdOutlineNavigateNext
                    fontSize={"30px"}
                    color={tokens.colors.font.primary}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleNextMonth}
                  />
                </Flex>
              </Flex>
              <Grid
                templateColumns={"1fr 1fr 1fr 1fr 1fr 1fr 1fr"}
                templateRows={"1fr 1fr 1fr 1fr 1fr 1fr"}
              >
                {currentMonth[0].map((day: any, i: number) => (
                  <View
                    as="div"
                    key={i}
                    fontSize={{ large: "14px", base: "11px" }}
                    textAlign={"center"}
                    padding={"10px"}
                  >
                    {day.format("dd").charAt(0)}
                    {day.format("dd").charAt(1)}
                  </View>
                ))}

                {currentMonth.map((row: any, i: number) => (
                  <React.Fragment key={i}>
                    {row.map((day: any, i: number) => (
                      <View
                        as="div"
                        key={i}
                        border={"1px solid #D5D4DF"}
                        fontSize={{ large: "14px", base: "11px" }}
                        onClick={() => {
                          if (
                            dayjs(
                              new Date(dayjs().year(), currentMonthIdx)
                            ).format("MMMM-YYYY") === day.format("MMMM-YYYY")
                          ) {
                            setHideCalender(true);
                            setBookingReason("");
                            setSmallCalendar(currentMonthIdx);
                            setDaySelected(day);
                          }
                        }}
                        textAlign={"center"}
                        padding="10px"
                        style={{
                          cursor: "pointer",
                          backgroundColor: `${
                            lessThanCurrentDate(day)
                              ? "#F2F3F7"
                              : daySelected &&
                                getDay(day) &&
                                day.month() === daySelected.month()
                              ? tokens.colors.font.primary
                              : day.format("DD-MM-YY") ===
                                dayjs().format("DD-MM-YY")
                              ? tokens.colors.blue[40]
                              : ""
                          }`,

                          color: `${
                            lessThanCurrentDate(day)
                              ? "#A8A8A8"
                              : getDay(day)
                              ? tokens.colors.white
                              : ""
                          }`,
                        }}
                      >
                        {dayjs(
                          new Date(dayjs().year(), currentMonthIdx)
                        ).format("MMMM-YYYY") === day.format("MMMM-YYYY")
                          ? day.format("D")
                          : ""}

                        {/* {currentMonthIdx > 11
                          ? day.month() !==
                            currentMonthIdx -
                              Math.floor(currentMonthIdx / 11) * 1
                            ? ""
                            : day.format("D")
                          : day.month() !== currentMonthIdx
                          ? "": */}
                      </View>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Card>
          </View>

          <View display={{ large: " ", base: hideCalender ? "" : "none" }}>
            <View display={{ large: "none" }}>
              <BiArrowBack
                padding={"40px"}
                color={tokens.colors.font.primary}
                border={"1px solid black"}
                onClick={() => {
                  setHideCalender(false);
                  setBookingReason("");
                }}
              />
            </View>
            <Availability
              bookingReason={bookingReason}
              setBookingReason={setBookingReason}
              scheduleSettings={scheduleSettings}
              loader={isloader}
            />
          </View>
        </Grid>
        {scheduleSettings.startTime && (
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Button
              variation="primary"
              marginBlock={"12px"}
              width={{ large: "24rem", medium: "20rem", base: "18rem" }}
              isDisabled={!bookingReason}
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </Button>
          </Flex>
        )}
      </View>
    </ModalWrapper>
  );
};

export default Calendar;
