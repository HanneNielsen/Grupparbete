var information
var studentLogin = false
$(document).ready(function(){ //funktion som körs när dokumentet laddas

  $.getJSON("http://webbred2.utb.hb.se/~fewe/api/api.php?data=students", {}) //Hämtar API
      .done(function(students) { //Funktion vid success
          information = students //För över informationen till en array
      })
      .fail(function(jqxhr, textStatus, error) { //Om det inte går att ladda API så skriv ett felmeddelande in i loggen
        console.log("Det gick inte att hämta informationen.")
      });

    $("#but_submit").click(function(){ //När det klickas på knappen but_submit så körs följande funktion
        var usernameTyped = $("#txt_uname").val().trim() //Skrivna uppgifter lagras i variabler
        var passwordTyped = $("#txt_pwd").val().trim()

        if( usernameTyped != "" && passwordTyped != "" ){ //if-sats för att se så att det är något ifyllt i inmatningsfälten. Är det det så Körs nästa if-sats
          for (var i = 0; i < information.length; i++) { //For loop som går igenom hela informationen
            if (information[i].login.username == usernameTyped && information[i].login.password == passwordTyped) { //If-sats som jämför om inskrivna inloggningsuppgifter stämmer med någon användare i informationen som är hämtad, stämmer det så skrivs det ut att inloggningen var lyckad och en fördröjningstajmer går inte och en laddningsanimering visas innan studenten skickas vidare till sidan student.html
              $('#message').html("Inloggning lyckades.")
              console.log("Rätt inloggningsuppgifter.")
              studentLogin = true
              console.log("Inloggning: " + studentLogin)
              $("#loaderIcon").css("visibility", "visible")
              setTimeout(function(){ window.location.href = "student.html" }, 2000);
              
            }
            if (studentLogin == false) { //Om studenten skrivit fel inloggningsuppgifter så skrivs ett meddelande ut för att uppman att prova igen
              $('#message').html("Du skrev in fel inloggningsuppgifter, vänligen försök igen")
              // usernameTyped.html("")
              // passwordTyped.html("")

            }
          }
        }
    })
})
