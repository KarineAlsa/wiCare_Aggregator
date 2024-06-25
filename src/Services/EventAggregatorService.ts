import { EventServiceClient } from '../Adapters/EventClientService';
import { UserServiceClient } from '../Adapters/UserServiceClient';

export class EventAggregatorService {
  private eventServiceClient: EventServiceClient;
  private userServiceClient: UserServiceClient;

  constructor() {
    this.eventServiceClient = new EventServiceClient();
    this.userServiceClient = new UserServiceClient();
  }

  async getAllEvents(token:any): Promise<[]|any> {
    
    const events = await this.eventServiceClient.getAllEvents(token);
    
    const enrichedEvents = await Promise.all(events.map(async (event:any) => {
      const association = await this.userServiceClient.getAssociation(event.association_id, token);
      
      return {
        ...event,
        association
      };
  }));

    return enrichedEvents;
  }
  async getByIdEvent(id: any, token: any): Promise<any | null> {
    try {
      const event = await this.eventServiceClient.getbyId(id, token);
  
      if (!event) {
        return null;
      }

      const association = await this.userServiceClient.getAssociation(event.association_id, token);
      
      const enrichedEvent = {
        ...event,
        association,
      };
  
      return enrichedEvent;
    } catch (error) {
      console.error('Error al obtener el evento enriquecido:', error);
      return null;
    }
  }
  
}
