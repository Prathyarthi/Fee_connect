import { Account } from "../models/accountModel"

const getBalance = async (req, res) => {
    const account = Account.findOne({
        userId: req._id
    })

    res.status(200).json({
        success: true,
        balance: account.balance
    })
}

export {
    getBalance,
}