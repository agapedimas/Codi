const { exec } = require("child_process");

exec("npm run start", async (error, stdout, stderr) => 
{
    console.log(stdout)
});