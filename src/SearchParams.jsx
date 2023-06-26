import { useState,useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import Pet from "./Pet";
import useBreedList from "./useBreedList";
import Results from "./Results";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
  const [requestParam,setRequestParams]=useState({
    location:'',
    animal:"",
    breed:""
  })
  const [animal, updateAnimal] = useState("");
  const [breeds] = useBreedList(animal)
  const result=useQuery(["search",requestParam],fetchSearch);
  if (result.isLoading) {
    return(
        <div className="loading-pane">
        <h2 className="loader">🌀</h2>
        </div>
    )  
}
  const pets=result?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form action="" onSubmit={(e) =>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const obj={
          animal:formData.get("animal") ?? "",
          location:formData.get("location") ?? "", 
          breed:formData.get("breed") ?? ""
        }
        setRequestParams(obj)
      }}>
        <label htmlFor="location">
          location
          <input
            type="text"
            id="location"
            name="location"
            placeholder="location"
          />
        </label>
        <label htmlFor="animal">
          animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              updateAnimal(e.target.value);
    
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))
            }
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets}  />
    </div>
  );
};
export default SearchParams;
