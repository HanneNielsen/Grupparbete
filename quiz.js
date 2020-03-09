var quiz = []
var chosenAnswers = []
var correctAnswers = []
var chosenquestion = []


$(document).ready(function () { // Funktion som körs när dokumentet laddas.

    $.getJSON("http://webbred2.utb.hb.se/~fewe/api/api.php?data=quiz") //Hämtar API från denna adress
        .done(function (apiquiz) { //När den är hämtad så körs denna funktion
            quiz = apiquiz
            $("#but_submit").click(function () { printquiz(quiz) })
        })
        .fail(function () { //Funktion som skriver i loggen om Api:n inte lyckats laddas.
            console.log("Det gick inte att hämta kursinformationen.")
        });
})

function printquiz(quiz) { //funktion för att skriva ut quiz:et.
    $("#but_submit").css("visibility", "hidden") //Döljer knappen but_submit
    $("#div_quiz").html("") //Rensar div:en för frågorna

    var qNumber = 1 //skapar en variabel för att hålla koll på vilket nummer det är på den aktuella frågan.
    for (var i = 0; i < quiz.length; i++) { //forloop som går igenom quiz och plockar ut frågor, svarsalternativ samt rätta svaren som spar dem i arrayer
        let newAnswers
        newAnswers = quiz[i].correct_answer.split(",").concat(quiz[i].incorrect_answers)
        correctAnswers.push(quiz[i].correct_answer)
        chosenAnswers[i] = newAnswers
        chosenquestion[i] = quiz[i].question
    }

    for (var i = 0; i < chosenAnswers.length; i++) { //En forloop för att skriva ut frågekorten. ett kort per runda i for-loopen.
        let tempAnswers = chosenAnswers[i]

        $("#div_quiz").append($("<div>").attr("id", i).attr("class", "quizQWrapper").append(
            $("<h1>").html("Fråga " + qNumber),
            $("<h4>").html(chosenquestion[i]),
        ))
        for (var y = 0; y < tempAnswers.length; y++) {
            $("#" + i).append($("<input>").attr("name", "answer" + i).attr("type", "radio").attr("value", tempAnswers[y]),
                $("<label>").attr("for", "answer" + i).html(tempAnswers[y] + "<br>")
            )
        }
        qNumber++
    }
    $("#div_quiz").append($("<button>").attr("id", "check").attr("class", "buttonbox").html("Rätta mina svar"))
    $("#check").click(function () { checkAnswers(quiz) }) //Skapar knappen för att kolla om man svarat rätt. anropar funktionen checkAnswers
    console.log("Här är alla frågor: ")
}


function checkAnswers() { //Funktion för att kolla om man svarat rätt, se hur många rätt, samt se vilka svar som var rätt eller fel.
    let numOfCorrAns = 0
    let notChecked = $("input").not("checked")
    let question
    let questionVal

    $("#check").css("visibility", "hidden") //döljer knappen check
    $("#but_submit").css("value", "Prova igen").css("visibility", "visible") //Gör knappen but_submit synlig

    for (var i = 0; i < quiz.length; i++) { //forloop för att checka av vilka av inputarna som är checkade eller inte. och spara vald information för att kunna jämföra med facit
        questionVal = $("input[name = answer" + i + "]:checked").val()
        question = $("input[name = answer" + i + "]:checked")
        notChecked = $("input[name = answer" + i + "]:not(checked)")
        if (questionVal == correctAnswers[i]) {  //If-sats som kollar om checkat svar är rätt svar, om det är det så läggs ett "poäng" till räkningen av rätta svar samt så görs bakgrunden i den div som frågan är i till grön
            console.log("Rätt svar på fråga: " + (i + 1))
            question.closest("div").append("<i class='fas fa-check'> Rätt svar!</i>") //Lägger till en bock på rätt svar

            numOfCorrAns++
        }
        else { //Om det inte är rätt svar, eller om inget svar är ikryssat så kommer ett kryss upp
            console.log("Fel svar på fråga: " + (i + 1))
            question.closest("div").append("<i class='fas fa-times'> Felaktigt svar!</i>")
            notChecked.closest("div").append("<i class='fas fa-times'> Ej i kryssat!</i>")
        }
    }
    
    $("#msg").html("Du fick " + numOfCorrAns + " rätta svar av " + quiz.length + " möjliga") //Meddelande skrivs ut för att meddela hur många rätt som studenten fått
}
 


// <i class='fas fa-times'></i>
// <i class="fas fa-check"></i>
