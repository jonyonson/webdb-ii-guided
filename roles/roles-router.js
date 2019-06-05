const knex = require('knex');

const router = require('express').Router();

// install knex and driver
// configure knex

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/rolex.db3',
  },
  useNullAsDefault: true,
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
  db('roles')
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db('roles')
    .where({ id })
    .first()
    .then(role => {
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    })
    .catch(error => {
      res.status(200).json(error);
    });
});

router.post('/', (req, res) => {
  db('roles')
    .insert(req.body, 'id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  db('roles')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} records updated` });
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  db('roles')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        const unit = count > 1 ? 'records' : 'record';
        res.status(200).json({ message: `${count} ${unit} deleted` });
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
