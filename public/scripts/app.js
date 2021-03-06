//   __                        _                                           
//  (_      |_  ._ _  o _|_   /  | o  _ |    __   |_|  _. ._   _| |  _  ._ 
//  __) |_| |_) | | | |  |_   \_ | | (_ |<        | | (_| | | (_| | (/_ |                                       
$('#submit').click(function (evt) {
    console.log('You Clicked')
        //   _                                                     
        //  | \  _   _ |  _. ._ _    \  / _. ._ o  _. |_  |  _   _ 
        //  |_/ (/_ (_ | (_| | (/_    \/ (_| |  | (_| |_) | (/_ _> 
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
    var memorywhere = 
        $('#imagewhere').val();
    var memorywhen = 
        $('#imagewhen').val();
        var memorytags = 
        $('#imagetags').val();
    evt.preventDefault();                                   
//  |\/|     | _|_  _  ._   | | ._  |  _   _.  _|  _ 
//  |  | |_| |  |_ (/_ |    |_| |_) | (_) (_| (_| _`> 
//                              |                                                                        
    $.ajax({
        url: '/savefile',
        type: 'POST',
        data: new FormData($('#form')[0]),
        cache: false,
        contentType: false,
        processData: false,
        success: function (filename) {
            if (memoryTitle.length === 0 || memoryPoster.length === 0 || memoryCategory.length === 0 || memoryDescription.length === 0){
                alert('You forgot a required field!');
            } else {
            $('#waiting').append('<br><br><br><marquee direction="left">...............</marquee>Your Image is Uploading, please wait<marquee direction="right">...............</marquee><br><br><br><br><br>');  
            $.post("/api/newMemory/", 
            {
            //   _                         _   _  
            //  |_) _   _ _|_   _|_  _    | \ |_) 
            //  |  (_) _>  |_    |_ (_)   |_/ |_)                                   
                title: memoryTitle,
                user: memoryPoster,
                owner: memoryOwner,
                giver: memoryGiver,
                description: memoryDescription,
                category: memoryCategory,
                dateofpost: Date,
                picture: filename, 
                where: memorywhere,  
                when: memorywhen,
                tags: memorytags        
            },            
            function (memory) {
                clearInputs(); 
                alert(`You just posted ${memoryTitle}!`);
            });            
        }}
    });    
});
//   _                ___                   
//  /  |  _   _. ._    |  ._  ._     _|_  _ 
//  \_ | (/_ (_| |    _|_ | | |_) |_| |_ _> 
//                            |         
function clearInputs(){
     document.getElementById('description').value = "";
     document.getElementById('imagetitle').value = "";
     document.getElementById('imageposter').value = "";
     document.getElementById('imageowner').value = "";
     document.getElementById('imagewhere').value = "";
     document.getElementById('imagewho').value = "";
     document.getElementById('imagetags').value = "";
     document.getElementById('imagewhen').value= "";
     $('#previewimage').attr('src', '');
     $('select').val('');
     $('#waiting').text('');
    //  $('#submitspan').append(`<button id="submit" class='purplebutton'>Submit Memory</button>`);
}
//    ___                                            
//     | |_      ._ _  |_  ._   _. o |   |  o  _ _|_ 
//     | | | |_| | | | |_) | | (_| | |   |_ | _>  |_     
function buildAndDisplayMemory(memory) {
    $(".display-results").prepend(
        `
        <br><br><br>
        <div id='${memory._id}' class='memorydisplay'>
                <span class='image'>
                    <img src='../uploads/${memory.picture}' 
                        class="thumbnails" id=${memory.picture} 
                        data-memoryId="${memory._id}">
                </span>
                <span class="memoryInfo">
                     <span class='title'>
                        <h3><b><u>
                            ${memory.title}
                            </u></b>
                                <br>
                                ${memory.category}
                            </h3>    
                                                    <hr>
                        </span>

                    </span>
                 </span>    
            </div>`
    ); 
}
//    |   _. ._ _   _  ._   \  / o  _       
//    |_ (_| | (_| (/_ |     \/  | (/_ \/\/ 
//              _|                      
function buildAndDisplayLargerMemory(memory, picture, giver, title, category, user, owner, description, date, where) {
    $(".view-larger").text('');
    console.log(memory, picture);
    if (where === undefined){
         $(".view-larger").append(`
                <div class='larger-image'>
                    <img 
                        src='../uploads/${picture}' 
                        class='larger'>
                    <br>
                    <span class='largetitle'><h1>${title}</h1></span>
                    <span class='largeinfo'><sup>Submitted by ${user} </sup>
                    <br><img src="../images/forgetmenotdrawn.png" class='drawnforgetmenot'>
                    <div class='largedescription'>
                        ${description}
                        <hr>
                    <br>
                        
                        Category: ${category}<br>
                        Owned By: ${owner}<br>
                        Given By: ${giver}
                        </span>
                    
                </div>`
    );
    } else if (giver === undefined || giver.length === 0){
         $(".view-larger").append(`
                <div class='larger-image'>
                    <img 
                        src='../uploads/${picture}' 
                        class='larger'>
                    <br>
                    <span class='largetitle'><h1>${title}</h1></span>
                    <span class='largeinfo'><sup>Submitted by ${user} </sup>
                    <br><img src="../images/forgetmenotdrawn.png" class='drawnforgetmenot'>
                    <div class='largedescription'>
                        ${description}
                        <hr>
                    <br>
                        <br>
                        From: ${where}<br>
                        Category: ${category}<br>
                        Owned By: ${owner}<br>
                </div>`
    );
    } else if(owner === undefined){
         $(".view-larger").append(`
                <div class='larger-image'>
                    <img 
                        src='../uploads/${picture}' 
                        class='larger'>
                    <br>
                    <span class='largetitle'><h1>${title}</h1></span>
                    <span class='largeinfo'><sup>Submitted by ${user} </sup>
                    <br><img src="../images/forgetmenotdrawn.png" class='drawnforgetmenot'>
                    <div class='largedescription'>
                        ${description}
                        <hr>
                    <br>
                        
                        <br>
                        From: ${where}<br>
                        Category: ${category}<br>
                        Given By: ${giver}
                        </span>
                </div>`
         )
    } else {
                $(".view-larger").append(`
                <div class='larger-image'>
                    <img 
                        src='../uploads/${picture}' 
                        class='larger'>
                    <br>
                    <span class='largetitle'><h1>${title}</h1></span>
                    <span class='largeinfo'><sup>Submitted by ${user} </sup>
                    <br><img src="../images/forgetmenotdrawn.png" class='drawnforgetmenot'>
                    <div class='largedescription'>
                        ${description}
                        <hr>
                    <br>
                        
                        <br>
                        From: ${where}<br>
                        Category: ${category}<br>
                        Owned By: ${owner}<br>
                        Given By: ${giver}
                        </span>
                </div>`
    );
    }
   
}
//   _                                                 ___                              
//  /  | o  _ |    __   |_|  _. ._   _| |  _  ._   o    | |_      ._ _  |_  ._   _. o | 
//  \_ | | (_ |<        | | (_| | | (_| | (/_ |    o    | | | |_| | | | |_) | | (_| | |                                                                                      
function buildClickHandler() {
    var memoryId = memory._id;
    var memorypicture = this.memory.picture;
    var memorygiver = this.memory.giver;
    var memorytitle = this.memory.title;
    var memorycategory = this.memory.category;
    var memoryuser = this.memory.user;
    var memoryowner = this.memory.owner;
    var memorydescription = this.memory.description;
    var memorydate = this.memory.dateofpost;
    var memorywhere = this.memory.where;

    $(`#${memorypicture}`).click(function () {
        buildAndDisplayLargerMemory(memoryId, memorypicture, memorygiver, memorytitle, memorycategory, memoryuser, memoryowner, memorydescription, memorydate, memorywhere);
    });
}
//    _                                               
//  (|     _   _ _|_   |\/|  _  ._ _   _  ._ o  _   _ 
//  _|) o (_| (/_ |_   |  | (/_ | | | (_) |  | (/_ _> 
//         _|                                         
var memory;
$.get("/api/memories", function (memories) {    
    for (memory of memories) {
        buildAndDisplayMemory(memory);
        $('.thumbnails').click(buildClickHandler()
        );
    }
}); 
//   _                                   
//  /  |  _   _  _    |\/|  _   _|  _. | 
//  \_ | (_) _> (/_   |  | (_) (_| (_| | 
$('.close').click(function () {
    location.reload();
});
$('#modalbutton').click(function () {
    location.reload();
});

//   _                                              
//  |_) ._ _     o  _         | | ._  |  _   _.  _| 
//  |   | (/_ \/ | (/_ \/\/   |_| |_) | (_) (_| (_| 
//                                |                 
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#previewimage').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$("#fileupload").change(function(){
    readURL(this);
});