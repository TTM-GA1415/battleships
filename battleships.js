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
    var boatTwo = 0;
    var boatThree = 0;
    var boatFour = 0;
    var boatFive = 0;

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
            var direction = form.elements[2].value;
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
        var legit;
        switch (direction) {
            case "vertical":
                //kolla om det går att placera båtar
                for (i = 0; i < type; i++) {
                    var yVal = yStart + i;
                    legit = kollaPlats(spelarArray, xStart, yVal);
                    if (!legit) {
                        window.alert("Så kan du inte göra din jävla idiot!");
                        break;
                    }
                }
                //Skapa Båtar
                if (legit) {
                    console.log("Work");
                    for (i = 0; i < type; i++) {

                        var yVal = yStart + i;
                        console.log("y: " + yVal + " x: " + xStart);
                        spelarArray[xStart][yVal] = 1;
                    }
                    switch (type) {
                        case 2:

                            console.log(boatTwo);
                            boatTwo += 1;
                            if (boatTwo >= 4) {
                                $('input').remove('.two');
                            }
                            break;
                        case 3:
                            boatThree++;
                            if (boatThree >= 3) {
                                $('input').remove('.three');
                            }
                            break;
                        case 4:
                            boatFour++;
                            if (boatFour >= 2) {
                                $('input').remove('.four');
                            }
                            break;
                        case 5:
                            boatFive++;
                            if (boatFive >= 1) {
                                $('input').remove('.five');
                            }
                            break;
                        default:
                            console.log("Now u fucked uP!");
                            break;
                    }
                }
                break;
            case "horisontal":
                //kolla om det går att placera båtar
                for (i = 0; i < type; i++) {
                    var xVal = xStart + i;
                    legit = kollaPlats(spelarArray, xVal, yStart);
                    if (!legit) {
                        window.alert("Så kan du inte göra din jävla idiot!");
                        break;
                    }
                }
                if (legit) {
                    for (i = 0; i < type; i++) {
                        var xVal = xStart + i;
                        console.log("x: " + xVal + " y: " + yStart);
                        spelarArray[xVal][yStart] = 1;
//                    console.log("Post-array: " + spelarArray);
                    }

                }

                break;
            default:
//                console.log("Now you fucked up!");
        }
//        console.log(spelarArray);
        redigeraPlan(spelarArray);
    }
    function kollaPlats(spelarArray, xKord, yKord) {
        var legitim = true;
        if (spelarArray[xKord][yKord] !== 0 || xKord > 9 || yKord > 9) {
            legitim = false;
        }
        return legitim;
    }
});