export interface Game {
  id: string;
  name: string;
  enName: string;
  description: string;
  iconType: 'camel' | 'art' | 'castle';
  color: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  iconType: 'food' | 'chat' | 'game';
}

export interface PartyDetails {
  date: string;
  time: string;
  location: string;
  address: string;
  mapLink: string;
}