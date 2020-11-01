import { merge } from 'lodash';

// .exec() is used at the end of the GET mongoose queries so it doesn't run twice

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}

import GroupResolvers from "../../graphql/resolvers/groups/group.resolver";

const resolvers = merge(
  GroupResolvers
);

export default resolvers;