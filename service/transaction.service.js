const TransactionModel = require('../models/Transactions')

class TransactionService {

  async getTransactions (user) {
    const transactionsFetched = await TransactionModel.find({ user }).sort({ createdAt: -1 }).populate('category')

    return await transactionsFetched.map(transaction => {
      return {
        ...transaction._doc,
        _id: transaction.id,
        createdAt: new Date(transaction._doc.createdAt).toISOString(),
        updatedAt: new Date(transaction._doc.updatedAt).toISOString(),
      }
    })
  }

  async getTransactionDetail (user, transaction) {
    return TransactionModel.findOne({ user, transaction }).populate('category')
  }

  async createTransaction (user, transaction) {
    const newTransaction = new TransactionModel({ user, ...transaction })

    await newTransaction.save()

    return newTransaction.populate('category')
  }

  async deleteTransaction (_id) {
    const result = await TransactionModel.deleteOne({ _id })
    return result.deletedCount === 1
  }

  async updateTransaction (_id, transaction) {
    return TransactionModel.findOneAndUpdate(
      { _id },
      { $set: { ...transaction } },
      { returnOriginal: false }
    ).populate('category')
  }

}

module.exports = new TransactionService()
