import { useState, useEffect, useCallback } from "react";
import {
  Flex,
  Text,
  Heading,
  SearchField,
  View,
  Button,
} from "@aws-amplify/ui-react";
import Styles from "./serviceprovider.module.css";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import dayjs from "dayjs";
import { useTheme } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";
import { getAppointmentsHistory } from "../../../services/apiService";
import { useGlobalContext } from "../../../context/GlobalContext";

const AppointmentHistory = () => {
  const [pastAppointments, setPastAppointments] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchValue, SetSearchValue] = useState("");
  const [isSelected, setIsSelected] = useState("upcoming");
  const { tokens } = useTheme();
  const { setCancelModal } = useGlobalContext();

  const debounce = (fn: Function, ms = 1000) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const handleChange = async (value: string, type: string) => {
    try {
      setPastAppointments([]);
      setLoader(true);

      const res = await getAppointmentsHistory({
        searchQuery: value,
        pageSize: 5,
        page: page,
        isSelected: type,
      });
      setTotalPage(res.totalPages);
      setPastAppointments(res.appointments);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  useEffect(() => {
    const getAppointmentHistory = async () => {
      try {
        setPastAppointments([]);
        setLoader(true);
        const res = await getAppointmentsHistory({
          searchQuery: searchValue,
          pageSize: 5,
          page: page,
          isSelected,
        });
        setPastAppointments(res.appointments);
        setTotalPage(res.totalPages);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };
    getAppointmentHistory();
  }, [page]);

  return (
    <View marginTop={"30px"} width={"100%"}>
      <View
        display={{ base: "block", large: "flex" }}
        style={{
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <Heading level={3} fontWeight={"bold"}>
          Appointments
        </Heading>
        <SearchField
          label="search"
          variation="quiet"
          margin={{ base: "20px 10px 20px 0px", large: "0px" }}
          placeholder="Search"
          position={"relative"}
          hasSearchButton={false}
          hasSearchIcon={true}
          onChange={(e: any) => {
            optimizedFn(e.target.value);
            SetSearchValue(e.target.value);
          }}
          onClear={() => {
            optimizedFn("");
          }}
        />
      </View>

      <Flex margin={"10px 0px"}>
        {["upcoming", "past"].map((type) => (
          <Button
            key={type}
            id="selectBlueHover"
            borderColor={tokens.colors.background.secondary}
            borderRadius="10px"
            width={{ large: "170px", base: "100px" }}
            style={{
              backgroundColor:
                isSelected === type
                  ? tokens.colors.background.secondary.toString()
                  : "transparent",
              color:
                isSelected === type
                  ? tokens.colors.white.toString()
                  : tokens.colors.font.primary.toString(),
            }}
            onClick={() => {
              setIsSelected(type);
              handleChange("", type);
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </Flex>
      <View
        style={{
          height: "400px" /* Set the desired height */,
          overflowY:
            "auto" /* Add a vertical scrollbar when content exceeds the height */,
        }}
        color={tokens.colors.font.primary}
      >
        <table
          className={Styles.tableHome}
          width={"100%"}
          style={{ position: "relative" }}
        >
          <thead>
            <tr className={Styles.tableHeadRow}>
              <th>Name</th>
              <th>Email ID</th>
              <th>Date</th>
              <th>Status</th>
              {isSelected === "upcoming" && <th>Action</th>}
            </tr>
          </thead>

          <tbody className={Styles.tableBody}>
            {loader && (
              <tr style={{ height: "300px" }}>
                <td></td>
                <td></td>
                <td>
                  <View
                    display={"flex"}
                    style={{ alignItems: "center" }}
                    // width={"100%"}
                  >
                    <Loader
                      size="large"
                      width={"20%"}
                      filledColor={tokens.colors.font.primary}
                      marginInline={"auto"}
                    />
                  </View>
                </td>
                <td></td>
                <td></td>
              </tr>
            )}
            {pastAppointments.length === 0 && !loader && (
              <tr>
                <td style={{ borderBottom: "none" }}>
                  No appointments to show
                </td>
              </tr>
            )}
            {!loader &&
              pastAppointments?.map((appointments: any) => {
                return (
                  <tr key={appointments.gurudwara_appointment_id}>
                    <td>{appointments?.sangat.fullName}</td>
                    <td>{appointments?.sangat.email}</td>
                    <td>
                      {dayjs(
                        appointments?.gurudwara_appointment_date,
                        "YYYY-MM-DD"
                      ).format("DD-MM-YYYY")}
                    </td>
                    <td>{`${appointments.appointment_status.appointment_status}`}</td>
                    {isSelected === "upcoming" && (
                      <td>
                        <button
                          onClick={() =>
                            setCancelModal({
                              open: true,
                              id: appointments?.gurudwara_appointment_id,
                              cancelledBy: "gurudwara_sahib",
                            })
                          }
                        >
                          Cancel
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </View>
      <Flex
        display={totalPage === 0 ? "none" : ""}
        justifyContent={"center"}
        alignItems={"center"}
        // fontSize={"18px"}
        marginTop={"20px"}
        gap={"5px"}
      >
        <Button disabled={page === 1} padding={"0px"}>
          <MdOutlineNavigateBefore
            color={tokens.colors.font.primary}
            size="20"
            onClick={() => {
              setPage((page) => (page === 1 ? 1 : page - 1));
            }}
          />
        </Button>
        {page !== totalPage && (
          <Text
            color={tokens.colors.font.tertiary}
            fontSize={"20px"}
            fontWeight={"bold"}
          >
            {page}{" "}
            <Text as="span" color={tokens.colors.font.primary}>
              ,
            </Text>
          </Text>
        )}
        {page + 1 < totalPage && (
          <Text
            color={tokens.colors.font.primary}
            fontSize={"20px"}
            fontWeight={"bold"}
            style={{ cursor: "pointer" }}
            onClick={() => setPage(page + 1)}
          >
            {page + 1} ...
          </Text>
        )}
        <Text
          color={tokens.colors.font.primary}
          fontSize={"20px"}
          fontWeight={"bold"}
          style={{ cursor: "pointer" }}
          onClick={() => setPage(totalPage)}
        >
          {totalPage}
        </Text>
        <Button disabled={page === totalPage} padding={"0px"}>
          <MdOutlineNavigateNext
            color={page !== totalPage ? tokens.colors.font.primary : "gray"}
            size="20"
            onClick={() => {
              setPage((page) => page + 1);
            }}
          />
        </Button>
      </Flex>
    </View>
  );
};

export default AppointmentHistory;
