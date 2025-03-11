# Getting started with hardhat SimpleStorage

### Get started with the following command to setup hardhat 
- ``` npm init ```
- ``` npm install --save-dev hardhat ```
- npm install --save-dev @nomicfoundation/hardhat-ethers ethers
- (create javascript hardhat project)

    ```
    npx hardhat 
    ```

### now about the hardhat commands
- ``` npx hardhat help ```

### Compile the contract
this will compile all the solidity file in contracts folder
```
npx hardhat compile 
```

### Deploying the Smart Contract to hardhat
- Create Scripts directory with deploy.js file in it
- deploy.js file will contain the scirpt for deploying the contract
- we will use ethers from hardhat library instead of ethers library, this is because we can directly use the contract in contracts folder but in case of ethers we need to compile and provide the abi, bytecode of the contract to use the contract
- hardhat have it's own built in network, when we are not specifing any network by default hardhat network and it's private key will be used to deploy contract

### Run the Contract on specific network
- npx hardhat run scripts/deploy.js --network hardhat
- npx hardhat run scripts/deploy.js --network sepolia

- we will add the network and private key in hardhat.config.json

    ```javascript
    module.exports = {
        defaultNetwork: "hardhat",
        networks:{
            sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [SEPOLIA_PRIVATE_KEY],
            }
        },
        solidity: "0.8.19",
    };
    ```

### Verify Contract on etherscan
- Verify the contract on etherscan, using etherscan api key in hardhat.config.json
- using the plugin : require("@nomicfoundation/hardhat-verify");
```javascript
module.exports = {
    ...,
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    sourcify: {
        enabled: true
    }
}
```


### Run Commands in the code (using run (hardhat))
- const {run} = require("hardhat");

### Network Details
- get the details of the network contract is being deployed
- const {network} = require("hardhat");
- ``` console.log(network.config) ```

### Creating own tasks in hardhat
- create task directly in the hardhat.config.js
- setParams: set the parameter to the task
- setAction: define what the task should do
- need to import the task file to hardhat.config.js to see the task
- list the task in hardhat using ``` npx hardhat help ```
- Creating new task
    - create tasks forlder
    - block-number.js (js file)
    - create task using task from hardhat/config package
    - hre (hardhat runtime environment) 
- Run the block-number task : ``` npx hardhat block-number --network sepolia ```

### Hardhat Localhost Node
- Starts a local Ethereum blockchain (Hardhat Network) on your machine. Just like Ganache
- It is different from the default hardhat network
- Some fake accounts will be given wiht this blockchain, just like the Ganache
- This network will be added in hardhat.config.js as localhost 
```javascript
module.exports = {
    ..., 
    networks:{
        ...,
        localhost:{
            url: "http://127.0.0.1:8545/",
            chainId: 31337
        }
    }
}
```

### Hardhat console
- Run Hardhat console : ``` npx hardhat console  --network sepolia ```
- It is a javascript environment, run javascript commands to interact with any blockchain

### Testing the Contract
- create test directory with test-deploy.js file
- describe: describe is a function used to group test cases together

    syntax:
    ```javascript
    describe("Name-of-Test", function () {
        // beforeEach
        // it
    })
    ```
- beforeEach: it is a Mocha hook that runs before each test case

    syntax:
    ```javascript
    beforeEach(async ()=>{
        // contract deploy
    })
    ```
- it: test case

    syntax:
    ```javascript
    it("Name for the test case", function () {
        // verify using assert/expect
    })
    ```
- it.only : only this testcase will run
- run the test: ``` npx hardhat test ```
- run the specific test: ``` npx hardhat test --grep keyword_any_in_name_of_testcase ```

### Hardhat Gas Reporter
- This extension get attacched to our test automatically and tells approximate how much gas each of our function costs
- Add parameter in hardhat.config.js to use this 
- parameters:
    - enabled: this enable the report for our test
    - outputFile: write the output of the report to the file (filename.extension)
    - noColors: true/false
    - coinmarketcap: make api call to get the currency
    - offline: true : this restrict using real time conversion from etherscan
- syntax:

    ```javascript
    module.exports = {
        ...,
        gasReporter:{
            enabled: true,
            outputFile: "gas-report.txt",
            noColors: true,
            currency: "INR",
            coinmarketcap: COINMARKETCAP_API_KEY,  // this is required to use currency
            offline: true
        }
    }
    ```

### Solidity Coverage
- hardhat plugin which tells how many lines of solidity code are not covered in the test
- Istanbul reports written to ./coverage/ and ./coverage.json
- command: ``` npx hardhat coverage ```

