import { useState } from "react";
import { Text, View, TextAreaField, Button } from "@aws-amplify/ui-react";
import ModalWrapper from "../globals/ModalWrapper";
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../../context/GlobalContext";
import { useTheme } from "@aws-amplify/ui-react";
import { cancelAppointment } from "../../services/apiService";

interface CancelProps {
  onCancel: () => void;
}

const Cancel: React.FC<CancelProps> = ({ onCancel }) => {
  const { cancelModal, setCancelModal } = useGlobalContext();
  const { tokens } = useTheme();
  const [reason, setReason] = useState("");
  const handleSubmit = async () => {
    try {
      await cancelAppointment(cancelModal.id, reason, cancelModal.cancelledBy);
      document.body.style.overflow = "auto";
      setCancelModal({ open: false });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <ModalWrapper>
      <View
        backgroundColor={"white"}
        width={"100%"}
        maxWidth={{ large: "800px", base: "500px" }}
        marginInline={"auto"}
        padding={"35px"}
        borderRadius={"25px"}
      >
        <Text fontSize={"20px"} fontWeight={700}>
          Reason for cancellation
        </Text>
        <View
          className="cancel-icon"
          onClick={() => {
            setCancelModal({ open: false, id: null });
            onCancel();
          }}
        >
          <IoMdClose className="close-button" />
        </View>
        <View
          marginTop={"20px"}
          fontSize={{ large: "16px", base: "14px" }}
          color={tokens.colors.font.primary}
        >
          Please provide a valid reason for cancelling the appointment
        </View>
        <TextAreaField
          label
          width={{ large: "500px", base: "300px" }}
          name="reason"
          placeholder="Type here..."
          size="small"
          onChange={(e) => {
            setReason(e.target.value);
          }}
          rows={3}
        />
        <Button
          variation="primary"
          width="100%"
          marginTop={"20px"}
          onClick={handleSubmit}
        >
          Cancel Appointment
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default Cancel;
