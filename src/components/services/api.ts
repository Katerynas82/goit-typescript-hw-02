import axios from "axios";
import { Image } from "../App/App";


type FetchImagesResponse = {
  results: Image[];
};

export const fetchImages = async (
  page: number = 1,
  query: string = "nature"
): Promise<Image[]> => {
  const response = await axios.get<FetchImagesResponse>(
    "https://api.unsplash.com/search/photos",
    {
      params: {
        client_id: "0oF3nb1J595yYJndGrVqpu1GVXu4aNoTMPI4FFirbiI",
        query: query,
        page: page,
        per_page: 8,
      },
    }
  );
  return response.data.results;
};
