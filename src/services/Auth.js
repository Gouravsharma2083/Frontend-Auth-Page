import axios from "axios";
import toast from "react-hot-toast";

// Register
export const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/register`,
      {
        name,
        username: email, // Changed to username to match backend
        password
      },
      {
        headers: {
          "Content-Type": "application/json" // Corrected content type
        }
      }
    );
    toast.success("Registration Successful!");
    return response;
  } catch (error) {
    console.log("User already exists!!");
    toast.error("User Already Exists!!!");
    return new Error(error.response.data.message);
  }
};

// Login
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/login`,
      {
        username: email, // Changed to username to match backend
        password
      },
      {
        headers: {
          "Content-Type": "application/json" // Corrected content type
        }
      }
    );
    toast.success("Login Successful!");
    return response;
  } catch (error) {
    console.log("Invalid email or password");
    toast.error("Invalid Email or Password");
    return new Error(error.response.data.message);
  }
};
