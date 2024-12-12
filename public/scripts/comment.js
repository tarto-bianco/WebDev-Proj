let comment = document.getElementById("commentButton")
if(comment) comment.addEventListener('click', commentHere);

    function commentHere() {

        const commentTracker = document.getElementById("terminalentry").value; 

        console.log(commentTracker);
        
    }