import {
  View,
  Heading,
  Flex,
  TextAreaField,
  TextField,
  Button,
  Text,
} from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";

const Contact = () => {
  const { tokens } = useTheme();
  const redAsterisk = <span className="red-asterisk">*</span>;
  return (
    <View
      id="contact"
      textAlign={"center"}
      marginBlock={"85px"}
      className="container"
    >
      <Heading
        level={3}
        color={tokens.colors.font.tertiary}
        fontSize={"50px"}
        fontWeight={700}
        textAlign={"center"}
        marginBottom={{ large: "40px", base: "20px" }}
      >
        CONTACT US
      </Heading>

      <View
        as="div"
        className="card_background_color"
        textAlign={"left"}
        backgroundColor={"white"}
        maxWidth={"700px"}
        marginTop="medium"
        marginInline="auto"
        padding="40px"
        borderRadius={"10px"}
        boxShadow={"xl"}
      >
        <Flex as="form" direction={"column"}>
          <Text>Name{redAsterisk}</Text>
          <TextField
            label="Name"
            name="Name"
            placeholder="Enter your Name"
            autoComplete="Name"
            isRequired={true}
            size="large"
            variation="quiet"
            labelHidden
          />
          <Text>Email{redAsterisk}</Text>
          <TextField
            label="Email"
            name="email"
            autoComplete="email"
            placeholder="Enter Email"
            size="large"
            variation="quiet"
            labelHidden
          />
          <Text>Query{redAsterisk}</Text>
          <TextAreaField
            label="Query"
            name="query"
            size="large"
            placeholder="How can I help you?"
            row={5}
            maxLength={100}
            inputStyles={{ backgroundColor: "#F2F4F8" }}
            variation="quiet"
            labelHidden
          />
          <Button variation="primary" fontSize={"20px"} fontWeight={500}>
            Contact Us
          </Button>
        </Flex>
      </View>
    </View>
  );
};

export default Contact;
