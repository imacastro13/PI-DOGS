import React from "react";
import styles from "./Paginate.module.css"

export default function Paginate({paginado, dogsPerPage, dogs}){
    const pageNumbers = [];

    for (let a = 1; a <= Math.ceil(dogs / dogsPerPage); a++){
        pageNumbers.push(a)
    }

    return (
        <nav>
            <ul className={styles.container}>
                {pageNumbers && pageNumbers.map(number => (
                    <a className={styles.button} onClick={() => paginado(number)} key={number}>
                        <button className={styles.boton} type="button">{number}</button>
                    </a>
                ))}
            </ul>
        </nav>
    )
}