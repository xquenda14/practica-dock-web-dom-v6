import React from "react";
import {Formik} from "formik";
import Swal from "sweetalert2";
import appConfig from "../../appConfig.json";
import {Link, Navigate} from "react-router-dom";

class NuevaTransaccion extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    render() { 

        const {acount,typeOperation,dateTransaction,mount}=this.state;

        return ( 
            <Formik
                    initialValues={{
                        acount:'',
                        typeOperation: '',
                        dateTransaction:'',
                        mount:''
                    }}

                    validate={(valores)=>{
                        let errores = {};

                        if(!valores.acount){
                            errores.acount = 'Por favor ingresa el número de la cuenta';
                        }

                        if(!valores.typeOperation){
                            errores.typeOperation = 'Por favor elija un tipo de operación';
                        }

                        if(!valores.dateTransaction){
                            errores.dateTransaction = 'Por favor elija un fecha de operación';
                        }

                        if(isNaN(+valores.mount) || valores.mount.toString() == 0 ){
                            errores.mount = 'El monto debe de ser un valor númerico';
                        }

                        return errores;
                    }}


                    onSubmit={(valores)=>{
                        let urlApiBase = appConfig.urlApiBase;
                        let urlApi = urlApiBase+ "Transacciones/RegistrarTransaccion";
                        
                        fetch(urlApi ,{
                            method:"POST",
                            body:JSON.stringify(valores),
                            headers: {
                                'Content-Type': 'application/json'
                              }
                        })
                        .then(respuesta=>respuesta.json())
                        .then((Result)=> {
                            console.log(Result)
                            

                            if (Result.errors != null &&  Result.status==400){
                                var msg= Result.errors.Mount[0];

                                Swal.fire({
                                    title:"Transacción",
                                    text:msg,
                                    icon:"error",
                                    confirmButtonText:"Ok"
                                });

                            }
                            else if(!Result.bError){
                                if (Result.bValido){
                                    //this.props.history.push("/Cuentas");
                                    

                                    Swal.fire({
                                        title:"Transacción",
                                        text:Result.msg,
                                        icon:"success",
                                        confirmButtonText:"Ok"
                                    }).then((result)=>{
                                        window.location.href="#/Transacciones";
                                        //<Navigate to="Transacciones" />
                                    });


                                }
                                else{
                                    Swal.fire({
                                        title:"Transaccion",
                                        text:Result.msg,
                                        icon:"error",
                                        confirmButtonText:"Ok"
                                    });
                                }
                            }
                           else{
                                Swal.fire({
                                    title:"Transaccion",
                                    text:Result.msg,
                                    icon:"error",
                                    confirmButtonText:"Ok"
                                });
                            }

                        })
                        .catch((err)=>{
                              console.log(err);  
                        });
 
                    
                        console.log(valores);
                        console.log('Se envia formulario..!');

                    }}
            >
            {({values,errors,touched,handleSubmit, handleChange, handleBlur})=>(
                <form onSubmit={handleSubmit}>
                    
                    <h2>Nueva transaccion</h2>

                    <div className="mb-3">
                        <label htmlFor="acount" className="form-label">No Cuenta</label>
                        <input type="text" className="form-control" name="acount"  id="acount" 
                                value={acount} onChange={handleChange}
                                aria-describedby="textHelp"  />
                        {touched.acount && errors.acount &&  <div className="text-danger form-text">{errors.acount}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="typeOperation" className="form-label">Tipo Operación</label>

                        <select name="typeOperation"  className="form-select form-select-lg mb-3" 
                               value={typeOperation} onChange={handleChange}>
                            <option value="" disabled selected>Selecciona un tipo de operación</option>
                            <option value="Deposit">Desposito</option>
                            <option value="Withdrawal">Retiro</option>
                        </select>
                        {touched.typeOperation && errors.typeOperation &&  <div className="text-danger form-text">{errors.typeOperation}</div>}
                    </div>
 
                    <div className="mb-3">
                        <label htmlFor="acount" className="form-label">Fecha Operación</label>
                        <input type="date" className="form-control" name="dateTransaction"  id="dateTransaction" 
                        value={dateTransaction} onChange={handleChange}
                        aria-describedby="textHelp"  />
                        {touched.dateTransaction && errors.dateTransaction &&  <div className="text-danger form-text">{errors.dateTransaction}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mount" className="form-label">Monto</label>
                        <input type="text" className="form-control" name="mount"  id="mount" 
                        value={mount} onChange={handleChange}
                        aria-describedby="textHelp"  />
                        {touched.mount && errors.mount &&  <div className="text-danger form-text">{errors.mount}</div>}
                    </div>

                    <div className="d-flex p-1">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <Link className="btn btn-danger m-1" to="/Transacciones">Cancelar</Link>
                    </div>
                    
                </form> 
            )}

        </Formik>
        );
    }
}
 
export default NuevaTransaccion;