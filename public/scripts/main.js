const checkDarkmode = document.querySelector(".switch")
const checkBoxDark = document.querySelector("input[name=darkMode]")
var BodyElement = document.getElementsByTagName("BODY")[0]
const ImageTheme = document.getElementById("body-theme")


console.log(ImageTheme)

checkDarkmode.addEventListener("click", () => {
    if (checkBoxDark.checked) {
        BodyElement.classList.add("dark-mode")
        ImageTheme.src = '../assets/idea-white.svg'
        console.log(BodyElement)
    }
    else {
        BodyElement.classList.remove("dark-mode")
        ImageTheme.src = '../assets/idea.svg'
    }
})