import { useState, useEffect, useRef } from "react";
import { View, Card, Flex, Image, Text, Grid } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { getAppointmentsByStatus } from "../../../services/apiService";
import dayjs from "dayjs";

const Past = () => {
  const pastServices = useRef<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState<number>(1);
  const { tokens } = useTheme();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getAppointmentsByStatus({
        page,
        pageSize: 10,
        status: "past",
      });
      setLoader(false);
      if (
        pastServices.current.length + response.appointments.length ===
        response.total
      ) {
        setHasMore(false);
      }
      pastServices.current = [
        ...pastServices.current,
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
        dataLength={pastServices.current.length}
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
          {pastServices.current?.map((val: any, idx: any) => {
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
                </Flex>
              </Card>
            );
          })}
        </Grid>
        <View textAlign={"center"} marginInline={"auto"} width={"100%"}>
          {pastServices.current.length === 0 && !hasMore && (
            <Text marginInline={"auto"} color={tokens.colors.font.primary}>
              No Past Appointments
            </Text>
          )}
        </View>
      </InfiniteScroll>
    </>
  );
};

export default Past;
