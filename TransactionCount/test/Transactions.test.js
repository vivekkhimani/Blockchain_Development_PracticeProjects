const Transactions = artifacts.require('./Transactions.sol')

contract('Transactions', (accounts) => {
  let transactions

  before(async () => {
    transactions = await Transactions.deployed()
  })

  describe('deployment', async() => {
    it('deploys successfully', async() => {
      const address = await transactions.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address,'')
      assert.notEqual(address,null)
      assert.notEqual(address,undefined)
    })
  })
})
