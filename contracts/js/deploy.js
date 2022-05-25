const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const mnemonic = 'swear ill finish flag truth remember entire another journey bounce good vast';
const provider = new HDWalletProvider(mnemonic, 'http://localhost:8545');

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const argumentsConstructor = [
        "Alberto Coin",
        "ACOIN",
        18,
        21000000
    ];

    const gasEstimate = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: argumentsConstructor })
        .estimateGas({ from: accounts[0] });

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: argumentsConstructor })
        .send({ gas: gasEstimate, from: accounts[0] });

    console.log(JSON.stringify(result.options.jsonInterface));
    console.log("Contract",result.options.address);
};
deploy();

// 0xcd4ed7adb7b4457fe7935466babc8754ce246864