require = require('esm')(module); // allows us to read es6 files
const helpers = require('./helpers');
const fs = require('fs');

const parsePlugins = () => {

	// note this doesn't yet validate the bundle for valid exports. For that, perhaps convert this script to TS? Seems
	// reasonable.
	let dataTypeList = [];
	helpers.getDataTypes().map((i) => {
		const key = i.folder;
		const file = `${i.folderPath}/bundle.ts`;
		if (fs.existsSync(file)) {
			dataTypeList.push(key);
		}
	});

	// 1. Data Types
	// --- List of Data Types, plus TS Type
	let content = `export type DataType = '${dataTypeList.join('\' | \'')}';\n`;

	// --- Meta info for each valid Data Type
	const dtLines = helpers.getDataTypes().map((i) => (
		`\t{ name: '${i.name}', folder: '${i.folder}', fieldGroup: '${i.fieldGroup}', fieldGroupOrder: ${i.fieldGroupOrder}, processOrder: ${i.processOrder} }`
	));
	content += `export const dataTypes = [\n${dtLines.join(',\n')}\n];\n\n`

	// 2. Export Types

	
	helpers.createBuildFile('plugins.ts', content);
};

parsePlugins();


// require = require('esm')(module); // allows us to read es6 files
// const helpers = require('./helpers');

// // const processDataTypes = () => {
// // 	const data = helpers.getDataTypes().map((i) => ({
// // 		name: i.name,
// // 		folder: i.folder,
// // 		fieldGroup: i.fieldGroup,
// // 		fieldGroupOrder: i.fieldGroupOrder,
// // 		processOrder: i.processOrder
// // 	}));

// // 	helpers.createBuildFile('dataTypeConfig.ts', `export default ${JSON.stringify(data, null, '\t')};`);
// // };

// const processExportTypes = () => {
// 	const data = helpers.getExportTypes().map((i) => ({
// 		name: i.name,
// 		folder: i.folder
// 	}));

// 	helpers.createBuildFile('exportTypeConfig.ts', `export default ${JSON.stringify(data, null, '\t')};`);
// };

// processDataTypes();
// processExportTypes();
