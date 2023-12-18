import React from "react";
import { View } from "@aws-amplify/ui-react";

type ReactProps = {
  children: React.ReactNode;
  hidden: boolean;
};

const DashboardScreenWrapper = ({ children }: ReactProps) => {
  return (
    <View
      // overflow={"scroll"}
      // marginTop={"30px"}
      marginLeft={{ large: "251px" }}
      margin={{ base: "10px" }}
      // width={"100%"}
      // height={"100%"}
      overflow={"auto"}
      // maxWidth={{ large: "calc(100% - 250px)", base: "calc(100% - 20px)" }}
      // minHeight={"100vh"}
      // position={"relative"}

      backgroundColor={"#F7F8FA"}
    >
      {children}
    </View>
  );
};

export default DashboardScreenWrapper;
