
    const apiKey = '960c93e69adcec3a0f660e6ac31f45d0';

    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        const countryCardsContainer = document.getElementById('country-cards');

        countries.forEach(country => {
          const card = document.createElement('div');
          card.classList.add('card', 'col-lg-4', 'col-sm-12', 'm-4');

          const cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.textContent = country.name.common;

          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          const flag = document.createElement('img');
          flag.classList.add('img-fluid');
          flag.src = country.flags.png;

          const capital = document.createElement('p');
          capital.textContent = `Capital: ${country.capital ? country.capital[0] : 'N/A'}`;

          const region = document.createElement('p');
          region.textContent = `Region: ${country.region}`;

          const countryCode = document.createElement('p');
          countryCode.textContent = `Country Code: ${country.cca3 ? country.cca3 : 'N/A'}`;

          const weatherButton = document.createElement('button');
          weatherButton.classList.add('btn', 'btn-primary');
          weatherButton.textContent = 'Get Weather';
          weatherButton.addEventListener('click', () => fetchWeather(country.capital ? country.capital[0] : 'N/A', weatherButton));

          cardBody.appendChild(flag);
          cardBody.appendChild(capital);
          cardBody.appendChild(region);
          cardBody.appendChild(countryCode);
          cardBody.appendChild(weatherButton);

          card.appendChild(cardHeader);
          card.appendChild(cardBody);

          countryCardsContainer.appendChild(card);
        });
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const fetchWeather = async (city, button) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weatherData = await response.json();

        if (weatherData && weatherData.main) {
          clearWeatherButtons();
          button.textContent = `${weatherData.main.temp}°C`;
        } else {
          console.error('Error fetching weather data');
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    const clearWeatherButtons = () => {
      const weatherButtons = document.querySelectorAll('button[class="btn btn-primary"]');
      weatherButtons.forEach(button => {
        button.textContent = 'Get Weather';
      });
    };

    fetchCountries();
  