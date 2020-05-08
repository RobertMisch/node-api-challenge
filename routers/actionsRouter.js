const express = require('express');
const router = express.Router();
const actionsData = require('../data/helpers/actionModel')

router.get('/', (req, res) => {
    // do your magic!
    actionsData.get()
        .then(action => {
            if (action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: 'action not found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the action',
            });
        });
});

router.put('/:id', validateActionId, (req, res) => {
    // do your magic!
    actionsData.update(req.params.id, req.body)
        .then(project => {
            if (project) {
                res.status(200).json({ message: 'The action has been edited' });
            } else {
                res.status(500).json({ message: 'Error editing the action' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error editing the action',
            });
        });
});

router.delete('/:id', validateActionId, (req, res) => {
    // do your magic!
    actionsData.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The action has been deleted' });
            } else {
                res.status(500).json({ message: 'Error removing the action' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error removing the action',
            });
        });
});

//MIDDLEWARE
// function validateAction(req, res, next) {

//     const { project_id, description } = req.body
//     if (!project_id || !description) {
//         res.status(400).json({ message: 'missing required field' })
//     } else {
//         next()
//     }
// }

function validateActionId(req, res, next) {

    const { id } = req.params

    actionsData.get(id)
        .then(action => {
            if (action) {
                req.project = action
                next()
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(error => {
            res.status(400).json({ message: "invalid action id" })
        })
}

module.exports = router;