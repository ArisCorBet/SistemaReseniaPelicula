import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
async function createGeneroPelicula_1(idPelicula: number | undefined, idGenero: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("GeneroPeliculaService", "createGeneroPelicula", { idPelicula, idGenero }, init); }
async function listGeneroPelicula_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("GeneroPeliculaService", "listGeneroPelicula", {}, init); }
async function listaGeneroCombo_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("GeneroPeliculaService", "listaGeneroCombo", {}, init); }
async function listaPeliculaCombo_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("GeneroPeliculaService", "listaPeliculaCombo", {}, init); }
async function updateGeneroPelicula_1(idGeneroPelicula: number | undefined, idGenero: number | undefined, idPelicula: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("GeneroPeliculaService", "updateGeneroPelicula", { idGeneroPelicula, idGenero, idPelicula }, init); }
export { createGeneroPelicula_1 as createGeneroPelicula, listaGeneroCombo_1 as listaGeneroCombo, listaPeliculaCombo_1 as listaPeliculaCombo, listGeneroPelicula_1 as listGeneroPelicula, updateGeneroPelicula_1 as updateGeneroPelicula };
