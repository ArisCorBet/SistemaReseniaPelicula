import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type Resena_1 from "./com/unl/login/base/models/Resena.js";
import client_1 from "./connect-client.default.js";
async function listarPorPelicula_1(idPelicula: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Resena_1 | undefined> | undefined> { return client_1.call("ResenaService", "listarPorPelicula", { idPelicula }, init); }
async function listarPorUsuario_1(idUsuario: number | undefined, init?: EndpointRequestInit_1): Promise<Array<Resena_1 | undefined> | undefined> { return client_1.call("ResenaService", "listarPorUsuario", { idUsuario }, init); }
async function obtenerPromedioPelicula_1(idPelicula: number | undefined, init?: EndpointRequestInit_1): Promise<number | undefined> { return client_1.call("ResenaService", "obtenerPromedioPelicula", { idPelicula }, init); }
export { listarPorPelicula_1 as listarPorPelicula, listarPorUsuario_1 as listarPorUsuario, obtenerPromedioPelicula_1 as obtenerPromedioPelicula };
