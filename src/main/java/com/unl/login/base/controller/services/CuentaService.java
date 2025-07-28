package com.unl.login.base.controller.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;






import com.unl.login.base.controller.dao.dao_models.DaoCuenta;
import com.unl.login.base.controller.dao.dao_models.DaoPersona;
import com.unl.login.base.controller.dao.dao_models.DaoRol;
import com.unl.login.base.models.Cuenta;
import com.unl.login.base.models.Persona;
import com.unl.login.base.models.enums.Estado_cuenta;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;


@BrowserCallable
@AnonymousAllowed
public class CuentaService {
    private DaoCuenta db;
    private SecurityContext context; //MANTIENE VIVA LA SESION

    public CuentaService() {
        db = new DaoCuenta(); // Accede a las cuentas almacenadas
        context = SecurityContextHolder.getContext();// Guarda la informacion de la sesion del usuario actual

    }
    public HashMap<String,String> CreateRoles(){
        HashMap<String,String> mapa = new HashMap<>();
        mapa.put("resp","Ya creado");
        mapa.put("code","201");
        DaoRol dr = new DaoRol();
        if(dr.listAll().isEmpty()){
            dr.getObj().setNombre("admin");
            dr.save();
            dr.setObj(null);
            dr.getObj().setNombre("user");
            dr.save();
            dr.setObj(null);
            mapa.put("resp","Creado");
            mapa.put("code","200");
        }
        return mapa;
    }

    // DEVUELVE EL USUARIO QUE ESTA ACTUALMENTE AUTENTICADO
    public Authentication getAuthentication() {
        System.out.println("autentication *_**");
        System.out.println(context.getAuthentication());
        return context.getAuthentication();
    }

    // VERIFICA SI USUARIO ACTUAL ESTA LOGUEADO
    public Boolean isLogin(){
        if(getAuthentication()!= null)
            return getAuthentication().isAuthenticated();
        return false;
    }

    //AUTENTICA AL USUARIO Y REGISTRA EL CORREO, ID Y ROLES EN LA SESION
    public HashMap<String,Object> login(String correo, String contrasenia) throws Exception {
        HashMap<String,Object> mapa = new HashMap<>();
        try{
            HashMap<String,Object> aux = db.login(correo, contrasenia);
            // poner en sesion el setAutentication
            if(aux != null ){
                System.out.println("Rol del usuario: " + aux.get("rol"));
                //envia el usuario y el id, el rol, la autorizacion
                context.setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                            aux.get("usuario").toString(),
                            aux.get("id").toString(),
                            getAuthorities(aux)));
                mapa.put("user",context.getAuthentication());
                mapa.put("message","OK");
                mapa.put("estado","true");
            }
        }catch (Exception e){
            mapa.put("user",new HashMap<>());
            mapa.put("message",e.getMessage());
            mapa.put("estado","false");
            context.setAuthentication(null);
            System.out.println(e);
        }
        System.out.println(db.listAll().getLength());
        return mapa;
    }

    //ASIGNA EL ROL AL USUARIO, EN CASO DE QUE SEA ADMIN LO GUARDA COMO ROLE_admin
    private static List<GrantedAuthority> getAuthorities(HashMap<String, Object> user) throws Exception {
        DaoRol dr = new DaoRol();
        dr.setObj(dr.get(Integer.parseInt(user.get("rol").toString())));
        List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority("ROLE_"+ dr.getObj().getNombre()));
        return list;
    }

    //CIERRA SESION AL USUARIO
    public HashMap<String,String> longout(){
        context.setAuthentication(null);
        HashMap<String,String> mapa = new HashMap<>();
        mapa.put("message","OK");
        return mapa;
    }
    public void createCuenta(@Email @NotEmpty @NotBlank String correo, @NotEmpty String contrasenia, Integer idPersona, boolean estado)
            throws Exception {
        if (correo.trim().length() > 0 && contrasenia.trim().length() > 0 && idPersona > 0 ) {
            db.getObj().setCorreo(correo);
            db.getObj().setId_persona(idPersona);
            db.getObj().setEstado(estado);

            db.getObj().setContrasenia(contrasenia);

            if (!db.save()) {
                throw new Exception("Error al guardar la Cuenta");
            }
        }
    }

    public List<HashMap<String, Object>> listAll() throws Exception {
        List<HashMap<String, Object>> list = new ArrayList<>();
        if (!db.listAll().isEmpty()) {
            Cuenta[] arreglo = db.listAll().toArray();
            DaoPersona dbUsuario = new DaoPersona();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, Object> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString());
                aux.put("correo", arreglo[i].getCorreo());
                aux.put("clave", arreglo[i].getContrasenia());
                aux.put("id_persona", dbUsuario.listAll().get(arreglo[i].getId_persona() - 1).getUsuario());
                aux.put("estado", arreglo[i].getEstado());

                list.add(aux);

            }

        }

        return list;
    }


}