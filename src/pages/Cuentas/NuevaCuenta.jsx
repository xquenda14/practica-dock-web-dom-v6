import React from "react";
import {Formik} from "formik";
import Swal from "sweetalert2";
import appConfig from "../../appConfig.json";
import { Link } from "react-router-dom";

class NuevaCuenta extends React.Component {
    constructor(props) {
        super(props);

        /*this.state = {textvalue: this.props.params.textvalue}*/

    }
    state = {  }

    /*cambioValor=(e)=>{
        const state = this.state;
        
        state[e.target.name] = e.target.value;
        this.setState({state});

    }*/

    /*enviarDatos=(e)=>{
        e.preventDefault();
        console.log("Form Envaido")
    }
*/
    render() { 

        const {acount,balance}= this.state;

        return (  
            <div>
                <Formik
                    initialValues={{
                        acount:'',
                        balance: ''
                    }}

                    validate={(valores)=>{
                        let errores = {};

                        if(!valores.acount){
                            errores.acount = 'Por favor ingresa el número de la cuenta';
                        }

                        if(!valores.balance){
                            errores.balance = 'Por favor ingresa un monto';
                        }

                        return errores;
                    }}

                    onSubmit={(valores)=>{

                        
                        let urlApiBase = appConfig.urlApiBase;
                        let urlApi = urlApiBase+ "Cuentas/RegistrarCuenta";
                        
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
                            //console.log(Result.errors.Acount[0])    

                            if (Result.errors != null &&  Result.status==400){
                                var msg= Result.errors.Acount[0];

                                Swal.fire({
                                    title:"Cuenta",
                                    text:msg,
                                    icon:"error",
                                    confirmButtonText:"Ok"
                                });

                            }
                            else if(!Result.bError){
                                if (Result.bValido){
                                    //this.props.history.push("/Cuentas");
                                    

                                    Swal.fire({
                                        title:"Cuenta",
                                        text:Result.msg,
                                        icon:"success",
                                        confirmButtonText:"Ok"
                                    }).then((result)=>{
                                        window.location.href="#/Cuentas";
                                    });


                                }
                                else{
                                    Swal.fire({
                                        title:"Cuenta",
                                        text:Result.msg,
                                        icon:"error",
                                        confirmButtonText:"Ok"
                                    });
                                }
                            }
                           else{
                                Swal.fire({
                                    title:"Cuenta",
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
                            <h1>Cuenta</h1>

                            <div className="mb-3 text-left">
                                <label htmlFor="exampleInputCuenta" className="form-label">Cuenta</label>
                                <input name="acount" value={acount} type="text" onChange={handleChange} className="form-control" id="cuenta" aria-describedby="emailHelp" />
                                {touched.acount && errors.acount &&  <div className="text-danger form-text">{errors.acount}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputSaldo" className="form-label">Saldo</label>
                                <input name="balance" value={balance} onChange={handleChange} type="text" className="form-control" id="exampleInputSaldo" />
                                {touched.balance && errors.balance &&  <div className="text-danger form-text">{errors.balance}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">Crear</button>
                            <Link className="btn btn-danger m-1" to="/Cuentas">Cancelar</Link>
                        </form>
                    )}




                </Formik>
          
        </div>

        );
    }
}
 
export default NuevaCuenta;