import { useDispatch, useSelector } from "react-redux";
import { sortByName, sortByWeight } from "../../redux/actions";
import styles from "./Order.module.css"

export default function Order(){
    const filteredDogs = useSelector(state => state.filteredDogs)
    const dispatch = useDispatch()

    function alphabetical(e){
        dispatch(sortByName(e.target.value))
    }

    let weight = (e) => {
        e.preventDefault()
        let value = e.target.value;
        var weightOrder = filteredDogs.map(el => {
            if (el.weight && !el.weighMin){
                return {
                    ...el,
                    weightMin: `${el.weight.charAt(0)}${el.weight.charAt(1)}`,
                  };
            }
            return {
                ...el
            }
        })
        if (value === "Weight Asc"){
            weightOrder.sort((a, b) => {
                return a.weightMin - b.weightMin
            })
        }
        if (value === "Weight Desc"){
            weightOrder.sort((a, b) => {
                return b.weightMin - a.weightMin
            })
        }
        dispatch(sortByWeight(weightOrder))
    }
    return (
        <div className={styles.containterOrder}>
            <div>
                Sort By:
                <select className={styles.selectNombre} onChange={alphabetical}>
                    <option disabled selected defaultValue>Alphabetical</option>
                    <option value="asc">Name A-Z</option>
                    <option value="desc">Name Z-A</option>
                </select>
            </div>
            <div>
                <select className={styles.selectPeso} onChange={(e) => weight(e)}>
                    <option disabled selected defaultValue>Weight</option>
                    <option>Weight Asc</option>
                    <option>Weight Desc</option>
                </select>
            </div>
        </div>
    )
}