import { Request, Response } from 'express';
import { EventAggregatorService } from '../Services/EventAggregatorService';
import { IncomingHttpHeaders } from 'http';

const eventAggregatorService = new EventAggregatorService();

export const getByIdEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const headers = req.headers as IncomingHttpHeaders;
    const authHeader = headers['authorization'];
    const id = req.params.id;
    const events = await eventAggregatorService.getByIdEvent(id,authHeader);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
