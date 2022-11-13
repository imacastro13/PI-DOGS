import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { postDog, getAllTemperaments } from "../../redux/actions";
import Logo from "../NavBar/prueba.png";
import Create from "./Foto.png"
import styles from "./AddDog.module.css";

export default function AddDog(){
    const dispatch = useDispatch()
    const history = useHistory()
    let temperaments = useSelector((state) => state.temperaments)
    const [dog, setDog] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpanMin: "",
        lifeSpanMax: "",
        img: "",
        temperament: [],
    })
    const [error, setError] = useState({
        error: "",
    })

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch])

    function validationForm(value) {
        let errors = {}
        if (!value.name) errors.value = "Must complete this field"
        if (value.heightMin < 0) errors.heightMin= "Minimum value is 1";
        if (parseInt(value.heightMax) <= parseInt(value.heightMin)) errors.heightMax = "Max value must be greater than Min"
        if (value.weightMin<0||value.weightMin>98)errors.weightMin= "Minimum value is 1";
        if (parseInt(value.weightMax) <= parseInt(value.weightMin)) errors.weightMax = "Max value must be greater than Min"
        if (value.lifeSpanMin<0||value.lifeSpanMin>20)errors.lifeSpanMin = "Minimum value is 1";
        if (parseInt(value.lifeSpanMax) <= parseInt(value.lifeSpanMin)) errors.lifeSpanMax = "Max value must be greater than Min"
        if (value.temperament.length < 1) errors.temperament = "Select at least one temperament"
        return errors;
    }

    const handleSelect = (e) => {
        if(!dog.temperament.includes(e.target.value)){
        setDog({
          ...dog,
          temperament: [...dog.temperament, e.target.value],
        })
        
        setError(
          validationForm({
            [e.target.name]: e.target.value,
          })
        )
        }
        else alert("Can't select the same temperament!")
    }

    function onInputChange(e) {
        e.preventDefault();
        setDog({
          ...dog,
          [e.target.name]: e.target.value,
        })
        
        setError(
          validationForm({
            ...dog,
            [e.target.name]: e.target.value,
          })
        );
    }
      function handleDelete(el) {
        setDog({
          ...dog,
          temperament: dog.temperament.filter((e) => e !== el),
        })
        console.log(dog)
    }
    
    function handleSubmit(e) {
      e.preventDefault();
        if (
          dog.name !== "" &&
          dog.heightMin !== "" &&
          dog.heightMax > dog.heightMin &&
          dog.weightMin !== "" &&
          dog.weightMax > dog.weightMin &&
          dog.lifeSpanMin !== "" &&
          dog.weightMax > dog.weightMin &&
          dog.temperament.length !== 0
        ){
        var objStringified = JSON.stringify(dog)
        dispatch(postDog(objStringified));
        alert("Dog created successfully");
        setDog({
          name: "",
          heightMin: "",
          heightMax: "",
          weightMin: "",
          weightMax: "",
          lifeSpanMin: "",
          lifeSpanMax: "",
          img: "",
          temperaments: [],
        });
        history.push("/home")
        } 
        else {
            alert("Complete all fields")
        };
    }
    return (
        <div className={styles.containerPadre}>
          <NavLink className={styles.navLogo} to="/home">
            <li>
              <img className={styles.logo} src={Logo} alt="" />
            </li>
          </NavLink>
          <div className={styles.padre}>
            <div className={styles.container}>
            <img className={styles.create} src={Create} alt="" />
              <form onSubmit={(e) => { handleSubmit(e);  
              }}
              >
                <p tag="name"> </p>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="name"
                  id="name"
                  type="text"
                  value={dog.name}
                  className={styles.input}
                  placeholder="Name"
                />
                {error.name ? <p className={styles.letter}> {error.name} </p> : null}
    
                <p tag="heightMin"> </p>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="heightMin"
                  id="heightMin"
                  type="number"
                  value={dog.heightMin}
                  className={styles.input}
                  placeholder="Min-Height"
                />
                {error.heightMin ? ( <p className={styles.letter}> {error.heightMin} </p>) : null}
                
                <p tag="heightMax"></p>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="heightMax"
                  id="heightMax"
                  type="number"
                  min="1"
                  max="99"
                  value={dog.heightMax}
                  className={styles.input}
                  placeholder="Max-Height"
                />
                {error.heightMax ? ( <p className={styles.letter}> {error.heightMax} </p>) : null}
                
                <p tag=""></p>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="weightMin"
                  type="number"
                  value={dog.weightMin}
                  className={styles.input}
                  placeholder="Min-Weight"
                />
                {error.weightMin ? ( <p className={styles.letter}> {error.weightMin} </p>) : null} 
                <p tag=""></p>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="weightMax"
                  type="number"
                  value={dog.weightMax}
                  className={styles.input}
                  placeholder="Max-Weight"
                />
                {error.weightMax ? (<p className={styles.letter}> {error.weightMax} </p>) : null}
                
                <p tag=""></p>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="lifeSpanMin"
                  type="number"
                  value={dog.lifeSpanMin}
                  className={styles.input}
                  placeholder="Min-Life-Span"
                />
                 {error.lifeSpanMin ? ( <p className={styles.letter}> {error.lifeSpanMin} </p>) : null}
                <p tag=""></p>
                <input
                  onChange={(e) => onInputChange(e)}
                  name="lifeSpanMax"
                  type="number"
                  value={dog.lifeSpanMax}
                  className={styles.input}
                  placeholder="Max-Life-Span"
                />
                {error.lifeSpanMax ? ( <p className={styles.letter}> {error.lifeSpanMax} </p>) : null}
                <input
                  onChange={(e) => onInputChange(e)}
                  name="img"
                  type="text"
                  value={dog.img}
                  className={styles.input}
                  placeholder="Image URL"
                />
                <p className={styles.letter}>Select Temperaments: </p>
                <select
                  className={styles.selectT}
                  onChange={(e) => handleSelect(e)}
                  name="temperament"
                >
                {temperaments.map((e, i) => (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  ))}
                  <option disabled selected defaultValue>Temperament:</option>
                </select>
                <ul className={styles.ul}>
                <li className={styles.li} key={"key"}>
                  {dog.temperament.map((el) => (
                    <button
                      className={styles.botonTemp}
                      type="button"
                      key={el.id}
                      onClick={() => handleDelete(el)}
                    > {el} X
                    </button>
                  ))}
                </li>
              </ul>
                {error.temperament ? (<p className={styles.letter}> {error.temperament} </p>) : null}
                <p tag=""></p>
                <br />
                <div className={styles.but}>
                <button type="submit">
                <span class="text">CREATE</span>
            </button>
          </div>
                {Object.keys(error).length === 0 ? null : (
                  <p className={styles.danger}>
                    Complete all the fields without errors.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      );
}