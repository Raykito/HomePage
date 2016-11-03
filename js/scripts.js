$(document).ready(function(){
    
  load()
  time()
  save()

  $("#google").click(function() {
    $("#google").animate({
      color: 'rgb(100, 100, 100)'
    })
    $("#bar").attr("action", "https://www.google.fr/search")
    $("#youtube").animate({
      color: 'rgb(175, 175, 175)'
    })
  })

  $("#youtube").click(function() {
    $("#youtube").animate({
      color: 'rgb(100, 100, 100)'
    })
    $("#bar").attr("action", "https://www.youtube.com/results")
    $("#google").animate({
      color: 'rgb(175, 175, 175)'
    })
  })

  $(".subMenuCode").animate({
    height: 'toggle',
    opacity: 'toggle'
  })

  $("#intra").click(function(){
    $("#displayPerso").hide()
    $("#displayIntra").fadeToggle(200)
  })

  $("#perso").click(function(){
    var visible = $(".subMenuCode").is(":visible")
    if (visible == true)
      $(".subMenuCode").animate({
        height: 'toggle',
        opacity: 'toggle'
      })
    $("#displayIntra").hide()
    $("#displayPerso").fadeToggle(200)
  })

  $("#code").click(function(){
    $(".subMenuCode").animate({
      height: 'toggle',
      opacity: 'toggle'
    })
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
  var secs = date.getSeconds()
  if (secs < 10)
    secs = "0" + secs
    if ($("#checkHour").is(":checked")) {
      $(".timeMinutes").css("color", "rgb(50, 50, 50)")
      $(".timeSeconds").css("color", "rgb(50, 50, 50)")
      $("#checkMinute").removeAttr("disabled")
      $("#checkSecond").removeAttr("disabled")
      document.getElementById("displayTime").innerHTML = hours + 'H'
      if ($("#checkMinute").is(":checked")) {
      $(".timeSeconds").css("color", "rgb(50, 50, 50)")
      $("#checkSecond").removeAttr("disabled")
        document.getElementById("displayTime").innerHTML = hours + ':' + mins
        if ($("#checkSecond").is(":checked")) {
          document.getElementById("displayTime").innerHTML = hours + ':' + mins + ':' + secs
        }
        else {
          document.getElementById("displayTime").innerHTML = hours + ':' + mins
        }
      }
      else {
        $(".timeSeconds").css("color", "rgb(125, 125, 125)")
        $("#checkSecond").attr("disabled", "disabled")
        document.getElementById("displayTime").innerHTML = hours + 'H'
      }
    }
    else {
      $(".timeMinutes").css("color", "rgb(125, 125, 125)")
      $(".timeSeconds").css("color", "rgb(125, 125, 125)")
      $("#checkMinute").attr("disabled", "disabled")
      $("#checkSecond").attr("disabled", "disabled")
      document.getElementById("displayTime").innerHTML = ''
    }

  setTimeout(time, 100)
}

var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
n = 0;
$(document).keydown(function (e) {
    if (e.keyCode === k[n++]) {
      $("#search").blur()
        if (n === k.length) {
            alert("Konami")
            n = 0
        }
    }
    else {
        n = 0
    }
});

$(document).bind('keypress', function(event) {
  if (event.which === 80 && event.shiftKey) {
    $("#paramsModal").modal("show")
  }
})

function save() {
  var checkBoxes = {
    checkHour: ($("#checkHour").is(":checked")) ? (true) : (false),
    checkMinute: ($("#checkMinute").is(":checked")) ? (true) : (false),
    checkSecond: ($("#checkSecond").is(":checked")) ? (true) : (false)
  }
  localStorage.setItem("checkBoxes", JSON.stringify(checkBoxes))

  setTimeout(save, 100)
}

function load() {
  var checkBoxes = JSON.parse(localStorage.getItem("checkBoxes"))

  if (checkBoxes.checkHour == true)
    $("#checkHour").prop("checked", true)
  else
    $("#checkHour").prop("checked", false)
  if (checkBoxes.checkMinute == true)
    $("#checkMinute").prop("checked", true)
  else
    $("#checkMinute").prop("checked", false)
  if (checkBoxes.checkSecond == true)
    $("#checkSecond").prop("checked", true)
  else
    $("#checkSecond").prop("checked", false)
}