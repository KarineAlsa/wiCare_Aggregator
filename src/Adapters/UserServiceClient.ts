import axios, { AxiosRequestConfig } from 'axios';

export class UserServiceClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://146.190.64.233:3000/'; 
  }

  async getAssociation(id: any, token:any): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }

    }
    const response = await axios.get(`${this.baseUrl}association/${id}`, config);
    return response.data.data;
  }

}
