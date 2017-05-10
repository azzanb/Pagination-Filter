
//Initial html elements and selection
const $studentsList = $('.student-list').children(); //Select all students
//Default page size
const pageSize = 10;
//Total page count 
const pageCount = Math.ceil($studentsList.length/pageSize);


//Create pages and add them to the end
const appentPageLink = (totalPages) => {
        const $paginationDiv = $('<div class="pagination"></div>')
        const ul = $('<ul></ul>');
        for(let i=1;i<=totalPages;i++) {    
            let li = $('<li></li>');        //create li
            let anchor = $('<a href="#">' + i + '</a>'); //create anchor so that user can click and browse to a page
            $(li).append(anchor); //append anchor to li
            $(ul).append(li)    //append li to ul
            $paginationDiv.append(ul); //append ul to pagination div
            
            $('.student-list').append($paginationDiv);     //append pagination div to student list       
        }

        //Add events for page click
        addEventListener();
}

// Display students for a given page and students
const showPage = (pageNumber, studentList) => {
    //Get all pages on page
    const allPages = $('li a');

    //Get current page
    const $currentPage = $(allPages[pageNumber]);

    //remove class active from all pages
    allPages.removeClass('active');

    //add class active to current page
    $currentPage.addClass('active');

    //Loop through all students add display student for given page
    for(let i=0;i<studentList.length;i++) {
        if(i >= (pageNumber * 10) && i <= (pageNumber * 10)+9) {
            $(studentList[i]).show();
        }
        else
        {
            $(studentList[i]).hide();
        }
    }
}


// Add event listener when any page is clicked
const addEventListener = () => {
    //Get all pages
    const $pages = $('.pagination li');

    //Loop through all pages
    for(let i=0;i<pageCount;i++) {
        //Add click handler to page
        $($pages[i]).click(function(){
        // Display selected page
        showPage(i, $studentsList);
    });    
    }
}

//Display students when user enters a search criteria
const AddSearchEventListener = ($searchButton) =>  $searchButton.click(()=> {

    //Hide error message
    $('.error-message').hide();
    
    //Remove all pages
    $('.pagination').empty();

    //Get matched students based on search criteria
    let matchedStudents = getMatchedStudents();

    //If total students greater than 10 then create page link
    if(matchedStudents.length > pageSize) {
            const totalPages = Math.ceil(matchedStudents.length/pageSize);
            appentPageLink(totalPages);
        }

        //If no student matches search criteria then show error message
        if(matchedStudents.length === 0) {
            $('.error-message').show();
        }
        //Show matched students
        showPage(0,matchedStudents);
});


//Add search elements to the page
const addSearch = () => {
    const $searchDiv = $('.page-header'); // To get page header
    const $div = $('<div class="student-search"></div>'); //Student search div
    const $searchInput = $('<input placeholder="Search for students...">'); //Input textbox with placeholder
    const $searchButton = $('<button>Search</button>'); //Search button
    $div.append($searchInput).append($searchButton); // Append search button to input
    $searchDiv.append($div); //Append

    AddSearchEventListener($searchButton);

}

//Get matched students based on user's search criteria
const getMatchedStudents = () => {
    //Get user input
    let $searchText = $('input').val().toLowerCase();
    $('input').val('');
    let matchedStudents = [];

    //Loop through all students
    for(let i=0;i<$studentsList.length;i++) {
        $studentDetail = $($studentsList[i]);
        //Hide current student
        $($studentDetail).hide();
        //Get student name
        $studentName = $($studentDetail.find('h3')[0]);
        //Get student email
        $studentEmail = $($studentDetail.find('.email')[0]);
    
        //If student name or email matched then add in match list
        if($studentName.text().indexOf($searchText) !== -1 || $studentEmail.text().indexOf($searchText)!== -1) {
            matchedStudents.push( $studentDetail);
        }       
    }

    //Return matched students
    return matchedStudents;
}

//Creat error messsage div and hide it initially
const errorMessage = () => {
    const $errorMessage = $('<h1 class="error-message">No student found!!!!</h1>'); //To display error message
    $('.page-header').append($errorMessage);
    $($errorMessage).hide();
}

//Create page links for students
appentPageLink(pageCount);

//Show first 10 students initially when page loads for first time
showPage(0, $studentsList);
//Add search functionality
addSearch();

//Add error message div
errorMessage();











