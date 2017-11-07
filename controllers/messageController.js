var messageModel = require('../models/messageModel.js');

/**
 * messageController.js
 *
 * @description :: Server-side logic for managing messages.
 */
module.exports = {

    /**
     * messageController.list()
     */
    list: function (req, res) {
        messageModel.find(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message.',
                    error: err
                });
            }
            return res.json(messages);
        });
    },

    /**
     * messageController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        messageModel.findOne({_id: id}, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message.',
                    error: err
                });
            }
            if (!message) {
                return res.status(404).json({
                    message: 'No such message'
                });
            }
            return res.json(message);
        });
    },

    /**
     * messageController.create()
     */
    create: function (req, res) {
        var message = new messageModel({
			type : req.body.type,
			request : req.body.request,
			response : req.body.response,
			request_time : req.body.request_time,
			response_time : req.body.response_time,
			data : req.body.data,
			message_data : req.body.message_data

        });

        message.save(function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating message',
                    error: err
                });
            }
            return res.status(201).json(message);
        });
    },

    /**
     * messageController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        messageModel.findOne({_id: id}, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message',
                    error: err
                });
            }
            if (!message) {
                return res.status(404).json({
                    message: 'No such message'
                });
            }

            message.type = req.body.type ? req.body.type : message.type;
			message.request = req.body.request ? req.body.request : message.request;
			message.response = req.body.response ? req.body.response : message.response;
			message.request_time = req.body.request_time ? req.body.request_time : message.request_time;
			message.response_time = req.body.response_time ? req.body.response_time : message.response_time;
			message.data = req.body.data ? req.body.data : message.data;
			message.message_data = req.body.message_data ? req.body.message_data : message.message_data;
			
            message.save(function (err, message) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating message.',
                        error: err
                    });
                }

                return res.json(message);
            });
        });
    },

    /**
     * messageController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        messageModel.findByIdAndRemove(id, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the message.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
