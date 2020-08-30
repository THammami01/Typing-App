// to stop spacebar scrolling
window.addEventListener("keydown", (e) => {
	if(e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
})

const countdown = () => {
	count--
	document.querySelector(".time-count").innerText = count

	if(!count) {
		clearInterval(idSI)
		document.removeEventListener("keydown", update_main)
		document.querySelector("body").classList.add("done")
		window.scrollTo(0, 0)
		document.querySelector(".current-letter").classList.remove("current-letter")
		document.querySelector(".time").style.display = "none"
		document.querySelector(".results").style.display = "block"
		document.querySelector(".go-again").addEventListener("click", () => {
			location.reload()
		})
		// document.querySelector(".wpm-result").innerText =
		// document.querySelector(".characters-result").innerText = text.substring(0, last_correct).length
		// document.querySelector(".errors-result").innerText = (last_wrong > last_correct ? text.substring(last_correct, last_wrong + 1).length : 0)
	}
}

let idSI
count = 60

let current = 0
last_correct = -1
last_wrong = -1

const start_countdown = () => {
	idSI = setInterval(countdown, 1000)
}

const is_letter = (key_code) => {
	// A-Z 65-90 and  a-z 97-122
	return (key_code >= 65 && key_code <= 90 || key_code >= 97 && key_code <= 122)
}

const first_key_down = (e) => {
	if(is_letter(e.keyCode)) {
		document.removeEventListener("keydown", first_key_down)
		document.querySelector(".time-msg").style.visibility = "hidden"
		update_main(e)
		document.addEventListener("keydown", update_main)
		start_countdown()
	}
}

document.addEventListener("keydown", first_key_down)

text = document.querySelector(".main").innerText

const update_classes = () => {

	document.querySelector(".main").innerHTML =
		"<span class=\"correct-letters\">" + text.substring(0, last_correct + 1) + "</span>"
		+ "<span class=\"wrong-letters\">" + (last_wrong > last_correct ? text.substring(last_correct + 1, last_wrong + 1) : "") + "</span>"
		+ "<span class=\"current-letter\">" + text.charAt(current) + "</span>"
		+ text.substring(current+1, text.length)
}

const update_main = (e) => {
	console.log(e.key)

	if(e.key == "Backspace" && current > 0) {
		current--
		if(last_correct == current) last_correct--
		if(last_wrong == current) last_wrong--
		update_classes()
	} else if(e.key == "Backspace" && current == 0 || !(e.key == " ") && !is_letter(e.keyCode)) {
		// pass
	} else if(e.key == text.charAt(current)) {
		current++
		if(last_wrong == -1) last_correct++
		else last_wrong++
		update_classes()
	} else if(e.key != text.charAt(current)) {
		current++
		if(last_wrong == -1) last_wrong = last_correct + 1
		else last_wrong++
		update_classes()
	}

	if(last_wrong <= last_correct) last_wrong = -1

}
