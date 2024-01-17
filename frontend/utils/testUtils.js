import casual from "casual";
import { PAGINATION_QUERY } from "../components/pagination";

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  // __typename: 'Item',
  id: "abc123",
  price: 5000,
  user: null,
  photo: {
    id: "abc123",
    altText: "test item",
    image: {
      publicUrlTransformed: "test.jpg",
    },
  },
  name: "test item",
  description: "test",
});

const fakeUser = (overrides) => ({
  __typename: "User",
  id: "1234",
  name: casual.name,
  email: casual.email,
  permissions: ["ADMIN"],
  orders: [],
  cart: [],
  ...overrides,
});

const fakeOrderItem = () => ({
  __typename: "OrderItem",
  id: casual.uuid,
  image: {
    image: `${casual.word}.jpg`,
  },
  name: casual.words(),
  price: 1234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  __typename: "Order",
  id: "ord123",
  charge: "ch_123",
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: "2024-01-11T20:16:13.797Z",
  user: fakeUser(),
});

const fakeCartItem = (overrides) => ({
  __typename: "CartItem",
  id: "abc123",
  quantity: 4,
  product: fakeItem(),
  user: fakeUser(),
  ...overrides,
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

function makePaginationMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          _allProductsMeta: {
            count: length,
          },
          itemsConnection: {
            __typename: "aggregate",
            aggregate: {
              count: length,
              __typename: "count",
            },
          },
        },
      },
    },
  ];
}

export {
  makePaginationMocksFor,
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
};
