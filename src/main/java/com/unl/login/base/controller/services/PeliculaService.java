package com.unl.login.base.controller.services;

import com.unl.login.base.controller.dao.dao_models.DaoActor;
import com.unl.login.base.controller.dao.dao_models.DaoDirector;
import com.unl.login.base.controller.dao.dao_models.DaoGenero;
import com.unl.login.base.controller.dao.dao_models.DaoPelicula;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Actor;
import com.unl.login.base.models.Director;
import com.unl.login.base.models.Genero;
import com.unl.login.base.models.Pelicula;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.text.SimpleDateFormat;
import java.util.*;

@BrowserCallable
@AnonymousAllowed
public class PeliculaService {
    private DaoPelicula dp;
    private DaoActor da;
    private DaoDirector dd;
    private DaoGenero dg;

    public PeliculaService() {
        this.dp = new DaoPelicula();
        this.da = new DaoActor();
        this.dd = new DaoDirector();
        this.dg = new DaoGenero();
    }

    public void createPelicula(
            @NotEmpty String titulo,
            @NotEmpty String sinopsis,
            @Min(1) Integer duracion,
            @NotEmpty String trailer,
            @NotNull Date fechaEstreno,
            @NotNull String imagen,
            @NotEmpty List<Integer> generosIds,
            @NotEmpty List<Integer> directoresIds,
            @NotEmpty List<Integer> actoresIds) throws Exception {
        if (titulo.trim().length() > 0 && sinopsis.trim().length() > 0 && trailer.trim().length() > 0 &&
                duracion != null && duracion > 0 && imagen.trim().length() > 0) {
            // Validación de IDs
            if (generosIds.stream().anyMatch(id -> id <= 0) || directoresIds.stream().anyMatch(id -> id <= 0) || actoresIds.stream().anyMatch(id -> id <= 0)) {
                throw new IllegalArgumentException("Los IDs deben ser números positivos");
            }

            Pelicula pelicula = new Pelicula();
            pelicula.setTitulo(titulo);
            pelicula.setSinopsis(sinopsis);
            pelicula.setDuracion(duracion);
            pelicula.setTrailer(trailer);
            pelicula.setFechaEstreno(fechaEstreno);
            pelicula.setImagen(imagen);

            // Agregar relaciones (valida duplicados internamente)
            generosIds.forEach(pelicula::agregarGenero);
            directoresIds.forEach(pelicula::agregarDirector);
            actoresIds.forEach(pelicula::agregarActor);
            dp.setObj(pelicula);
            if (!dp.save(pelicula)) {
                throw new Exception("Error al guardar la película");
            }
            System.out.println("Datos recibidos para nueva película:");
            System.out.println("Título: " + titulo);
            System.out.println("Imagen: " + imagen);  // Verifica que llega correctamente
            System.out.println("Fecha: " + fechaEstreno);

            // Antes de guardar
            System.out.println("Datos a guardar - Imagen: " + pelicula.getImagen());
            System.out.println("Generos: " + generosIds);
            System.out.println("Actores: " + actoresIds);
            System.out.println("Directores: " + directoresIds);
        }

    }

    private LinkedList<Integer> convertToLinkedList(List<Integer> list) {
        LinkedList<Integer> linkedList = new LinkedList<>();
        list.forEach(linkedList::add);
        return linkedList;
    }
    public void updatePelicula(Integer id, @NotEmpty String titulo, @NotEmpty String sinopsis, Integer duracion,
                                @NotEmpty String trailer, Date fechaEstreno, Integer idGenero, Integer idDirector, Integer idActor) throws Exception {
        if (titulo.trim().length() > 0 && sinopsis.trim().length() > 0 && trailer.trim().length() > 0 &&
                duracion != null && duracion > 0 && idGenero != null && idGenero > 0 && idActor > 0 && idDirector > 0 ) {

            Pelicula pelicula = dp.listAll().get(id - 1);
            pelicula.setTitulo(titulo);
            pelicula.setSinopsis(sinopsis);
            pelicula.setDuracion(duracion);
            pelicula.setTrailer(trailer);
            pelicula.setFechaEstreno(fechaEstreno);

            LinkedList<Integer> generoList = new LinkedList<>();
            generoList.add(idGenero);
            pelicula.setIdGenero(generoList);
            LinkedList<Integer> directorList = new LinkedList<>();
            directorList.add(idDirector);
            pelicula.setIdDirector(directorList);
            LinkedList<Integer> actorList = new LinkedList<>();
            actorList.add(idActor);
            pelicula.setIdActores(actorList);

            dp.setObj(pelicula);
            if (!dp.updatePorId(id)) {
                throw new Exception("No se pudo actualizar la Película.");
            }
        }
    }

