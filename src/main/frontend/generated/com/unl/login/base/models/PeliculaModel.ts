import { _getPropertyModel as _getPropertyModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import LinkedListModel_1 from "../controller/data_struct/list/LinkedListModel.js";
import type Pelicula_1 from "./Pelicula.js";
class PeliculaModel<T extends Pelicula_1 = Pelicula_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(PeliculaModel);
    get id(): NumberModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get titulo(): StringModel_1 {
        return this[_getPropertyModel_1]("titulo", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get sinopsis(): StringModel_1 {
        return this[_getPropertyModel_1]("sinopsis", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get duracion(): NumberModel_1 {
        return this[_getPropertyModel_1]("duracion", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get imagen(): StringModel_1 {
        return this[_getPropertyModel_1]("imagen", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get trailer(): StringModel_1 {
        return this[_getPropertyModel_1]("trailer", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get fechaEstreno(): StringModel_1 {
        return this[_getPropertyModel_1]("fechaEstreno", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.util.Date" } }));
    }
    get idGenero(): LinkedListModel_1 {
        return this[_getPropertyModel_1]("idGenero", (parent, key) => new LinkedListModel_1(parent, key, true));
    }
    get idActores(): LinkedListModel_1 {
        return this[_getPropertyModel_1]("idActores", (parent, key) => new LinkedListModel_1(parent, key, true));
    }
    get idDirector(): LinkedListModel_1 {
        return this[_getPropertyModel_1]("idDirector", (parent, key) => new LinkedListModel_1(parent, key, true));
    }
    get idPelicula(): ObjectModel_1 {
        return this[_getPropertyModel_1]("idPelicula", (parent, key) => new ObjectModel_1(parent, key, false, { meta: { javaType: "java.lang.Object" } }));
    }
}
export default PeliculaModel;
