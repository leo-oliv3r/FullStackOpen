/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import countriesService from "./services/countries";

function Country({ country, detailed }) {
    if (detailed) {
        return (
            <>
                <h3>{country.name.common}</h3>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
                <div>
                    Languages:
                    <ul>
                        {Object.entries(country.languages).map((language) => (
                            <li key={language}>{language[1]}</li>
                        ))}
                    </ul>
                </div>
                <img src={country.flags.png} alt={country.flags.alt} />
            </>
        );
    }

    return <p>{country.name.common}</p>;
}

function CountryList({ countries }) {
    if (countries.length > 10) {
        return <p>Too many countries found, be more specific</p>;
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} detailed={true} />;
    }

    return countries.map((country) => <Country key={country.name.common} country={country} />);
}

function Search({ children, onChange }) {
    return (
        <>
            <label htmlFor="search">{children}</label>
            <input type="text" id="search" onChange={onChange} />
        </>
    );
}

function App() {
    const [countries, setCountries] = useState(null);
    const [countriesToRender, setCountriesToRender] = useState([]);

    useEffect(() => {
        countriesService.getAllCountries().then((res) => {
            setCountries(res);
        });
    }, []);

    function handleInputChange(event) {
        const currentInputValue = event.target.value;
        const countriesFound = countries.filter((country) =>
            country.name.common.toLowerCase().includes(currentInputValue.toLowerCase())
        );
        setCountriesToRender(countriesFound);
    }

    return (
        <div style={{ fontFamily: "sans-serif" }}>
            {countries && <Search onChange={(e) => handleInputChange(e)}>Search country: </Search>}
            <CountryList countries={countriesToRender}></CountryList>
        </div>
    );
}

export default App;
