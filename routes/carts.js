const Cart = require ('../model/Cart')
const express = require('express')
const router = express.Router()


/* Create a new Cart */
router.post ('/', async (req, res) => {
    let cartToCreate = req.body
    try {
      let newCart = new Cart(cartToCreate)
      await newCart.save()
      console.log("Created new Cart!", newCart)
      res.send(newCart)  
    }
    catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
})

/* get list of all carts*/
router.get('/', async (req, res) => {
  let data = await Cart.find({})
  console.info(`CART records retrieved from mongoose:`, data?.length)
  res.send(data);
})

/* get list of all cart items by userID */
router.get('/:id', async (req, res) => {
    let data = await Cart.findOne({userID: req.params.id})
    try {
        console.info(`Shopping Cart retrieved from mongoose:`, data)
        res.send(data);
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500)
      }
  })


/* Update Cart by userID, to add or remove items from cart */
router.put('/:id', async function(req, res) {
    let cartToUpdate = req.body
    try {
      // let data = await Cart.findByIdAndUpdate({userID: req.params.id}, cartToUpdate)
      let data = await Cart.findOneAndUpdate({userID: req.params.id}, cartToUpdate)
      console.log("Updated Cart!", data)
      res.send(data);
    }
    catch(error) {
      console.log(error)
      res.sendStatus(500)
    }
  })


/* Delete a cart by userID */
router.delete('/:id', async (req, res) => {
  try {
    const data = await Cart.findByIdAndDelete(req.params.id)
    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted Cart!", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)  }
})

module.exports = router