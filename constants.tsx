import { Plan, TradingPair } from './types';

// Hard-coded key logic (obfuscated as requested)
const _K = [66, 85, 76, 76, 84, 82, 65, 68, 69, 82, 49, 56, 10003];
export const GET_LK = () => String.fromCharCode(..._K);

export const TELEGRAM_BOT_TOKEN = '8313288579:AAGt1bqPYqD-yI3kStPz8I8n5Oifoi_4wRw';
export const TELEGRAM_CHAT_ID = '6419741513'; 

export const PLANS: Plan[] = [
  { id: 'starter', name: '7 Days', duration: '7 Days', price: 32, tag: 'Starter' },
  { id: 'popular', name: '27 Days', duration: '27 Days', price: 59, tag: 'Save 53% / Most Popular' },
  { id: 'value', name: '180 Days', duration: '180 Days', price: 180, tag: 'Save 70% / Best Value' }
];

export const CRYPTO_ADDRESSES = [
  { network: 'TRC20 (USDT)', address: 'TZDeaPnUcBRPvkpDQmkBEHeRd6D1aX4Gve', logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=040' },
  { network: 'BEP20 (USDT/BNB)', address: '0x6a153ab88caadd1a1a4305977c7a9e0a5d3fc8ad', logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=040' },
  { network: 'ERC20 (USDT/ETH)', address: '0x6a153ab88caadd1a1a4305977c7a9e0a5d3fc8ad', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040' },
  { network: 'SOLANA (USDT/SOL)', address: 'yDV2kMF6s528gVL81emJLWgF41TxgiAUPaoSJsLyABp', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=040' },
  { network: 'TON (USDT/TON)', address: 'UQBAvsFLKXx5BPg2EG7XJZxX5Vos65ff0qrRjXVJuHf81mdL', logo: 'https://cryptologos.cc/logos/toncoin-ton-logo.svg?v=040' },
  { network: 'BITCOIN (BTC)', address: '3Le2oaudBvU4GcmKn8mg19SVoEofrQry3V', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=040' },
  { network: 'POLYGON (MATIC)', address: '0x6a153ab88caadd1a1a4305977c7a9e0a5d3fc8ad', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=040' }
];

export const OTC_PAIRS: TradingPair[] = [
  // Currencies
  { symbol: 'USD/PKR (OTC)', name: 'US Dollar / Pakistani Rupee', price: 278.45, change: 0.05 },
  { symbol: 'NZD/CHF (OTC)', name: 'NZD / Swiss Franc', price: 0.5423, change: 0.02 },
  { symbol: 'NZD/CAD (OTC)', name: 'NZD / Canadian Dollar', price: 0.8123, change: 0.05 },
  { symbol: 'USD/EGP (OTC)', name: 'USD / Egyptian Pound', price: 48.45, change: 0.08 },
  { symbol: 'USD/ZAR (OTC)', name: 'USD / South African Rand', price: 18.21, change: -0.11 },
  { symbol: 'EUR/SGD (OTC)', name: 'Euro / Singapore Dollar', price: 1.4521, change: 0.02 },
  { symbol: 'USD/ARS (OTC)', name: 'USD / Argentine Peso', price: 850.42, change: 0.35 },
  { symbol: 'USD/BRL (OTC)', name: 'USD / Brazilian Real', price: 4.95, change: 0.12 },
  { symbol: 'NZD/JPY (OTC)', name: 'NZD / Japanese Yen', price: 92.45, change: -0.22 },
  { symbol: 'USD/TRY (OTC)', name: 'USD / Turkish Lira', price: 32.42, change: 0.45 },
  { symbol: 'CAD/CHF (OTC)', name: 'CAD / Swiss Franc', price: 0.6542, change: 0.01 },
  { symbol: 'GBP/NZD (OTC)', name: 'GBP / NZD', price: 2.0842, change: -0.15 },
  { symbol: 'USD/COP (OTC)', name: 'USD / Colombian Peso', price: 3950.42, change: -0.55 },
  { symbol: 'USD/DZD (OTC)', name: 'USD / Algerian Dinar', price: 134.21, change: 0.02 },
  { symbol: 'USD/PHP (OTC)', name: 'USD / Philippine Peso', price: 56.12, change: 0.05 },
  { symbol: 'USD/IDR (OTC)', name: 'USD / Indonesian Rupiah', price: 15721.42, change: 0.12 },
  { symbol: 'USD/INR (OTC)', name: 'USD / Indian Rupee', price: 83.21, change: 0.01 },
  { symbol: 'USD/MXN (OTC)', name: 'USD / Mexican Peso', price: 17.12, change: -0.05 },
  { symbol: 'EUR/NZD (OTC)', name: 'Euro / NZD', price: 1.7845, change: 0.02 },
  { symbol: 'NZD/USD (OTC)', name: 'NZD / USD', price: 0.6123, change: 0.01 },
  
  // Crypto
  { symbol: 'AVALANCHE (OTC)', name: 'Avalanche', price: 36.42, change: 1.25 },
  { symbol: 'CARDANO (OTC)', name: 'Cardano', price: 0.5842, change: 0.85 },
  { symbol: 'DECENTRALAND (OTC)', name: 'Decentraland', price: 0.4521, change: 2.12 },
  { symbol: 'ETHEREUM (OTC)', name: 'Ethereum', price: 2450.42, change: 1.55 },
  { symbol: 'ARBITRUM (OTC)', name: 'Arbitrum', price: 1.85, change: 0.95 },
  { symbol: 'FLOKI (OTC)', name: 'Floki', price: 0.000185, change: 4.55 },
  { symbol: 'COSMOS (OTC)', name: 'Cosmos', price: 9.42, change: 0.65 },
  { symbol: 'BITCOIN (OTC)', name: 'Bitcoin', price: 94231.50, change: 1.25 },
  { symbol: 'DOGECOIN (OTC)', name: 'Dogecoin', price: 0.1654, change: 2.85 },
  { symbol: 'DASH (OTC)', name: 'Dash', price: 32.42, change: 0.45 },
  { symbol: 'BINANCE COIN (OTC)', name: 'Binance Coin', price: 585.42, change: 1.12 },
  
  // Stocks
  { symbol: 'AMEX (OTC)', name: 'American Express', price: 215.42, change: 0.25 },
  { symbol: 'BOEING (OTC)', name: 'Boeing Company', price: 185.21, change: -0.45 },
  { symbol: 'J&J (OTC)', name: 'Johnson & Johnson', price: 158.42, change: 0.12 },
  { symbol: 'FACEBOOK INC (OTC)', name: 'Meta Platforms', price: 495.21, change: 1.55 },
  { symbol: 'MICROSOFT (OTC)', name: 'Microsoft', price: 425.42, change: 0.85 },
  { symbol: 'PFIZER INC (OTC)', name: 'Pfizer Inc', price: 27.42, change: -0.15 },
  { symbol: 'INTEL (OTC)', name: 'Intel', price: 42.12, change: -0.85 },
  { symbol: 'MCDONALDS (OTC)', name: 'McDonald\'s', price: 285.42, change: 0.22 }
];