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
    
    const enrichedEvents = await Promise.all(events.data.map(async (event:any) => {
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
      console.log(event);
      if (!event.data) {
       
        return event
      }

      const association = await this.userServiceClient.getAssociation(event.data.association_id, token);
      event.data.association = association;
      const enrichedEvent = {
        event
      };
  
      return enrichedEvent;
    } catch (error) {
      //console.error('Error al obtener el evento enriquecido:', error);
      return null;
    }
  }
  
}