    public List<HashMap> listPelicula() {
        List<HashMap> lista = new ArrayList<>();
        if (!dp.listAll().isEmpty()) {
            Pelicula[] arreglo = dp.listAll().toArray();

            for (Pelicula p : arreglo) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", String.valueOf(p.getId()));
                aux.put("titulo", p.getTitulo());
                aux.put("sinopsis", p.getSinopsis());
                aux.put("duracion", String.valueOf(p.getDuracion()));
                aux.put("trailer", p.getTrailer());
                aux.put("fechaEstreno", String.valueOf(p.getFechaEstreno()));
                aux.put("idGenero", p.getIdGenero() != null ? p.getIdGenero().toString() : "");
                aux.put("idActor", p.getIdActores() != null ? p.getIdActores().toString() : "");
                aux.put("idDirector", p.getIdDirector() != null ? p.getIdDirector().toString() : "");

                lista.add(aux);
            }
        }
        return lista;
    }

    public List<HashMap> listaGeneroCombo() {
        List<HashMap> lista = new ArrayList<>();
        DaoGenero dg = new DaoGenero();
        if (!dg.listAll().isEmpty()) {
            Genero[] arreglo = dg.listAll().toArray();
            for (Genero g : arreglo) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", g.getIdGenero().toString());
                aux.put("label", g.getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }

    public List<HashMap> listaDirectorCombo() {
        List<HashMap> lista = new ArrayList<>();
        DaoDirector dg = new DaoDirector();
        if (!dg.listAll().isEmpty()) {
            Director[] arreglo = dg.listAll().toArray();
            for (Director g : arreglo) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", g.getIdDirector().toString());
                aux.put("label", g.getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }

    public List<HashMap> listaActorCombo() {
        List<HashMap> lista = new ArrayList<>();
        DaoActor dg = new DaoActor();
        if (!dg.listAll().isEmpty()) {
            Actor[] arreglo = dg.listAll().toArray();
            for (Actor g : arreglo) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", g.getIdActor().toString());
                aux.put("label", g.getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }


    public List<HashMap> listAll() throws Exception {
        return Arrays.asList(dp.all().toArray());
    }

    public List<HashMap> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, Object>> lista = dp.search(attribute, text, type);
        return lista.isEmpty() ? new ArrayList<>() : Arrays.asList(lista.toArray());
    }

    public List<HashMap> order(String attribute, Integer type) throws Exception {
        return Arrays.asList(dp.orderByPelicula(type, attribute).toArray());
    }

    public LinkedList<Pelicula> getPeliculas() {
        return dp.listAll();
    }
    //GESTION DE IDS
    //VISTAS
    public List<Map<String, Object>> listPeliculasVista() {
        List<Map<String, Object>> resultado = new ArrayList<>();

        // Obtener todas las listas necesarias
        LinkedList<Pelicula> peliculas = dp.listAll();
        LinkedList<Genero> generos = dg.listAll();
        LinkedList<Actor> actores = da.listAll();
        LinkedList<Director> directores = dd.listAll();

        for (Pelicula peli : peliculas.toArray()) {
            Map<String, Object> peliculaMap = new HashMap<>();
            peliculaMap.put("id", peli.getId());
            peliculaMap.put("titulo", peli.getTitulo());
            peliculaMap.put("sinopsis", peli.getSinopsis());
            peliculaMap.put("duracion", peli.getDuracion() + " min");
            peliculaMap.put("fechaEstreno", formatDate(peli.getFechaEstreno()));
            peliculaMap.put("imagen",peli.getImagen());
            peliculaMap.put("trailer", peli.getTrailer());

            // Convertir IDs a nombres
            peliculaMap.put("generos", obtenerNombres(peli.getIdGenero(), generos));
            peliculaMap.put("actores", obtenerNombres(peli.getIdActores(), actores));
            peliculaMap.put("directores", obtenerNombres(peli.getIdDirector(), directores));

            resultado.add(peliculaMap);
        }

        return resultado;
    }

    private static String formatDate(Date date) {
        if (date == null) return "";
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        return sdf.format(date);
    }
    private List<String> obtenerNombres(LinkedList<Integer> ids, LinkedList<?> listaEntidades) {
        List<String> nombres = new ArrayList<>();
        if (ids == null || listaEntidades == null) return nombres;

        for (Integer id : ids.toArray()) {
            for (Object entidad : listaEntidades.toArray()) {
                if (entidad instanceof Genero && ((Genero)entidad).getIdGenero().equals(id)) {
                    nombres.add(((Genero)entidad).getNombre());
                } else if (entidad instanceof Actor && ((Actor)entidad).getIdActor().equals(id)) {
                    nombres.add(((Actor)entidad).getNombre());
                } else if (entidad instanceof Director && ((Director)entidad).getIdDirector().equals(id)) {
                    nombres.add(((Director)entidad).getNombre());
                }
            }
        }
        return nombres;
    }

    public static void main(String[] args) {
        PeliculaService service = new PeliculaService();
        System.out.println(service.listPeliculasVista());
    }
}
