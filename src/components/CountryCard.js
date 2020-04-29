import React from 'react'

const CountryCard = ({newConfirmed,totalConfirmed,newDeaths,totalDeaths,newRecovered,totalRecovered,countryName,date,index,add,del,inStorage}) => {
    return (
        <div className={`country-card`}>
            <div className="header">
                <h3>{countryName}</h3>
                {   
                     inStorage ?
                        <div onClick={() => del(index)}><h3>-</h3></div>
                        :
                        <div onClick={() => add(index)}><h3>+</h3></div>
                }
            </div>
            <div className="content">
                <p className="red">New Confirmed</p><p className="text-align red">{newConfirmed}</p>
                <p className="red">Total Confirmed</p><p className="text-align red">{totalConfirmed}</p>
                <p className="red">New Deaths</p><p className="text-align red">{newDeaths}</p>
                <p className="red">Total Deaths</p><p className="text-align red">{totalDeaths}</p>
                <p className="green">New Recovered</p><p className="text-align green">{newRecovered}</p>
                <p className="green">Total Recovered</p><p className="text-align green">{totalRecovered}</p>
            </div>
            <div className="footer">
                {date}
            </div>
        </div>
    )
}

export default CountryCard
