# MindsDB Javascript SDK
This SDK provides a JavaScript interface for interacting with MindsDB, making it easy to manage minds, datasources, and perform queries through MindsDB's REST API. It simplifies API calls, manages errors, and provides an intuitive interface for creating, listing, updating, and deleting minds and datasources.

### Features
1. **Minds Management**: Create, retrieve, list, and delete MindsDB minds.
2. **Datasources Management**: Set up, retrieve, list, and remove datasources.
3. **API Interaction Handling**: Easy-to-use methods for common HTTP operations (GET, POST, PATCH, DELETE).
4. **Error Handling**: Custom error handling for common HTTP status responses (e.g., 404 Not Found, 403 Forbidden, 401 Unauthorized, and generic server errors).


---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Testing](#testing)
   1. [Testing Setup](#testing-setup)
   2. [Mock Utilities](#mock-utilities)
   3. [Test Coverage](#test-coverage)
4. [Test Suite Details](#test-suite-details)
   1. [Client Tests](#client-tests)
   2. [Datasources Service Tests](#datasources-service-tests)
   3. [Minds Service Tests](#minds-service-tests)
5. [Contributing](#contributing)
6. [License](#license)

--- 
## Installation

Install the SDK using npm:

```bash
npm install minds-js-sdk
```

## Usage

The guide below provides details on initializing and managing minds and datasources with the SDK.

### 1. Initializing the SDK

To use the SDK, import the `Client` class and create an instance with your MindsDB API key:

```javascript
import Client from 'minds-js-sdk';

// Initialize the MindsDB client
const client = new Client('YOUR_API_KEY');
```
---
### 2. Managing Minds

The SDK allows you to configure and interact with "minds" — AI models linked with datasources and prompts.

#### Create a Mind

Set up a new mind with a unique name, model details, linked datasources, and a prompt:

```javascript
const mind = await client.minds.create('my_mind', {
    modelName: 'gpt-3',
    provider: 'OpenAI',
    datasources: ['datasource1', 'datasource2'],
    promptTemplate: 'You are a coding assistant',
});
console.log('Mind created:', mind);
```

#### List Minds

Retrieve a list of all minds associated with your account:

```javascript
const minds = await client.minds.list();
console.log('Available minds:', minds);
```

#### Retrieve a Specific Mind

Access details of a specific mind by its name:

```javascript
const mind = await client.minds.get('my_mind');
console.log('Mind details:', mind);
```

#### Delete a Mind

Delete an existing mind by providing its name:

```javascript
await client.minds.drop('my_mind');
console.log('Mind deleted');
```

---

### 3. Managing Datasources

The SDK also allows for seamless management of datasources.

#### Create a Datasource

Add a datasource by specifying its configuration, which includes connection details and tables:

```javascript
const datasourceConfig = {
    name: 'my_datasource',
    engine: 'postgres',
    description: 'Sample Postgres datasource',
    connectionData: {
        user: 'demo_user',
        password: 'demo_password',
        host: 'samples.mindsdb.com',
        port: 5432,
        database: 'demo',
        schema: 'demo_data',
    },
    tables: ['table1', 'table2'],
};

const datasource = await client.datasources.create(datasourceConfig);
console.log('Datasource created:', datasource);
```

#### List Datasources

Get a list of all datasources available with your MindsDB account:

```javascript
const datasources = await client.datasources.list();
console.log('Available datasources:', datasources);
```

#### Retrieve a Specific Datasource

Fetch the details of a particular datasource by name:

```javascript
const datasource = await client.datasources.get('my_datasource');
console.log('Datasource details:', datasource);
```

#### Delete a Datasource

Remove a datasource by specifying its name:

```javascript
await client.datasources.drop('my_datasource');
console.log('Datasource deleted');
```

---

### Notes

- **Error Handling:** The SDK handles API errors internally, enabling better error management.
- **Asynchronous API:** All SDK methods return promises, allowing you to use `async/await` for smoother asynchronous handling.

## Testing

The testing suite uses [Jest](https://jestjs.io/) for unit testing and [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) to mock HTTP requests.

### Testing Setup

- **Dependencies**:
  - Ensure Jest and Axios are installed. Run `npm install jest axios axios-mock-adapter` if they’re not already in `package.json`.
- **Scripts**:
  - Run all tests with:
    ```bash
    npm test
    ```

### Mock Utilities

The project includes a set of centralized mock utility functions to streamline testing and improve code readability. These functions are located in `mock.test.js` and include:

- `mockGet` - Mocks a successful `GET` request.
- `mockPost` - Mocks a successful `POST` request.
- `mockDelete` - Mocks a successful `DELETE` request.
- `mockError` - Mocks a failed request with a specific status and error message.

### Test Coverage

You can generate a test coverage report to ensure adequate test coverage:
```bash
npm test -- --coverage
```
The report will be in the `coverage/` folder. You can open `coverage/lcov-report/index.html` to view a detailed report in your browser.

## Test Suite Details

### Client Tests (`client.test.js`)

This test file verifies that the `APIClient` service can handle successful and error responses properly. Each endpoint is tested with specific HTTP responses.

#### Test Cases:

- **Successful GET request**:
  - Checks if `APIClient.get()` returns the expected response data.
- **Error handling**:
  - Verifies if `APIClient` throws specific exceptions (`ObjectNotFound`, `Forbidden`, `Unauthorized`, `UnknownError`) based on HTTP error codes like `404`, `403`, `401`, and `500`.

### Datasources Service Tests (`dataservice.test.js`)

The `dataservice.test.js` file tests the `DatasourcesService` class for managing data sources in the project. Using `mockGet`, `mockPost`, and `mockDelete` from `mock.test.js`, each service method is tested for correctness and error handling.

#### Test Cases:

- **Creating a Datasource**:
  - Tests if `create()` properly posts data to `/datasources` and returns the expected object.
- **Listing Datasources**:
  - Uses `mockGet` to simulate fetching an array of datasources.
- **Getting a Datasource by Name**:
  - Uses `mockGet` to fetch a single datasource by its name.
- **Deleting a Datasource**:
  - Simulates a successful deletion using `mockDelete`.
- **Handling Unsupported Datasource Types**:
  - Tests if an unsupported datasource type throws an `ObjectNotSupported` error.

### Minds Service Tests (`minds.test.js`)

The `minds.test.js` file focuses on `MindsService`, which manages "minds" (models) in the system. These tests use the same `mock.test.js` utility functions.

#### Test Cases:

- **Creating a Mind**:
  - Uses `mockPost` to test if `create()` correctly posts data and returns the created mind.
- **Listing Minds**:
  - Uses `mockGet` to simulate listing all available minds.
- **Getting a Mind by Name**:
  - Simulates fetching a mind by name and verifies the correct return data.
- **Deleting a Mind**:
  - Uses `mockDelete` to test deletion functionality.
- **Handling Creation Error**:
  - Uses `mockError` to test if an error during mind creation is handled correctly and throws the appropriate error message.

## Contributing

If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a new Pull Request.

Ensure your code follows the existing code style and passes all tests before submitting.
