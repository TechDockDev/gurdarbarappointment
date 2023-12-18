import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";

type SuccessModalType = {
  provider: string;
  service: string;
  date: string;
  bookingReason: string;
  open: boolean;
};

export interface ContextType {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
  smallCalendar: number | null;
  setSmallCalendar: Dispatch<SetStateAction<number | null>>;
  daySelected: dayjs.Dayjs;
  setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs>>;
  calendarModal: any;
  setCalendarModal: Dispatch<SetStateAction<any>>;
  cancelDetailModal: any;
  setCancelModal: Dispatch<SetStateAction<any>>;
  cancelModal: any;
  setCancelDetailModal: Dispatch<SetStateAction<any>>;
  successModal: SuccessModalType;
  logoutModal: boolean;
  signUpModal: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setSignUpModal: Dispatch<SetStateAction<boolean>>;
  logInModal: boolean;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  setLogInModal: Dispatch<SetStateAction<boolean>>;
  setSuccessModal: Dispatch<SetStateAction<SuccessModalType>>;
  setLogoutModal: Dispatch<SetStateAction<boolean>>;
  showErrorToastMessage: (message: string) => void;
  showSuccessToastMessage: (message: string) => void;
  profileImageLoad: boolean;
  setProfileImageLoad: Dispatch<SetStateAction<boolean>>;
  authData: any;
  setAuthData: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<ContextType | null>(null);

export const useGlobalContext = () => {
  const contextValue = useContext(GlobalContext);

  if (!contextValue) {
    // Handle the case where the context value is null
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return contextValue;
};

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [smallCalendar, setSmallCalendar] = useState<number | null>(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [profileImageLoad, setProfileImageLoad] = useState<boolean>(false);
  const [calendarModal, setCalendarModal] = useState<any>({});
  const [cancelModal, setCancelModal] = useState<any>({ open: false });
  const [cancelDetailModal, setCancelDetailModal] = useState<any>({});
  const [successModal, setSuccessModal] = useState<SuccessModalType>({
    provider: "",
    service: "",
    date: "",
    bookingReason: "",
    open: false,
  });
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [logInModal, setLogInModal] = useState<boolean>(false);
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [authData, setAuthData] = useState<any>({});

  useEffect(() => {
    if (smallCalendar !== null) {
      setMonthIndex(smallCalendar);
    }
  }, [smallCalendar]);

  useEffect(() => {
    localStorage.setItem("authenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const showSuccessToastMessage = (message: string): void => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showErrorToastMessage = (message: string): void => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      Auth.currentUserPoolUser().then((_data) => {
        setAuthData(_data.attributes);
        console.log(_data.attributes);
      });
    }
  }, [isAuthenticated]);

  const contextData: ContextType = {
    monthIndex,
    setMonthIndex,
    smallCalendar,
    setSmallCalendar,
    daySelected,
    setDaySelected,
    calendarModal,
    setCalendarModal,
    cancelDetailModal,
    cancelModal,
    successModal,
    logoutModal,
    setCancelModal,
    setCancelDetailModal,
    setSuccessModal,
    setLogoutModal,
    logInModal,
    setLogInModal,
    signUpModal,
    setSignUpModal,
    isAuthenticated,
    setIsAuthenticated,
    showErrorToastMessage,
    showSuccessToastMessage,
    isLoaded,
    setIsLoaded,
    authData,
    setAuthData,
    profileImageLoad,
    setProfileImageLoad,
  };

  return (
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};
