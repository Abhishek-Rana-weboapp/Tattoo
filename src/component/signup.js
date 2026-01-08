import { useReducer } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "./buttons/DatePicker";
import Loader from "./loader/Loader";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
import { useAuthContext } from "../context/AuthContext";

// Initial state for the form
const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  dateOfBirth: null,
  lang: "en",
  phoneNumber: "",
  loading: false,
  errors: {
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: "",
    phoneNumber: "",
  },
};

// Action types for better maintainability
const ACTION_TYPES = {
  SET_FIRST_NAME: "SET_FIRST_NAME",
  SET_LAST_NAME: "SET_LAST_NAME",
  SET_USER_NAME: "SET_USER_NAME",
  SET_DATE_OF_BIRTH: "SET_DATE_OF_BIRTH",
  SET_LANG: "SET_LANG",
  SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
  SET_LOADING: "SET_LOADING",
  RESET_FORM: "RESET_FORM",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_ALL_ERRORS: "CLEAR_ALL_ERRORS",
};



// Reducer function that handles all state updates
function formReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
        errors: { ...state.errors, firstName: "" },
      };
    case ACTION_TYPES.SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
        errors: { ...state.errors, lastName: "" },
      };
    case ACTION_TYPES.SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
        errors: { ...state.errors, userName: "" },
      };
    case ACTION_TYPES.SET_DATE_OF_BIRTH:
      return {
        ...state,
        dateOfBirth: action.payload,
        errors: { ...state.errors, dateOfBirth: "" },
      };
    case ACTION_TYPES.SET_LANG:
      return { ...state, lang: action.payload };
    case ACTION_TYPES.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
        errors: { ...state.errors, phoneNumber: "" },
      };

    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.field]: "" },
      };
    case ACTION_TYPES.CLEAR_ALL_ERRORS:
      return {
        ...state,
        errors: {
          firstName: "",
          lastName: "",
          userName: "",
          dateOfBirth: "",
          phoneNumber: "",
        },
      };
    case ACTION_TYPES.RESET_FORM:
      return initialState;
    default:
      return state;
  }
}

