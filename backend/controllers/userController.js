import zod from 'zod'
import { User } from '../models/userModel';
const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const signupParsed = signupSchema.safeParse(req.body)

    if (!signupParsed.success) {
        return res.status(400).json({
            success: false,
            message: "Every field is required "
        });
    }

    try {
        const userExists = await User.findOne({
            email
        })

        if (userExists) {
            return res.status(411).send("User already exists")
        }

        const user = await User.create({
            email,
            password,
            firstName,
            lastName
        })

        if (!user) {
            return res.status(500).send("Server Error")
        }

        user.save()

        const userId = user._id

        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET)

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `Account already exist with the provided email ${email}`
            });
        }

        return res.status(400).json({
            message: error.message
        });
    }
};


const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})

const signin = async (req, res) => {
    const { email, password } = req.body;

    const signinParsed = signinSchema.safeParse(req.body)

    if (!signinParsed.success) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        const userExists = await User.findOne({
            email
        })

        const validPassword = await userExists.comparePassword(password)
        if (!validPassword) {
            return res.status(401).send("Password is incorrect")
        }

        if (!userExists) {
            return res.status(401).send("User doesn't exist")
        }

        const token = jwt.sign({
            userId: userExists._id
        }, process.env.JWT_SECRET)

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token
        })
        return
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const getUser = async (req, res) => {
    const userId = req._id;
    try {
        const user = await User.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export {
    signup,
    signin,
    getUser
}