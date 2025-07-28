import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type LinkedList_1 from "./com/unl/login/base/controller/data_struct/list/LinkedList.js";
import type Director_1 from "./com/unl/login/base/models/Director.js";
import client_1 from "./connect-client.default.js";
async function createDirector_1(nombre: string | undefined, anioCarrera: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("DirectorService", "createDirector", { nombre, anioCarrera }, init); }
async function delete_1(id: number | undefined, init?: EndpointRequestInit_1): Promise<boolean | undefined> { return client_1.call("DirectorService", "delete", { id }, init); }
async function list_1(init?: EndpointRequestInit_1): Promise<LinkedList_1<Director_1 | undefined> | undefined> { return client_1.call("DirectorService", "list", {}, init); }
async function order_1(attribute: string | undefined, type: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Record<string, string | undefined> | undefined> | undefined> { return client_1.call("DirectorService", "order", { attribute, type }, init); }
async function search_1(attribute: string | undefined, text: string | undefined, type: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Record<string, string | undefined> | undefined> | undefined> { return client_1.call("DirectorService", "search", { attribute, text, type }, init); }
async function updateDirector_1(idDirector: number | undefined, nombre: string | undefined, anioCarrera: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("DirectorService", "updateDirector", { idDirector, nombre, anioCarrera }, init); }
export { createDirector_1 as createDirector, delete_1 as delete, list_1 as list, order_1 as order, search_1 as search, updateDirector_1 as updateDirector };
