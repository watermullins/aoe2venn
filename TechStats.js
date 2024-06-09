const fs = require('fs');
const Papa = require('papaparse');

fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const jsonData = JSON.parse(data);

    let civs = [];

	//archer techs
	const techList = ["75","435","80","569","441"];
	const techNames = ["Blast Furnace","Bloodlines","Plate Barding","Paladin","Hussar"];
	const isUnit = [false, false, false, true, true];


    function checkCivs(techArray) {
        const allCivs = jsonData.techtrees;
        for (const key in allCivs) {
            const civName = key;
            const unitTechs = allCivs[key].units;
            const civTechs = allCivs[key].techs;
            const techStatus = [];

            for (let i = 0; i < techArray.length; i++) { 
                let found = false;
                for (const unitKey in unitTechs) {
                    const unit = unitTechs[unitKey];
                    if (techArray[i] === unit.id.toString() && isUnit[i] === true) {
                        found = true;
                        break;
                    }
                }
                for (const techKey in civTechs) { 
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

    //write to csv
    let csvContent = "Civilization"; // csv header
    for (let i = 0; i < techNames.length; i++) {
        csvContent += "," + techNames[i];
    }
    csvContent += "\n";

    for (const civ of civs) {
        csvContent += civ.name;
        for (let i = 0; i < techList.length; i++) {
            csvContent += "," + civ.techStatus[i];
        }
        csvContent += "\n";
    }

    fs.writeFile('techs.csv', csvContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Data has been written to techs.csv');
    });
});

fs.readFile('techs.csv', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    Papa.parse(data, {
        header: true,
        complete: function(results) {
            const civilizations = results.data;
            const categories = categorizeCivs(civilizations);
            displayCategories(categories);
        }
    });
});

function categorizeCivs(civs) {
    const categories = {};

    civs.forEach(civ => {
        const techs = Object.keys(civ).filter(key => key !== 'Civilization');
        let hasTech = '';
        let doesntHaveTech = '';

        techs.forEach(tech => {
            if (civ[tech].toLowerCase() === 'true') {
                hasTech += `${tech} `;
            } else {
                doesntHaveTech += `${tech} `;
            }
        });

        const key = `${hasTech}-${doesntHaveTech}`;
        if (!categories[key]) {
            categories[key] = [];
        }
        categories[key].push(civ.Civilization);
    });

    return categories;
}

function displayCategories(categories) {
    for (const [key, civNames] of Object.entries(categories)) {
        const techs = key.split('-');
        techs[0].split(', ').forEach(tech => process.stdout.write(` ${tech}:`));
		console.log("");
		 process.stdout.write('     ');
        civNames.forEach(civ => process.stdout.write(`${civ} `));
        console.log('\n');
    }
}

