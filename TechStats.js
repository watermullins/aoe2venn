const fs = require('fs');

fs.readFile('truedata.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const jsonData = JSON.parse(data);

    let civs = [];
	
	//archer techs
	const techList = ["201","437","219","492","474"];
	const techNames = ["Bracer","Thumbring","Ring Armor","Arbalester","Heavy Cav Archer"];
	const isUnit = [false, false, false, true, true];
	
	/*
	//infantry techs
	const techList = ["75","875","80","567","359"];
	const techNames = ["Blast Furnace","Gambesons","Plate Mail","Champion","Halberdier"];
	const isUnit = [false, false, false, true, true];
	*/
	
	/*
	//cavalry techs
	const techList = ["75","435","80","569","441"];
	const techNames = ["Blast Furnace","Bloodlines","Plate Barding","Paladin","Hussar"];
	const isUnit = [false, false, false, true, true];
	*/

    function checkCivs(techArray) {
        const allCivs = jsonData.techtrees;
        for (const key in allCivs) {
            const civName = key;
            const unitTechs = allCivs[key].units;
			const civTechs = allCivs[key].techs;
            const techStatus = [];

            for (let i = 0; i < techArray.length; i++) { //search in unit techs list
                let found = false;
                for (const unitKey in unitTechs) {
                    const unit = unitTechs[unitKey];
                    if (techArray[i] === unit.id.toString()&&isUnit[i] === true) {
                        found = true;
                        break;
                    }
                }
				for (const techKey in civTechs) { //search in techs list
                    const tech = civTechs[techKey];
                    if (techArray[i] === tech.id.toString() && isUnit[i] === false) {
                        found = true;
                        break;
                    }
                }
                techStatus.push(found);
            }
            civs.push({ name: civName, techStatus: techStatus });
        }
    }

	
   checkCivs(techList);
   
   //formats output as csv, but needs to be pasted into the csv file
   process.stdout.write("Civilization"); //csv header
	for(let i = 0; i < techNames.length; i++){
		process.stdout.write("," + techNames[i]);
	}
	console.log("");
	
   for (const civ of civs) {//csv data
			process.stdout.write(civ.name);
			for(let i = 0; i < techList.length; i++){
				process.stdout.write("," + civ.techStatus[i]);
		}
			console.log("");
	}
});
