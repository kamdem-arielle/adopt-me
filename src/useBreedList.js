import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
import { useParams } from "react-router-dom";

export default function useBreedList(animal){
    const result= useQuery(['breeds',animal],fetchBreedList)
    return [ result?.data?.breeds ?? [], result.status]
}