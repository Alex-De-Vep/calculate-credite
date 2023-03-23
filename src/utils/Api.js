class Api {
    getData = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/imhuman/test/master/ed.json', {
                method: "GET"
            });

            return response.json();
        } catch (err) {
            throw (err);
        }
    }
}

const api = new Api();

export default api;