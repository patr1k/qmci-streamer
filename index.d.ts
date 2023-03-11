declare module "qmci-streamer" {
  export interface ILoginCredentials {
    wmid: string;
    username: string;
    password: string;
  }
  export interface ILoginOptions {
    host: string;
    credentials: ILoginCredentials;
  }
  export interface IOpenCredentials {
    sid: string;
  }
  export interface IOpenOptions {
    host: string;
    cors: boolean;
    rejectExcessiveConnection: boolean;
    conflation: string | null;
    format: string;
    credentials: IOpenCredentials;
  }
  export interface ISubscribeOptions {
    skipHeavyInitialLoad: boolean;
    conflation?: string | null;
  }
  export interface ISubscription {
    symbol: string;
    type: string;
    entitlement: string;
  }
  export interface ISubscribed {
    subscribed: ISubscription[];
    unsubscribed: ISubscription[];
  }
  export interface IDataTypes {
    QUOTE: string;
    PRICEDATA: string;
    TRADE: string;
    MMQUOTE: string;
    ORDERBOOK: string;
    INTERVAL: string;
    NETHOUSEPOSITION: string;
    LASTSALE: string;
    LIMITUPLIMITDOWN: string;
    IVGREEKS: string;
    IMBALANCESTATUS: string;
  }

  export class Stream {
    on(messageType: string, messageHandler: (message: IMessage) => void): Stream;
    subscribe(symbols: string[], dataTypes: string[], options: ISubscribeOptions, then: (err: string | null, subscribed: ISubscribed) => void);
    unsubscribe(symbols: string[], dataTypes: string[], options: ISubscribeOptions, then: (err: string | null, unsubscribed: ISubscribed) => void);
  }

  export class StreamDataTypes {
    QUOTE: string;
    PRICEDATA: string;
    TRADE: string;
    MMQUOTE: string;
    BOOKORDER: string;
    ORDERBOOK: string;
    INTERVAL: string;
    NETHOUSEPOSITION: string;
    LASTSALE: string;
    LIMITUPLIMITDOWN: string;
    IVGREEKS: string;
    IMBALANCESTATUS: string;
    get(message: IMessage): string;
  }

  export interface IMessage {
    "@T": string;
  }

  export interface IPriceData extends IMessage {
    accumulatedPrice: number;
    accumulatedTradeValue: number;
    accumulatedVolume: number;
    annualHigh: boolean;
    annualLow: boolean;
    change: number;
    close: number;
    high: number;
    last: number;
    lastTradeSize: number;
    lastTradeTime: number;
    low: number;
    open: number;
    percentChange: number;
    postMarketChange: number;
    postMarketLast: number;
    postMarketPercentChange: number;
    postMarketTradeTime: number;
    postMarketVolume: number;
    preMarketChange: number;
    preMarketLast: number;
    preMarketPercentChange: number;
    preMarketTradeTime: number;
    preMarketVolume: number;
    previousClose: number;
    symbol: string;
    tick: string;
    timestamp: number;
    tradeCount: number;
    twap: number;
    vwap: number;
  }

  export interface IQuoteData extends IMessage {
    askCondition: string;
    askExcode: string;
    askPrice: number;
    askSize: number;
    bidCondition: string;
    bidExcode: string;
    bidPrice: number;
    bidSize: number;
    indicator: string;
    sharesPerSizeUnit: number;
    symbol: string;
    timestamp: number;
  }

  export interface IOrderData extends IMessage {
    allOrNone: boolean;
    cashSettlement: boolean;
    cashTodaySettlement: boolean;
    delayedDataSettlement: boolean;
    display: boolean;
    firmQuote: boolean;
    flags: number;
    lastUpdate: number;
    lotsOf: boolean;
    marketMakerID: string;
    marketOrder: boolean;
    minimumFillVolume: boolean;
    nonNetSettlement: boolean;
    nonResident: boolean;
    orderChangeType: string;
    orderID: string;
    orderReference: string;
    orderSide: string;
    price: number;
    size: number;
    symbol: string;
    timestamp: number;
  }

  export class Streamer {
    static login(options: ILoginOptions, then: (err: string | null, sid: string | null) => void);
    static open(options: IOpenOptions, then: (err: string | null, stream: Stream | null) => void);
    static dataTypes: StreamDataTypes;
  }
}