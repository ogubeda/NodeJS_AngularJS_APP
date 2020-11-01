import { gql } from 'apollo-server-express';

const typeDefs = gql `
    extend type Query {
        group(slug: String!): Group
        groups: [Group]
    }
    type Group {
        id: ID!
        slug: String!
        name: String
        singers: [String]
        creationDate: String
        albums: [String]
        image: String
        favoritesCount: Int
    }
`;

export default typeDefs;