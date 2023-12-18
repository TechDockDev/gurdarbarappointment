import { useGlobalContext } from "../../context/GlobalContext";
import { View } from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import { Loader as Load } from "@aws-amplify/ui-react";
const Loader = () => {
  const { isLoaded } = useGlobalContext();
  const { tokens } = useTheme();

  return (
    isLoaded && (
      <View
        position={"fixed"}
        width={"100%"}
        height={"100vh"}
        className="amplify-modal"
        marginInline={"auto"}
        style={{
          zIndex: 100,
          boxSizing: "border-box",
          padding: "0px",
          margin: "0px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Load
          filledColor={tokens.colors.font.primary}
          width={"100px"}
          style={{
            position: "absolute",
            boxSizing: "border-box",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></Load>
      </View>
    )
  );
};

export default Loader;
