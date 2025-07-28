package com.unl.login.base.models;

import com.unl.login.base.controller.data_struct.list.LinkedList;

import java.util.Date;

public class Pelicula {
    private Integer id;
    private String titulo;
    private String sinopsis;
    private Integer duracion;
    private String imagen;
    private String trailer;
    private Date fechaEstreno;
    private LinkedList<Integer> idGenero = new LinkedList<>(); // Inicializado
    private LinkedList<Integer> idActores = new LinkedList<>(); // Inicializado
    private LinkedList<Integer> idDirector = new LinkedList<>(); // Inicializado

    public void agregarGenero(Integer generoId) {
        if (generoId == null || generoId <= 0) {
            throw new IllegalArgumentException("ID de género inválido");
        }
        if (!idGenero.contains(generoId)) {
            idGenero.add(generoId);
        }
    }

    public void agregarActor(Integer actorId) {
        if (actorId == null || actorId <= 0) {
            throw new IllegalArgumentException("ID de actor inválido");
        }
        if (!idActores.contains(actorId)) {
            idActores.add(actorId);
        }
    }

    public void agregarDirector(Integer directorId) {
        if (directorId == null || directorId <= 0) {
            throw new IllegalArgumentException("ID de director inválido");
        }
        if (!idDirector.contains(directorId)) {
            idDirector.add(directorId);
        }
    }

    // Métodos de verificación mejorados
    public boolean tieneRelacionesCompletas() {
        return !idGenero.isEmpty() && !idActores.isEmpty() && !idDirector.isEmpty();
    }

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getTitulo() {
        return this.titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getSinopsis() {
        return this.sinopsis;
    }
    
    public void setSinopsis(String sinopsis) {
        this.sinopsis = sinopsis;
    }
    
    public Integer getDuracion() {
        return this.duracion;
    }

    public void setDuracion(Integer duracion) {
        this.duracion = duracion;
    }

    public String getImagen() {
        return this.imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getTrailer() {
        return this.trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public Date getFechaEstreno() {
        return this.fechaEstreno;
    }

    public void setFechaEstreno(Date fechaEstreno) {
        this.fechaEstreno = fechaEstreno;
    }

    public LinkedList<Integer> getIdGenero() {
        return idGenero;
    }

    public void setIdGenero(LinkedList<Integer> idGenero) {
        this.idGenero = idGenero;
    }

    public LinkedList<Integer> getIdActores() {
        return idActores;
    }

    public void setIdActores(LinkedList<Integer> idActores) {
        this.idActores = idActores;
    }

    public LinkedList<Integer> getIdDirector() {
        return idDirector;
    }

    public void setIdDirector(LinkedList<Integer> idDirector) {
        this.idDirector = idDirector;
    }



    public Object getIdPelicula() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getIdPelicula'");
    }
    
}