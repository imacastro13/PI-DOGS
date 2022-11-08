import React from "react";
import {Link} from "react-router-dom";
import styles from "./Landing.module.css"

export default function Landing(){
    return(
        <div className={styles.container}>
            <div className={styles.div}>
                <h1>DOGS PI</h1>
                <Link to ="/home">
                 <button className={styles.btn}>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}