package com.unl.login.base.controller.dao.dao_models;

import com.google.gson.Gson;
import com.unl.login.base.controller.Utiles;
import com.unl.login.base.controller.dao.AdapterDao;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Cuenta;
import com.unl.login.base.models.Director;
import com.unl.login.base.models.Pelicula;
import com.unl.login.base.models.Resena;

import java.util.Date;
import java.util.HashMap;

public class DaoResena extends AdapterDao<Resena> {
    private Resena obj;
    private LinkedList<Resena> lista_resenas;

    public DaoResena() {
        super(Resena.class);
    }

    public Resena getObj() {
        if (obj == null)
            this.obj = new Resena();
        return this.obj;
    }

    public void setObj(Resena obj) {
        this.obj = obj;
    }

    public LinkedList<Resena> getListaResenas() {
        if (lista_resenas == null) {
            this.lista_resenas = listAll();
        }
        return lista_resenas;
    }


    public Boolean save() {
        try {
            obj.setIdResena(listAll().getLength() + 1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            // TODO
            return false;
            // TODO: handle exception
        }
    }

    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public LinkedList<Resena> getLista_resenas() {
        if (lista_resenas == null) {
            this.lista_resenas = listAll();
        }
        return lista_resenas;
    }


    public Boolean delete(Integer id) throws Exception {
        try {
            LinkedList<Resena> resenas = getLista_resenas();
            if (resenas == null) {
                resenas = new LinkedList<>();
            }
            boolean deleted = false;
            for (int i = 0; i < resenas.getLength(); i++) {
                Resena r = resenas.get(i);
                if (r.getIdResena().equals(id)) {
                    resenas.delete(i);
                    deleted = true;
                    break;
                }
            }
            if (deleted) {
                String info = new Gson().toJson(resenas.toArray());
                saveFile(info);
                this.lista_resenas = listAll();
                return true;
            }
            return false;
        }
        catch (Exception e) {
            throw new Exception("No se encontró la ruta con el id: " + id);
        }
    }

    public Resena getById(int idResena) {
        var lista = super.listAll();
        for (int i = 0; i < lista.getLength(); i++) {
            if (lista.get(i).getIdResena() == idResena) {
                return lista.get(i);
            }
        }
        return null;
    }

    public LinkedList<Resena> getByPeliculaId(int idPelicula) {
        LinkedList<Resena> resenas = new LinkedList<>();
        var lista = super.listAll();
        for (int i = 0; i < lista.getLength(); i++) {
            if (lista.get(i).getIdPelicula() == idPelicula && lista.get(i).getEstado()) {
                resenas.add(lista.get(i));
            }
        }
        return resenas;
    }

    public LinkedList<Resena> getByUsuarioId(int idUsuario) {
        LinkedList<Resena> resenas = new LinkedList<>();
        var lista = super.listAll();
        for (int i = 0; i < lista.getLength(); i++) {
            if (lista.get(i).getIdUsuario() == idUsuario) {
                resenas.add(lista.get(i));
            }
        }
        return resenas;
    }

    public Double getPromedioCalificacion(int idPelicula) {
        LinkedList<Resena> resenas = getByPeliculaId(idPelicula);
        if (resenas.isEmpty()) return 0.0;

        double suma = 0;
        for (int i = 0; i < resenas.getLength(); i++) {
            suma += resenas.get(i).getCalificacion();
        }
        return suma / resenas.getLength();
    }

    // Métodos adicionales similares a los que tienes en DaoDirector
    // (toDict, orderQuick, search, etc.)

    public LinkedList<HashMap<String, Object>> all() throws Exception {
        LinkedList<HashMap<String, Object>> lista = new LinkedList<>();
        if (!this.listAll().isEmpty()) {
            Resena[] arreglo = this.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                lista.add(toDict(arreglo[i], i));
            }
        }
        return lista;
    }

    private HashMap<String, Object> toDict(Resena p, Integer i) {
        HashMap<String, Object> aux = new HashMap<>();
        aux.put("idResenia", p.getIdResena());
        aux.put("idPelicula", p.getIdPelicula());
        aux.put("idUsuario", p.getIdUsuario());
        aux.put("calificacion", p.getCalificacion());
        aux.put("comentario", p.getComentario());
        aux.put("fechaCreacion", p.getFechaCreacion());
        aux.put("estado", p.getEstado());

        return aux;
    }

    //Metodo Quicksort
    public LinkedList<HashMap<String, Object>> orderByResena(Integer type, String attribute) throws Exception {
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
        DaoResena daoResena = new DaoResena();
        Resena p = new Resena();

        daoResena.getObj().setIdResena(daoResena.listAll().getLength() + 1);
        daoResena.getObj().setIdPelicula(1);
        daoResena.getObj().setIdUsuario(1);
        daoResena.getObj().setCalificacion(4);
        daoResena.getObj().setComentario("Me parece muy buena la pelicula");
        daoResena.getObj().setFechaCreacion(new Date());
        daoResena.getObj().setEstado(true);

        if (daoResena.save()) {
            System.out.println("RESENA GUARDADA CON ÉXITO");
        } else {
            System.out.println("ERROR AL GUARDAR");
        }
    }

}