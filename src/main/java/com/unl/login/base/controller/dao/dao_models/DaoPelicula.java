package com.unl.login.base.controller.dao.dao_models;

import com.google.gson.Gson;
import com.unl.login.base.controller.Utiles;
import com.unl.login.base.controller.dao.AdapterDao;
import com.unl.login.base.controller.data_struct.list.*;
import com.unl.login.base.models.Actor;
import com.unl.login.base.models.Director;
import com.unl.login.base.models.Pelicula;

import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class DaoPelicula extends AdapterDao<Pelicula> {
    private Pelicula obj;
    private LinkedList lista_director;


    public DaoPelicula() {
        super(Pelicula.class);
    }

    public Pelicula getObj() {
        if (obj == null) {
            this.obj = new Pelicula();
        }
        return this.obj;
    }
    public void setObj(Pelicula obj) {
        this.obj = obj;
    }

    public Boolean save(Pelicula pelicula) throws Exception {
        // Validación de relaciones
        if (!pelicula.tieneRelacionesCompletas()) {
            throw new Exception("La película debe tener al menos un género, actor y director");
        }
        // Generación de ID seguro
        if (pelicula.getId() == null) {
            int nuevoId = obtenerNuevoId();
            pelicula.setId(nuevoId);
        }
        this.persist(pelicula);
        // Persistencia
        return true;
    }

    private int obtenerNuevoId() {
        LinkedList<Pelicula> peliculas = listAll();
        int maxId = 0;
        for (int i = 0; i < peliculas.getLength(); i++) {
            Pelicula p = peliculas.get(i);
            if (p.getId() > maxId) {
                maxId = p.getId();
            }
        }
        return maxId + 1;
    }
    //borrado
    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Boolean updatePorId(int idPelicula) {
        try {
            int pos = obtenerPosicionPorId(idPelicula);
            if (pos >= 0) {
                this.update(obj, pos);
                return true;
            } else {
                System.err.println("Pelicula con id " + idPelicula + " no encontrado");
                return false;
            }
        } catch (Exception e) {
            System.err.println("Error al actualizar Pelicula: " + e.getMessage());
            return false;
        }
    }

    public LinkedList<Director> getLista_director() {
        if (lista_director == null) {
            this.lista_director = listAll();
        }
        return lista_director;
    }


    public Boolean delete(Integer id) throws Exception {
        try {
            LinkedList<Director> directores = getLista_director();
            if (directores == null) {
                directores = new LinkedList<>();
            }
            boolean deleted = false;
            for (int i = 0; i < directores.getLength(); i++) {
                Director r = directores.get(i);
                if (r.getIdDirector().equals(id)) {
                    directores.delete(i);
                    deleted = true;
                    break;
                }
            }
            if (deleted) {
                String info = new Gson().toJson(directores.toArray());
                saveFile(info);
                this.lista_director = listAll();
                return true;
            }
            return false;
        }
        catch (Exception e) {
            throw new Exception("No se encontró la ruta con el id: " + id);
        }
    }


    public List<Pelicula> getListaPeliculas() {
        List<Pelicula> lista = new ArrayList<>();
        var linkedList = super.listAll();
        for (int i = 0; i < linkedList.getLength(); i++) {
            lista.add(linkedList.get(i));
        }
        return lista;
    }

    private void persistAll(List<Pelicula> peliculas) throws Exception {
        String json = new com.google.gson.Gson().toJson(peliculas);
        saveFile(json);
    }

    private int obtenerPosicionPorId(int idPelicula) {
        var lista = super.listAll();
        for (int i = 0; i < lista.getLength(); i++) {
            if (lista.get(i).getId() == idPelicula) {
                return i;
            }
        }
        return -1;
    }


    public Boolean listar() {
        try {
            this.listAll();
            for (int i = 0; i > this.listAll().getLength(); i++) {
            }
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
            return false;
        }
    }

    public LinkedList<HashMap<String, Object>> all() throws Exception {
        LinkedList<HashMap<String, Object>> lista = new LinkedList<>();
        if (!this.listAll().isEmpty()) {
            Pelicula[] arreglo = this.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                lista.add(toDict(arreglo[i], i));
            }
        }
        return lista;
    }

    private HashMap<String, Object> toDict(Pelicula p, Integer i) {
        HashMap<String, Object> aux = new HashMap<>();
        aux.put("id", p.getId());
        aux.put("titulo", p.getTitulo());
        aux.put("sinopsis", p.getSinopsis());
        aux.put("duracion", p.getDuracion());
        aux.put("trailer", p.getTrailer());
        aux.put("fechaEstreno", p.getFechaEstreno());
        aux.put("imagen", p.getImagen());

        // Convertir las LinkedLists a arreglos normales para el JSON
        aux.put("idGenero", p.getIdGenero().toArray());
        aux.put("idActores", p.getIdActores().toArray());
        aux.put("idDirector", p.getIdDirector().toArray());

        return aux;
    }




    //Metodo Quicksort
    public LinkedList<HashMap<String, Object>> orderByPelicula(Integer type, String attribute) throws Exception {
        LinkedList<HashMap<String, Object>> lista = all();
        if (!listAll().isEmpty()) {
            HashMap arr[] = lista.toArray();
            quickSort(arr, 0, arr.length - 1, type, attribute);
            lista.toList(arr);
        }
        return lista;
    }

    public void quickSort(HashMap arr[], int begin, int end, Integer type, String attribute) {
        if (begin < end) {
            int partitionIndex = partition(arr, begin, end, type, attribute);

            quickSort(arr, begin, partitionIndex - 1, type, attribute);
            quickSort(arr, partitionIndex + 1, end, type, attribute);
        }
    }
    
    private int partition(HashMap<String, Object> arr[], int begin, int end, Integer type, String attribute) {
        HashMap<String, Object> pivot = arr[end];
        int i = (begin - 1);
        if (type == Utiles.ASCEDENTE) {
            for (int j = begin; j < end; j++) {
                if (arr[j].get(attribute).toString().compareTo(pivot.get(attribute).toString()) < 0) {
                    // if (arr[j] <= pivot) {
                    i++;
                    HashMap<String, Object> swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }
        } else {
            for (int j = begin; j < end; j++) {
                if (arr[j].get(attribute).toString().compareTo(pivot.get(attribute).toString()) > 0) {
                    i++;
                    HashMap<String, Object> swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }
        }
        HashMap<String, Object> swapTemp = arr[i + 1];
        arr[i + 1] = arr[end];
        arr[end] = swapTemp;

        return i + 1;
    }

    public LinkedList<HashMap<String, Object>> search(String attribute, String text, Integer type) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'search'");
    }
    public static void main(String[] args) throws Exception {
        DaoPelicula daoPelicula = new DaoPelicula();
        Pelicula p = new Pelicula();

        p.setId(daoPelicula.listAll().getLength() + 1);
        p.setTitulo("Matrix Reloaded");
        p.setSinopsis("Neo y la resistencia luchan contra las máquinas.");
        p.setDuracion(138);
        p.setImagen("matrix-reloaded.jpg");
        p.setTrailer("https://youtu.be/3PNrp0z_X4Y");
        p.setFechaEstreno(new Date());

        // Crear y llenar la LinkedList personalizada para géneros
        LinkedList<Integer> generos = new LinkedList<>();
        generos.add(1);  // ID de Acción
        generos.add(2);  // ID de Ciencia Ficción
        p.setIdGenero(generos);

        // Crear y llenar LinkedList de actores
        LinkedList<Integer> actores = new LinkedList<>();
        actores.add(1);  // ID de Keanu Reeves
        actores.add(2);  // ID de Laurence Fishburne
        p.setIdActores(actores);

        // Crear y llenar LinkedList de directores
        LinkedList<Integer> directores = new LinkedList<>();
        directores.add(1);  // ID de Lana Wachowski
        directores.add(2);  // ID de Lilly Wachowski
        p.setIdDirector(directores);

        // Guardar
        if (daoPelicula.save(p)) {
            System.out.println("PELÍCULA GUARDADA CON ÉXITO");
        } else {
            System.out.println("ERROR AL GUARDAR");
        }
    }




}