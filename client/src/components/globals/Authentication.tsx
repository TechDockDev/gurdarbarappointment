import React from "react";
import { View } from "@aws-amplify/ui-react";

type props = {
  children: React.ReactNode;
};

const Authentication = ({ children }: props) => {
  return (
    <View
      position={"fixed"}
      width={"100%"}
      height={"100vh"}
      className="amplify-modal"
      overflow={"auto"}
      marginInline={"auto"}
      style={{
        zIndex: 100,
        boxSizing: "border-box",
        padding: "0px",
        paddingBlock: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0px",

        overflowBlock: "auto",
      }}
    >
      <View
        position={"absolute"}
        backgroundColor={"white"}
        className="card_background_color"
        padding={{ base: "25px 30px" }}
        maxWidth={{ xxl: "650px", xl: "600px", base: "500px" }}
        borderRadius={"10px"}
        width={"100%"}
        marginInline={"auto"}
        // height={"630px"}
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

export default Authentication;
