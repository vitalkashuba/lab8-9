import axios from "axios"; 

const API_BASE_URL = "http://localhost:5000"

export const fetchItems = async (filters) => {
  try {
    console.log("Filters applied:", filters); 
    const response = await axios.get(`${API_BASE_URL}/api/clips`, { params: filters });
    console.log("Fetched data:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching catalog items:", error);
    throw error;
  }
};