pragma solidity ^0.5.0;

contract Marketplace{
  string public name;

  //used to keep a track of num of products in the mapping. Will be incremented each time a product is added to the mapping
  uint public productCounter = 0;
  //key for the mapping is an unsigned integer (id) and the value is the entire Struct
  mapping(uint => Product) public products;


  //a data structure containing the attributes and their data types which describes a typical product
  struct Product{
    uint id;
    string name;
    uint price;
    address payable owner;
    bool purchased;
  }

  event ProductCreated(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
  );

  event ProductPurchased(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
  );

  constructor() public{
    name = "Vivek Khimani Smart Contract";
  }

  function createProduct(string memory _name, uint _price) public {
    //Require a name
    require(bytes(_name).length > 0);
    //Make sure that the parameters are correct
    //Require a valid price
    require(_price>0);
    //Increment productCounter
    productCounter ++;
    //Create the product
    products[productCounter] = Product(productCounter,_name,_price,msg.sender,false);
    //Trigger the event or tell the blockchain that something happened
    emit ProductCreated(productCounter, _name, _price, msg.sender, false);
  }

  function purchaseProduct(uint _id) public payable {
    //Fetch the product
    Product memory _product = products[_id];
    //Fetch the owner
    address payable _seller = _product.owner;
    //Make sure the product has a valid id
    require(_product.id > 0 && _product.id <= productCounter);
    //Require that there is enough ether in the transaction
    require(msg.value >= _product.price);
    //Require that the product is already not purchased
    require(!_product.purchased);
    //Require that the buyer is not same as seller
    require(_seller != msg.sender);
    //Transfer ownership to buyer
    _product.owner = msg.sender;
    //Mark as purchase
    _product.purchased = true;
    //update the product
    products[_id] = _product;
    //pay the seller by sending them Ether
    address(_seller).transfer(msg.value);
    //Trigger an event
    emit ProductPurchased(productCounter, _product.name, _product.price, msg.sender, true);
  }
}
