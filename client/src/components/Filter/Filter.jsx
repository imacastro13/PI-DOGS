import { useDispatch, useSelector } from "react-redux";
import { filterTemperaments } from "../../redux/actions";
import styles from "./Filter.module.css"

export default function Filter({setCurrentPage}){
    let dispatch = useDispatch();
    let {dogs, temperaments} = useSelector((state) => state)

    const onChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        var filter = dogs.filter(e => {
            if (value === "All"){
                return e;
            }
            else if (value === "Existing"){
                return !e.createdInDb;
            }
            else if (value === "Created"){
                return e.createdInDb;
            }
            return e
        });
        dispatch(filterTemperaments(filter));
        setCurrentPage(1);
    }

    const temps = (e) => {
        e.preventDefault()
        const value = e.target.value;
        let filtro = dogs.filter(e => {
            if (!e.temperament) {
                return "Error";
            }
            else if (value === "Temperament"){
                return e;
            }
            return e.temperament.includes(value);
        });
        dispatch(filterTemperaments(filtro));
        setCurrentPage(1);
    }

    return(
        <div className={styles.containerFilter}>
            <div>
                Filter by:
                <select className={styles.selectT} onChange={(e) => temps(e)}>
                    <option>Temperament</option>
                   {temperaments.map((e, a) => (
                    <option key={a}>{e}</option>
                   ))}
                </select>
                <select className={styles.selectABD} onChange={(e) => onChange(e)}>
                    <option>All</option>
                    <option>Existing</option>
                    <option>Created</option>
                </select>
            </div>
        </div>
    )
}