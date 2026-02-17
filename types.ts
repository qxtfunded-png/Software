
export enum AppState {
  LANDING = 'LANDING',
  LICENSE_CHECK = 'LICENSE_CHECK',
  GET_SUBSCRIPTION = 'GET_SUBSCRIPTION',
  PLAN_SELECTION = 'PLAN_SELECTION',
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY',
  DASHBOARD = 'DASHBOARD',
  EXIT = 'EXIT'
}

export interface UserDetails {
  name: string;
  email: string;
  ip?: string;
  deviceId?: string;
}

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  tag: string;
}

export interface TradingPair {
  symbol: string;
  name: string;
  price: number;
  change: number;
}
