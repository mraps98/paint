window.addEventListener("load", () => {

    /* Global Variables*/
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let mouseClicked = false;

    /* Set Canvas Height and Width */
    let container = document.querySelector(".container");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

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
            console.log(ctx.strokeStyle);
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
    inputSize.addEventListener("change", e=>{
       ctx.lineWidth = e.target.value; 
    });

    /* Listeners For Mouse */
    document.addEventListener("mousedown", e => {
        mouseClicked = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    });
    document.addEventListener("mouseup", e => {
        mouseClicked = false;

    });
    document.addEventListener("mousemove", e => {
        if (mouseClicked) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }
    });

    /* Listener for resetting */
    let resetButton = document.querySelector(".main__resetoptionsReset");
    resetButton.addEventListener("click", e=>{
        ctx.clearRect(0, 0, canvas.height, canvas.width);
    });
});