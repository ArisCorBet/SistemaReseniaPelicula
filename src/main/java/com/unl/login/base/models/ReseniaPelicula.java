package com.unl.login.base.models;

import java.util.Date;

public class ReseniaPelicula {
    private Integer id;
    private Integer idPelicula;
    private String resenia;
    private float puntuacion;
    private Date fechaResenia;
    private String autor;

    // Constructor
    public ReseniaPelicula() {
        this.fechaResenia = new Date(); // Fecha actual por defecto
    }

    // Constructor con parámetros
    public ReseniaPelicula(Integer idPelicula, String resenia, float puntuacion, String autor) {
        this();
        this.idPelicula = idPelicula;
        this.resenia = resenia;
        this.puntuacion = puntuacion;
        this.autor = autor != null ? autor : "Anónimo";
    }

    // Getters y Setters (mejorados con validaciones)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID no válido");
        }
        this.id = id;
    }
    
    public Integer getIdPelicula() {
        return idPelicula;
    }

    public void setIdPelicula(Integer idPelicula) {
        if (idPelicula == null || idPelicula <= 0) {
            throw new IllegalArgumentException("ID de película no válido");
        }
        this.idPelicula = idPelicula;
    }
    
    public String getResenia() {
        return resenia;
    }
    
    public void setResenia(String resenia) {
        if (resenia == null || resenia.trim().isEmpty()) {
            throw new IllegalArgumentException("La reseña no puede estar vacía");
        }
        this.resenia = resenia;
    }
    
    public float getPuntuacion() {
        return puntuacion;
    }
    
    public void setPuntuacion(float puntuacion) {
        if (puntuacion <= 0 || puntuacion > 5) {
            throw new IllegalArgumentException("La puntuación debe estar entre 1 y 5");
        }
        this.puntuacion = puntuacion;
    }
    
    public Date getFechaResenia() {
        return fechaResenia;
    }
    
    public void setFechaResenia(Date fechaResenia) {
        if (fechaResenia == null) {
            throw new IllegalArgumentException("La fecha no puede ser nula");
        }
        this.fechaResenia = fechaResenia;
    }
    
    public String getAutor() {
        return autor;
    }
    
    public void setAutor(String autor) {
        this.autor = autor != null ? autor : "Anónimo";
    }
    
    @Override
    public String toString() {
        return "Reseña [ID=" + id + ", Película=" + idPelicula + ", Puntuación=" + puntuacion + "]";
    }
}