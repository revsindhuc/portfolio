function displayProgressBar(elementId) {
    var el = document.getElementById(elementId); // get canvas

    var options = {
        percent:  el.getAttribute('data-percent') || 25,
        size: el.getAttribute('data-size') || 180,
        lineWidth: el.getAttribute('data-line-width') || 12,
        rotate: el.getAttribute('data-rotate') || 0,
        bgColor: el.getAttribute('data-background-color') || 'rgba(239, 239, 239, 0.2)',
        fgColor: el.getAttribute('data-color') || '#555555',
        canvasClass: el.getAttribute('data-canvas-class') || 'progress-bar-canvas',
        spanClass: el.getAttribute('data-span-class') || 'progress-bar-text',
    }

    var canvas = document.createElement('canvas');
    var span = document.createElement('span');
    canvas.className = options.canvasClass;
    span.className = options.spanClass;
    span.textContent = options.percent + '%';
        
    if (typeof(G_vmlCanvasManager) !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = options.size;

    el.appendChild(span);
    el.appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2); // change center
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    var radius = (options.size - options.lineWidth) / 2;

    var drawCircle = function(color, lineWidth, percent) {
            percent = Math.min(Math.max(0, percent || 1), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
            ctx.strokeStyle = color;
            ctx.lineCap = 'square'; // butt, round or square
            ctx.lineWidth = lineWidth
            ctx.stroke();
    };

    drawCircle(options.bgColor, options.lineWidth, 100 / 100);
    drawCircle(options.fgColor, options.lineWidth, options.percent / 100);
}


