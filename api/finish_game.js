import { Client } from "../components/Client";

export const finish_game = async ({ gameId, gameKey }) => {
    return Client.post("api/v1/finish_game/", {
        id: gameId,
        key: gameKey
    })
        .then((response) => {
            return response.data;
        })
        .then(data => {
            return {
                answer: data.answer, isError: false, errorMessage: ""
            }
        })
        .catch((error) => {
            return {
                isError: true, errorMessage: error.message
            }
        })
}