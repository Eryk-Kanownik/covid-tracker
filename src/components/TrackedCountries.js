import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CountryCard from './CountryCard'
import Loading from './Loading'
import Info from './Info'
const TrackedCountries = () => {
    const [data,setData] = useState(0)
    var local = localStorage.trackedCountries ? localStorage.trackedCountries.split(',').map(elem => parseInt(elem)) : []
    useEffect(() => {
        axios.get('/summary').then(res =>{
            let tracked = local.map((elem,index) =>{ 
                return {
                    ...res.data.Countries[elem],
                    countryIndex:elem,
                    inLocalStorage:true
                }})
            setData(tracked)
        });
    },[])

    const del = (delIndex) => {
        let indexD = data.map(elem => elem.countryIndex).indexOf(delIndex)
        let newTable = data.filter((elem,index) => index !== indexD)
        setData(newTable)
        newTable = newTable.map(elem => elem.countryIndex)
        localStorage.trackedCountries = newTable
    }
    const add = (index) => {
        if(localStorage.trackedCountries.includes(index)){

        } else {
            localStorage.trackedCountries.length ? localStorage.trackedCountries += ',' + index  : localStorage.trackedCountries = index
        }
        local = localStorage.trackedCountries
    }
    return (
        <div className="screen-format">
            {
                local.length ? null : <Info info="You have no tracked countries"/>
            }

            {
                data ? data.map((elem,index) => 
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
    )
}

export default TrackedCountries
