import { useState, useEffect } from "react";
import "./App.css";

/*Me di cuenta despues de subirlo que no todas las letras tienen gatos en la api asi que hice cambios para que no se rompa en esos casos*/

function App() {
  const [data, setData] = useState([]);
  const [ranLet, setRanLet] = useState(randomLetter());
  const [ranNum, setRanNum] = useState({ index: 0, message: 0 });
  const key = "sMTvhIU/H+bqDXK4AZSL0Q==FADjoERg5xAChgBd";

  useEffect(() => {
    fetch(`https://api.api-ninjas.com/v1/cats?name=${ranLet}`, {
      method: "GET",
      headers: {
        "X-Api-Key": key,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Se rompio todo: ${res.status}`);
        }
        console.log("res >>>", res);
        return res.json();
      })
      .then((data) => {
        console.log("data >>>", data);
        setRanNum({
          index: Math.floor(
            Math.random() * data.length
          ) /* del array de gatos que elija uno aleatoriamente */,
          message: Math.floor(
            Math.random() * 2
          ) /* para que me elija uno de 2 mensajes, el origen del gato o cuanto miden*/,
        });
        if(data.length < 1){
          console.log('Re-generating...')
          setRanLet(randomLetter())}
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    } 
    , [ranLet,]); /*para que se vuelva a hacer la peticion actualizada cada que cambie ranLet*/

  /*generador de letras random*/
  function randomLetter() {
    const abcs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return abcs[Math.floor(Math.random() * abcs.length)];
  }

  function handleOnClick() {
    setRanLet(randomLetter());
  }

  return (
    <div>
      {data.length > 0 ? ( /* checkea que data no este vacio */
        <div className="card-container">
          <p className="card-fact">
            {ranNum.message == 1
              ? 
              /*mensaje "X cats are from Y"*/
              data[ranNum.index].name + " cats are from " + data[ranNum.index].origin 
              /*mensaje "X cats are Y long"*/
              : data[ranNum.index].name + " cats are " + data[ranNum.index].length + " long"}
          </p>
          <img className="card-image" src={data[ranNum.index].image_link}></img>
          {/* Cada que se clickea el boton ranLet cambia*/}
          <button onClick={handleOnClick} className="btn-fact">
            Next Fact
          </button>
        </div>
      ) : (
        /* si data esta vacia lo mas probable es que este cargando la api asi que -> */
        <div className="card-container">
          <p className="card-fact">
            Loading...
          </p>
          <img className="card-image"></img>
          {/* Cada que se clickea el boton ranLet cambia*/}
          <button onClick={handleOnClick} className="btn-fact">
            Next Fact
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
