import React from "react";
import { View } from "@aws-amplify/ui-react";

type wrapperprop = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: wrapperprop) => {
  return <View height={"100%"}>{children}</View>;
};

export default AppWrapper;
