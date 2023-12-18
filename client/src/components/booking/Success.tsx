import { View, Image, Flex, Text } from "@aws-amplify/ui-react";
import ModalWrapper from "../globals/ModalWrapper";
import { useGlobalContext } from "../../context/GlobalContext";
import { IoMdClose } from "react-icons/io";

const Success = () => {
  const { daySelected, successModal, setSuccessModal } = useGlobalContext();
  return (
    <ModalWrapper>
      <View
        backgroundColor={"white"}
        width={"100%"}
        maxWidth={{ xxl: "700px", xl: "500px" }}
        borderRadius={"25px"}
        padding={"10px"}
      >
        <View
          className="cancel-icon"
          onClick={() => {
            setSuccessModal({
              provider: "",
              service: "",
              date: "",
              bookingReason: "",
              open: false,
            });
            document.body.style.overflow = "auto";
          }}
        >
          <IoMdClose className="close-button" />
        </View>
        <Flex
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/check-mark-circle.svg" alt="success" width={"80px"} />
          <Text fontSize={"30px"} fontWeight={700}>
            Your booking is confirmed
          </Text>
          <Text fontSize={"20px"} fontWeight={700}>
            {successModal.provider}
          </Text>
          <Text fontSize={"15px"} fontWeight={700}>
            {daySelected.format("dddd, MMMM D, YYYY")}
          </Text>
        </Flex>
      </View>
    </ModalWrapper>
  );
};

export default Success;
