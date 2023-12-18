import { useState, useEffect, useRef } from "react";
import {
  View,
  Card,
  Grid,
  Flex,
  Image,
  Button,
  Text,
} from "@aws-amplify/ui-react";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useTheme } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { getAppointmentsByStatus } from "../../../services/apiService";
import dayjs from "dayjs";

const Cancelled = () => {
  const [hasMore, setHasMore] = useState(true);
  const { setCancelDetailModal } = useGlobalContext();
  const [page, setPage] = useState<number>(1);
  const { tokens } = useTheme();
  const cancelledServices = useRef<any[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getAppointmentsByStatus({
        page,
        pageSize: 10,
        status: "cancelled",
      });
      setLoader(false);
      if (
        cancelledServices.current.length + response.appointments.length ===
        response.total
      ) {
        setHasMore(false);
      }

      cancelledServices.current = [
        ...cancelledServices.current,
        ...response.appointments,
      ];
    })();
  }, [page]);

  return (
    <>
      {loader && (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Loader
            className="loader"
            size="large"
            filledColor={tokens.colors.font.primary}
          />
        </Flex>
      )}
      <InfiniteScroll
        dataLength={cancelledServices.current.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore} // Replace with a condition based on your data source
        loader={
          !loader && (
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Loader
                className="loader"
                size="large"
                filledColor={tokens.colors.font.primary}
              />
            </Flex>
          )
        }
      >
        <Grid className="grid-container">
          {cancelledServices.current?.map((val: any, idx: any) => {
            return (
              <Card
                borderRadius="15px"
                key={idx}
                variation="elevated"
                className="card-container"
              >
                {val?.account_manager?.profile_avatar ? (
                  <StorageImage
                    alt="Image"
                    imgKey={val?.account_manager?.account_manager_email}
                    accessLevel="protected"
                    identityId={val?.account_manager?.profile_avatar}
                    className="card_background_color profile-image"
                  />
                ) : (
                  <Image
                    src="/profile-default.png"
                    alt="salon"
                    className="card_background_color profile-image"
                  />
                )}
                <Flex className="provider-details-container">
                  <Text
                    className="service_provider_name"
                    color={tokens.colors.font.primary}
                    title={val?.account_manager?.gurudwara?.gurudwara_name}
                  >
                    {val?.account_manager?.gurudwara?.gurudwara_name.length > 23
                      ? `${val?.account_manager?.gurudwara?.gurudwara_name.slice(
                          0,
                          23
                        )}...`
                      : val?.account_manager?.gurudwara?.gurudwara_name}
                  </Text>
                  <View className="icons">
                    <Image src="/calendar.png" alt="calendar" width={"12px"} />
                    <View as="span" marginLeft={"7px"}>
                      {dayjs(val?.gurudwara_appointment_date).format(
                        "ddd, MMM D, YYYY"
                      )}
                    </View>
                  </View>

                  <Button
                    variation="primary"
                    className="information-button"
                    id="selectBlueHover"
                    onClick={() => {
                      setCancelDetailModal({
                        open: true,
                        reason: val?.cancellation_reason,
                        updatedAt: val?.updatedAt,
                      });
                      document.body.style.overflow = "hidden";
                    }}
                  >
                    Information
                  </Button>
                </Flex>
              </Card>
            );
          })}
        </Grid>
        <View textAlign={"center"} marginInline={"auto"} width={"100%"}>
          {cancelledServices.current.length === 0 && !hasMore && (
            <Text marginInline={"auto"} color={tokens.colors.font.primary}>
              No Cancelled Appointments
            </Text>
          )}
        </View>
      </InfiniteScroll>
    </>
  );
};

export default Cancelled;
