import { View, Flex } from "@aws-amplify/ui-react";
import React from "react";
import { useTheme } from "@aws-amplify/ui-react";

type wrapperprop = {
  children: React.ReactNode;
};

const ScreenWrapper = ({ children }: wrapperprop) => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      width={"100%"}
      maxWidth={"1440px"}
      marginInline={"auto"}
      paddingInline={{ xl: "77px", large: "40px" }}
      // minHeight={"100vh"}
    >
      <Flex
        width={"100%"}
        maxWidth={"1440px"}
        marginInline={"auto"}
        direction={"column"}
        justifyContent={"space-between"}
        // minHeight={"100vh"}
        color={"FFFFFF"}
        position={"relative"}
      >
        {children}
      </Flex>
    </View>
  );
};

export default ScreenWrapper;
