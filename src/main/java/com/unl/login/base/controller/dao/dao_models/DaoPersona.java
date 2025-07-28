package com.unl.login.base.controller.dao.dao_models;

import com.google.gson.Gson;
import com.unl.login.base.controller.Utiles;
import com.unl.login.base.controller.dao.AdapterDao;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Genero;
import com.unl.login.base.models.Persona;

import java.util.HashMap;

public class DaoPersona extends AdapterDao<Persona> {
    private Persona obj;
    private LinkedList<Persona> lista_personas;

    public DaoPersona() {
        super(Persona.class);
        // TODO Auto-generated constructor stub
    }

    public Persona getObj() {
        if (obj == null)
            this.obj = new Persona();
        return this.obj;
    }

    public LinkedList<Persona> getLista_personas() {
        if (lista_personas == null) {
            this.lista_personas = listAll();
        }
        return lista_personas;
    }

    public void setObj(Persona obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setId(listAll().getLength()+1);
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

    public Boolean delete(Integer id) throws Exception {
        try {
            LinkedList<Persona> personas = getLista_personas();
            if (personas == null) {
                personas = new LinkedList<>();
            }
            boolean deleted = false;
            for (int i = 0; i < personas.getLength(); i++) {
                Persona r = personas.get(i);
                if (r.getId().equals(id)) {
                    personas.delete(i);
                    deleted = true;
                    break;
                }
            }
            if (deleted) {
                String info = new Gson().toJson(personas.toArray());
                saveFile(info);
                this.lista_personas = listAll();
                return true;
            }
            return false;
        }
        catch (Exception e) {
            throw new Exception("No se encontró la ruta con el id: " + id);
        }
    }


    public LinkedList<HashMap<String, String>> all() throws Exception {
        LinkedList<HashMap<String, String>> lista = new LinkedList<>();
        if (!this.listAll().isEmpty()) {
            Persona[] arreglo = this.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                lista.add(toDict(arreglo[i]));
            }
        }
        return lista;
    }

    private HashMap<String, String> toDict(Persona persona) {
        HashMap<String, String> aux = new HashMap<>();
        aux.put("id", String.valueOf(persona.getId()));
        aux.put("nombre", persona.getUsuario());
        aux.put("edad", String.valueOf(persona.getEdad()));
        aux.put("telefono", persona.getTelefono());
        return aux;
    }

    public LinkedList<HashMap<String, String>> orderQuickPersona(Integer type, String attribute) throws Exception {
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

    private int partition(HashMap<String, String> arr[], int begin, int end, Integer type, String attribute) {
        HashMap<String, String> pivot = arr[end];
        int i = (begin - 1);

        if (type == Utiles.ASCEDENTE) {
            for (int j = begin; j < end; j++) {
                if (arr[j].get(attribute).toString().toLowerCase().
                        compareTo(pivot.get(attribute).toString().toLowerCase()) < 0) {
                    i++;
                    HashMap<String, String> swapTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = swapTemp;
                }
            }

        } else {
            for (int j = begin; j < end; j++) {
                if (arr[j].get(attribute).toString().toLowerCase().
                        compareTo(pivot.get(attribute).toString().toLowerCase()) > 0) {
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
            lista = orderQuickPersona(Utiles.ASCEDENTE, attribute);
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
