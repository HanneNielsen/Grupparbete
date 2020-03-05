var courses

$(document).ready(function(){// Funktion som körs när dokumentet laddas.

  $.getJSON("http://webbred2.utb.hb.se/~fewe/api/api.php?data=courses", { })//Hämtar API från denna adress
      .done(function(apiCourses) {//När den är hämtad så körs denna funktion
          courses = apiCourses // kursinformationen spras i courses
          printCourses(courses) //Anropar funktion för att skriva ut kursinnehållet.
      })
      .fail(function() {//Funktion som skriver i loggen om Api:n inte lyckats laddas.
        console.log("Det gick inte att hämta kursinformationen.")
      });
})


function printCourses(courses){
  for (var i = 0; i < courses.length; i++) { //For-loop som går igenom courses och skriver ut vald information om varje kurs i en egen div
  $("#div_courses").append($("<div>").attr("id", i).attr("class", "courseWrapper").append(
  $("<p>").html(courses[i].courseId).attr("class", "courseId").prepend("Kursens id: "),
  $("<p>").html(courses[i].courseName).attr("class", "courseName").prepend("Kursens namn: "),
  $("<p>").html(courses[i].credit).attr("class", "credit").prepend("Kurspoäng: "),
  $("<p>").html(courses[i].school).attr("class", "school").prepend("Skola: "),
  $("<p>").html(courses[i].startWeek).attr("class", "startWeek").prepend("Startvecka: "),
  $("<p>").html(courses[i].endWeek).attr("class", "endWeek").prepend("Slutvecka: ")
))
  }
}
