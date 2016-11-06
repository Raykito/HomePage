$(document).ready(function() {

	var output = $('#term output')
	const CMDS = ['help', 'clear', 'params', 'link']
	const LINK_CMDS = ['help', 'add', 'gui', 'del', 'list', 'edit']

	/* FOCUS THE LINE COMMAND WHEN CLICK ON TERM */
	$("#term").click(function() {
		$("#cmd").focus()
	})

	$(document).keydown(function(e) {
		if ($("#cmd").is(":focus")) {
			if (e.keyCode === 13) {			/* CHECK IF RETURN IS PRESSED */
				this.output($("#prompt").html())
				this.output($("#cmd").val() + '<br>')
				if ($("#cmd").val() != '') {
					if (checkCmds() == 0) {
						this.output($("#cmd").val() + ": command not found.<br>")
					}
					else {
						execCmd()
					}
				}
				$("#cmd").val("")
			}

			if (e.keyCode === 76 && event.ctrlKey) {		/* CLEAR TERM WHEN CTRL+L IS PRESED */
				$("#term output").empty()
				return false
			}
		}
	})

	this.output = function(datas) {			/* PUT THE DATAS IN THE OUTPUT OF THE TERM */
		output.append(datas)
		$('#term').scrollTop($('#term output').height())
	}

	checkCmds = function(datas) {			/* CHECK IF THE COMMAND ENTERED EXISTS */
		var i = 0
		datas = $("#cmd").val()

		while (CMDS[i]) {
			if (datas.split(' ')[0] == CMDS[i]) {
				return (1)
			}
			i++;
		}
		return (0)
	}

	function checkArgCmds (datas, list) {
		var i = 0

		while (list[i]) {
			if ((datas.split(' ')[1]).split(' ')[0] == list[i])
				return (1)
			i++
		}
		return (0)
	}

	execCmd = function(command) {

		this.output = function(datas) {			/* COPY OF THE OUTPUT FUNCTION (IF NOT PRESENT DOESN'T DISPLAY ANYTHING) */
			output.append(datas)
			$('#term').scrollTop($('#term output').height())
		}

		command = $("#cmd").val()

		/* DISPLAY HELP */
		if (command.split(' ')[0] == "help"){
			this.output('Avaible commands:<br>&nbsp;&nbsp;&nbsp;')
			var i = 1
			while (CMDS[i]) {
				this.output('<span class="yellow-text">' + CMDS[i] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')
				i++
				if (i % 5 == 0) {
					this.output('<br>&nbsp;&nbsp;&nbsp;')
				}
			}
			this.output('<br>')
		}

		/* CLEAR TERMINAL */
		if (command.split(' ')[0] == "clear") {
			$("#term output").empty()
		}

		/* OPEN PARAMETERS MODAL */
		if (command.split(' ')[0] == "params") {
			$("#paramsModal").modal("show")
		}

		/* ALL LINKS RELATED COMMANDS */
		if (command.split(' ')[0] == "link") {
			if ((command.split(' ')[1]) == null)
			{
				this.output("add | del | edit | list | gui<br>")
				$("#cmd").val("")
				return (1)
			}
			if (checkArgCmds(command, LINK_CMDS) == 1) {
				if (command.split(' ')[1] == "help") {
					this.output("add | del | edit | list | gui<br>")
				}
				if (command.split(' ')[1] == "gui") {
					$("#customMenu").modal("show")
				}
				if ((command.split(' ')[1] == "add")) {
					if (command.split(' ')[2] == null || command.split(' ')[3] == null || command.split(' ')[2] == "help" || command.split(' ')[3] == "help") {
						this.output("Usage: link add [link] [name in menu]<br>")
						return (1)
					}
					addLink(command.split(' ')[2], command.split(' ')[3])
					location.reload()
				}
				if (command.split(' ')[1] == "del") {
					if (command.split(' ')[2] == null || command.split(' ')[2] == "help") {
						this.output("Usage: link del [name]<br>")
						return (1)
					}
					var i = 0
					var found = 0
					var temp = JSON.parse(localStorage.getItem("links"))

					while (temp[i]) {
						if (temp[i].name == command.split(' ')[2]) {
							found = 1
							break
						}
						i++
					}
					if (found == 0) {
						this.output('link: the link "' + command.split(' ')[2] + '" does not exist<br>')
					}
					else {
						delete temp[i]
						var links = []
						var i = 0
						while (i < temp.length) {
							if (temp[i] != null)
								links.push({"link":temp[i].link,"name":temp[i].name})
							i++
						}

  						localStorage.setItem("links", JSON.stringify(links))
  						location.reload()
					}
				}
				if (command.split(' ')[1] == "list") {
					var links = JSON.parse(localStorage.getItem("links"))
					var i = 0

					while (links[i]) {
						this.output('&nbsp;&nbsp;&nbsp;<span class="yellow-text">' + links[i].name + '</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + links[i].link + '<br>')
						i++
					}
				}
				if (command.split(' ')[1] == "edit") {
					if (command.split(' ')[2] == null || command.split(' ')[3] == null || command.split(' ')[4] == null || command.split(' ')[2] == "help" || command.split(' ')[3] == "help" || command.split(' ')[4] == "help" || (command.split(' ')[2] != "name" && command.split(' ')[2] != "link")) {
						this.output('Usage: link edit "name" | "link" [link name] [new link name] | [link] [new link]<br>')
						return (1)
					}
					if (command.split(' ')[2] == "name") {
						var links = JSON.parse(localStorage.getItem("links"))
						var i = 0
						var found = 0

						while (links[i]) {
							if (links[i].name == command.split(' ')[3]) {
								found = 1
								break
							}
							i++
						}
						if (found == 0) {
							this.output('link: the link named "' + command.split(' ')[3] + '" does not exist.<br>')
						}
						else {
							links[i].name = command.split(' ')[4]
							localStorage.setItem("links", JSON.stringify(links))
							location.reload()
						}
					}
					if (command.split(' ')[2] == "link") {
						var links = JSON.parse(localStorage.getItem("links"))
						var i = 0
						var found = 0

						while (links[i]) {
							if (links[i].link == command.split(' ')[3]) {
								found = 1
								break
							}
							i++
						}
						if (found == 0) {
							this.output('link: the link "' + command.split(' ')[3] + '" does not exist.<br>')
						}
						else {
							links[i].link = command.split(' ')[4]
							localStorage.setItem("links", JSON.stringify(links))
							location.reload()
						}
					}
				}
				$("#cmd").val("")
			}
			else {
				this.output('link: "' + command.split(' ')[1] + '" is not a link command.<br>')
				this.output('Enter "link help" in order to see avaible commands.<br>')
			}
		}
	}

})