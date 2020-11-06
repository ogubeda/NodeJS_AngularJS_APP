export default class Groups {
    constructor(AppConstants, $http, $q, GraphQLClient) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
        this._GQL = GraphQLClient;
    }// end_constructor

    query (config) {
        if (!config.order) config.order = "creationDate";

        let query = `
            query getGroups {
                groups(order: "${config.order}") {
                    id
                    slug
                    name
                    singers
                    creationDate
                    albums
                    image
                }
            }
        `;
        return this._GQL.get(query);
    }
}// end_Groups