const express = require('express');
const router = express.Router();
const projectData = require('../data/helpers/projectModel')
const actionsData = require('../data/helpers/actionModel')

router.get('/', (req, res) => {
    // do your magic!
    projectData.get()
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'project not found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the project',
            });
        });
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    
    projectData.getProjectActions(req.params.id)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error retrieving the project',
        });
      });
  });
  
router.post('/', validateProject, (req, res) => {
    // do your magic!
    projectData.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'an error as occured' })
        })
});

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
    // do your magic!
    let newAction = {
      project_id: req.params.id,
      description: req.body.description,
      notes: req.body.notes
    }
    actionsData.insert(newAction)
      .then(action => {
        res.status(201).json(action)
      })
      .catch(error => {
        res.status(500).json({ message: `[${error}] an error has occured` })
      })
  });

router.put('/:id', validateProjectId, (req, res) => {
    // do your magic!
    projectData.update(req.params.id, req.body)
        .then(project => {
            if (project) {
                res.status(200).json({ message: 'The project has been edited' });
            } else {
                res.status(500).json({ message: 'Error editing the project' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error editing the project',
            });
        });
});

router.delete('/:id', validateProjectId, (req, res) => {
    // do your magic!
    projectData.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The project has been deleted' });
            } else {
                res.status(500).json({ message: 'Error removing the project' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error removing the project',
            });
        });
});

//MIDDLEWARE
function validateProject(req, res, next) {

    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({ message: 'missing required field' })
    } else {
        next()
    }
}

function validateAction(req, res, next) {

    const { project_id, description, notes } = req.body
    if (!description || !notes) {
        res.status(400).json({ message: 'missing required field' })
    } else {
        next()
    }
}

function validateProjectId(req, res, next) {

    const { id } = req.params

    projectData.get(id)
        .then(project => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(error => {
            res.status(400).json({ message: "invalid project id" })
        })
}

module.exports = router;