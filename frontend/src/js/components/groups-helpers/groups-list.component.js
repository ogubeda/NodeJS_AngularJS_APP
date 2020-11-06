class GroupsCtrl {
    constructor($state, Groups, $scope) {
        "ngInject";

        this.$onInit = () => {
            this._Groups = Groups;

            this._Groups.query(this.listConfigGroups).then(res => {
                console.log(res);
                this.groups = res.groups;
            });
        }// end_onInit
    }// end_constructor
}// end_GroupsCtrl

let GroupsList = {
    bindings: {
        listConfigGroups: '='
    },
    controller: GroupsCtrl,
    templateUrl: 'components/groups-helpers/groups-list.html'
}// end_GroupsList

export default GroupsList;