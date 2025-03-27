**Setting it Up**  
Verify Node.js is installed: in command prompt type "Node" if you have it you should see something like Welcome to Node.js v16.16.0. Otherwise, install it from here: https://nodejs.org/en

Download TechStats.js, data.json, and papaparse (by running the command "npm install papaparse"). All of these should be in the same folder.

**Modifying the script for desired output**  
All you need to change is a set of 3 parallel arrays in TechStats.js, for example:

        //monk techs
        	const techList = ["316","231","230"];
        	const techNames = ["Redemption","Sanctity","BlockPrinting"];
        	const isUnit = [false, false, false];
         
* techList- ID numbers can be found here: https://halfon.aoe2.se/
* techNames- is just how you want it displayed. Spacing/caps/spelling don't break it
* isUnit- change value between true and false

**Running**  
1. Open command prompt, cd into program folder
2. run with "Node TechStats.js"

**Output**
The results will be output both into a csv file and into standard output.
