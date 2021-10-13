async function main() {
    const Demography = await ethers.getContractFactory("Demography");
 
    // Start deployment, returning a promise that resolves to a contract object
    const doc = await Demography.deploy("userid", "string, string");
    console.log("Contract deployed to address:", doc.address);}
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
 