**Creating Tech CSVs**

Download TechStats.js and data.json, place in the same folder
Verify Node.js is installed: in command prompt type "Node" if you have it you should see something like Welcome to Node.js v16.16.0.

All you need to change is a set of 3 parallel arrays.For example:

        //monk techs
        	const techList = ["316","231","230"];
        	const techNames = ["Redemption","Sanctity","BlockPrinting"];
        	const isUnit = [false, false, false];
         
techList numbers can be found here: https://halfon.aoe2.se/
techNames is just how you want it displayed. Spacing/caps/spelling don't break it
isUnit change value between true and false

**Running**
1. Open command prompt, cd into program folder
2. run with "Node TechStats.js"
