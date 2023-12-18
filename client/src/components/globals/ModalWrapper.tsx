import { View } from "@aws-amplify/ui-react";

type props = {
  children: React.ReactNode;
};

const ModalWrapper = ({ children }: props) => {
  return (
    <View
      position={"fixed"}
      width={"100%"}
      height={"100%"}
      className="amplify-modal"
      style={{
        zIndex: 100,
        boxSizing: "border-box",
        padding: "0px",
        margin: "0px",
      }}
      top={"0px"}
      bottom={"0px"}
    >
      <View
        position={"absolute"}
        className="card_background_color"
        paddingInline="20px"
        borderRadius={"15px"}
        style={{
          boxSizing: "border-box",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default ModalWrapper;
