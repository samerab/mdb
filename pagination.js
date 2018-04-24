

function generateNumbersArray(start, end, step = 1)
{
    var arr = [];
    for(var i = start; i <= end; i = i + step)
    {
        arr.push(i);
    }
    return arr;

}


function generatePagerArray(dataArray, PagesToShow,currentPage, lastPage){
    //var lastPage = dataArray[dataArray.length-1];
    if(PagesToShow > lastPage){
        PagesToShow = lastPage;
    }
    var start,end, after, before;
     
    if( PagesToShow >= 3){
        before = Math.floor(PagesToShow / 2);
        after = PagesToShow - before -1;



        if( start == 1){
            end = PagesToShow;
        }
        else {
            end = lastPage - currentPage >= after ? currentPage + after : lastPage;
        }


        if( end == lastPage){
            start = end - PagesToShow + 1;
        }
        else {
            start = currentPage > before ? currentPage - before : 1;
        }
        
    }
    else if(PagesToShow == 2){
        start = currentPage - 1;
        end = currentPage;
    }
    else {
        start = end = currentPage;
    }
    
    return generateNumbersArray(start,end);
    
    
}


function pager(dataArray,itemsPerPage, PagesToShow, currentPage = 1){
    var totalPages = Math.ceil(dataArray.length / itemsPerPage); 
    var childArr = [];
    var endArr = [];
    var pagerButtonsArray = generatePagerArray(dataArray, PagesToShow,currentPage, totalPages);
    for( var i = 0; i < dataArray.length; i = i + itemsPerPage){
        for( var j = i; j < Math.min(i + itemsPerPage, dataArray.length); j++){
            childArr.push(dataArray[j]);
        }
        endArr.push(childArr);
        childArr = [];
    }

    
    return {
        endArray: endArr,
        pagerButtonsArray: pagerButtonsArray
    };
}

console.log(pager([1,2,3,4,5,6,7],2, 3,4));
