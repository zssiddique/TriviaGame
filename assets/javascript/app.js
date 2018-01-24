//http://www.usefultrivia.com/miscellaneous_trivia/car_trivia_index.html

$(document).ready(function () {
    // STOPWATCH ACTIVITY (SOLUTION)
    // =============================
    var answer = 4;
    // This code will run as soon as the page loads
    window.onload = function () {
        $("#start").prop("disabled", false);
        $("#questions").hide();
        $(".alert").hide();
        $("#start").on("click", function () {
            $(this).prop("disabled", true);
            stopwatch.start()
        });
        $(".btn").on("click", function () {
            //var letter = $(this).attr("data-letter");

            answer = $(this).attr("id");
            console.log(answer);
            $("#questions").hide();
            //$(".alert").show();
            if (answer == triviagame[stopwatch.counter].answer) {
                $("#right-answer").text("CORRECT!!! " + triviagame[stopwatch.counter].details);
                $("#right-answer").show();
                stopwatch.correct++;
            }
            else {
                $("#wrong-answer").text("WRONG ANSWER!! Correct Answer is:" + triviagame[stopwatch.counter].details);
                $("#wrong-answer").show();
                stopwatch.wrong++;
            }
            stopwatch.reset();


        });
    };


    //  Variable that will hold our setInterval that runs the stopwatch
    var intervalId;
    var initial;

    //prevents the clock from being sped up unnecessarily
    var clockRunning = false;

    // Our stopwatch object
    var stopwatch = {

        time: 0,
        lap: 1,
        counter: 0,
        correct: 0,
        wrong: 0,

        reset: function () {

            stopwatch.time = 0;
            stopwatch.lap = 1;

            // DONE: Change the "display" div to "00:00."
            $("#display").text("00:00");
            if (answer == 4) {
                $("#questions").hide();
                $("#no-answer").text("NO SELECTION?? Correct Answer is: " + triviagame[stopwatch.counter].details);
                $("#no-answer").show();
                stopwatch.wrong++;
            }
            // DONE: Empty the "laps" div.
            //$("#laps").text("");
            clearInterval(intervalId);
            clearTimeout(initial);
            clockRunning = false;
            //stopwatch.start();
            stopwatch.counter++;
            if (stopwatch.counter < triviagame.length) {
                setTimeout(stopwatch.start, 5000);
            }
            else {
                setTimeout(stopwatch.stop, 5000);
            }

        },
        start: function () {
            // DONE: Use setInterval to start the count here and set the clock to running.
            if (!clockRunning) {
                answer = 4;
                $(".alert").hide();
                $("#questions").show();
                intervalId = setInterval(stopwatch.count, 1000);
                initial = setTimeout(stopwatch.reset, 10000);
                clockRunning = true;
                $("#triviaquestion").text(triviagame[stopwatch.counter].question);
                for (let i = 0; i < triviagame[stopwatch.counter].option.length; i++) {
                    $("#" + i).text(triviagame[stopwatch.counter].option[i]);
                }
            }
        },
        stop: function () {
            // DONE: Use clearInterval to stop the count here and set the clock to not be running.
            $("#questions").hide();
            $(".alert").hide();
            clearInterval(intervalId);
            clearTimeout(initial);
            clockRunning = false;
            $("#over").append("<p>Correct :" + stopwatch.correct + ", Wrong " + stopwatch.wrong + "</p>");
            $("#over").show();
            //setTimeout(location.reload(true), 10000);
        },

        count: function () {

            // DONE: increment time by 1, remember we cant use "this" here.



            stopwatch.time++;

            // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
            //       and save the result in a variable.
            var converted = stopwatch.timeConverter(stopwatch.time);
            console.log(converted);

            // DONE: Use the variable we just created to show the converted time in the "display" div.
            $("#display").text(converted);
        },
        timeConverter: function (t) {

            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (minutes === 0) {
                minutes = "00";
            }
            else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        }
    };

    var triviagame = [
        {
            question: "What is generally considered to be the first pony car?",
            option: ["PONTIAC FIREBIRD", "MERCURY COUGAR", "FORD MUSTANG", "CHEVROLET CAMARO"],
            answer: 3,
            details: "CHEVROLET CAMARO - Although Plymouth enthusiasts insist that the Baracuda beat the Ford Mustang to market by two weeks, the Mustang is generally considered the first pony car, a new class of automobile first introduced in 1964 and designed to be more compact and more affordable than the larger muscle cars that inspired them"
        },
        {
            question: "What was the first Japanese car to be produced in the United States?",
            option: ["HONDA ACCORD", "MAZDA  MIATA", "TOYOTA CAMRY", "NISSAN MAXIMA"],
            answer: 0,
            details: "HONDA ACCORD - In November of 1982, the first American-produced Honda Accord rolled off the assembly line at the Marysville Auto Plant in Ohio, making it the first Japanese car to be produced in the United States."
        }];

});