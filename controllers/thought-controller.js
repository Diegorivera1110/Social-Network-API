const { Thought, User } = require('../models');

// THOUGHTS CONTROLLER
const thoughtsController = {

    getAllThoughts(req, res) {
        Thought.find({})
        .sort({ _id: -1 })
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
    
}