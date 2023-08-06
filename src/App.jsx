import React, { useState } from 'react'

export default function App() {
  // States
  const [city, setCity] = useState('')
  const [weatherForecast, setWeatherForecast] = useState(null)

  // Control Vars
  const handleCity = (event) => {
    setCity(event.target.value)
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=02b54b57286b4beb982150930230608&q=${city}&lang=pt`)
      .then((response) => {
        if (response.status == 200) {
          return response.json()
        }
      })
      .then((data) => {
        console.log('data ====>', data)
        setWeatherForecast(data)
      });
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a href="#top" className="navbar-brand text-white">
          Previsão do tempo - Kauã
        </a>
      </nav>
      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo</h1>

          <p className="lead">
            Insira o nome da sua cidade
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                type='text'
                className="form-control"
                value={city}
                onChange={handleCity}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="btn btn-primary btn-lg"
          >
            Pesquisar
          </button>

          {/* Infos from weather */}
          {
            weatherForecast ? (
              <div>
                <div className='mt-4 d-flex align-items-center'>
                  <div>
                    <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                    <p className='lead'>
                      Temperatura: {weatherForecast.current.temp_c}ºC
                    </p>
                    <p className='lead'>
                      Temperature: {weatherForecast.current.temp_f}ºF
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </main>
    </div>
  );
}