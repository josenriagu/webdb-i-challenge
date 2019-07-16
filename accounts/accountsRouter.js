const express = require('express');

const Accounts = require('./accountsDb');

const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const accounts = await Accounts.get();
      res.status(200).json(accounts);
   } catch (error) {
      res.status(500).json('Oops! The aliens crushed the cables! Help us fix the mess from your side, while we work from over here')
   }
})

router.get('/:id', validateId, (req, res) => {
   try {
      res.status(200).json(req.account);
   } catch (error) {
      res.status(500).json('Oops! The aliens crushed the cables! Help us fix the mess from your side, while we work from over here')
   }
})

router.post('/', validateAccount, async (req, res) => {
   try {
      const newAccount = await Accounts.insert(req.body);
      res.status(201).json(newAccount);
   } catch (error) {
      res.status(500).json('Oops! The aliens crushed the cables! Help us fix the mess from your side, while we work from over here')
   }
})

router.put('/:id', validateAccount, validateId, async (req, res) => {
   try {
      await Accounts.update(req.params.id, req.body);
      const account = await Accounts.getById(req.params.id);
      res.status(200).json(account);
   } catch (error) {
      res.status(500).json('Oops! The aliens crushed the cables! Help us fix the mess from your side, while we work from over here')
   }
})

router.delete('/:id', validateId, async (req, res) => {
   try {
      await Accounts.remove(req.params.id)
      const accounts = await Accounts.get();
      res.status(200).json(accounts)
   } catch (error) {
      res.status(500).json('Oops! The aliens crushed the cables! Help us fix the mess from your side, while we work from over here')
   }
})

// middleware
async function validateId(req, res, next) {
   const id = Number(req.params.id);
   if (Number.isInteger(id)) {
      const account = await Accounts.getById(id);
      if (account.length !== 0) {
         req.account = account;
         next();
      } else {
         res.status(400).json("Aww, the account with that id might have gone into the BlackHole")
      }
   } else {
      res.status(400).json("That id doesn't look legit!")
   }
}

async function validateAccount(req, res, next) {
   if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      if (req.body.name && req.body.budget) {
         next();
      } else {
         res.status(400).json({ message: "Oh no! the required name and budget fields gone missing" })
      }
   } else {
      res.status(400).json({ message: "hmm! no account data for real?" })
   }
}

module.exports = router;