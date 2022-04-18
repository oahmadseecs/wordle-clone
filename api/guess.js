export const guess = async ({ value, gameId, key }) => {
    return fetch("http://localhost:5000/api/v1/guess/", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: gameId,
            key: key,
            guess: value,
        })
    })
        .then((response) => {
            const statusCode = response.status;
            if (statusCode === 200) {
                return response.json();
            }
            else if (statusCode === 400) {
                throw new Error("Invalid word, please enter a valid word!");
            }
            else if (statusCode === 403) {
                throw new Error("You have already guessed this word!");
            }
            else {
                throw new Error("Something went wrong!");
            }
        })
        .then(data => {
            return {
                results: [...data], isError: false, errorMessage: ""
            }
        })
        .catch((error) => {
            return {
                results: null, isError: true, errorMessage: error.message
            }
        })
}