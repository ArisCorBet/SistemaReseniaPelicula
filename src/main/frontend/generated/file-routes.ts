import { createRoute as createRoute_1 } from "@vaadin/hilla-file-router/runtime.js";
import type { AgnosticRoute as AgnosticRoute_1 } from "@vaadin/hilla-file-router/types.js";
import * as Page_1 from "../views/@index.js";
import * as Layout_1 from "../views/@layout.js";
import * as Page_2 from "../views/actor/ActorView.js";
import * as Page_3 from "../views/director/DirectorView.js";
import * as Page_4 from "../views/genero/GeneroView.js";
import * as Page_5 from "../views/login.js";
import * as Page_6 from "../views/pelicula/PeliculaView.js";
import * as Page_7 from "../views/PerfilView.js";
import * as Page_8 from "../views/resenia/ReseniaView.js";
import * as Page_9 from "../views/Usuario/UsuarioView.js";
const routes: readonly AgnosticRoute_1[] = [
    createRoute_1("", Layout_1, [
        createRoute_1("", Page_1),
        createRoute_1("actor", [
            createRoute_1("ActorView", Page_2)
        ]),
        createRoute_1("director", [
            createRoute_1("DirectorView", Page_3)
        ]),
        createRoute_1("genero", [
            createRoute_1("GeneroView", Page_4)
        ]),
        createRoute_1("login", Page_5),
        createRoute_1("pelicula", [
            createRoute_1("PeliculaView", Page_6)
        ]),
        createRoute_1("PerfilView", Page_7),
        createRoute_1("resenia", [
            createRoute_1("ReseniaView", Page_8)
        ]),
        createRoute_1("Usuario", [
            createRoute_1("UsuarioView", Page_9)
        ])
    ])
];
export default routes;
