const mongoose = require('mongoose');
const Group = mongoose.model('Group');

const resolvers = {
    Query: {
        group: (root, {slug}) => {
            return Group.findOne({slug: slug}).exec();
        },
        groups: () => {
            return Group.find().exec();
        }
    },
    Mutation: {
        addGroup: (root, {input}) => {

            console.log(input);

            const group = new Group(input);
            group.save();
            return group;
        }
    }
}

export default resolvers;