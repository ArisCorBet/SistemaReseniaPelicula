import { _getPropertyModel as _getPropertyModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type Resena_1 from "./Resena.js";
class ResenaModel<T extends Resena_1 = Resena_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(ResenaModel);
    get idResena(): NumberModel_1 {
        return this[_getPropertyModel_1]("idResena", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get idPelicula(): NumberModel_1 {
        return this[_getPropertyModel_1]("idPelicula", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get idUsuario(): NumberModel_1 {
        return this[_getPropertyModel_1]("idUsuario", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get calificacion(): NumberModel_1 {
        return this[_getPropertyModel_1]("calificacion", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get comentario(): StringModel_1 {
        return this[_getPropertyModel_1]("comentario", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get fechaCreacion(): StringModel_1 {
        return this[_getPropertyModel_1]("fechaCreacion", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.util.Date" } }));
    }
    get estado(): BooleanModel_1 {
        return this[_getPropertyModel_1]("estado", (parent, key) => new BooleanModel_1(parent, key, true, { meta: { javaType: "java.lang.Boolean" } }));
    }
}
export default ResenaModel;
