//Course constructor
function Course(title,instructor,image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}


//UI Contructor
function UI(){

}

UI.prototype.addCourseToList = function(course){
    const list = document.querySelector('.course-list');

    var html = `
            <tr>
                <td><img style="display:block;" width="200px" height="150px" src="img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" class="btnDelete">Delete</a></td>
            </tr>    
    `;

    list.innerHTML += html;
}

UI.prototype.clearControls = function(){
    const title = document.getElementById('title').value = "";
    const instructor = document.getElementById('instructor').value = "";
    const image = document.getElementById('image').value = "";
}

UI.prototype.deleteCourse = function(element){
    if(element.classList.contains('btnDelete')){
        element.parentElement.parentElement.remove();
    }
}

document.getElementById('new-course').addEventListener('submit',function(e){

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    if(title == "" || instructor == "" || image == ""){
        return alert("Please fill in all informations");
    }

    //Create course obj
    const course = new Course(title,instructor,image);

    //Create UI
    const ui = new UI();

    //Add Course to List
    ui.addCourseToList(course);

    //Clear controls
    ui.clearControls();

    e.preventDefault();
})

document.querySelector('.course-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteCourse(e.target);
});