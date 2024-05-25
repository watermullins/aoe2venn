const fs = require('fs');
const Papa = require('papaparse');

// Read the CSV file
fs.readFile('infantrytechtext.csv', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the CSV data
    Papa.parse(data, {
        header: true,
        complete: function(results) {
            const civilizations = results.data.map(civ => ({
                Civilization: civ.Civilization,
                BlastFurnace: civ.BlastFurnace.toLowerCase() === 'true',
                Gambesons: civ.Gambesons.toLowerCase() === 'true',
                PlateMail: civ.PlateMail.toLowerCase() === 'true',
                Champion: civ.Champion.toLowerCase() === 'true',
                Halberdier: civ.Halberdier.toLowerCase() === 'true'
            }));
            const categories = categorizeCivs(civilizations);
            displayCategories(categories);
        }
    });
});

function categorizeCivs(civs) {
    const categories = {};

    civs.forEach(civ => {
        let hasTech = '';
        let doesntHaveTech = '';

        if (civ.BlastFurnace) {
            hasTech += 'Blast Furnace, ';
        }

        if (civ.Gambesons) {
            hasTech += 'Gambesons, ';
        } 

        if (civ.PlateMail) {
            hasTech += 'Plate Mail, ';
        } 

        if (civ.Champion) {
            hasTech += 'Champion, ';
        } 

        if (civ.Halberdier) {
            hasTech += 'Halberdier';
        }

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
        civNames.forEach(civ => console.log(`      ${civ}`));
        console.log('');
    }
}
