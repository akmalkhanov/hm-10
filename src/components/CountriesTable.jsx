


import React, { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { IoEyeOutline } from "react-icons/io5";

function CountriesTable() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 
 

  const countriesPerPage = 10;

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      setCountries(data);
    }
    fetchCountries();
  }, []);



  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  return (
    <div className="container mx-auto p-4">
    
      <h1 className="text-2xl font-bold mb-4">Davlatlar ro'yhati</h1>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Davlat Nomi</th>
            <th className="border border-gray-300 px-4 py-2">Bayroq</th>
            <th className="border border-gray-300 px-4 py-2">Aholisi</th>
            <th className="border border-gray-300 px-4 py-2">Poytaxti</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries.map((country) => (
            <tr key={country.cca3}>
              <td className="border border-gray-300 px-4 py-2">
              
                  {country.name.common}
                
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} bayrog'i`}
                  className="w-10 h-auto"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.population.toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.capital[0]}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button  >
                  <IoEyeOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countries.length / countriesPerPage)}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
   
    </div>
  );
}

export default CountriesTable;
