import { _getPropertyModel as _getPropertyModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type ReseniaPelicula_1 from "./ReseniaPelicula.js";
class ReseniaPeliculaModel<T extends ReseniaPelicula_1 = ReseniaPelicula_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(ReseniaPeliculaModel);
    get id(): NumberModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get idPelicula(): NumberModel_1 {
        return this[_getPropertyModel_1]("idPelicula", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get resenia(): StringModel_1 {
        return this[_getPropertyModel_1]("resenia", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get puntuacion(): NumberModel_1 {
        return this[_getPropertyModel_1]("puntuacion", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "float" } }));
    }
    get fechaResenia(): StringModel_1 {
        return this[_getPropertyModel_1]("fechaResenia", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.util.Date" } }));
    }
    get autor(): StringModel_1 {
        return this[_getPropertyModel_1]("autor", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
}
export default ReseniaPeliculaModel;
