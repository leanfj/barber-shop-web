import axios, {
  // type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
// import { signOut } from "./auth";

export class AxiosClient {
  private static instance: AxiosInstance;
  private static readonly baseURL = process.env.REACT_APP_API_URL;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    // let isRefreshing = false;
    // let failedQueue: any[] = [];

    if (!this.instance) {
      this.instance = axios.create({
        baseURL: this.baseURL,
      });
    }

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        if (error.response.status === 401) {
          const response = (): void => {
            console.log("401");
          };
          return response;
        }
        return await Promise.reject(error);
      },
    );

    // this.instance.interceptors.request.use(
    //   (response: any) => response,
    //   async (error: any) => {
    //     if (error?.response?.status === 401) {
    //       if (
    //         error?.response?.data?.message === "Assinatura do Token expirada."
    //       ) {
    //         console.log("Token expired");
    //         const originalRequest = error.config;
    //         if (!isRefreshing) {
    //           isRefreshing = true;
    //           this.instance
    //             .post("/authentication/refreshToken", {
    //               refreshToken: localStorage.getItem("refreshToken"),
    //               email: localStorage.getItem("email"),
    //             })
    //             .then((response) => {
    //               console.log("Token refreshed");
    //               localStorage.setItem(
    //                 "accessToken",
    //                 JSON.stringify(response.data.accessToken),
    //               );
    //               localStorage.setItem(
    //                 "refreshToken",
    //                 JSON.stringify(response.data.refreshToken),
    //               );

    //               this.instance.defaults.timeout = 10000;

    //               isRefreshing = false;
    //               failedQueue.forEach((request: any) =>
    //                 request.onSucess(response.data.accessToken),
    //               );
    //               failedQueue = [];
    //             })
    //             .catch(async (error: any) => {
    //               if (error) {
    //                 console.log("Failed to refresh token");
    //                 failedQueue.forEach((request: any) =>
    //                   request.onFailure(error),
    //                 );
    //                 failedQueue = [];
    //                 isRefreshing = false;

    //                 const email = localStorage.getItem("email");
    //                 if (email) {
    //                   await signOut(email);
    //                 }
    //               }
    //             })
    //             .finally(() => {
    //               isRefreshing = false;
    //             });
    //         }

    //         return await new Promise((resolve, reject) => {
    //           failedQueue.push({
    //             onSucess: (token: string) => {
    //               // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //               resolve(this.instance(originalRequest));
    //             },
    //             onFailure: (error: AxiosError) => {
    //               reject(error);
    //             },
    //           });
    //         });
    //       }
    //       const email = localStorage.getItem("email");
    //       if (email) {
    //         await signOut(email);
    //       }
    //     }
    //     return await Promise.reject(error);
    // //   },
    // );

    return this.instance;
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    axios.interceptors.response.use((response) => {
      console.log(response);
      return response;
    });

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
