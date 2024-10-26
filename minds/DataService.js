
import { ObjectNotFound, ObjectNotSupported } from './ExceptionHandling';

/**
 * Represents a Datasource object in MindsDB.
 */
export class Datasource {
    /**
     * @param {Object} params - The parameters for the Datasource.
     * @param {string} params.name - The name of the datasource.
     * @param {string} params.engine - The database engine type (e.g., 'postgres', 'mysql').
     * @param {string} params.description - A description of the datasource.
     * @param {Object} params.connectionData - The connection data for the datasource.
     * @param {Array} params.tables - A list of tables available in the datasource.
     */
    constructor({ name, engine, description, connectionData = {}, tables = [] }) {
        this.name = name;
        this.engine = engine;
        this.description = description;
        this.connectionData = connectionData;
        this.tables = tables;
    }

    /**
     * Validates that the required properties for the datasource are present.
     * @throws {Error} if validation fails.
     */
    validate() {
        if (!this.name || !this.engine || !this.connectionData) {
            throw new Error('Datasource must have a name, engine, and connection data.');
        }
    }
}

/**
 * Service for managing Datasources.
 */
export class DatasourcesService {
    /**
     * @param {Object} api - The API client instance.
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Create a new datasource.
     * @param {Object} dsConfig - The configuration for the datasource.
     * @param {boolean} [replace=false] - Whether to replace an existing datasource.
     * @returns {Promise<Datasource>} - The created Datasource.
     * @throws {ObjectNotFound} - If the datasource to replace does not exist.
     * @throws {Error} - If creation fails or validation fails.
     */
    async create(dsConfig, replace = false) {
        const datasource = new Datasource(dsConfig);

        // Validate the datasource configuration
        datasource.validate();

        // If replace is true, try to delete the existing datasource
        if (replace) {
            try {
                await this.get(datasource.name);  // Check if it exists
                await this.drop(datasource.name); // Drop it if it exists
            } catch (error) {
                if (!(error instanceof ObjectNotFound)) {
                    throw error;
                }
            }
        }

        // Create the new datasource via API
        await this.api.post('/datasources', dsConfig);
        return this.get(datasource.name);
    }

    /**
     * List all datasources.
     * @returns {Promise<Datasource[]>} - An array of Datasources.
     */
    async list() {
        const response = await this.api.get('/datasources');
        const data = response.data || [];
        
        // Return only SQL-based datasources
        return data
            .filter(item => item.engine) // Filter out non-SQL datasources
            .map(item => new Datasource(item)); // Map to Datasource objects
    }

    /**
     * Get a datasource by name.
     * @param {string} name - The name of the datasource.
     * @returns {Promise<Datasource>} - The requested Datasource.
     * @throws {ObjectNotSupported} - If the datasource type is not supported.
     */
    async get(name) {
        const response = await this.api.get(`/datasources/${name}`);
        const data = response.data;

        if (!data.engine) {
            throw new ObjectNotSupported(`Unsupported datasource type: ${name}`);
        }

        return new Datasource(data);
    }

    /**
     * Drop (delete) a datasource by name.
     * @param {string} name - The name of the datasource to delete.
     * @returns {Promise<void>}
     */
    async drop(name) {
        await this.api.delete(`/datasources/${name}`);
    }
}
