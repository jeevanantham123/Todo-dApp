const main = async () => {
  const tasksFactory = await hre.ethers.getContractFactory("Tasks");
  const tasksContract = await tasksFactory.deploy();

  await tasksContract.deployed();

  console.log("Tasks address: ", tasksContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
