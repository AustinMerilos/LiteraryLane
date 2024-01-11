import { list } from "@keystone-next/keystone/schema";
import {
  integer,
  relationship,
  select,
  text,
  virtual,
} from "@keystone-next/fields";
import currencyFormater from "../utils/currencyFormater";

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: "String",
      resolver(item) {
        return `${currencyFormater(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});
