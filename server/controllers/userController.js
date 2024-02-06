const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
exports.getAllusers = async (req, res) => {
    try {
        const user = await userModel.find();
        if (!user) {
            return res.status(400).send({
                message: "no user found",
                success: false
            })
        }
        return res.status(201).send({
            message: "got it",
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "something went wrong",
            success: false,
            error
        })
    }
}
exports.registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                message: "enter valid document",
                success: false
            })
        }
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).send({
                message: "email already exist",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).send({
            message: "registration successful",
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "registratiion  failed",
            success: false,
            error

        })
    }


}
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: "enter valid document",
                success: false
            })
        }
        const existUser = await userModel.findOne({ email });
        if (!existUser) {
            return res.status(400).send({
                message: "email not registered",
                success: false
            })
        }
        const comparePassword = await bcrypt.compare(password, existUser.password);
        if (comparePassword) {
            return res.status(201).send({
                message: "login successful",
                success: true,
                existUser
            })
        }
        return res.status(400).send({
            message: "wrong password",
            success: false
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "registratiion  failed",
            success: false,
            error

        })
    }
}
exports.userByIdController = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        console.log('user', user)
        if (!user) {
            return res.status(400).send({
                message: "no user found",
                success: false
            })
        }
        return res.status(201).send({
            message: "got it",
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "something went wrong",
            success: false,
            error
        })
    }
}
