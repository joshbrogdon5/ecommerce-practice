module.exports = {
    getProducts: (req,res) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_products()
            .then(products => res.status(200).send(products))
            .catch(err => {
                res.status(500).send({errorMessage: "Oops, something went very wrong!"})
                console.log(err)
            })
    },
    addToCart: (req,res) => {
        const dbInstance = req.app.get('db');
        
        dbInstance.add_to_cart([req.body.id])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({errorMessage: "Oops, something went very wrong!"})
                console.log(err)
            })
    },
    getCartInfo: (req,res) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_cart()
            .then(cart => res.status(200).send(cart))
            .catch(err => {
                res.status(500).send({errorMessage: "Oops, something went very wrong!"})
                console.log(err)
            })
    },
    deleteFromCart: (req,res) => {
        const dbInstance = req.app.get('db');

        dbInstance.delete_from_cart([req.params.id])
            .then(() => {
                dbInstance.get_cart()
                    .then(cart => res.status(200).send(cart))
            })
            .catch(err => {
                res.status(500).send({errorMessage: "Oops, something went very wrong!"})
                console.log(err)
            })
    },
    setQuantity: (req,res) => {
        const dbInstance = req.app.get('db');

        dbInstance.set_quantity([req.body.quantity, req.body.id])
            .then(() => {
                dbInstance.get_cart()
                    .then(cart => res.status(200).send(cart))
            })
            .catch(err => {
                res.status(500).send({errorMessage: "Oops, something went very wrong!"})
                console.log(err)
            })
    },
    clearCart: (req,res) => {
        dbInstance = req.app.get('db');

        dbInstance.clear_cart()
            .then(() => {
                dbInstance.get_cart()
                .then(cart => res.status(200).send(cart))
            })
            .catch(err => {
                res.status(500).send({errorMessage: "Oops, something went very wrong!"})
                console.log(err)
            })
    }
}