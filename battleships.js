//                  Array:
//                            0 = tom ruta
//                            1 = skepp
//                            2 = träffat skepp
//                            3 = miss

$(document).ready(function() {
    shootListener();
    boatListener();
    resetListener();
    boatListenerType();


    var ref = new Firebase('https://blinding-heat-5966.firebaseio.com/');

    var bytSiffror = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "L"];
    var spelareEtt = skapaSpelarArray();
    var spelareTva = skapaSpelarArray();

    skapaPlan(spelareEtt);

    getSpelplan();

    function getSpelplan() {
        ref.on("value", function(snapshot) {
            var object = snapshot.val();
            spelareEtt = JSON.parse(object.spelare.spelareEtt);
            redigeraPlan(spelareEtt);
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    function shootListener() {
        $('.shoot').click(function() {
            $('form').submit(function(event) {
                event.preventDefault();
            });

            var form = document.getElementById("shoot");
            var xKord = form.elements[0].value;
            var yKord = form.elements[1].value;

            skjut(xKord, yKord, spelareEtt);

            var json_spelareEtt = JSON.stringify(spelareEtt);

            var spelarRef = ref.child("spelare");
            spelarRef.set({
                spelareEtt: json_spelareEtt
            });

            getSpelplan();
//            redigeraPlan(spelareEtt);
        });
    }

    function boatListener() {
        $('.placeBoat').click(function() {
            $('form').submit(function(event) {
                event.preventDefault();
            });

            var form = document.getElementById("placeBoat");
            var xKord = form.elements[0].value;
            var yKord = form.elements[1].value;

            skapaSkepp(xKord, yKord, spelareEtt);

            var json_spelareEtt = JSON.stringify(spelareEtt);

            var spelarRef = ref.child("spelare");
            spelarRef.set({
                spelareEtt: json_spelareEtt
            });

            getSpelplan();
//            redigeraPlan(spelareEtt);
        });
    }

    function boatListenerType() {
        $('.placeBoatType').click(function() {
            $('form').submit(function(event) {
                event.preventDefault();
            });
            var form = document.getElementById("placeBoatType");
            var xKord = form.elements[0].value;
            var yKord = form.elements[1].value;
            var direction = form.elements[6].value;
            var type = $('.radio:checked').val();

//            console.log("x: " + xKord);
//            console.log("y: " + yKord);
//            console.log("typ: " + type);
//            console.log("riktning: " + direction);

            skapaSkeppTyp(type, direction, xKord, yKord, spelareEtt);

            var json_spelareEtt = JSON.stringify(spelareEtt);

            var spelarRef = ref.child("spelare");
            spelarRef.set({
                spelareEtt: json_spelareEtt
            });

            getSpelplan();
//            redigeraPlan(spelareEtt);
        });
    }

    function resetListener() {
        $('.reset').click(function() {
            $('form').submit(function(event) {
                event.preventDefault();
            });
            spelareEtt = reset(spelareEtt);
            var json_spelareEtt = JSON.stringify(spelareEtt);
            var spelarRef = ref.child("spelare");
            spelarRef.set({
                spelareEtt: json_spelareEtt
            });

            getSpelplan();
//            redigeraPlan(spelareEtt);
        });
    }

    function skapaSpelarArray() {
        var tmpArray = new Array(10);
        for (x = 0; x < 10; x++) {
            tmpArray[x] = new Array(10);
        }
        for (x = 0; x < 10; x++) {
            for (y = 0; y < 10; y++) {
                tmpArray[x][y] = 0;
            }
        }
        return tmpArray;
    }

    function skapaPlan(spelarArray) {
        for (i = 0; i < 10; i++) {
            $('#spelplan').append('<ul id="ruta' + i + '" class="spelare"><p>' + i + '</p>');
            for (n = 0; n < 10; n++) {
                switch (spelarArray[i][n]) {
                    case 0:
                        $("#ruta" + i).append('<li><div class="' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 1:
                        $("#ruta" + i).append('<li><div class="skepp ' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 2:
                        $("#ruta" + i).append('<li><div class="skeppHit ' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 3:
                        $("#ruta" + i).append('<li><div class="miss ' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    default:
                        console.log("Borde inte hända.");
                }
            }
            $('#spelplan').append('</ul>');
        }
    }

    function redigeraPlan(spelarArray) {
        for (i = 0; i < 10; i++) {
            $('#ruta' + i).replaceWith('<ul id="ruta' + i + '" class="spelare"<p>' + i + '</p>');
            for (n = 0; n < 10; n++) {
                switch (spelarArray[i][n]) {
                    case 0:
                        $("#ruta" + i).append('<li><div class="' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 1:
                        $("#ruta" + i).append('<li><div class="skepp ' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 2:
                        $("#ruta" + i).append('<li><div class="skeppHit ' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 3:
                        $("#ruta" + i).append('<li><div class="miss ' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    default:
                        console.log("Borde inte hända.");
                }
            }
        }
    }

    function skapaSkepp(xKord, yKord, spelarArray) {
        spelarArray[xKord][yKord] = 1;

    }

    function skjut(xKord, yKord, spelarArray) {
        switch (spelarArray[xKord][yKord]) {
            case 0:
                spelarArray[xKord][yKord] = 3;
                break;

            case 1:
                spelarArray[xKord][yKord] = 2;
                break;

            case 2:
                console.log("Felaktigt skott");
                break;
            case 3:
                console.log("Felaktigt skott");
                break;
            default:
                console.log("Detta borde inte hända.");
        }
    }

    function reset(array) {
        array = skapaSpelarArray(array);
        return array;
    }

    function skapaSkeppTyp(type, direction, xStart, yStart, spelarArray) {
        xStart = parseInt(xStart);
        yStart = parseInt(yStart);
        type = parseInt(type);
        console.log(direction);
        console.log("work?")
        switch (direction) {
            case "vertical":
                for (i = 0; i < type; i++) {
                    
                    var yVal = yStart + i;
                    console.log("y: " + yVal);
                    console.log("x: " + xStart);
                    spelarArray[xStart][yVal] = 1;
//                    console.log("Post-array: " + spelarArray);
                }
                break;
            case "horisontal":
                for (i = 0; i < type; i++) {
                    
                    var xVal = xStart + i;
                    console.log("x: " + xVal);
                    console.log("y: " + yStart);
                    spelarArray[xVal][yStart] = 1;
//                    console.log("Post-array: " + spelarArray);
                }
                break;
            default:
//                console.log("Now you fucked up!");
        }
//        console.log(spelarArray);
        redigeraPlan(spelarArray);
    }
});