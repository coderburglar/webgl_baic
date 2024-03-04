const fetchData =async  (url:string)=>{

    const data = await fetch(url)
    return data
}

const fetchDataText = (promise:Promise<Response>)=>{
    return promise.then(res=>res.text())
}
const fetchDataJson = (promise:Promise<Response>)=>{
    return promise.then(res=>res.json())
}

export  {
    fetchData,
    fetchDataText,
    fetchDataJson
}