import axios from "axios";

const API_URL = "http://localhost:8000";
const uploadFile = async (data: FormData ) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, data);
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", (error as Error)?.message);
        throw error;
    }
}
 export default uploadFile;