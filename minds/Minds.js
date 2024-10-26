class Mind {
    /**
     * Represents a Mind object in MindsDB.
     * @param {Object} params - The parameters for the Mind.
     * @param {string} params.name - The name of the mind.
     * @param {string} params.modelName - The name of the model used by the mind.
     * @param {string} params.provider - The provider of the model.
     * @param {Object} params.parameters - Additional parameters for the mind.
     * @param {Array} params.datasources - List of datasources used by the mind.
     */
    constructor({ name, modelName, provider, parameters, datasources }) {
        this.name = name;
        this.modelName = modelName;
        this.provider = provider;
        this.parameters = parameters;
        this.datasources = datasources;
    }
}

class MindsService {
    constructor(api) {
        this.api = api;
    }

    async list() {
        try {
            const response = await this.api.get('/projects/mindsdb/minds');
            return response.data.map(item => new Mind(item));
        } catch (error) {
            this._handleError(error);
        }
    }

    async get(name) {
        try {
            const response = await this.api.get(`/projects/mindsdb/minds/${name}`);
            return new Mind(response.data);
        } catch (error) {
            this._handleError(error);
        }
    }

    async create(name, options = {}, replace = false) {
        this._validateCreateOptions(name, options);

        if (replace) {
            try {
                await this.get(name);
                await this.drop(name);
            } catch (error) {
                if (error instanceof ObjectNotFound) {
                    // Ignore if the mind doesn't exist
                } else {
                    throw error;
                }
            }
        }

        const { modelName, provider, promptTemplate, datasources, parameters } = options;
        const data = {
            name,
            modelName,
            provider,
            parameters: { ...parameters, promptTemplate },
            datasources
        };

        try {
            await this.api.post('/projects/mindsdb/minds', data);
            return this.get(name);
        } catch (error) {
            this._handleError(error);
        }
    }

    async drop(name) {
        try {
            await this.api.delete(`/projects/mindsdb/minds/${name}`);
        } catch (error) {
            this._handleError(error);
        }
    }

    _handleError(error) {
        if (error.response) {
            // Handle API errors
            throw new ApiError(`API Error: ${error.response.status} - ${error.response.data.message}`);
        }
        throw new Error(`Unexpected Error: ${error.message}`);
    }

    _validateCreateOptions(name, options) {
        if (!name) throw new Error('Name is required');
        if (!options.modelName) throw new Error('Model name is required');
        // Additional validation can be added here
    }
}

export default MindsService;
