document.addEventListener('DOMContentLoaded', () => {
    initDiscRadarChart();
});

function initDiscRadarChart() {
    const canvas = document.getElementById('disc-radar-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.65; // Reduced from 0.8 to give more space for labels
    
    // DISC data with full trait names instead of abbreviations
    const labels = [
        'Dominance', 
        'Dominance-Influence', 
        'Influence', 
        'Influence-Steadiness', 
        'Steadiness', 
        'Steadiness-Compliance', 
        'Compliance', 
        'Compliance-Dominance'
    ];
    
    // Short versions for circle labels
    const shortLabels = [
        'D', 
        'di', 
        'I', 
        'is', 
        'S', 
        'sc', 
        'C', 
        'cd'
    ];
    
    // Data values from the image (octagonal teal shape)
    const data = [65, 82, 85, 80, 75, 70, 60, 65];
    const sides = labels.length;
    
    // Chart colors - using white for the web
    const chartColor = '#ffffff'; // White for chart lines
    const chartFillColor = 'rgba(255, 255, 255, 0.3)'; // Transparent white fill
    
    // Animation variables
    let animationProgress = 0;
    const animationDuration = 1500; // 1.5 seconds
    let startTime = null;
    
    // Clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }
    
    // Draw the background grid
    function drawGrid() {
        const steps = 4; // 4 concentric circles (25%, 50%, 75%, 100%)
        
        // Draw the circles
        for (let i = 1; i <= steps; i++) {
            const currentRadius = (radius * i) / steps;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Add percentage labels at each circle (25%, 50%, etc.)
            if (i < steps) { // Don't show 100% on the outer rim
                ctx.font = '14px Inter, sans-serif'; // Larger font
                ctx.fillStyle = 'rgba(128, 128, 128, 0.7)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${i * 25}%`, centerX, centerY - currentRadius);
            }
        }
        
        // Draw the lines from center to vertices
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides - Math.PI / 2; // Start from top
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + radius * Math.cos(angle),
                centerY + radius * Math.sin(angle)
            );
            ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    // Draw the labels
    function drawLabels() {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides - Math.PI / 2; // Start from top
            const labelRadius = radius * 1.3; // Increased from 1.15 to push labels further out
            const x = centerX + labelRadius * Math.cos(angle);
            const y = centerY + labelRadius * Math.sin(angle);
            
            // Draw the full trait name
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(labels[i], x, y);
        }
    }
    
    // Draw the data polygon with animation
    function drawData(progress) {
        const animatedData = data.map(value => value * progress / 100);
        
        // Draw the filled polygon for the data
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides - Math.PI / 2; // Start from top
            const value = animatedData[i];
            const pointRadius = (radius * value) / 100;
            
            const x = centerX + pointRadius * Math.cos(angle);
            const y = centerY + pointRadius * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        // Close the path
        ctx.closePath();
        
        // Fill with white color
        ctx.fillStyle = chartFillColor;
        ctx.fill();
        
        // Add a white border
        ctx.strokeStyle = chartColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw data points and values
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides - Math.PI / 2; // Start from top
            const value = animatedData[i];
            const pointRadius = (radius * value) / 100;
            
            const x = centerX + pointRadius * Math.cos(angle);
            const y = centerY + pointRadius * Math.sin(angle);
            
            // Draw a small circle at each data point
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = chartColor;
            ctx.fill();
            
            // Draw percentage right next to data point
            if (progress === 100) { // Only show when animation is complete
                // Calculate offset for percentage text
                const textOffset = 20;
                const textX = x + textOffset * Math.cos(angle);
                const textY = y + textOffset * Math.sin(angle);
                
                ctx.font = '14px Inter, sans-serif'; // Thinner font for percentages
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${Math.round(data[i])}%`, textX, textY);
            }
        }
    }
    
    // Animation function
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Calculate animation progress (0 to 1)
        const progress = Math.min(elapsed / animationDuration, 1);
        animationProgress = progress * 100;
        
        clearCanvas();
        drawGrid();
        drawData(progress * 100);
        drawLabels();
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Add subtle continuous animation after the initial animation
            setTimeout(() => {
                startPulseAnimation();
            }, 500);
        }
    }
    
    // Add a subtle pulse animation after the main animation completes
    function startPulseAnimation() {
        let pulseTime = 0;
        
        function pulseAnimate(timestamp) {
            pulseTime += 0.01;
            const pulseFactor = 1 + Math.sin(pulseTime) * 0.02;
            
            clearCanvas();
            drawGrid();
            
            // Draw data with subtle pulse effect
            ctx.save();
            ctx.scale(pulseFactor, pulseFactor);
            ctx.translate((1 - pulseFactor) * centerX, (1 - pulseFactor) * centerY);
            drawData(100);
            ctx.restore();
            
            drawLabels();
            
            requestAnimationFrame(pulseAnimate);
        }
        
        requestAnimationFrame(pulseAnimate);
    }
    
    // Start the animation
    requestAnimationFrame(animate);
} 