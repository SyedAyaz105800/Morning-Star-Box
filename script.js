async function getData(symbol){
    const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`)
    const data = await response.json();
    return data;
}


function searchData(){
    let searchInput = document.querySelector("#inputSearchM")
    let searchQuery = searchInput.value
    if(searchQuery && searchQuery !== ""){
        let data = getData(searchQuery)
        data
        .then(res => colorBox(res))        
    }
    
}
function colorBox(data){
    let cap = 0;
    let vertical = 0;
    if (data.quoteResponse.result.length === 0){
        alert("Unable to fetch data. Please check the stock Symbol.")
        return
        }
    let mainData = data.quoteResponse.result[0] 
    let PE = mainData.ask / mainData.epsCurrentYear
    if(mainData.marketCap > 10000000000){
        cap = "Three"
    } else if(mainData.marketCap > 2000000000){
        cap = "Two"
    } else if(mainData.marketCap > 300000000 && mainData.marketCap < 2000000000){
        cap = "One"
    }
    if(PE > 20){
        vertical = "One"
    } else if(20 > PE > 15 ){
        vertical = "Two"
    } else if(15 > PE > 0){
        vertical = "Three"
    }
    if(cap !== 0 && vertical !== 0){
        let boxes = document.querySelectorAll(".valueBox")
        for(let i = 0; i < boxes.length; i++){
            boxes[i].style = "background-color: rgb(232, 232, 232)"
        }
        let grid = document.querySelector(`#grid${vertical}`)
        let column = grid.querySelector(`.valueBox${cap}`)
        column.style = "background-color: blue"
        
    }

}