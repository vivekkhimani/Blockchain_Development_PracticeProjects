const Marketplace = artifacts.require('./Marketplace.sol')

//require 'chai' dependency for testing
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace', ([deployer,seller,buyer])=>{
  let marketplace

  before (async () => {
    marketplace = await Marketplace.deployed()
    })

    describe('deployment', async () => {
      it('deploys successfully', async () => {
        const address = await marketplace.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })

      it('has a name', async () => {
        const name = await marketplace.name()
        assert.equal(name, 'Vivek Khimani Smart Contract')
      })
    })

    describe('products', async () => {

      let result, productCounter

      before (async () => {
        result = await marketplace.createProduct('IPhoneX', web3.utils.toWei('1','Ether'), {from: seller})
        productCounter = await marketplace.productCounter()
        })

      it('creates products', async () => {
        //SUCCESS
        assert.equal(productCounter, 1)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), productCounter.toNumber(),'id is correct')
        assert.equal(event.name, 'IPhoneX', 'name is correct')
        assert.equal(event.price, '1000000000000000000', 'price is correct')
        assert.equal(event.owner,seller, 'owner is correct')
        assert.equal(event.purchased, false, 'purchased is correct')

        //FAILURE: product must have a name
        await await marketplace.createProduct('', web3.utils.toWei('1','Ether'), {from: seller}).should.be.rejected;
        //FAILURE: product must have a price
        await await marketplace.createProduct('IPhoneX',0, {from: seller}).should.be.rejected;
      })

      it('lists products', async() => {
        const product = await marketplace.products(productCounter)
        assert.equal(product.id.toNumber(), productCounter.toNumber(),'id is correct')
        assert.equal(product.name, 'IPhoneX', 'name is correct')
        assert.equal(product.price, '1000000000000000000', 'price is correct')
        assert.equal(product.owner,seller, 'owner is correct')
        assert.equal(product.purchased, false, 'purchased is correct')
      })

      it('sells products', async () => {
        //Old Seller Balance
        let oldSellerBalance
        oldSellerBalance = await web3.eth.getBalance(seller)
        oldSellerBalance = new web3.utils.BN(oldSellerBalance)

        //SUCCESS: Buyer makes purchase
        result = await marketplace.purchaseProduct(productCounter, {from: buyer, value: web3.utils.toWei('1','Ether')})

        //Check logs
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), productCounter.toNumber(),'id is correct')
        assert.equal(event.name, 'IPhoneX', 'name is correct')
        assert.equal(event.price, '1000000000000000000', 'price is correct')
        assert.equal(event.owner,buyer, 'owner is correct')
        assert.equal(event.purchased, true, 'purchased is correct')

        //Check that seller received the fund
        let newSellerBalance
        newSellerBalance = await web3.eth.getBalance(seller)
        newSellerBalance = new web3.utils.BN(newSellerBalance)

        let price
        price = web3.utils.toWei('1','Ether')
        price = new web3.utils.BN(price)

        console.log(oldSellerBalance,newSellerBalance,price)

        const expectedBalance = oldSellerBalance.add(price)

        assert.equal(newSellerBalance.toString(),expectedBalance.toString())


        //FAILURE: Tries to buy a product that doesn't exist, i.e. product must have a valid id
        await marketplace.purchaseProduct(99, {from: buyer, value: web3.utils.toWei('1','Ether')}).should.be.rejected;

        //FAILURE: Buyer tries to buy with enough Ether
        await marketplace.purchaseProduct(productCounter, {from: buyer, value: web3.utils.toWei('0.5','Ether')}).should.be.rejected;

        //FAILURE: Deployer tries to buy the product. i.e., product can't be purchased twice
        await marketplace.purchaseProduct(productCounter, {from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

        //FAILURE: Buyer tries to buy again. Buyer can't be the seller.
        await marketplace.purchaseProduct(productCounter, {from: buyer, value: web3.utils.toWei('1','Ether')}).should.be.rejected;
        })

    })
})
