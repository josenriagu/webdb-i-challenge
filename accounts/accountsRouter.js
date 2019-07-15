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

// middleware
async function validateId(req, res, next) {
   const id = Number(req.params.id);
   if (Number.isInteger(id)) {
      const account = await Accounts.getById(id);
      if (account.length !== 0) {
         req.account = account;
         next();
      } else {
         res.status(400).json("Aww, the account with that id has gone to the BlackHole")
      }
   } else {
      res.status(400).json("That id doesn't look legit!")
   }
}

module.exports = router;