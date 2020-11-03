export default class Groups {
    constructor(AppConstants, $http, $q, GraphQLClient) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
        this._GQL = GraphQLClient;
    }// end_constructor

    query (config) {
        // if (!config.filters.offset) {
        //     config.filters.offset = 0;
        // }// end_if
        // if (!config.filters.limit) {
        //     config.filters.limit = 0;
        // }// end_if

        let query = `
            query getGroups {
                groups {
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