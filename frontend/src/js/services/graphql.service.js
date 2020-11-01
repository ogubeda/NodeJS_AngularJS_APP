import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag'

export default class GraphQL {
    constructor(AppConstants, $q, JWT) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$q = $q;
        this._clients = new Map([[this._AppConstants.api_gql + '/graphql/', this.createClient()]]);
        this._authClient = this.createAuthClient();
        this._JWT = JWT;
    }// end_constructor

    createClient(server = this._AppConstants.api_gql) {
        return new ApolloClient({
            link: createHttpLink({uri: server}),
            cache: new InMemoryCache()
        });
    }// end_createClient

    createAuthClient() {
        return new ApolloClient({
            link: this.createAuthClient().concat(createHttpLink({uri: this._AppConstants.api_gql + '/graphqlauth/'})),
            cache: new InMemoryCache()
        });
    }// end_createAuthClient

    createAuthLink() {
        return setContext((_, {headers}) => {
            let token = this._JWT.get();

            return {
                headers: {
                    Authorization: token ? `Bearer $(token)`: "",
                }
            }
        });
    }// end_createAuthLink

    get(query, server = this._AppConstants.api_gql) {
        let deferred = this._$q.defer();

        if (!this._clients.has(server)) {
            this._clients.set(server, this.createClient(server));
        }// end_if

        this._clients.get(server).query({
            query: qql(query)
        }).then((res) => deferred.resolve(res.data), (err) => deferred.reject(err));

        return deferred.promise;
    }// end_get
}// end_GraphQL