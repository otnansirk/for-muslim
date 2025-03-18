import Dotenv from "./Dotenv";

type RequestOptionsType = {
    path: string;
    body?: Record<string, string>;
    query?: Record<string, string>;
    headers?: Record<string, string>;
}

class Request {

    private static async api(method: "GET" | "POST" | "DELETE", options: RequestOptionsType) {
        const url = new URL(Dotenv.api_url + options.path);
        url.search = new URLSearchParams(options.query).toString();

        const response = await fetch(url.toString(), {
            method: method,
            headers: {
                "xid": Dotenv.api_key
            },
            mode: "cors"
        });

        return response
    }

    static async get(options: RequestOptionsType) {
        return await this.api("GET", options)
    }

    static async post(options: RequestOptionsType) {
        return await this.api("POST", options)
    }
}

export default Request