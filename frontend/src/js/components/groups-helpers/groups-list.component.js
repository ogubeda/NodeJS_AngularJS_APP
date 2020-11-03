class GroupsCtrl {
    constructor($state, Groups, $scope) {
        "ngInject";

        this.$onInit = () => {
            this._Groups = Groups;

            this._Groups.query().then(res => {
                console.log(res.groups);
                this.groups = res.groups;
            })
        }// end_onInit
    }// end_constructor
}// end_GroupsCtrl

let GroupsList = {
    controller: GroupsCtrl,
    templateUrl: 'components/groups-helpers/groups-list.html'
}// end_GroupsList

export default GroupsList;