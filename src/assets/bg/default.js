/*
    Mouse move BG-Pos
     */
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    //Background position percentage bound
    const bounds = {
        axisX: [0, 100],
        axisY: [0, 100]
    }

    const percX = mouseX / innerWidth;
    const percY = mouseY / innerHeight;

    const posX = percX * (bounds.axisX[1] - bounds.axisX[0]) + bounds.axisX[0];
    const posY = percY * (bounds.axisY[1] - bounds.axisY[0]) + bounds.axisY[0];

    document.body.style.backgroundPosition = `${posX.toFixed(6)}% ${posY.toFixed(6)}%`;
})