function SignUp() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Using useReducer instead of multiple useState hooks
  const [state, dispatch] = useReducer(formReducer, initialState);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear all previous errors
    dispatch({ type: ACTION_TYPES.CLEAR_ALL_ERRORS });

    // Validate each field and set specific errors
    let hasErrors = false;

    if (!state.firstName) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        field: "firstName",
        message: "First name is required",
      });
      hasErrors = true;
    }

     if (!state.userName) {
       dispatch({
         type: ACTION_TYPES.SET_ERROR,
         field: "userName",
         message: "Email is required",
       });
       hasErrors = true;
     } else {
       // Validate email format
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(state.userName)) {
         dispatch({
           type: ACTION_TYPES.SET_ERROR,
           field: "userName",
           message: "Please enter a valid email address",
         });
         hasErrors = true;
       }
     }


    console.log("Phone Number:", state.phoneNumber);

     if (!state.phoneNumber) {
       dispatch({
         type: ACTION_TYPES.SET_ERROR,
         field: "phoneNumber",
         message: "Phone number is required",
       });
       hasErrors = true;
     } else {
       // Validate phone number format (should have at least 10 digits)
       const phoneDigits = state.phoneNumber.replace(/\D/g, '');
       if (phoneDigits.length < 10) {
         dispatch({
           type: ACTION_TYPES.SET_ERROR,
           field: "phoneNumber",
           message: "Please enter a valid phone number (at least 10 digits)",
         });
         hasErrors = true;
       }
     }

    if (!state.dateOfBirth) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        field: "dateOfBirth",
        message: "Date of birth is required",
      });
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const data = {
      firstName: state.firstName,
      lastName: state.lastName,
      userName: state.userName,
      dateOfBirth: state.dateOfBirth,
      lang: state.lang,
      phoneNumber: state.phoneNumber,
      userType: "user",
    };

    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
      const response = await axiosInstance.post("signup", data);
      if (response.status === 201) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        toast.success("Signup Successfull");
        navigate("/detailedinfo");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error || "Failed to signup");
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-4">
      <img src={Title_logo} className="w-full max-w-56"></img>
      <h1 className="text-white font-bold">Sign Up</h1>
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-3"
        >
          <div className="flex flex-col itmes-center gap-3">
            <div className="flex md:flex-row flex-col gap-3">
              <div className="flex flex-col gap-1 md:w-1/2">
                <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
                  <input
                    type="text"
                    className="w-full focus:outline-none bg-white p-1"
                    id="firstname"
                    maxLength={60}
                    placeholder="First Name"
                    value={state.firstName}
                    onChange={(e) =>
                      dispatch({
                        type: ACTION_TYPES.SET_FIRST_NAME,
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
                {state.errors.firstName && (
                  <span className="text-red-400 text-sm ml-2">
                    {state.errors.firstName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 md:w-1/2">
                <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
                  <input
                    type="text"
                    className="w-full focus:outline-none bg-white p-1"
                    id="lastname"
                    maxLength={60}
                    placeholder="Last Name"
                    value={state.lastName}
                    onChange={(e) =>
                      dispatch({
                        type: ACTION_TYPES.SET_LAST_NAME,
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
                {state.errors.lastName && (
                  <span className="text-red-400 text-sm ml-2">
                    {state.errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
                <input
                  type="email"
                  className="flex-1 focus:outline-none bg-white p-1"
                  id="userName"
                  placeholder="Email"
                  value={state.userName}
                   onChange={(e) => {
                     const value = e.target.value;
                     dispatch({
                       type: ACTION_TYPES.SET_USER_NAME,
                       payload: value,
                     });
                     
                     // Real-time email validation
                     if (value && value.length > 0) {
                       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                       if (!emailRegex.test(value)) {
                         dispatch({
                           type: ACTION_TYPES.SET_ERROR,
                           field: "userName",
                           message: "Please enter a valid email address",
                         });
                       }
                     }
                   }}
                />
              </div>
              {state.errors.userName && (
                <span className="text-red-400 text-sm ml-2">
                  {state.errors.userName}
                </span>
              )}
            </div>

            {/*<div className="flex flex-col gap-1">
              <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
                <input
                  type={state.showPassword ? "text" : "password"}
                  className="flex-1 focus:outline-none bg-white p-1"
                  id="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={(e) =>
                    dispatch({
                      type: ACTION_TYPES.SET_PASSWORD,
                      payload: e.target.value,
                    })
                  }
                />
                {state.showPassword ? (
                  <RiEyeOffFill
                    size={20}
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch({
                        type: ACTION_TYPES.TOGGLE_PASSWORD_VISIBILITY,
                      })
                    }
                  />
                ) : (
                  <RiEyeFill
                    size={20}
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch({
                        type: ACTION_TYPES.TOGGLE_PASSWORD_VISIBILITY,
                      })
                    }
                  />
                )}
              </div>
              {state.errors.password && (
                <span className="text-red-400 text-sm ml-2">
                  {state.errors.password}
                </span>
              )}
            </div>*/}

            <div className="flex flex-col gap-1">
              <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
                <PhoneInput
                  country="us"
                  placeholder="Enter Phone Number"
                  disableDropdown
                  value={state.phoneNumber}
                   onChange={(value) => {
                     dispatch({
                       type: ACTION_TYPES.SET_PHONE_NUMBER,
                       payload: value,
                     });
                     
                     
                     // Real-time phone number validation
                     if (value && value.length > 0) {
                       const phoneDigits = value.replace(/\D/g, '');
                       if (phoneDigits.length < 10) {
                         dispatch({
                           type: ACTION_TYPES.SET_ERROR,
                           field: "phoneNumber",
                           message: "Please enter a valid phone number (at least 10 digits)",
                         });
                       }
                     }
                   }}
                  inputStyle={{
                    width: isMobile ? "100% " : "98%",
                    zIndex: "0",
                  }}
                />
              </div>
              {state.errors.phoneNumber && (
                <span className="text-red-400 text-sm ml-2">
                  {state.errors.phoneNumber}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-white">Date of Birth</label>
              <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
                <DatePicker
                  
                  setDate={(date) =>
                    dispatch({
                      type: ACTION_TYPES.SET_DATE_OF_BIRTH,
                      payload: date,
                    })
                  }
                  date={state.dateOfBirth}
                />
              </div>
              {state.errors.dateOfBirth && (
                <span className="text-red-400 text-sm ml-2">
                  {state.errors.dateOfBirth}
                </span>
              )}
            </div>

            <select
              id="language"
              className="form-select p-2 rounded-lg"
              value={state.lang} // Set the selected value
              onChange={(e) =>
                dispatch({
                  type: ACTION_TYPES.SET_LANG,
                  payload: e.target.value,
                })
              } // Update state on change
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="flex gap-2">
              <NavLink
                to="/"
                className={
                  " no-underline w-max text-white hover:text-yellow-500"
                }
              >
                Already have an account? Log In
              </NavLink>
            </div>
          </div>
          <button
            className="yellowButton py-2 px-8 rounded-3xl font-bold flex justify-center items-center"
            disabled={state.loading}
          >
            {state.loading ? <Loader /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
