
const $studentsList = $('.student-list').children();
const $paginationDiv = $('<div class="pagination"></div>')
const ul = $('<ul></ul>');
const li = $('<li></li>');
const $errorMessage = $('<h1 class="error-message">No student found!!!!');
const pageSize = 10;

//$($studentsList[1]).hide();

const pageCount = Math.ceil($studentsList.length/pageSize);


const appentPageLink = (totalPages) => {
        for(let i=1;i<=totalPages;i++) {    
            let li = $('<li></li>');
            let anchor = $('<a href="#">' + i + '</a>');
            $(li).append(anchor);
            $(ul).append(li)    
            $paginationDiv.append(ul);
            
            $('.student-list').append($paginationDiv);            
        }
}

const showPage = (pageNumber, studentList) => {
    
    const allPages = $('li a');
    const $currentPage = $(allPages[pageNumber]);

    allPages.removeClass('active');
    $currentPage.addClass('active');
    if(studentList.length === 0){
        $($errorMessage).show();
        return;
    }

    for(let i=0;i<studentList.length;i++) {
        if(i >= (pageNumber * 10) && i <= (pageNumber * 10)+9){
            $(studentList[i]).show();
        }
        else
        {
            $(studentList[i]).hide();
        }
    }
}

const addEventListener = () => {
    const $pages = $('.pagination li');
    for(let i=0;i<pageCount;i++) {
        $($pages[i]).click(function(){
        showPage(i, $studentsList);
    });    
    }
}

//Search
const $searchDiv = $('.page-header');
const $div = $('<div class="student-search"></div>');
const $searchInput = $('<input placeholder="Search for students...">');
const $searchButton = $('<button>Search</button>');

$div.append($searchInput).append($searchButton);
$searchDiv.append($div);

$searchButton.click(()=> {
    $($errorMessage).hide();
    let $searchText = $('input').val();
    const pages = $('.pagination').remove();
    let matchedStudents = [];

    for(let i=0;i<$studentsList.length;i++) {
        $studentDetail = $($studentsList[i]);
         $($studentDetail).hide();
        $studentName = $($studentDetail.find('h3')[0]);
        $studentEmail = $($studentDetail.find('.email')[0]);
        
        
        if($searchText === $studentName.text() || $searchText === $studentEmail.text()) {
            matchedStudents.push( $studentDetail);
        }       
    }
    
     if(matchedStudents.length > 10) {
            const totalPages = Math.ceil(matchedStudents.length/pageSize);
            appentPageLink(pageCount);
        }

        showPage(0,matchedStudents);
});


const errorMessage = () => {
    $searchDiv.append($errorMessage);
}

appentPageLink(pageCount);
addEventListener();
showPage(0, $studentsList);
errorMessage();











