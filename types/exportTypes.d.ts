import { BuilderLayout } from '../src/core/builder/Builder.component';
import { ColumnData } from '~types/general';
import { ExportTypeFolder } from '../src/_plugins';
import { CountryMap } from '~types/countries';
import { DataTypeMap } from '~types/dataTypes';

export type ExportTypeMap = {
	[exportType in ExportTypeFolder]?: string;
};

export type ETBundle = {
	initialState: any; // TODO generics
	getCodeMirrorMode: (settings: any) => string; // TODO generics - data is same type as initialState
	Settings?: any;
	getExportTypeLabel?: (data: any) => string; // TODO generics - data is same type as initialState
};

export type ETDefinition = {
	name: string;
	schema: any;
	codeMirrorModes: string[];
};

export type ETSettings = {
	onUpdate: Function; // from container
	data: any; // from store
	id: string;
	layout: BuilderLayout;
	i18n: any;
	coreI18n: object;
};

export type ETMessageData = {
	action: 'generate' | 'pause' | 'continue' | 'abort';
	columns: ColumnData[];
	rows: any[];
	isFirstBatch: boolean;
	isLastBatch: boolean;
	dataTypeMetadata: any; // TODO
	settings: any; // TODO generic possible? This is the export type settings
	stripWhitespace: boolean;
	rowState: any;
	workerResources: {
		workerUtils: string;
		exportTypes: ExportTypeMap;
		dataTypes: DataTypeMap;
		countries: CountryMap;
	};
};

interface ETOnMessage extends MessageEvent {
	data: ETMessageData
}
