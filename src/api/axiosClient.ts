import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export class AxiosClient {
  private static instance: AxiosInstance;
  private static readonly baseURL = process.env.REACT_APP_API_URL;
  private constructor() {}

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = axios.create({
        baseURL: AxiosClient.baseURL,
      });
    }

    return AxiosClient.instance;
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return await axios.get(url, config);
  }

  public async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return await axios.post(url, data, config);
  }

  public async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return await axios.put(url, data, config);
  }

  public async patch(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return await axios.patch(url, data, config);
  }

  public async delete(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return await axios.delete(url, config);
  }
}
