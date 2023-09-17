import { kv } from "@vercel/kv";

class Store {
  constructor() {
  }

  async save(key: string, value: any) {
    const response = kv.set(key, value);
  }

  get(key: string) {
    return kv.get(key);
  }

  async Cart({ params }: { params: { user: string } }) {
    const cart = await kv.get<{ id: string; quantity: number }[]>(params.user);
    return (
      <div>
        {cart?.map((item) => (
          <div key={item.id}>
            {item.id} - {item.quantity}
          </div>
        ))}
      </div>
    );
  }
}

module.exports = Store;