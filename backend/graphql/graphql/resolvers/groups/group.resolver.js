const mongoose = require('mongoose');
const Group = mongoose.model('Group');

const resolvers = {
    Query: {
        group: (root, {slug}) => {
            return Group.findOne({slug: slug}).exec();
        },
        groups: (root, {order}) => {
            return Group.find().sort({[order]: 'desc'}).exec();
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