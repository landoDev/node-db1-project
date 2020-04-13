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
        res.status(500).json({ error: 'Could not pull account' });
      });
})

router.post('/', (req, res) =>{
    const newAccount = req.body;
    db('accounts').insert(newAccount)
    .then(ids =>{
        // How is this parsed dynamically?
        const id = ids[0];
        db('accounts').where({ id })
        .first()
        .then(account =>{
            console.log(res)
            res.status(201).json(account)
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Could not add account' });
      });
})

router.patch('/:id', (req, res) =>{
    const acctUpdate = req.body;
    const { id } = req.params;
    // update accounts where id = thisId
    db('accounts').where({ id }) // forgot this at first lol 
    .update(acctUpdate)
    .then(count =>{
        // Updates return a count
        if(count > 0){
            res.status(200).json({ message: 'Account successfully updated'});
        } else  {
            res.status(404).json({ message: 'Account not found'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Could not add account' });
      });
})

module.exports = router;