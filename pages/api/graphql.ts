import { gql } from "apollo-server-core";
import { ApolloServer } from "@saeris/apollo-server-vercel";
import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";

import usagis from "data/usagis.json";
import menus from "data/menus.g.json";

const typeDefs: IExecutableSchemaDefinition["typeDefs"] = gql`
  type Name {
    en: String!
    ja: String
  }

  type Price {
    usd: Float
    jpy: Float!
  }

  type Usagi {
    id: ID!
    name: Name!
    image: String
  }

  type Menu {
    name: Name!
    price: Price!
    category: String!
    restaurant: String!
  }

  type Query {
    usagi(id: Int): Usagi
    usagis: [Usagi!]
    menu(id: Int): Menu
    menus(categories: [String], restaurants: [String]): [Menu!]
  }
`;

const resolvers: IExecutableSchemaDefinition["resolvers"] = {
  Query: {
    usagi: (parent, args, context, info) => usagis[args.id],
    usagis: () => usagis,
    menu: (parent, args, context, info) => menus[args.id],
    menus: (parent, args, context, info) =>
      menus
        .filter(
          (menu) => !args.categories || args.categories.includes(menu.category)
        )
        .filter(
          (menu) =>
            !args.restaurants || args.restaurants.includes(menu.restaurant)
        ),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  // @ts-ignore
  resolvers,
  csrfPrevention: true,
  playground: true,
  introspection: true,
});

export default apolloServer.createHandler({ cors: { origin: "*" } });
