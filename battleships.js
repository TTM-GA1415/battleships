//                  Array:
//                            0 = tom ruta
//                            1 = skepp
//                            2 = träffat skepp
//                            3 = miss

$(document).ready(function() {
    shootListener();
    boatListener();
    function shootListener() {
        $('.shoot').click(function() {
            $('form').submit(function(event) {
                event.preventDefault();
            })
            
            var form = document.getElementById("shoot");
            var xKord = form.elements[0].value;
            var yKord = form.elements[1].value;
            
            skjut(xKord, yKord, spelareEtt);
            
            redigeraPlan(spelareEtt);
        })
    }
    function boatListener() {
        $('.placeBoat').click(function() {
            $('form').submit(function(event) {
                event.preventDefault();
            })
            
            var form = document.getElementById("placeBoat");
            var xKord = form.elements[0].value;
            var yKord = form.elements[1].value;
            
            skapaSkepp(xKord, yKord, spelareEtt);
            
            redigeraPlan(spelareEtt);
        })
    }
    var ref = new Firebase('https://blinding-heat-5966.firebaseio.com/');

    var bytSiffror = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "L"];
    var spelareEtt = skapaSpelarArray();
    var spelareTva = skapaSpelarArray();

//                    skapaSkepp(1, 1, spelareEtt);
//                    skapaSkepp(1, 2, spelareEtt);
//                    skapaSkepp(1, 3, spelareEtt);
    skapaPlan(spelareEtt);
//                    skjut(1, 1, spelareEtt);
//                    skjut(2, 1, spelareEtt);
//                    redigeraPlan(spelareEtt);

    var json_spelareEtt = JSON.stringify(spelareEtt);

    var spelarRef = ref.child("spelare");
    spelarRef.set({
        spelareEtt: json_spelareEtt
    })

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


})