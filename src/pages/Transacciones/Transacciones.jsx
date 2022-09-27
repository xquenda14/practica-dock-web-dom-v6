import React from "react";
import { Link } from "react-router-dom";
import appConfig from "../../appConfig.json"

class Transacciones extends React.Component {
    constructor(props) {
        super(props);

        this.state = {datosCargados:false, oTransacciones:[],bCuentasCargadas:false, oCuentas:[],selectCuenta:-1}
    }

    //state = {datosCargados:false, oTransacciones:[],bCuentasCargadas:false, oCuentas:[],selectCuenta:-1}

    cambiarCuenta=(e)=>{
        e.preventDefault();
        
        this.setState({selectCuenta:e.target.value});
        this.cargarTransacciones(e.target.value);
        this.cargarDatosCuenta(e.target.value);
        console.log(this.state);

    }

    
    cargarTransacciones(selectCuenta){
        //const {selectCuenta} = this.state;
        let urlApiBase =appConfig.urlApiBase;
        let urlApi = urlApiBase+ "Transacciones/GetTransacciones";
        let sparam = "?Cuenta="+ selectCuenta ;

        fetch(urlApi + sparam ,{
            method:'GET'
        })
        .then(respuesta=>respuesta.json())
        .then((Result)=> {
            console.log(Result)
            this.setState({datosCargados:true, oTransacciones:Result});
        })
        .catch(console.log);

    }

    cargarCuentas(){
        let urlApiBase =appConfig.urlApiBase;
        let urlApi = urlApiBase+ "Cuentas/GetCuentas";
    
        fetch(urlApi,{
            method:'GET'
        })
        .then(respuesta=>respuesta.json())
        .then((Result)=> {
            console.log(Result)
            this.setState({bCuentasCargadas:true, oCuentas:Result});
        })
        .catch(console.log);

    }

    cargarDatosCuenta(Cuenta){
        let urlApiBase =appConfig.urlApiBase;
        let urlApi = urlApiBase+ "Cuentas/GetCuenta";
        let sparam = "?Cuenta="+ Cuenta ;
    
        fetch(urlApi + sparam ,{
            method:'GET'
        })
        .then(respuesta=>respuesta.json())
        .then((Result)=> {
            console.log(Result)
            this.setState({SaldoInicial:Result.eCuenta.saldo, SaldoActual:Result.saldoActual});
        })
        .catch(console.log);

    }

    

    componentDidMount(){

        this.cargarCuentas();
        this.cargarTransacciones(-1);
        

    }

    change=(event)=>{
        this.setState({value: event.target.value});
        console.log(this.state);
    }

    render() { 

        const{datosCargados,oTransacciones,bCuentasCargadas,oCuentas,selectCuenta}=this.state;  
        
        if (!datosCargados || !bCuentasCargadas) {
            return (<div>Cargando..!</div>)
        }
        else{
            return ( <>
                <h1>Transacciones</h1>
                <div className="d-flex p-1">
                    <Link className="btn btn-primary" to="/NuevaTransaccion">Nueva Transacción</Link>
                </div>
                <div>
                    <label>Cuenta</label>
                    <select id="cboCuenta" className="form-select form-select-lg mb-3" value={this.selectCuenta}  onChange={this.cambiarCuenta}>
                        <option value="" disabled selected>Seleccione una cuenta</option>
                        {oCuentas.listCuentas.map(item=>
                                <option value={item.cuenta}>{item.cuenta}</option>    
                        )}
                    </select>
                </div>

                <h4>Saldo inicial cuenta : {this.state.SaldoInicial}</h4>
                <h4>Saldo Actual : {this.state.SaldoActual}</h4>

                <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <td>Cuenta</td>
                                <td>Tipo Operacion</td>
                                <td>Monto</td>
                                <td>Fecha Operación</td>
                            </tr>
                        </thead>
                        <tbody>
                        {oTransacciones.listTrans.map(item =>
                            <tr>
                                <td>{item.cuenta}</td>
                                <td>{item.tipoOperacion}</td>
                                <td>{item.monto}</td>
                                <td>{item.fechaOperacion}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
            </> );
        }
    }
}
 
export default Transacciones;