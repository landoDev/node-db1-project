const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) =>{
    db('*').from('accounts')
    .then(accounts =>{
        res.status(200).json({ data: accounts })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Could not pull accounts' });
      });
});

router.get('/:id', (req, res) =>{
    db('accounts').where('id', req.params.id)
    .first()
    .then(account =>{
        res.status(200).json({ data: account })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Could not pull accounts' });
      });
})

module.exports = router;