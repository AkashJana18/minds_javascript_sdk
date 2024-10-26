// types.d.ts

// Declaration of the APIClient class with methods for handling HTTP requests
declare class APIClient {
    constructor(apiKey: string, baseUrl?: string);

    get(url: string): Promise<object>;
    post(url: string, data: object): Promise<object>;
    patch(url: string, data: object): Promise<object>;
    delete(url: string): Promise<object>;

    private _headers(): object;
    private _handleResponse(response: object): object;
    private _handleError(error: object): void;
}

export default APIClient;

// Declaration of the Client class that aggregates various services
import MindsService from '../services/MindsService';
import DatasourcesService from '../services/DatasourcesService';

declare class Client {
    constructor(apiKey: string, baseUrl?: string);

    api: APIClient;
    minds: MindsService;
    datasources: DatasourcesService;
}

export default Client;

// Declaration of the DatasourcesService class for managing datasources
import Datasource from './Datasource';

declare class DatasourcesService {
    constructor(api: any);

    create(dsConfig: object, replace?: boolean): Promise<Datasource>;
    list(): Promise<Datasource[]>;
    get(name: string): Promise<Datasource>;
    drop(name: string): Promise<void>;
}

export default DatasourcesService;

// Declaration of the MindsService class for managing minds
import Mind from './Mind';

declare class MindsService {
    constructor(api: any);

    list(): Promise<Mind[]>;
    get(name: string): Promise<Mind>;
    create(
        name: string,
        options?: {
            modelName?: string;
            provider?: string;
            promptTemplate?: string;
            datasources?: string[];
            parameters?: object;
            replace?: boolean;
        }
    ): Promise<Mind>;
    drop(name: string): Promise<void>;
}

export default MindsService;
