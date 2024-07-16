import axios, { AxiosRequestConfig } from 'axios';

export class EventServiceClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://104.248.49.221:1234'; // URL del servicio de eventos
  }

  async getAllEvents(token:string): Promise<[]|any> {
    const config: AxiosRequestConfig = {
        headers: {
          Authorization:  `${token}`,
          'Content-Type': 'application/json'
    
        }
    }
    console.log('all');
    const response = await axios.get(`${this.baseUrl}`, config);
    console.log(response.data.data);
    return response.data;
  
  }
  async getbyId(id:string, token:string): Promise<any> {

    try {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
    }
    
      const response = await axios.get(`${this.baseUrl}/${id}`,config);
      console.log(response.data);
      return response.data;
    
    } catch (error:any) {
      console.error('Error fetching events:', error);
    }
    
}
}
