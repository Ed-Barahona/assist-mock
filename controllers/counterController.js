var counterModel = require('../models/counterModel.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.Promise = global.Promise;
/**
 * counterController.js
 *
 * @description :: Server-side logic for managing counters.
 */
module.exports = {

    /**
     * counterController.list()
     */
    list: function (req, res) {
        counterModel.find(function (err, counters) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting counter.',
                    error: err
                });
            }
            return res.json(counters);
        });
    },

    /**
     * counterController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        counterModel.findOne({_id: id}, function (err, counter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting counter.',
                    error: err
                });
            }
            if (!counter) {
                return res.status(404).json({
                    message: 'No such counter'
                });
            }
            return res.json(counter);
        });
    },

    /**
     * counterController.create()
     */
    create: function (req, res) {
        var counter = new counterModel({
			type : req.body.type,
			count : req.body.count

        });

        counter.save(function (err, counter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating counter',
                    error: err
                });
            }
            return res.status(201).json(counter);
        });
    },

    /**
     * counterController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        counterModel.findOne({_id: id}, function (err, counter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting counter',
                    error: err
                });
            }
            if (!counter) {
                return res.status(404).json({
                    message: 'No such counter'
                });
            }

            counter.type = req.body.type ? req.body.type : counter.type;
			counter.count = req.body.count ? req.body.count : counter.count;
			
            counter.save(function (err, counter) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating counter.',
                        error: err
                    });
                }

                return res.json(counter);
            });
        });
    },

    /**
     * counterController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        counterModel.findByIdAndRemove(id, function (err, counter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the counter.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
