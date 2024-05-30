import axios from "axios";

const request = axios.create({
    withCredentials: true,
  });

export const BACKEND_URL = "http://localhost:3001";
export const USER_API = `${BACKEND_URL}/api/users`;

export const searchRepos = async (username) => {
    const response = await request.get(`${USER_API}/${username}/repos`)
    console.log(response)
    return response.data;
};

export const getRepoCounts = async (username) => {
    const response = await request.get(`${USER_API}/${username}/repoCount`);
    console.log(response)
    return response.data;
};

export const getTotalForkCount = async (username) => {
    const response = await request.get(`${USER_API}/${username}/getTotalForkCount`);
    console.log(response)
    return response.data;
};

export const getUsedLanguageCount = async (username) => {
    const response = await request.get(`${USER_API}/${username}/getUsedLanguagesCount`);
    console.log(response)
    return response.data;
};