const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  //   const simpleStorage = await SimpleStorageFactory.deploy({
  //     gasPrice: 30000000000
  //   });
  // const contractReceipt = await simpleStorage.deploymentTransaction().wait();

  // this is not working in the ethers version > 6
  // await simpleStorage.deployed();

  // console.log(simpleStorage);
  // console.log(contractReceipt);
  //   console.log("contract address: ", await simpleStorage.getAddress());
  console.log("contract address: ", simpleStorage.target);

  // we haven't used any provider or private key, then how will it get deployed
  // hardhat have it's own built in hardhat network (just like ganache)

  // what happen if we deploy on the hardhat network
  // -> etherscan can't access as hardhat is local
  // console.log(network.config);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");

    await simpleStorage.deploymentTransaction().wait(5);
    await verify(simpleStorage.target, [])
  }

  // interacting with the contract
  const currentValue = await simpleStorage.retrieve();
  console.log("current value: ", currentValue);

  // updating the current value
  const transactionResponse = await simpleStorage.store(657);
  await transactionResponse.wait(1);
  const updValue = await simpleStorage.retrieve();
  console.log("updated value: ", updValue);
}

async function verify(contractAddress, args) {
  console.log("Verifying the Contract...");

  // run commands in the code using run
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
