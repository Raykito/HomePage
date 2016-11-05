$(document).ready(function(){
    
  load()
  time()

  $("#google").click(function() {
    $("#google").animate({
      color: 'rgb(100, 100, 100)'
    })
    $("#bar").attr("action", "https://www.google.fr/search")
    $("#youtube").animate({
      color: 'rgb(175, 175, 175)'
    })
    $("#youporn").animate({
      color: 'rgb(175, 175, 175)'
    })
    $("#search").attr("placeholder", "Google")
  })

  $("#youtube").click(function() {
    $("#youtube").animate({
      color: 'rgb(100, 100, 100)'
    })
    $("#bar").attr("action", "https://www.youtube.com/results")
    $("#google").animate({
      color: 'rgb(175, 175, 175)'
    })
    $("#youporn").animate({
      color: 'rgb(175, 175, 175)'
    })
    $("#search").attr("placeholder", "YouTube")
  })

  $("#youporn").click(function() {
    $("#youporn").animate({
      color: 'rgb(100, 100, 100)'
    })
    $("#bar").attr("action", "https://www.youporn.com/results")
    $("#google").animate({
      color: 'rgb(175, 175, 175)'
    })
    $("#youtube").animate({
      color: 'rgb(175, 175, 175)'
    })
    $("#search").attr("placeholder", "YouPorn")
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
  
  $("#checkHour").change(function() {
    saveCheckboxes()
  })

  $("#checkMinute").change(function() {
    saveCheckboxes()
  })

  $("#checkSecond").change(function() {
    saveCheckboxes()
  })

  $("#custom").click(function() {
    $("#customMenu").modal("show")
    $("#paramsModal").modal("hide")
  })

  $("#closeCustom").click(function() {
    $("#accordion").accordion("option", "active", false)
    $("#customMenu").modal("hide")
    resetLinksMenu()
  })

  $("#saveCustom").click(function() {
    saveLinks()
    location.reload()
  })

  $("#addCustom").click(function() {
    $("#name").val('')
    $("#link").val('')
    $("#addLink").modal("show")
  })

  $("#cancelAdd").click(function() {
    $("#addLink").modal("hide")
  })

  $("#saveLink").click(function() {
    addLink($("#link").val(), $("#name").val())
    location.reload()
  })

  $(".deleteLink").click(function() {
    var temp = JSON.parse(localStorage.getItem("links"))
    var i = 0
    while (($(this).prev().prev().prev().prev().attr("id")) != temp[i].name)
    {
      i++
    }
  delete temp[i]
  var links = []
  var i = 0
  while (i < temp.length)
  {
    if (temp[i] != null)
    {
      links.push({"link":temp[i].link,"name":temp[i].name})
    }
    i++
  }
  localStorage.setItem("links", JSON.stringify(links))
  location.reload()
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

function displayImage()
{
  imagesArray = new Array (4);
  imagesArray[0] = "css/img/konami1.png";
  imagesArray[1] = "css/img/konami2.png";
  imagesArray[2] = "css/img/konami3.png";
  imagesArray[3] = "css/img/konami4.png";
  var num = Math.floor(Math.random() * 4);
  var addImage = '<img src="' + imagesArray[num] + '">'
  $("#konamiModalBody").empty()
  $("#konamiModalBody").append(addImage)
  $("#konamiModal").modal("show")
}

var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
n = 0;
$(document).keydown(function (e) {
    if (e.keyCode === k[n++]) {
      $("#search").blur()
        if (n === k.length) {
          displayImage()
          n = 0
        }
    }
    else {
        n = 0
    }
});

var key = [80, 79, 82, 78, 38, 38, 40, 40, 37, 39, 37, 39],
i = 0;
$(document).keydown(function (y) {
    if (y.keyCode === key[i++]) {
        if (i === key.length) {
          $("#search").val('')
          $("#youporn").fadeIn(1000)
          i = 0
        }
    }
    else {
        i = 0
    }
});

$(document).bind('keypress', function(event) {
  if (event.which === 80 && event.shiftKey) {
    $("#paramsModal").modal("show")
  }
})

function saveCheckboxes() {
  var checkBoxes = {
    checkHour: ($("#checkHour").is(":checked")) ? (true) : (false),
    checkMinute: ($("#checkMinute").is(":checked")) ? (true) : (false),
    checkSecond: ($("#checkSecond").is(":checked")) ? (true) : (false)
  }
  localStorage.setItem("checkBoxes", JSON.stringify(checkBoxes))
}

function loadCheckboxes() {
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

function resetLinksMenu() {
  var links = JSON.parse(localStorage.getItem("links"))
  var i = 0
  while (links[i])
  {
    var id = '#' + links[i].name
    var idLink = '#' + links[i].name + 'Link'
    $(id).val(links[i].name)
    $(idLink).val(links[i].link)
    i++
  }
}

function saveLinks() {
  var links = JSON.parse(localStorage.getItem("links"))
  var i = 0

  while (links[i])
  {
    var id = '#' + links[i].name + 'Link'
    links[i].link = $(id).val()
    var id = '#' + links[i].name
    links[i].name = $(id).val()
    i++
  }
  localStorage.setItem("links", JSON.stringify(links))
}

function setAccordion() {
  $("#accordion").accordion({
    header: "h3",
    active: false,
    collapsible: true,
    heightStyle: "content"
  })
}

function addLink(link, name) {
  var links = JSON.parse(localStorage.getItem("links"))

  links.push({"link":link,"name":name})
  localStorage.setItem("links", JSON.stringify(links))
}

function loadLinksMenu() {
  var links = JSON.parse(localStorage.getItem("links"))
  var i = 0

  while (links[i])
  {
    var toAddCustom = '<h3>' + links[i].name + '</h3>' + '<div><b>Name : </b><input id="' + links[i].name + '" type="text" class="siteName" value="' + links[i].name + '">' + '</br><b>Link : </b><input id="' + links[i].name + 'Link' + '" type="text" class="siteLink" value="' + links[i].link + '">' + '<button id="delete' + links[i].name + '" class="deleteLink" type="button"><i class="fa fa-trash fa-1-5x"></i></button>' + '</div>'
    $("#accordion").append(toAddCustom)
    i++
  }
  setAccordion()
}

function loadLinks() {
  var links = JSON.parse(localStorage.getItem("links"))
  var i = 0

  while (links[i])
  {
    var toAddMenu = '<li><a href="' + links[i].link + '">' + links[i].name + "</a></li>"
    $("#displayPerso").append(toAddMenu)
    i++
  }
  loadLinksMenu()
}

function load() {
  loadCheckboxes()
  loadLinks()
}