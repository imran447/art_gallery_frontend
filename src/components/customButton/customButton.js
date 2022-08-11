import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Spinner } from "../spinner/spinner";
import Style from "./customButton.module.css";

const CustomButton = ({
  type = "button",
  title,
  isLoading = false,
  buttonStyle,
  handleButtonClick,
  disabled = false,
  children,
}) => {
  const handleClick = () => {
    handleButtonClick?.();
  };

  return (
    <Button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`mt-2 bg-white mb-3 white-btn text-transform-none ${
        disabled ? Style.disabled : ""
      }  ${Style.button} ${buttonStyle}`}
    >
      {isLoading ? <Spinner /> : title}
      {!isLoading && children}
    </Button>
  );
};
export default CustomButton;
