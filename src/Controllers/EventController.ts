import { Request, Response } from 'express';
import { EventAggregatorService } from '../Services/EventAggregatorService';
import { IncomingHttpHeaders } from 'http';

const eventAggregatorService = new EventAggregatorService();

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const headers = req.headers as IncomingHttpHeaders;
    const authHeader = headers['authorization'];
    const events = await eventAggregatorService.getAllEvents(authHeader);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
