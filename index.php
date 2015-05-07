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
                <script src="battleships.js"></script>
                <!--                <form id="placeBoat" method="GET">
                                    <input class="x_kord" type="text" name="X-Kordinat" placeholder="X-Kordinat" required>
                                    <input class="y_kord" type="text" name="Y-Kordinat" placeholder="Y-Kordinat" required>
                                    <input class="placeBoat" type="submit" name="placeBoat" value="Placera Båt">
                                </form>-->
                <form id="placeBoatType" method="GET">
                    <input class="x_kord" type="text" name="X-Kordinat" placeholder="X-Kordinat" required>
                    <input class="y_kord" type="text" name="Y-Kordinat" placeholder="Y-Kordinat" required><br>
                    <input class="radio" type="radio" name="boatType" value="2">2<br>
                    <input class="radio" type="radio" name="boatType" value="3">3<br>
                    <input class="radio" type="radio" name="boatType" value="4">4<br>
                    <input class="radio" type="radio" name="boatType" value="5">5<br>
                    <select name="direction">
                        <option value="vertical">Vertical</option>
                        <option value="horisontal">Horisontal</option>
                    </select>
                    <br>
                    <input class="placeBoatType" type="submit" name="placeBoatType" value="Placera Båt">
                </form>
                <form id="shoot" method="GET">
                    <input class="x_kord" type="text" name="X-Kordinat" placeholder="X-Kordinat" required>
                    <input class="y_kord" type="text" name="Y-Kordinat" placeholder="Y-Kordinat" required>
                    <input class="shoot" type="submit" name="shoot" value="Skjut">
                </form>
                <form>
                    <input class="reset" type="submit" name="reset" value="Töm plan">
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
