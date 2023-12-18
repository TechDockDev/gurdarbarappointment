import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Heading,
  Card,
  SearchField,
  Flex,
  Image,
  Button,
  Loader,
  Grid,
  Text,
} from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaLocationDot } from "react-icons/fa6";
import { useGlobalContext } from "../../../context/GlobalContext";
import { getServiceProviders } from "../../../services/apiService";

const User: React.FC = () => {
  const { tokens } = useTheme();
  const { setCalendarModal } = useGlobalContext();
  const [services, setServices] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [uniqueKey, setUniqueKey] = useState(0);

  const getDataOnTypeChange = () => {
    try {
      setServices([]);
      setHasMore(true);
      if (page !== 1) {
        setPage(1);
      } else {
        setUniqueKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const handleChange = (value: string) => {
    getDataOnTypeChange();
    setSearchValue(value);
  };

  const optimizedFn = useCallback(debounce(handleChange, 1000), [
    searchValue,
    page,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServiceProviders({
          pageSize: 10,
          page,
          searchQuery: searchValue,
        });

        const data = response.serviceProviders;
        setServices((prevItems: string) => [...prevItems, ...data]);

        if (services.length + data.length === response.total) {
          setHasMore(false);
        }
      } catch (error) {
        setHasMore(false);
        console.error(error);
      }
    };

    fetchData();
  }, [page, uniqueKey]);

  return (
    <View className="container">
      <Heading className="main-heading">Available service provider</Heading>
      <Flex className="flex-container">
        <SearchField
          label="search"
          variation="quiet"
          className="search_field"
          onChange={(e: any) => {
            optimizedFn(e.target.value);
          }}
          placeholder="search for service provider"
          onClear={() => {
            optimizedFn("");
          }}
          hasSearchButton={false}
          hasSearchIcon={true}
        />
      </Flex>
      <InfiniteScroll
        dataLength={services.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Loader
              className="loader"
              size="large"
              filledColor={tokens.colors.font.primary}
            />
          </Flex>
        }
      >
        <Grid className="grid-container">
          {services.map((val: any) => (
            <Card
              key={val?.account_manager_id}
              variation="elevated"
              className="card-container"
            >
              {val?.profile_avatar ? (
                <StorageImage
                  alt="profile_pic"
                  imgKey={val?.account_manager_email}
                  accessLevel="protected"
                  identityId={val?.profile_avatar}
                  className="card_background_color profile-image"
                />
              ) : (
                <Image
                  src="/profile-default.png"
                  alt="profile_pic"
                  className="card_background_color profile-image"
                />
              )}
              <Flex className="provider-details-container">
                <Text
                  className="service_provider_name"
                  title={val?.gurudwara.gurudwara_name}
                >
                  {val?.gurudwara.gurudwara_name.length > 23
                    ? `${val?.gurudwara.gurudwara_name.slice(0, 23)}...`
                    : val?.gurudwara.gurudwara_name}
                </Text>
                <View className="icons">
                  {val?.account_manager_address ? (
                    <>
                      <FaLocationDot />
                      <View as="span" marginInline={"7px"}>
                        {val?.account_manager_address}
                      </View>
                    </>
                  ) : (
                    <>
                      <FaLocationDot />
                      <View as="span" marginInline={"7px"}>
                        no address
                      </View>
                    </>
                  )}
                </View>
                <Button
                  borderColor={tokens.colors.background.secondary}
                  className="book-button"
                  id="selectBlueHover"
                  onClick={() => {
                    setCalendarModal({
                      open: true,
                      id: val?.account_manager_id,
                      name: val?.gurudwara.gurudwara_name,
                      // service: val?.sp_type,
                    });
                    document.body.style.overflow = "hidden";
                  }}
                >
                  Book
                </Button>
              </Flex>
            </Card>
          ))}
        </Grid>
      </InfiniteScroll>
      {services.length === 0 && !hasMore && (
        <Text fontSize={"20px"}>No Service Providers are available</Text>
      )}
    </View>
  );
};

export default User;
