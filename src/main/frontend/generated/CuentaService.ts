import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
import type Authentication_1 from "./org/springframework/security/core/Authentication.js";
async function CreateRoles_1(init?: EndpointRequestInit_1): Promise<Record<string, string | undefined> | undefined> { return client_1.call("CuentaService", "CreateRoles", {}, init); }
async function createCuenta_1(correo: string | undefined, contrasenia: string | undefined, idPersona: number | undefined, estado: boolean, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("CuentaService", "createCuenta", { correo, contrasenia, idPersona, estado }, init); }
async function getAuthentication_1(init?: EndpointRequestInit_1): Promise<Authentication_1 | undefined> { return client_1.call("CuentaService", "getAuthentication", {}, init); }
async function isLogin_1(init?: EndpointRequestInit_1): Promise<boolean | undefined> { return client_1.call("CuentaService", "isLogin", {}, init); }
async function listAll_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CuentaService", "listAll", {}, init); }
async function login_1(correo: string | undefined, contrasenia: string | undefined, init?: EndpointRequestInit_1): Promise<Record<string, unknown> | undefined> { return client_1.call("CuentaService", "login", { correo, contrasenia }, init); }
async function longout_1(init?: EndpointRequestInit_1): Promise<Record<string, string | undefined> | undefined> { return client_1.call("CuentaService", "longout", {}, init); }
export { createCuenta_1 as createCuenta, CreateRoles_1 as CreateRoles, getAuthentication_1 as getAuthentication, isLogin_1 as isLogin, listAll_1 as listAll, login_1 as login, longout_1 as longout };
