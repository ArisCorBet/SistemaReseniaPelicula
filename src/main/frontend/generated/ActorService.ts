import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type LinkedList_1 from "./com/unl/login/base/controller/data_struct/list/LinkedList.js";
import type Actor_1 from "./com/unl/login/base/models/Actor.js";
import client_1 from "./connect-client.default.js";
async function createActor_1(nombre: string | undefined, anioCarrera: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ActorService", "createActor", { nombre, anioCarrera }, init); }
async function delete_1(id: number | undefined, init?: EndpointRequestInit_1): Promise<boolean | undefined> { return client_1.call("ActorService", "delete", { id }, init); }
async function list_1(init?: EndpointRequestInit_1): Promise<LinkedList_1<Actor_1 | undefined> | undefined> { return client_1.call("ActorService", "list", {}, init); }
async function listAll_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("ActorService", "listAll", {}, init); }
async function order_1(attribute: string | undefined, type: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Record<string, string | undefined> | undefined> | undefined> { return client_1.call("ActorService", "order", { attribute, type }, init); }
async function search_1(attribute: string | undefined, text: string | undefined, type: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Record<string, string | undefined> | undefined> | undefined> { return client_1.call("ActorService", "search", { attribute, text, type }, init); }
async function updateActor_1(idActor: number | undefined, nombre: string | undefined, anioCarrera: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ActorService", "updateActor", { idActor, nombre, anioCarrera }, init); }
export { createActor_1 as createActor, delete_1 as delete, list_1 as list, listAll_1 as listAll, order_1 as order, search_1 as search, updateActor_1 as updateActor };
