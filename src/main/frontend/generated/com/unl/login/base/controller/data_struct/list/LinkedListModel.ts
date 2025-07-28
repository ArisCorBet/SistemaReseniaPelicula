import { _getPropertyModel as _getPropertyModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1 } from "@vaadin/hilla-lit-form";
import type LinkedList_1 from "./LinkedList.js";
class LinkedListModel<T extends LinkedList_1 = LinkedList_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(LinkedListModel);
    get length(): NumberModel_1 {
        return this[_getPropertyModel_1]("length", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Integer" } }));
    }
    get empty(): BooleanModel_1 {
        return this[_getPropertyModel_1]("empty", (parent, key) => new BooleanModel_1(parent, key, true, { meta: { javaType: "java.lang.Boolean" } }));
    }
}
export default LinkedListModel;
