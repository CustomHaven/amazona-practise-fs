import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
    try {
        // console.log(req.body)
        const signinUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });
        console.log(signinUser)
        if (signinUser) {
            res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser)
            })
        }
    } catch (error) {
        res.status(401).send({ msg: 'Invalid Email or Password'})
    }
});

router.post('/register', async (req, res) => {
    try {
        // console.log(req.body)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const newUser = await user.save();

        if (newUser) {
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }
    } catch (error) {
        res.status(401).send({ msg: 'Invalid User Data'})
    }
});

router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'Mohamed',
            email: 'mmuseadendev@gmail.com',
            password: 'mohamed1234',
            isAdmin: true
        });

        const newUser = await user.save();

        res.send(newUser)
    } catch (error) {
        res.status(403).send({ msg: error.message })
    }
});


export default router;