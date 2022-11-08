import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllDogs, getAllTemperaments } from "../../redux/actions";
import {Link} from "react-router-dom"
import Dog from "../Dog/Dog";
import Paginate from "../Paginate/Paginate";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";
import styles from "./Home.module.css";

export default function Home(){
  let dogs = useSelector((state) => state.filteredDogs);
 
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const indexLast = currentPage * dogsPerPage;
  const indexFirst = indexLast - dogsPerPage;
  const currentDogs = dogs.slice(indexFirst, indexLast);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTemperaments());
    if(!dogs.length)dispatch(getAllDogs());
  }, []);

  return (
    <div className={styles.padre}>
      <div className={styles.orderyFilter}>
        <Order/>
        <Filter setCurrentPage={setCurrentPage}/>
      </div>
      <div className={styles.carDog}>
      { currentDogs.map((e) => {
          return (
            <Dog
              key={e.id}
              id={e.id}
              img={e.img}
              name={e.name}
              temperaments={e.temperaments}
              temperament={e.temperament}
              weight={e.weight}
              weightMin={e.weightMin}
              weightMax={e.weightMax}
            />
          );
        })}
         </div>
         <div className={styles.containerPag}>
          <Paginate className={styles.container} dogsPerPage={dogsPerPage} paginado={paginado} dogs={dogs.length}/>
         </div>
    </div>
  );
}