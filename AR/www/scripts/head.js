var animateText = document.getElementById("animated-text");
var textArray = animateText.innerText.split("");

animateText.firstChild.remove();

//Probably a better way to do this.
var elArray = textArray.map(
    (letter, index) => {
        if (letter == " ") letter = '&nbsp;';
        var el = document.createElement("span");
        el.className = "letter";
        el.innerHTML = letter;
        el.style.animationDelay = index / (textArray.length) + "s";
        animateText.appendChild(el);
        return el;
    }
);

animateText.innerHtml = elArray;