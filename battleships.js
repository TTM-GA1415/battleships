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
    var spelareEtt = skapaArray();
    var dator = skapaArray();
    var boatTwo = 0;
    var boatThree = 0;
    var boatFour = 0;
    var boatFive = 0;
    var datorloop = 0;
    var xRand = 0;
    var yRand = 0;

    skapaPlan(spelareEtt);
    genereraAI(dator);
    skapaDatorplan(dator);

//    getSpelplan();




    function getSpelplan() {
        ref.on("value", function(snapshot) {
            var object = snapshot.val();
            spelareEtt = JSON.parse(object.spelare.spelareEtt);
            dator = JSON.parse(object.spelare.dator);
            redigeraPlan(spelareEtt);
            redigeraDatorplan(dator);
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

            skjut(xKord, yKord, dator);

            var json_dator = JSON.stringify(dator);

            var spelarRef = ref.child("spelare");
            spelarRef.set({
                dator: json_dator
            });
            
            getSpelplan();
            console.log(dator);
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

            skapaSkeppTyp(type, direction, xKord, yKord, spelareEtt, true);

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

    function skapaArray() {
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
    function skapaDatorplan(spelarArray) {
        for (i = 0; i < 10; i++) {
            $('#dator').append('<ul id="d_ruta' + i + '" class="dator"><p>' + i + '</p>');
            for (n = 0; n < 10; n++) {
                switch (spelarArray[i][n]) {
                    case 0:
                        $("#d_ruta" + i).append('<li><div class="' + spelarArray[i][n] + ' datorRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 1:
                        $("#d_ruta" + i).append('<li><div class="' + spelarArray[i][n] + ' datorRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 2:
                        $("#d_ruta" + i).append('<li><div class="skeppHit ' + spelarArray[i][n] + ' datorRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 3:
                        $("#d_ruta" + i).append('<li><div class="miss ' + spelarArray[i][n] + ' datorRuta"><p>' + i + ',' + n + '</p></div></li><br>');
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
    
    function redigeraDatorplan(spelarArray) {
        for (i = 0; i < 10; i++) {
            $('#d_ruta' + i).replaceWith('<ul id="d_ruta' + i + '" class="dator"<p>' + i + '</p>');
            for (n = 0; n < 10; n++) {
                switch (spelarArray[i][n]) {
                    case 0:
                        $("#d_ruta" + i).append('<li><div class="' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 1:
                        $("#d_ruta" + i).append('<li><div class="' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 2:
                        $("#d_ruta" + i).append('<li><div class="skeppHit ' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
                        break;
                    case 3:
                        $("#d_ruta" + i).append('<li><div class="miss ' + spelarArray[i][n] + ' planRuta"><p>' + i + ',' + n + '</p></div></li><br>');
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
        array = skapaArray(array);
        return array;
    }

    function skapaSkeppTyp(type, direction, xStart, yStart, spelarArray, spelartyp) {
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
                        if (spelartyp) {
                            window.alert("Så kan du inte göra din jävla idiot!");
                            break;
                        } else {
                            datorloop--;
                            break;
                        }
                    }
                }
                //Skapa Båtar
                if (legit) {
                    for (i = 0; i < type; i++) {
                        spelarArray[xStart][yVal] = 1;
                        var yVal = yStart + i;
                    }
                    switch (type) {
                        case 2:
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
                        if (spelartyp) {
                            window.alert("Så kan du inte göra din jävla idiot!");
                            break;
                        } else {
                            datorloop--;
                            break;
                        }

                    }
                }
                if (legit) {
                    for (i = 0; i < type; i++) {
                        spelarArray[xVal][yStart] = 1;
                        var xVal = xStart + i;
//                    console.log("Post-array: " + spelarArray);
                    }
                    switch (type) {
                        case 2:
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
            default:
//                console.log("Now you fucked up!");
        }
//        console.log(spelarArray);
        redigeraPlan(spelarArray);
    }

    function kollaPlats(spelarArray, x, y) {
        var xKord = x;
        var yKord = y;
        var legitim = false;
//        console.log(x + "," + y);
//        console.log(spelarArray);
        if (xKord <= 9) {
            if (yKord <= 9) {
                if (spelarArray[xKord][yKord] === 0) {
                    legitim = true;
                }
            }
        }
        return legitim;
    }

    function genereraAI(datorArray) {
        boatTwo = 0;
        boatThree = 0;
        boatFour = 0;
        boatFive = 0;
        var dirRand = 1;
        var dir = "vertical";
        //Skapa tvåor
        for (datorloop = 0; datorloop <= 3; datorloop++) {
            xRand = Math.floor((Math.random() * 10) + 1) - 1;
            yRand = Math.floor((Math.random() * 10) + 1) - 1;
            dirRand = Math.floor((Math.random() * 2) + 1);
            switch (dirRand) {
                case 1:
                    dir = "vertical";
                    break;
                case 2:
                    dir = "horisontal";
                    break;
                default:
                    console.log("Käbbel med AI.");
                    break;
            }
            skapaSkeppTyp(2, dir, xRand, yRand, datorArray, false);
            redigeraPlan(datorArray);
        }
        for (datorloop = 0; datorloop <= 2; datorloop++) {
            xRand = Math.floor((Math.random() * 10) + 1) - 1;
            yRand = Math.floor((Math.random() * 10) + 1) - 1;
            dirRand = Math.floor((Math.random() * 2) + 1);
            switch (dirRand) {
                case 1:
                    dir = "vertical";
                    break;
                case 2:
                    dir = "horisontal";
                    break;
                default:
                    console.log("Käbbel med AI.");
                    break;
            }
            skapaSkeppTyp(3, dir, xRand, yRand, datorArray, false);
            redigeraPlan(datorArray);
        }
        for (datorloop = 0; datorloop <= 1; datorloop++) {
            xRand = Math.floor((Math.random() * 10) + 1) - 1;
            yRand = Math.floor((Math.random() * 10) + 1) - 1;
            dirRand = Math.floor((Math.random() * 2) + 1);
            switch (dirRand) {
                case 1:
                    dir = "vertical";
                    break;
                case 2:
                    dir = "horisontal";
                    break;
                default:
                    console.log("Käbbel med AI.");
                    break;
            }
            skapaSkeppTyp(4, dir, xRand, yRand, datorArray, false);
            redigeraPlan(datorArray);
        }
        for (datorloop = 0; datorloop < 1; datorloop++) {
            xRand = Math.floor((Math.random() * 10) + 1) - 1;
            yRand = Math.floor((Math.random() * 10) + 1) - 1;
            dirRand = Math.floor((Math.random() * 2) + 1);
            console.log("(" + xRand + "," + yRand + ") - " + dir);
            switch (dirRand) {
                case 1:
                    dir = "vertical";
                    break;
                case 2:
                    dir = "horisontal";
                    break;
                default:
                    console.log("Käbbel med AI.");
                    break;
            }
            skapaSkeppTyp(5, dir, xRand, yRand, datorArray, false);
            redigeraPlan(datorArray);
        }
        var json_dator = JSON.stringify(datorArray);
            var spelarRef = ref.child("spelare");
            spelarRef.set({
                dator: json_dator
            });
    }
});