$(document).ready(function(){
    time()
    $("#intra").click(function(){
	$("#displayPerso").hide()
	$("#displayIntra").fadeToggle(200)
    })
    $("#perso").click(function(){
	$("#displayIntra").hide()
	$("#displayPerso").fadeToggle(200)
    })
})

function time() {
  var date = new Date()
  var hours = date.getHours()
  if (hours < 10)
    hours = "0" + hours
  var mins = date.getMinutes()
  if (mins < 10)
    mins = "0" + mins
  document.getElementById("displayTime").innerHTML = hours + " : " + mins

  setTimeout(time, 1000)
}
