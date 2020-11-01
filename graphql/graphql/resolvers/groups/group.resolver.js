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
    }
}

export default resolvers;