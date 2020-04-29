import React,{useEffect,useState} from 'react'
import axios from 'axios'

const GlobalSummary = () => {
    const [summary,setSummary] = useState()
    useEffect(() => {
        axios.get('/summary').then(res => setSummary(res.data.Global))
    },[])
    console.log(summary)
    return (
        
        <div className="global">
            <h1>Global Stats</h1>
            <h2>New Confirmed: { summary ? summary.NewConfirmed : null}</h2>
            <h2>Total Confirmed: { summary ? summary.TotalConfirmed : null}</h2>
            <h2>New Deaths: { summary ? summary.NewDeaths : null}</h2>
            <h2>Total Deaths: { summary ? summary.TotalDeaths : null}</h2>
            <h2>New Recovered: { summary ? summary.NewRecovered : null}</h2>
            <h2>Total Recovered: { summary ? summary.TotalRecovered : null}</h2>
            <h1></h1>
        </div>
    )
}

export default GlobalSummary
