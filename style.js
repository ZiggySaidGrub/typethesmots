if (localStorage.getItem("maincolor") == null) {
    localStorage.setItem("maincolor", "#2f423c")
}
if (localStorage.getItem("secondcolor") == null) {
    localStorage.setItem("maincolor", "#a9b0ad")
}
if (localStorage.getItem("font") == null) {
    localStorage.setItem("font", "monospace")
}
document.getElementById("color1").value = localStorage.getItem("maincolor");
document.getElementById("color2").value = localStorage.getItem("secondcolor");

function updatestyle(){
    const root = document.documentElement;
    let color1 = document.getElementById("color1");
    let color2 = document.getElementById("color2");
    let font = document.getElementById("fonts");

    if (root.style.getPropertyValue("--maincolor") != color1.value){
        localStorage.setItem("maincolor", color1.value)
    }
    if (root.style.getPropertyValue("--secondcolor") != color2.value){
        localStorage.setItem("secondcolor", color2.value)
    }
    if (root.style.getPropertyValue("--font") != font.value){
        localStorage.setItem("font", font.value)
    }

    root.style.setProperty("--maincolor", localStorage.getItem("maincolor"));
    root.style.setProperty("--secondcolor", localStorage.getItem("secondcolor"));
    root.style.setProperty("--font", localStorage.getItem("font"));

    window.requestAnimationFrame(updatestyle);
}

window.requestAnimationFrame(updatestyle);