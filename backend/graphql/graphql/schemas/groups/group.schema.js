import { gql } from 'apollo-server-express';

const typeDefs = gql `
    extend type Query {
        group(slug: String!): Group
        groups: [Group]
    }
    extend type Mutation {
        addGroup(input: GroupInput): Group
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
    input GroupInput {
        name: String!
        singers: [String]
        creationDate: String
        albums: [String]
    }
`;

export default typeDefs;