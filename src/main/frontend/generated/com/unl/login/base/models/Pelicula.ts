import type LinkedList_1 from "../controller/data_struct/list/LinkedList.js";
interface Pelicula {
    id?: number;
    titulo?: string;
    sinopsis?: string;
    duracion?: number;
    imagen?: string;
    trailer?: string;
    fechaEstreno?: string;
    idGenero?: LinkedList_1<number | undefined>;
    idActores?: LinkedList_1<number | undefined>;
    idDirector?: LinkedList_1<number | undefined>;
    idPelicula: unknown;
}
export default Pelicula;
