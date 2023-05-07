import axios from "axios";

export const getGames = () => {
  const API_KEY = "df9217646fc62c2ed3652ba455133f26eec84109";
  const API_URL = "https://www.giantbomb.com/api/games/";

  return axios.get(API_URL, {
    params: {
      api_key: API_KEY,
      format: "json",
    },
  });
};
