import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreed } from "../../redux/actions";
import styles from "./Search.module.css"

export default function Search(){
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")

    function inputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }

    function onSubmit(e){
        e.preventDefault()
        setSearch("")
        dispatch(searchBreed(search))
    }

    return (
        <div className={styles.nav}>
        <form className={styles.form} onSubmit={onSubmit}>
        <input 
        className={styles.input} 
        type='text' placeholder="Search dog" 
        value={search} 
        onChange={inputChange}>
        </input>
        <input 
        className={styles.btn} 
        type='submit' 
        value='🔍'>
        </input>
        </form>
    </div>
    )
}