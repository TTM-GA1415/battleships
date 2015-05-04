<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Battleships</title>
        <link rel="stylesheet" href="spelplan.css">
        <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>
    </head>
    <body>
        <div id="wrapper">
            <div id="spelplan">

                <script>
                    var myDataRef = new Firebase('https://blinding-heat-5966.firebaseio.com/');
                    
//                  Array:
//                            0 = tom ruta
//                            1 = skepp
//                            2 = träffat skepp
//                            3 = miss

                    var bytSiffror = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "L"];
                    var spelareEtt = skapaSpelarArray();
                    var spelareTva = skapaSpelarArray();
                    console.log(spelareEtt);
                    skapaSkepp(1, 1, spelareEtt);
                    skapaSkepp(1, 2, spelareEtt);
                    skapaSkepp(1, 3, spelareEtt);
                    skjut(1, 1, spelareEtt);
                    skjut(2, 1, spelareEtt);
                    skapaPlan(spelareEtt);

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
                            $('#spelplan').append('<ul id="ruta' + i + '" class="spelare"><p>' + i + '</p>')
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

                </script>
                <form method="GET">
                    <input type="text" name="X-Kordinat" placeholder="X-Kordinat" required>
                    <input type="text" name="Y-Kordinat" placeholder="Y-Kordinat" required>
                    <input type="submit" name="placeBoat" value="Placera Båt">
                </form>
                <form method="GET">
                    <input type="text" name="X-Kordinat" placeholder="X-Kordinat" required>
                    <input type="text" name="Y-Kordinat" placeholder="Y-Kordinat" required>
                    <input type="submit" name="shoot" value="Skjut">
                </form>
            </div>


            <!--            <div id="Chatt">
                            <div id='messagesDiv'></div>
                            <input type='text' id='nameInput' placeholder='Name'>
                            <input type='text' id='messageInput' placeholder='Message'>
                        </div>-->


            <script>
//                var myDataRef = new Firebase('https://blinding-heat-5966.firebaseio.com/');
//                $('#messageInput').keypress(function(e) {
//                    if (e.keyCode == 13) {
//                        var name = $('#nameInput').val();
//                        var text = $('#messageInput').val();
//                        myDataRef.push({name: name, text: text});
//                        $('#messageInput').val('');
//                    }
//                });
//                myDataRef.on('child_added', function(snapshot) {
//                    var message = snapshot.val();
//                    displayChatMessage(message.name, message.text);
//                });
//                function displayChatMessage(name, text) {
//                    $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
//                    $('#messageDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
//                }
//                ;
            </script>
        </div>
    </body>
</html>
