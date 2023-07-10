//DEPENDENCIES
const express = require('express');
const router = express.Router();

let budgetData = require('../Model/budgetModel');

//ROUTES

router.get('/', (req, res) => {
    res.send(budgetData);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    let foundTransaction = budgetData.find(item => {
        return item.id == id;
    })

    if(!foundTransaction){
        res.status(404).send('Sorry we couldn not find that transaction')
    }
    else{
        res.send(foundTransaction);
    }
})

router.post('/', (req, res) => {
    
    if(Object.keys(req.body).length <= 0){
        res.status(404).send('Sorry it looks like you have not added any transaction info')
    }
    else{
        budgetData.push(req.body);
        res.send(budgetData);
    }

})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    let foundIndex = budgetData.findIndex((item) => {
        return item.id == id;
    })

    if(foundIndex == -1){
        res.status(404).send('Sorry we could not find this transaction to be deleted.')
    }
    else{
        budgetData.splice(foundIndex, 1);
        res.send(budgetData);
    }
})


router.put('/:id', (req, res) => {
    const { id } = req.params;

    let foundObject = budgetData.find((item) => {
        return item.id == id;
    })

    let foundIndex = budgetData.findIndex((item) => {
        return item.id == id;
    })

    if(!foundObject){
        res.status(404).send("Sorry we could not find the transaction you were looking to update.")
    }
    else{
        let newObject = {
            ...foundObject,
            ...req.body
        }

        budgetData.splice(foundIndex, 1, newObject);
        res.send(budgetData);
    }
})


//EXPORT

module.exports = router;