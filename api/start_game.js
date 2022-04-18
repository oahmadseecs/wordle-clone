export const start_game = async () => {
    return fetch("http://localhost:5000/api/v1/start_game/", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            wordID: 363
        })
    })
        .then((response) => {
            return response.json();
        })
        .then(data => {
            return {
                ...data, isError: false, errorMessage: ""
            }
        })
        .catch((error) => {
            return {
                isError: true, errorMessage: error.message
            }
        })
}