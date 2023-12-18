import React from "react";
import { View } from "@aws-amplify/ui-react";

type ReactProps = {
  children: React.ReactNode;
};

const OutletWrapper = ({ children }: ReactProps) => {
  return (
    <View
      marginTop={"80px"}
      marginLeft={{ large: "251px" }}
      overflow={"auto"}
    >
      {children}
    </View>
  );
};

export default OutletWrapper;
