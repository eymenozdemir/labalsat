const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const base_url = "https://api.labalsat.com/api/";
//export const base_url = "http://localhost:5000/api/";

export const config = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
      }`,
      Accept: "application/json",
      User: JSON.parse(localStorage.getItem("customer"))?._id,
    },
  };