import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Menus extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fix-top bg-dark">
        <div className="container-fluid">
        <Link className='navbar-brand' to='/'>Dock Practica</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className='nav-link' to='/Cuentas'>Cuentas</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to='/Transacciones'>Transacciones</Link>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    )
  }
}
