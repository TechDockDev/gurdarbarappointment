import { Theme } from "@aws-amplify/ui-react";

const theme: Theme = {
  name: "my-theme",
  tokens: {
    colors: {
      font: {
        primary: { value: "#1C469A" },
        // secondary: { value: "#FFFFFF" },
        tertiary: { value: "#5DDDBE" },
      },
      background: {
        primary: { value: "#5DDDBE" },
        secondary: { value: "#1C469A" },
      },
    },
    components: {
      button: {
        fontSize: { value: "medium" },
        fontWeight: { value: "600" },
        primary: {
          color: { value: `{colors.white}` },
          backgroundColor: { value: `{colors.background.secondary}` },
          borderColor: { value: "transparent" },
        },
      },
      input: {
        color: {
          value: `#000000`,
        },
      },
      selectfield: {
        color: {
          value: `#697077`,
        },
      },
      radiogroup: {
        radio: {
          borderWidth: { value: "{borderWidths.small}" },
          // borderColor: { value: "{colors.blue.60}" },
          backgroundColor: { value: "{colors.white}" },
          _checked: {
            color: { value: "{colors.blue.80}" },
          },
          label: {
            color: { value: "{colors.blue.80}" },
          },
        },
      },
      card: {
        // You can reference other tokens
        backgroundColor: { value: "{colors.background.success}" },
        borderRadius: { value: "{radii.large}" },
        // padding: { value: "{space.xl}" },

        // Variations
        outlined: {
          // Or use explicit values
          borderWidth: { value: "10px" },
          backgroundColor: { value: "{colors.background.warning}" },
        },
        elevated: {
          backgroundColor: { value: "white" },
          boxShadow: { value: "{shadows.large}" },
          borderRadius: { value: "10px" },
        },
      },
    },
  },
};

export default theme;
