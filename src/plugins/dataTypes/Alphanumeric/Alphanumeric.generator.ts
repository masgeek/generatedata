import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';

export const generate = ({ rowState }: DTGenerationData): DTGenerateResult => {
	const formats = rowState.split('|');
	let chosenFormat = formats[0];
	if (formats.length > 1) {
		chosenFormat = formats[utils.randomUtils.getRandomNum(0, formats.length - 1)];
	}
	const val = utils.randomUtils.generateRandomAlphanumericStr(chosenFormat);
	return { display: val };
};


let utilsLoaded = false;

const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

export {};
