import { Text, View } from "@aws-amplify/ui-react";
import ModalWrapper from "../globals/ModalWrapper";
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../../context/GlobalContext";

const CancelDetails = () => {
  const { cancelDetailModal, setCancelDetailModal } = useGlobalContext();
  const getCancellationDate = () => {
    const cancelDate = cancelDetailModal?.updatedAt;
    const timeline = new Date(cancelDate);
    const date = timeline.getDate();
    const month = timeline
      .toLocaleString("default", { month: "long" })
      .slice(0, 3);
    const year = timeline.getFullYear();
    const time = timeline.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${date}, ${month} ${year} at ${time}`;
  };

  return (
    <ModalWrapper>
      <View
        backgroundColor={"white"}
        minWidth={{ xl: "500px", large: "600px", base: "300px" }}
        marginInline={{ large: "", base: "auto" }}
        padding={{ large: "35px", base: "20px" }}
        borderRadius={"25px"}
      >
        <Text fontSize={{ large: "20px", base: "16px" }} fontWeight={700}>
          Reason for cancellation
        </Text>
        <View
          className="cancel-icon"
          onClick={() => {
            setCancelDetailModal({
              open: false,
              reason: null,
              updatedAt: null,
            });
            document.body.style.overflow = "auto";
          }}
        >
          <IoMdClose className="close-button" />
        </View>
        <Text textAlign={"left"} marginTop={"35px"}>
          Reason: {cancelDetailModal.reason || "No Reason Specified"}
        </Text>
        <Text>Cancelled on : {getCancellationDate()}</Text>
      </View>
    </ModalWrapper>
  );
};

export default CancelDetails;
