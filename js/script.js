
const $studentsList = $('.student-list').children();
const $paginationDiv = $('<div class="pagination"></div>')
const ul = $('<ul></ul>');
const li = $('<li></li>');
const pageSize = 10;

//$($studentsList[1]).hide();

const pageCount = Math.ceil($studentsList.length/pageSize);


const appentPageLink = () => {
        for(let i=1;i<=pageCount;i++) {    
            let li = $('<li></li>');
            let anchor = $('<a class="active" href="#">' + i + '</a>');
            $(li).append(anchor);
            $(ul).append(li)    
            $paginationDiv.append(ul);
            $paginationDiv.append(ul);
            $('.student-list').append($paginationDiv);            
        }
}

const showPage = (pageNumber) => {
    console.log('Showing page number: ' + pageNumber);
    for(let i=0;i<$studentsList.length;i++) {
        if(i >= (pageNumber * 10) && i <= (pageNumber * 10)+9){
            $($studentsList[i]).show();
        }
        else
        {
            $($studentsList[i]).hide();
        }
    }
}

const addEventListener = () => {
    const $pages = $('.pagination li');
    for(let i=0;i<pageCount;i++) {
        $($pages)[i].click(function(){
        showPage(i);
    });
    
    }
}

showPage(0);
appentPageLink();
addEventListener();











