document.addEventListener('DOMContentLoaded', function() {

//    Image Upload
    const uploadimg = document.getElementById('uploadImage');
    const uploadimgview = document.getElementById('uploadImagePreview');
    uploadimg.addEventListener('change', () => {
        const file = uploadimg.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result;
                uploadimgview.innerHTML = '';
                uploadimgview.appendChild(img);
            };
        }
    })

//    Get/Save RGB Color Code
    const selectColorInput = document.getElementById('selectColor');
    const previewCanvas = document.getElementById('previewCanvas');
    const previewCtx = previewCanvas.getContext('2d');
    const saveBtn = document.getElementById('saveBtn');
    const colorCode = document.getElementById('colorCode');
    let imageData = null;
    previewCanvas.width = 300;
    previewCanvas.height = 100;
    previewCtx.fillStyle = '#fff';
    previewCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

    let isColorInputFocused = false;
    selectColorInput.addEventListener('input', () => {
        const color = hexToRgb(selectColorInput.value);
        previewCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        previewCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
        imageData = previewCtx.getImageData(0, 0, previewCanvas.width, previewCanvas.height);
        colorCode.innerHTML = `&nbsp;RGB (${color.r}, ${color.g}, ${color.b})`;
        previewCtx.font = '36px Arial';
        previewCtx.fillStyle = '#000';
        previewCtx.textAlign = 'center';
        previewCtx.fillText(selectColorInput.value, 145, 35);
        previewCtx.fillText(`RGB (${color.r}, ${color.g}, ${color.b})`, 145, 85);
    });
    selectColorInput.addEventListener('focus', () => {
        isColorInputFocused = true;
    });
    selectColorInput.addEventListener('blur', () => {
        isColorInputFocused = false;
    });
    saveBtn.addEventListener('click', () => {
        if (!imageData) return;
        const canvasData = previewCanvas.toDataURL();
        const link = document.createElement('a');
        link.href = canvasData;
        link.download = 'color-hex-code.png';
        link.click();
        previewCtx.font = '24px Arial';
        previewCtx.fillStyle = '#000';
        previewCtx.textAlign = 'center';
    });
    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

//    Volume Calc
    document.getElementById('volForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const height = parseFloat(document.getElementById('height').value);
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);

        if (height <= 0 || length <= 0 || width <= 0) {
            alert('Please enter positive values.');
            return;
        }

        const volume = height * length * width;

        document.getElementById('volresult').textContent = `Volume: ${volume.toFixed(2)} cubic units`;
    });

//    Compound Interest Calc
    document.getElementById('ciForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const invest = parseFloat(document.getElementById('invest').value);
        const time = parseFloat(document.getElementById('time').value);
        const apr = parseFloat(document.getElementById('apr').value);

        if (invest <= 0 || time <= 0 || apr <= 0) {
            alert('Please enter positive values.');
            return;
        }

        const monthly = apr / 1200;
        const months = time * 12;
        let total = invest;
        for (let i = 0; i < months; i++) {
            total = total * (1 + monthly)
        }

        document.getElementById('ciresult').textContent = `After ${time} years at ${apr}% compounded monthly, your investment will grow to $${total.toFixed(2)}.`;
    });

//    Random Color Generator
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

