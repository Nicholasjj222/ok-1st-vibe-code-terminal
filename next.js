<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Game</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #000;
            margin: 0;
            color: #fff;
        }
        canvas { border: 1px solid #fff; }
    </style>
</head>
<body>
    <canvas id="pong" width="800" height="400"></canvas>
    <script>
        const canvas = document.getElementById('pong');
        const context = canvas.getContext('2d');

        // Create the pong paddle
        const user = {
            x: 0,
            y: canvas.height / 2 - 50,
            width: 10,
            height: 100,
            color: 'white',
            score: 0
        };

        const computer = {
            x: canvas.width - 10,
            y: canvas.height / 2 - 50,
            width: 10,
            height: 100,
            color: 'white',
            score: 0
        };

        const ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 10,
            speed: 4,
            velocityX: 4,
            velocityY: 4,
            color: 'white'
        };

        // Draw the paddle and the ball
        function drawRect(x, y, width, height, color) {
            context.fillStyle = color;
            context.fillRect(x, y, width, height);
        }

        function drawArc(x, y, radius, color) {
            context.fillStyle = color;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2, false);
            context.closePath();
            context.fill();
        }

        // Control the player paddle
        canvas.addEventListener('mousemove', (event) => {
            let rect = canvas.getBoundingClientRect();
            user.y = event.clientY - rect.top - user.height / 2;
        });

        // Draw the scoreboard
        function drawScore() {
            context.font = '40px Arial';
            context.fillText(user.score, canvas.width / 4, canvas.height / 5);
            context.fillText(computer.score, 3 * canvas.width / 4, canvas.height / 5);
        }

        // Update game logic
        function update() {
            ball.x += ball.velocityX;
            ball.y += ball.velocityY;

            // Ball collision with top and bottom
            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                ball.velocityY = -ball.velocityY;
            }

            // Ball collision with paddles
            let player = (ball.x < canvas.width / 2) ? user : computer;
            if (collision(ball, player)) {
                ball.velocityX = -ball.velocityX;
            }

            // Score update
            if (ball.x - ball.radius < 0) {
                computer.score++;
                resetBall();
            } else if (ball.x + ball.radius > canvas.width) {
                user.score++;
                resetBall();
            }

            // AI control for computer paddle
            if (computer.y < ball.y - computer.height / 2) {
                computer.y += 4;
            } else {
                computer.y -= 4;
            }
        }

        function collision(ball, paddle) {
            return ball.x - ball.radius < paddle.x + paddle.width &&
                   ball.x + ball.radius > paddle.x &&
                   ball.y + ball.radius > paddle.y &&
                   ball.y - ball.radius < paddle.y + paddle.height;
        }

        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.velocityX = -ball.velocityX;
        }

        // Game loop
        function game() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawRect(user.x, user.y, user.width, user.height, user.color);
            drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
            drawArc(ball.x, ball.y, ball.radius, ball.color);
            drawScore();
            update();
            requestAnimationFrame(game);
        }

        game();
    </script>
</body>
</html>
