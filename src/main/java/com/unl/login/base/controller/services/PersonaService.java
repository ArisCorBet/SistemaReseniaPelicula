package com.unl.login.base.controller.services;
import java.util.*;

import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Cuenta;
import com.unl.login.base.models.Genero;
import com.unl.login.base.models.Persona;
import com.unl.login.base.models.enums.Estado_cuenta;
import com.unl.login.base.controller.dao.dao_models.DaoPersona;
import com.unl.login.base.controller.dao.dao_models.DaoCuenta;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.*;

@BrowserCallable
@AnonymousAllowed
public class PersonaService {
    private DaoPersona db;

    public PersonaService() {
        db = new DaoPersona();
    }

    public void save(@NotEmpty String usuario, @NotEmpty @Email String correo, @NotEmpty String contrasenia, @NotEmpty String telefono, Integer edad) throws Exception {
        if(usuario.trim().length() > 0 && correo.trim().length() > 0 && contrasenia.trim().length() > 0 && edad > 0) {
            db.getObj().setUsuario(usuario);
            db.getObj().setEdad(edad);
            db.getObj().setTelefono(telefono);
            db.getObj().setId_rol(db.listAll().getLength() == 0 ? 1 : 2); // admin si es el primero

            if(!db.save())
                throw new  Exception("No se pudo guardar los datos de la persona");
            else {
                DaoCuenta dc = new DaoCuenta();
                dc.getObj().setContrasenia(contrasenia);
                dc.getObj().setCorreo(correo);
                dc.getObj().setId_persona(db.getObj().getId());
                dc.getObj().setEstado(true); // Siempre activa al crear

                if(!dc.save())
                    throw new  Exception("No se pudo guardar los datos de la cuenta");
            }
        } else {
            throw new  Exception("No se pudo guardar los datos de persona");
        }
    }

    public void update(Integer idPersona, Integer idCuenta, @NotEmpty String usuario, @NotEmpty @Email String correo, @NotEmpty String contrasenia, @NotEmpty String telefono, Integer edad) throws Exception {
        if (usuario.trim().length() > 0 && correo.trim().length() > 0 &&
                contrasenia.trim().length() > 0 && edad > 0) {

            // Actualizar Persona
            db.getObj().setUsuario(usuario);
            db.getObj().setEdad(edad);
            db.getObj().setTelefono(telefono);
            if (!db.update(idPersona - 1)) {
                throw new Exception("No se pudo guardar los datos de la persona");
            }

            // Actualizar Cuenta
            DaoCuenta dc = new DaoCuenta();
            dc.getObj().setContrasenia(contrasenia);
            dc.getObj().setCorreo(correo);
            dc.getObj().setId_persona(idPersona);
            if (!dc.update(idCuenta - 1)) {
                throw new Exception("No se pudo guardar los datos de la cuenta");
            }

        } else {
            throw new Exception("Faltan datos para actualizar");
        }
    }

    public void updateP(@NotNull Integer id,@NotEmpty String usuario,@NotEmpty String telefono,@NotNull Integer edad) throws Exception {
        if (usuario.trim().length() > 0 && edad > 0) {
            // Persona
            db.setObj(db.listAll().get(id -1));
            db.getObj().setUsuario(usuario);
            db.getObj().setEdad(edad);
            db.getObj().setTelefono(telefono);
            if (!db.update(id - 1)) {
                throw new Exception("No se pudo editar los datos de la persona");
            }
        } else {
            throw new Exception("Faltan datos para actualizar");
        }
    }

    public Boolean delete(Integer idPersona) throws Exception {
        return db.delete(idPersona);
    }

    public LinkedList<Persona> list() {
        return db.getLista_personas();
    }

    public List<HashMap> listaPersonas() {
        List<HashMap> lista = new ArrayList<>();
        if (!db.listAll().isEmpty()) {
            Persona[] arreglo = db.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {

                try {
                    HashMap<String, String> aux = new HashMap<>();
                    aux.put("id", arreglo[i].getId().toString(i));
                    aux.put("usuario", arreglo[i].getUsuario());
                    aux.put("edad", arreglo[i].getEdad().toString());
                    aux.put("telefono", arreglo[i].getTelefono());
                    Cuenta c = new DaoCuenta().listAll().get(arreglo[i].getId() - 1);// ya que todos deben tener cuenta asi que
                    // cuando se guardar, se guardaran tanto
                    // cuenta como persona con el mismo ID
                    aux.put("correo", c.getCorreo());

                    lista.add(aux);
                } catch (Exception e) {
                    // TODO: handle exception
                }
            }
        }
        return lista;
    }


    public List<HashMap<String, String>> order(String attribute, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = db.orderQuickPersona(type, attribute);
        return Arrays.asList(lista.toArray());
    }

    public List<HashMap<String, String>> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = db.search(attribute, text, type);
        return Arrays.asList(lista.toArray());
    }

    public List<HashMap> listPersona() throws Exception{
        return Arrays.asList(db.all().toArray());
    }

    public List<HashMap> listAll() {
        List<HashMap> lista = new ArrayList<>();
        if (!db.listAll().isEmpty()) {
            Persona[] arreglo = db.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {

                try {
                    HashMap<String, String> aux = new HashMap<>();
                    aux.put("id", arreglo[i].getId().toString(i));
                    aux.put("usuario", arreglo[i].getUsuario());
                    aux.put("telefono", arreglo[i].getTelefono());
                    aux.put("edad", arreglo[i].getEdad().toString());
                    Cuenta c = new DaoCuenta().listAll().get(arreglo[i].getId() - 1);// ya que todos deben tener cuenta asi que
                    // cuando se guardar, se guardaran tanto
                    // cuenta como persona con el mismo ID
                    aux.put("correo", c.getCorreo());

                    lista.add(aux);
                } catch (Exception e) {
                    // TODO: handle exception
                }
            }
        }
        return lista;
    }
    public Map<String, String> getPersonaById(Integer id) {
        Map<String, String> result = new HashMap<>();
        try {
            Persona persona = db.listAll().get(id - 1);
            Cuenta cuenta = new DaoCuenta().listAll().get(id - 1);

            result.put("id", persona.getId().toString());
            result.put("usuario", persona.getUsuario());
            result.put("telefono", persona.getTelefono());
            result.put("edad", persona.getEdad().toString());
            result.put("id_rol", persona.getId_rol().toString());
            result.put("correo", cuenta.getCorreo());

        } catch (Exception e) {
            System.out.println(e);
        }
        return result;
    }


    public Integer getUserIdByEmail(String email) {
        try {
            LinkedList<Cuenta> cuentas = new DaoCuenta().listAll();
            for (int i = 0; i < cuentas.getLength(); i++) {
                if (cuentas.get(i).getCorreo().equals(email)) {
                    return cuentas.get(i).getId_persona();
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

}