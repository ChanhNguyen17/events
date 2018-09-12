const express = require('express');

const routes = function (Event) {
    const eventRouter = express.Router();

    eventRouter.route('/')
        .post(function (req, res) {
            const event = new Event(req.body);
            event.save();
            res.status(201).send(event);
        })
        .get(function (req, res) {
            const query = {};
            Event.find(query, function (err, events) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(events);
            });
        });

    eventRouter.use('/:eventId', function (req, res, next) {
        Event.findById(req.params.eventId, function (err, event) {
            if (err)
                res.status(500).send(err);
            else if (event) {
                req.event = event;
                next();
            }
            else {
                res.status(404).send('no event found');
            }
        });
    });

    eventRouter.route('/:eventId')
        .get(function (req, res) {
            res.json(req.event);
        })
        .put(function (req, res) {
            req.event.name = req.body.name;
            req.event.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.event);
                }
            });
        })
        .delete(function (req, res) {
            req.event.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return eventRouter;
};

module.exports = routes;
