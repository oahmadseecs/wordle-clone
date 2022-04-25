import { Client } from "../components/Client";

export class InvalidWordError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidWordError';
    }
}

export class FatalError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FatalError';
    }
}

export const guess = async ({ value, gameId, key }) => {
    return Client.post("api/v1/guess/", {
        id: gameId,
        key: key,
        guess: value,
    })
        .then((response) => {
            return response.data;
        })
        .then(data => {
            return {
                results: [...data], isError: false, errorMessage: ""
            }
        })
        .catch((error) => {
            const statusCode = error.response.status;

            if (statusCode === 400) {
                throw new InvalidWordError("Invalid word, please enter a valid word!");
            }
            else if (statusCode === 403) {
                throw new FatalError("This game is already over!");
            }
            else {
                throw new FatalError("Something went wrong!");
            }

        })
        .catch((error) => {
            return {
                results: null, isError: true, error: error
            }
        })
}