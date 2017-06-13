$('#submit').click(function (evt) {
//   _   _  _          _   _             _  ___       _      _  __ 
//  | \ |_ /  |   /\  |_) |_   \  / /\  |_)  |   /\  |_) |  |_ (_  
//  |_/ |_ \_ |_ /--\ | \ |_    \/ /--\ | \ _|_ /--\ |_) |_ |_ __)                                                  
    var memoryDescription =
        $("#description").val();

    var memoryCategory =
        $('#category').val();

    var memoryTitle =
        $('#imagetitle').val();

    var memoryPoster =
        $('#imageposter').val();

    var memoryOwner =
        $('#imageowner').val();

    var memoryLocation =
        $('#imagewhere').val();

    var memoryGiver =
        $('#imagewho').val();
    evt.preventDefault();
    console.log(new FormData($('#form')[0]));                                                 
//  |\/|     | _|_  _  ._   | | ._  |  _   _.  _|  _ 
//  |  | |_| |  |_ (/_ |    |_| |_) | (_) (_| (_| _> 
//                              |                                                                        
    $.ajax({
        url: '/savefile',
        type: 'POST',
        data: new FormData($('#form')[0]),
        cache: false,
        contentType: false,
        processData: false,
        success: function (filename) {
            console.log(filename)
            // $('#output').attr({
            //     'src': '/uploads/' + filename
            // });
            $.post("/api/newMemory/", {
                title: memoryTitle,
                user: memoryPoster,
                owner: memoryOwner,
                giver: memoryGiver,
                description: memoryDescription,
                category: memoryCategory,
                picture: filename,
                date: Date.now()
            }, function (memory) {
                alert('you just posted!');
            });
        }
    });
});

$("#submitMemory").click(function () {
    //get contents of memory
    var memoryDescription =
        $("#description").val();

    var memoryCategory =
        $('#category').val();

    var memoryTitle =
        $('#imagetitle').val();

    var memoryPoster =
        $('#imageposter').val();

    var memoryOwner =
        $('#imageowner').val();

    var memoryLocation =
        $('#imagewhere').val();

    var memoryGiver =
        $('#imagewho').val();


    //send memory to server

});

function buildAndDisplayMemory(memory) {
    $(".display-results").prepend(
        `<hr><div id='${memory._id}' class='memorydisplay'>
                <span class='image'>
                    <img src='../uploads/${memory.picture}' class="thumbnails" id=${memory.picture} data-memoryId="${memory._id}">
                </span>
                <span class="memoryInfo">
                     <span class='title'>
                        <h4><b><u>
                            ${memory.title}
                            </u></b>
                                <br>
                                ${memory.category}
                            </h4>    
                        </span>
                        <br>
                    </span>
                 </span>    
            </div>`
    ); //closes out append after~display results
}

function buildAndDisplayLargerMemory(memory, picture, giver, title, category, user, owner, description) {
    $(".view-larger").text('');
    console.log(memory, picture)
    $(".view-larger").append(`
                <div class='larger-image'>
                    <img 
                        src='../uploads/${picture}' 
                        class='larger'>
                    <br>
                    <span class='largetitle'><h1>${title}</h1></span>
                    <span class='largeinfo'><sup>Submitted by ${user} </sup>
                    <br><img src="http://forgetmenotgts.co.uk/wp-content/themes/fmn/img/logo.png" class='drawnforgetmenot'>
                    <div class='largedescription'>
                        ${description}
                    </div><br>
                    <div class='largeinfo'>
                        Given by ${giver}
                        <br>
                        Category: ${category}<br>
                        Owned By: ${owner}
                        </span>
                    </div>
                </div>`
    )
};

function buildClickHandler() {
    var memoryId = memory._id;
    var memorypicture = this.memory.picture;
    var memorygiver = this.memory.giver;
    var memorytitle = this.memory.title;
    var memorycategory = this.memory.category;
    var memoryuser = this.memory.user;
    var memoryowner = this.memory.owner;
    var memorydescription = this.memory.description;
    $(`#${memoryId}`).click(function () {
        buildAndDisplayLargerMemory(memoryId, memorypicture, memorygiver, memorytitle, memorycategory, memoryuser, memoryowner, memorydescription);
    });
}



$.get("/api/memories", function (memories) {
    for (memory of memories) {
        buildAndDisplayMemory(memory);
        $('.thumbnails').click(buildClickHandler()
        )
    };
    // buildAndDisplayLargerMemory(memories[memories.length - 2]);
}); //closes out $.get

$('.close').click(function () {
    location.reload();
});
$('#modalbutton').click(function () {
    location.reload();
});