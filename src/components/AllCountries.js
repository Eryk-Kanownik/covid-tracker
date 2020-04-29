import React,{ useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import axios from 'axios'
import Loading from './Loading'
import SearchBar from './SearchBar'

const AllCountries = () => {
    const [data,setData] = useState(0)
    const [filtered,setFiltered] = useState(0)
    const [sortType,setSortType] = useState("NAME")
    const [searchTyping,setSearchTyping] = useState()

    useEffect(() => {
        axios.get('/summary').then( res =>{
            let dataToSet = res.data.Countries.map((elem,index) => {
                 return {
                     ...elem,
                     countryIndex:index,
                     inLocalStorage:localStorage.trackedCountries.split(',').map(elem => parseInt(elem)).includes(index)
                    }})
            setData(dataToSet)
            setFiltered(dataToSet)
        });
    },[])

    const del = (delIndex) => {
        let indexD = localStorage.trackedCountries.split(',').map(elem => parseInt(elem)).indexOf(delIndex)
        localStorage.trackedCountries = localStorage.trackedCountries.split(',').map(elem => parseInt(elem)).filter((elem,index) => index !== indexD)
        let indexOfAdded = data.map(elem => elem.countryIndex).indexOf(delIndex)
            let newData = data;
            newData[indexOfAdded].inLocalStorage = false;
            setData([...newData])
    }

    const add = (index) => {
        if(localStorage.trackedCountries.includes(index)){

        } else {
            localStorage.trackedCountries.length > 0 ? localStorage.trackedCountries += ',' + index  : localStorage.trackedCountries = index
            let indexOfAdded = data.map(elem => elem.countryIndex).indexOf(index)
            let newData = data;
            newData[indexOfAdded].inLocalStorage = true;
            setData([...newData])
        }
    }

    useEffect(()=>{
        const sort = (value) => {
            switch(value){
                case "NAME":{
                    return setFiltered(data ? [...data].sort((a,b) => b.Country > a.Country ? -1 : 1) : null)
                }
                case "CONFIRMED":{
                    return setFiltered(data ? [...data].sort((a,b) => b.TotalConfirmed - a.TotalConfirmed) : null)
                }
                case "DEATHS":{
                    return setFiltered(data ? [...data].sort((a,b) => b.TotalDeaths - a.TotalDeaths) : null)

                }
                case "RECOVERED":{
                    return setFiltered(data ? [...data].sort((a,b) => b.TotalRecovered - a.TotalRecovered): null)
                }
                default:{
                    return setFiltered(data ? [...data].sort((a,b) => b.Country > a.Country ? -1 : 1) : null)
                }
            }
        }  
        sort(sortType)
    },[sortType])

    useEffect(() => {
        const search = (value) => {
            let lookFor = data ? [...data].filter(elem => elem.Country.toLowerCase().includes(value)) : null
            setFiltered(lookFor)
        }
        search(searchTyping)

    },[searchTyping])

    return (
        <div>
            <SearchBar search={setSearchTyping} sort={setSortType}/>
            <div className="screen-format">
                
                {
                    filtered ? filtered.map((elem,index) => 
                        <CountryCard 
                            countryName={elem.Country}
                            newConfirmed={elem.NewConfirmed}
                            totalConfirmed={elem.TotalConfirmed}
                            newDeaths={elem.NewDeaths}
                            totalDeaths={elem.TotalDeaths}
                            newRecovered={elem.NewRecovered}
                            totalRecovered={elem.TotalRecovered}
                            date={elem.Date} 
                            key={index}
                            index={elem.countryIndex}      
                            del={del}  
                            add={add}  
                            inStorage={elem.inLocalStorage}
                        />
                    ) : <Loading />
                }
                
            </div>
        </div>
        
    )
}

export default AllCountries
