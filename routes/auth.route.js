const {Router} = require('express')
const router = Router();
const User = require('../models/User');
const {check, validationResult} = require('express-validator')

const jwt = require('jsonwebtoken');

router.post('/registration',
    [
        check('email', "Некоректна електронна пошта").isEmail(),
        check('password', "Некоректний пароль").isLength({min: 6}),
    ],

    async (req, res) => {
        try {
            const errors = await validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректні дані при реєстрації',
                })
            }

            const { email, password } = req.body;

            const isUsed = await User.findOne({ email })

            if (isUsed) {
                return res.status(300).json({ message: 'Ця електрнна адреса вже зайнята.'})
            }

            const user = new User({
                email,
                password
            })

            await user.save();

            res.status(200).json({ message: 'Аккаунт зареєстрований.'})


        }catch (err){
            console.error(err)
        }
})

router.post('/login',async (req, res) => {
        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: "Неправильна електронна адреса або пароль"})
            }

            if (password !== user.password) {
                return res.status(400).json({ message: "Неправильний пароль"})
            }

            const jwtSecret = "h727GU&$gyfh&YCuhiuh87vgV.EW#2dn9*"

            const token = await jwt.sign(
                { userId: user.id},
                jwtSecret,
                {expiresIn: "1h"}
            )

            res.json({ token, userId: user.id})

            window.location = '/';

        }catch (err){
            console.error(err)
        }
})

module.exports = router;
