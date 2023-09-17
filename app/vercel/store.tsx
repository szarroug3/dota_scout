import { kv } from "@vercel/kv";

export class Store {
  prefix: string;

  constructor(prefix: string | null = null) {
    this.prefix = prefix ? `${prefix}-` : '';
  }

  prefixedKey(key: string) {
    return `${this.prefix}${key}`;
  }

  date(): string {
    const date = new Date();
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  }

  unwrap(wrapped: any, filterDate: boolean = false) {
    const { date, data } = wrapped;
    if (filterDate) {
      return this.date() === date ? data : null;
    }
    return data;
  }
  
  wrap(data: any): { date: any, data: any } {
    return {
      date: this.date(),
      data: data
    };
  }

  async get(key: string, filterDate: boolean = false) {
    const value = await kv.get(`${this.prefix}-${key}`);
    return this.unwrap(value, filterDate);
  }

  async set(key: string, value: any) {
    const prefixedKey = this.prefixedKey(key);
    kv.set(prefixedKey, this.wrap(value)).then(ok => {
      if (ok === 'OK') {
        throw new Error(`Failed to save ${key}`);
      }
    });
  }
}
