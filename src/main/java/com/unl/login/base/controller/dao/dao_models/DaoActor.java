package com.unl.login.base.controller.dao.dao_models;

import com.google.gson.Gson;
import com.unl.login.base.controller.Utiles;
import com.unl.login.base.controller.dao.AdapterDao;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Actor;
import com.unl.login.base.models.Genero;
import com.unl.login.base.models.Pelicula;

import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DaoActor extends AdapterDao<Actor> {
    private Actor obj;
    private LinkedList lista_actor;
    public DaoActor() {
        super(Actor.class);
    }

    public Actor getObj() {
        if (obj == null) {
            obj = new Actor();
        }
        return obj;
    }

    public void setObj(Actor obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setIdActor(listAll().getLength()+1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            //TODO
            return false;
            // TODO: handle exception
        }
    }

    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {
            //TODO
            return false;
            // TODO: handle exception
        }
    }


    public Boolean updatePorId(int idActor) {
        try {
            int pos = obtenerPosicionPorId(idActor);
            if (pos >= 0) {
                this.update(obj, pos);
                return true;
            } else {
                System.err.println("Actor con id " + idActor + " no encontrado");
                return false;
            }
        } catch (Exception e) {
            System.err.println("Error al actualizar Actor: " + e.getMessage());
            return false;
        }
    }

    public LinkedList<Actor> getLista_actor() {
        if (lista_actor == null) {
            this.lista_actor = listAll();
        }
        return lista_actor;
    }


    public Boolean delete(Integer id) throws Exception {
        try {
            LinkedList<Actor> actores = getLista_actor();
            if (actores == null) {
                actores = new LinkedList<>();
            }
            boolean deleted = false;
            for (int i = 0; i < actores.getLength(); i++) {
                Actor r = actores.get(i);
                if (r.getIdActor().equals(id)) {
                    actores.delete(i);
                    deleted = true;
                    break;
                }
            }
            if (deleted) {
                String info = new Gson().toJson(actores.toArray());
                saveFile(info);
                this.lista_actor = listAll();
                return true;
            }
            return false;
        }
        catch (Exception e) {
            throw new Exception("No se encontró la ruta con el id: " + id);
        }
    }

    public Actor getById(int idActor) {
        var lista = super.listAll();
        for (int i = 0; i < lista.getLength(); i++) {
            if (lista.get(i).getIdActor() == idActor) {
                return lista.get(i);
            }
        }
        return null;
    }


    private int obtenerPosicionPorId(int idActor) {
        var lista = super.listAll();
        for (int i = 0; i < lista.getLength(); i++) {
            if (lista.get(i).getIdActor() == idActor) {
                return i;
            }
        }
        return -1;
    }

    public LinkedList<HashMap<String, String>> all() throws Exception {
        LinkedList<HashMap<String, String>> lista = new LinkedList<>();
        if (!this.listAll().isEmpty()) {
            Actor[] arreglo = this.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                lista.add(toDict(arreglo[i]));
            }
        }
        return lista;
    }

    private HashMap<String, String> toDict(Actor actor) {
        HashMap<String, String> aux = new HashMap<>();
        aux.put("idActor", String.valueOf(actor.getIdActor()));
        aux.put("nombre", actor.getNombre());
        aux.put("anioCarrera", String.valueOf(actor.getAnioCarrera()));
        return aux;
    }

    public LinkedList<HashMap<String, String>> orderQuickActor(Integer type, String attribute) throws Exception {
        LinkedList<HashMap<String, String>> lista = all();
        if (!lista.isEmpty()) {
            HashMap<String, String>[] arr = lista.toArray();
            quicksort(arr, 0, arr.length - 1, type, attribute);
            lista.toList(arr);
        }
        return lista;
    }

    private void quicksort(HashMap<String, String>[] arr, int begin, int end, Integer type, String attribute) {
        if (begin < end) {
            int partitionIndex = partition(arr, begin, end, type, attribute);
            quicksort(arr, begin, partitionIndex - 1, type, attribute);
            quicksort(arr, partitionIndex + 1, end, type, attribute);
        }
    }

    private int partition(HashMap<String, String>[] arr, int begin, int end, Integer type, String attribute) {
        HashMap<String, String> pivot = arr[end];
        int i = (begin - 1);

        boolean esNumero = attribute.equals("anioCarrera");

        if (type == Utiles.ASCEDENTE) {
            for (int j = begin; j < end; j++) {
                boolean condicion;
                if (esNumero) {
                    int valJ = Integer.parseInt(arr[j].get(attribute));
                    int valPivot = Integer.parseInt(pivot.get(attribute));
                    condicion = valJ < valPivot;
                } else {
                    condicion = arr[j].get(attribute).toLowerCase()
                        .compareTo(pivot.get(attribute).toLowerCase()) < 0;
                }

                if (condicion) {
                    i++;
                    HashMap<String, String> swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }
        } else {
            for (int j = begin; j < end; j++) {
                boolean condicion;
                if (esNumero) {
                    int valJ = Integer.parseInt(arr[j].get(attribute));
                    int valPivot = Integer.parseInt(pivot.get(attribute));
                    condicion = valJ > valPivot;
                } else {
                    condicion = arr[j].get(attribute).toLowerCase()
                        .compareTo(pivot.get(attribute).toLowerCase()) > 0;
                }

                if (condicion) {
                    i++;
                    HashMap<String, String> swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }
        }

        HashMap<String, String> swapTemp = arr[i + 1];
        arr[i + 1] = arr[end];
        arr[end] = swapTemp;

        return i + 1;
    }

    public LinkedList<HashMap<String, String>> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = all();
        LinkedList<HashMap<String, String>> resp = new LinkedList<>();

        if (!lista.isEmpty()) {
            lista = orderQuickActor(Utiles.ASCEDENTE, attribute);
            HashMap<String, String>[] arr = lista.toArray();
            Integer n = binaryHelper(arr, attribute, text);

            switch (type) {
                case 1: // startsWith
                    for (int i = 0; i < arr.length; i++) {
                        if (arr[i].get(attribute).toLowerCase().startsWith(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                    break;
                case 2: // endsWith
                    for (int i = 0; i < arr.length; i++) {
                        if (arr[i].get(attribute).toLowerCase().endsWith(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                    break;
                default: // contains
                    for (int i = 0; i < arr.length; i++) {
                        if (arr[i].get(attribute).toLowerCase().contains(text.toLowerCase())) {
                            resp.add(arr[i]);
                        }
                    }
                    break;
            }
        }
        return resp;
    }

    private Integer binaryHelper(HashMap<String, String>[] array, String attribute, String text) {
        if (array.length == 0 || text.isEmpty()) return 0;
        int half = array.length / 2;
        int aux = 0;
        char c = text.toLowerCase().charAt(0);
        char base = array[half].get(attribute).toLowerCase().charAt(0);
        if (c > base) aux = 1;
        else if (c < base) aux = -1;
        return half * aux;
    }
}