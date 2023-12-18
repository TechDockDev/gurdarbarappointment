import React from "react";
import { Button, useTheme } from "@aws-amplify/ui-react";
const RippleButton = ({ children, onClick }: any) => {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  const { tokens } = useTheme();
  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <Button
      className="ripple-button"
      marginTop={"20px"}
      width={"266px"}
      marginInline={{ large: "0px", base: "auto" }}
      backgroundColor={tokens.colors.background.primary}
      color={tokens.colors.font.primary}
      borderRadius={"15px"}
      fontSize={"24px"}
      style={{
        cursor: "pointer",
      }}
      onClick={(e: any) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}
      <span className="content">{children}</span>
    </Button>
  );
};

export default RippleButton;
