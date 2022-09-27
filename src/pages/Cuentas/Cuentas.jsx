import React from "react";
import { Link } from "react-router-dom";
import appConfig from "../../appConfig.json"

class Cuentas extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {datosCargados:false, oCuentas:[]  }

    cargarDatos(){
        let urlApiBase =appConfig.urlApiBase;
        let urlApi = urlApiBase+ "Cuentas/GetCuentas";
        let sparam = "";

        fetch(urlApi + sparam ,{
            method:'GET'
        })
        .then(respuesta=>respuesta.json())
        .then((Result)=> {
            console.log(Result)
            this.setState({datosCargados:true, oCuentas:Result});
        })
        .catch(console.log);
    }

    componentDidMount(){

        this.cargarDatos();

    }

    render() { 
        const{datosCargados,oCuentas}=this.state;  

        if (!datosCargados){
            return(<div>Cargando cuentas....!</div>);
        }
        else{
        return ( <div>
            <h1>Cuentas</h1>
            <div className="d-flex p-1">
                    <Link className="btn btn-primary" to="/NuevaCuenta">Nueva Cuenta</Link>
                </div>
            <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <td>Cuenta</td>
                            <td>Saldo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {oCuentas.listCuentas.map(item =>
                            <tr key={item.cuenta}>
                                <td>{item.cuenta}</td>
                                <td>{item.saldo}</td>
                            </tr>
                            )}
                        
                    </tbody>
                </table>
        </div>  );
        }
    }
}
 
export default Cuentas;