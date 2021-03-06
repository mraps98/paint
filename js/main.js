window.addEventListener("load", () => {

    /* Global Variables*/
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let mouseClicked = false;

    /* Set Canvas Height and Width */
    let container = document.querySelector(".container");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    canvas.height = window.innerHeight / 2;
    canvas.width = canvas.height/ 1.5;

    /* Parameters for line*/
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    let main__sizeoptionsInput = document.querySelector(".main__sizeoptionsInput");
    main__sizeoptionsInput.value = ctx.lineWidth;


    /* Event listeners for changing colors */
    let main__options = document.querySelectorAll(".main__option");
    main__options.forEach(option => {
        option.addEventListener("click", e => {
            main__options.forEach(option => {
                option.classList.remove("main__option--selected");
            })
            option.classList.add("main__option--selected");
            ctx.strokeStyle = option.getAttribute("data-color");
            ctx.fillStyle = option.getAttribute("data-color");
        })
    });

    /* Listeners for Increasing Size of line */
    let minusButton = document.querySelectorAll(".main__sizeoptionsButton")[0];
    minusButton.addEventListener("click", e => {
        ctx.lineWidth--;
        main__sizeoptionsInput.value = ctx.lineWidth;
    });
    let plusButton = document.querySelectorAll(".main__sizeoptionsButton")[1];
    plusButton.addEventListener("click", e => {
        ctx.lineWidth++;
        main__sizeoptionsInput.value = ctx.lineWidth;
    });
    let inputSize = document.querySelector(".main__sizeoptionsInput");
    inputSize.addEventListener("change", e => {
        ctx.lineWidth = e.target.value;
    });

    /* Listeners For Mouse and touch */
    canvas.addEventListener("mousedown", e => {
        mouseClicked = true;
        ctx.beginPath();
        ctx.moveTo(getMousePosition(canvas, e).x, getMousePosition(canvas, e).y);
    });
    canvas.addEventListener("touchstart", e => {
        let touch = e.touches[0];
        let mouseevent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        canvas.dispatchEvent(mouseevent);
    });

    canvas.addEventListener("mouseup", e => {
        mouseClicked = false;
    });
    canvas.addEventListener("touchend", e => {
        let mouseevent = new MouseEvent("mouseup");
        canvas.dispatchEvent(mouseevent);
    });

    canvas.addEventListener("mousemove", e => {
        if (mouseClicked) {
            ctx.lineTo(getMousePosition(canvas, e).x, getMousePosition(canvas, e).y);
            ctx.stroke();
        }
    });
    canvas.addEventListener("touchmove", e => {
        let touch = e.touches[0];
        let mouseevent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        canvas.dispatchEvent(mouseevent);
    });

    /* Listener for resetting */
    let resetButton = document.querySelector(".main__resetoptionsReset");
    resetButton.addEventListener("click", e => {
        ctx.clearRect(0, 0, canvas.height * 2, canvas.width * 2);
        ctx.lineWidth = 10;
        main__sizeoptionsInput.value = ctx.lineWidth;
    });

    let getMousePosition = (canvas, event) => {
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
    }

    /* Don't scroll while touching */
    document.body.addEventListener("touchstart", e=>{
        if(e.target == canvas){
            e.preventDefault();
        }
    });
    document.body.addEventListener("touchend", e=>{
        if(e.target == canvas){
            e.preventDefault();
        }
    });
    document.body.addEventListener("touchmove", e=>{
        if(e.target == canvas){
            e.preventDefault();
        }
    });
});