//    Breakout Game
    const canvas = document.getElementById("bkCanvas");
    const ctx = canvas.getContext("2d");
    const col = getRandomColor();
    const col2 = getRandomColor();
    const col3 = getRandomColor();
    const col4 = getRandomColor();
    const col5 = getRandomColor();

    let x = Math.floor(Math.random() * (canvas.width - 10)) + 5;
    let y = Math.floor(Math.random() * 310) + 5;
    let dx = Math.floor(Math.random() * 9) - 4;
    let dy;
    do {
        dy = Math.floor(Math.random() * 9) - 4;
    } while (dy === 0);
    const ballRadius = 5;

    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    document.addEventListener("touchstart", touchStartHandler, false);
    document.addEventListener("touchend", touchEndHandler, false);
    document.addEventListener("touchmove", touchMoveHandler, false);

    let deaths = 0;
    let score = 0;
    let level = 1;

    function resize() {
        // Resize the canvas to fill browser window dynamically
        canvas.width = 400;
    }

    window.addEventListener('resize', resize);
    resize();

    if (canvas.width < 450) {
        var brickRowCount = 6;
        var brickColumnCount = 10;
        var brickWidth = 31;
        var brickHeight = 10;
        var brickPadding = 8;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 9;
    } else {
        var brickRowCount = 6;
        var brickColumnCount = 10;
        var brickWidth = 37;
        var brickHeight = 10;
        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 10;
    }

    var bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    let allBricksHit = true;

    function keyDownHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
      }
    }

    function mouseMoveHandler(e) {
      const relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    }

    function touchStartHandler(e) {
        if (e.touches[0].clientX < canvas.width/2) {
            leftPressed = true;
        } else if (e.touches[0].clientX > canvas.width/2) {
            rightPressed = true;
        }
    }

    function touchEndHandler(e) {
        leftPressed = false;
        rightPressed = false;
    }

    function touchMoveHandler(e) {
        const relativeX = e.touches[0].clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
      ctx.strokeStyle = col5; // Set the color of the border
      ctx.lineWidth = 1; // Set the width of the border
      ctx.stroke();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = col2;
      ctx.fill();
      ctx.closePath();
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
              if (bricks[c][r].status === 1) {
                  const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                  const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                  bricks[c][r].x = brickX;
                  bricks[c][r].y = brickY;
                  ctx.beginPath();
                  ctx.rect(brickX, brickY, brickWidth, brickHeight);
                  ctx.fillStyle = col3;
                  ctx.fill();
                  ctx.closePath();
              }
        }
      }
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }
            }
        }
      }
    }

    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = col4;
      ctx.fillText(`Score: ${score}`, 8, 20);
      ctx.fillText(`Deaths: ${deaths}`, 150, 20);
      ctx.fillText(`dy/dx: ${dy}/${dx}`, 300, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        collisionDetection();
        drawScore();


        allBricksHit = true;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    allBricksHit = false;
                    break;
                }
            }
            if (!allBricksHit) {
                break;
            }
        }

        if (allBricksHit) {
            alrt = `LEVEL ${level} CLEARED`
            level++;
            alert(alrt);
            resetBlocks();
        }

        if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                if (x > paddleX && x <= paddleX + 5) {
                    dx = dx - 2;
                } else if  (x > paddleX + 5 && x <= paddleX + 25) {
                    dx--;
                } else if (x > paddleX + 50 && x <= paddleX + 70) {
                    dx++;
                } else if (x > paddleX + 70 && x <= paddleX + 75) {
                    dx = dx + 2;
                }
            } else {
                deaths++;
                if (dx > 4 || dx < -4) {
                    dx = Math.floor(Math.random() * 9) - 4;
                }
                if (deaths >= 10) {
                    alert("YOU DIED TOO MANY TIMES!");
                    clearInterval(interval);
                    resetGame();
                } else {
                    dy = -dy;
                }
            }
        }

        if (rightPressed) {
          paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
          paddleX = Math.max(paddleX - 7, 0);
        }

        x += dx;
        y += dy;
    }
    var interval = setInterval(draw, 10);

    function resetGame() {
        let x = Math.floor(Math.random() * (canvas.width - 10)) + 5;
        y = Math.floor(Math.random() * 310) + 5;
        dx = Math.floor(Math.random() * 9) - 4;
        dy = Math.floor(Math.random() * 9) - 4;
        do {
            dy = Math.floor(Math.random() * 9) - 4;
        } while (dy === 0);
        paddleX = (canvas.width - paddleWidth) / 2;
        deaths = 0;
        score = 0;
        for (let c = 0; c < brickColumnCount; c++) {
          bricks[c] = [];
          for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        interval = setInterval(draw, 10);
    }

    function resetBlocks() {
        for (let c = 0; c < brickColumnCount; c++) {
          bricks[c] = [];
          for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          }
        }
        let x = Math.floor(Math.random() * (canvas.width - 10)) + 5;
        y = Math.floor(Math.random() * 310) + 5;
        dx = Math.floor(Math.random() * 9) - 4;
        dy = Math.floor(Math.random() * 9) - 4;
        do {
            dy = Math.floor(Math.random() * 9) - 4;
        } while (dy === 0);
    }
});