//Course calss
class Course {
    constructor(title,instructor,image){
        this.courseId = Math.floor(Math.random()*10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

//UI Class
class UI {
    addCourseToList(course){
        const list = document.querySelector('.course-list');

    var html = `
            <tr>
                <td><img style="display:block;" width="200px" height="150px" src="img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" data-id="${course.courseId}" class="btnDelete">Delete</a></td>
            </tr>    
    `;

    list.innerHTML += html;
    }

    clearControls(){
        const title = document.getElementById('title').value = "";
        const instructor = document.getElementById('instructor').value = "";
        const image = document.getElementById('image').value = "";
    }

    deleteCourse(element){
        if(element.classList.contains('btnDelete')){
            element.parentElement.parentElement.remove();
        }
    }
}

//Storage Class
class Storage {

    static getCourses() {
        let courses;

        if(localStorage.getItem('courses') === null){
            courses=[];
        }else{
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    static displayCourses() {
        const courses = Storage.getCourses();

        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });

    }

    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));
    }

    static deleteCourse(element) {
        if(element.classList.contains('btnDelete')){
            const id = element.getAttribute('data-id');
            

            const courses = Storage.getCourses();

            courses.forEach((course,index) => {
                if(course.courseId == id){
                    courses.splice(index,1);
                }
            });

            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }

}

document.addEventListener('DOMContentLoaded', Storage.displayCourses);


document.getElementById('new-course').addEventListener('submit',function(e){

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    if(title == "" || instructor == "" || image == ""){
        return alert("Please fill in all informations");
    }

    //Create course obj
    const course = new Course(title,instructor,image);

    console.log(course);

    //Create UI
    const ui = new UI();

    //Add Course to List
    ui.addCourseToList(course);

    //Save to Local Storage
    Storage.addCourse(course);

    //Clear controls
    ui.clearControls();

    e.preventDefault();
})

document.querySelector('.course-list').addEventListener('click',function(e){
    const ui = new UI();

    //Delete Course
    ui.deleteCourse(e.target);

    //Delet from LS
    Storage.deleteCourse(e.target);

});