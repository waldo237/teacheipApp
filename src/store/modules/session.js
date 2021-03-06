import axios from "axios";
import { auth } from "firebase/app";
import { firestore } from "firebase/app";
import { async } from "q";
// validate token and set validated global
const validateToken = async () => {
  try {
    const response = await axios.get(
      `https://script.google.com/macros/s/AKfycbzozLeg_FPF61v-MyvmbdBgPkcUcREzQB4PFJSGX7mDkYVzOw9E/exec?email=${
      auth().currentUser.email
      }&&token=${getToken("sessionToken")}&&role=${getToken("sessionRole")}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
// get token from local cookies
const getToken = (cname) => {
 return localStorage.getItem(cname);

}

const fetchRole = () => {
  try {
      return atob(getToken('sessionRole'));
  } catch (error) {
    console.log(error);
  }
}
// this token will be available when needed for an API
const fetchAuthenticated = () => {
  try {
      return getToken('sessionToken');
  } catch (error) {
    console.log(error);
  }
}

export default { validateToken, getToken,fetchRole, fetchAuthenticated };
