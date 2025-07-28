import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type LinkedList_1 from "./com/unl/login/base/controller/data_struct/list/LinkedList.js";
import type Genero_1 from "./com/unl/login/base/models/Genero.js";
import client_1 from "./connect-client.default.js";
async function createGenero_1(Nombre: string | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("GeneroService", "createGenero", { Nombre }, init); }
async function delete_1(id: number | undefined, init?: EndpointRequestInit_1): Promise<boolean | undefined> { return client_1.call("GeneroService", "delete", { id }, init); }
async function list_1(init?: EndpointRequestInit_1): Promise<LinkedList_1<Genero_1 | undefined> | undefined> { return client_1.call("GeneroService", "list", {}, init); }
async function listAll_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("GeneroService", "listAll", {}, init); }
async function order_1(attribute: string | undefined, type: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Record<string, string | undefined> | undefined> | undefined> { return client_1.call("GeneroService", "order", { attribute, type }, init); }
async function search_1(attribute: string | undefined, text: string | undefined, type: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Record<string, string | undefined> | undefined> | undefined> { return client_1.call("GeneroService", "search", { attribute, text, type }, init); }
async function updateGenero_1(idGenero: number | undefined, Nombre: string | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("GeneroService", "updateGenero", { idGenero, Nombre }, init); }
export { createGenero_1 as createGenero, delete_1 as delete, list_1 as list, listAll_1 as listAll, order_1 as order, search_1 as search, updateGenero_1 as updateGenero };
