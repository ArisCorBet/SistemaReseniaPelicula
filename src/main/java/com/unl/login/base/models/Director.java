package com.unl.login.base.models;

public class Director {
    private Integer idDirector;
    private String nombre;
    private int anioCarrera;

    public Integer getIdDirector() {
        return this.idDirector;
    }

    public void setIdDirector(Integer idDirector) {
        this.idDirector = idDirector;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;

    }

    public int getAniosCarrera() {
        return this.anioCarrera;
    }

    public void setAniosCarrera(int aniosCarrera) {
        this.anioCarrera = aniosCarrera;
    }

}
