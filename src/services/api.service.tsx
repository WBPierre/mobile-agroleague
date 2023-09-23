import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_URI } from "@env";
import { IRequest } from "../@types/IRequest";
import { TokenService } from "./token.service";

/**
 * General API instance to generate routes and behaviour
 */
export class ApiService {
    uri: string;
	instance: AxiosInstance;

	constructor(uri: string) {
		this.uri = uri;
        this.instance = axios.create({
			withCredentials: true,
			baseURL: `${API_URI}/api`,
		});
		this.instance.interceptors.request.use(async function(config) {
			const session = await TokenService.getToken();
			if(session !== undefined){
				config.headers.authorization = `Bearer ${JSON.parse(session).token}`;
			}
			return config;
		})

	}

	request({method, uri, body, queryParams, options = {}}: any): Promise<AxiosResponse> {
		let requestObject: IRequest = {
			method: method ? method : 'GET',
			url: `${this.uri}${uri ? uri : ''}`
		}

		if (body) {
			requestObject.data = body;
		}

		if (queryParams) {
			requestObject.params = queryParams;
		}

		if (options) {
			options = {...options, ...options};
		}

		console.log(`[${requestObject.method}] ${requestObject.url} Send`);

		return this.instance(requestObject)
	}

	get(uri: string = "/", queryParams?: any): Promise<AxiosResponse> {
		return this.request({
			method: 'GET',
			queryParams,
		})
	}

	getOne(id: number, queryParams?: any): Promise<AxiosResponse>  {
		return this.request({
			uri: `/${id}`,
			queryParams,
		})
	}

	post(body: any): Promise<AxiosResponse> {
		return this.request({
			method: 'POST',
			body,
		})
	}

	put(uri: string, body: any): Promise<AxiosResponse> {
		return this.request({
			method: 'PUT',
			uri,
			body
		})
	}

	delete(id: number): Promise<AxiosResponse> {
		return this.request({
			method: 'DELETE',
			uri: `/${id}`
		});
	}
}

