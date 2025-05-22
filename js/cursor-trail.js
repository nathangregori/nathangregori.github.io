document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('cursor-trail');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match window
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Fencing blade trail effect
    let trail = [];
    const maxTrailLength = 8; // Short trail for clean fencing movement
    const trailFadeSpeed = 0.15; // Slightly faster fade for quick movement
    
    // Blue-silver color palette for fencing blade effect
    const colors = [
        '#FFFFFF', // Pure white
        '#E0F7FF', // Light blue
        '#B3E5FC', // Soft blue
        '#81D4FA'  // Medium blue
    ];
    
    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTimestamp = 0;
    let speed = 0;
    let isMouseOnPage = false; // Track if mouse is on page
    
    // Update mouse position
    const updateMousePosition = (e) => {
        const currentTime = Date.now();
        const dx = e.clientX - mouseX;
        const dy = e.clientY - mouseY;
        const timeDiff = currentTime - lastTimestamp;
        
        // Calculate mouse speed for directional change detection
        if (timeDiff > 0) {
            speed = Math.sqrt(dx * dx + dy * dy) / timeDiff * 10;
        }
        
        lastTimestamp = currentTime;
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Initialize lastX and lastY on first mouse move
        if (!isMouseOnPage) {
            lastX = mouseX;
            lastY = mouseY;
            isMouseOnPage = true;
        }
    };
    
    document.addEventListener('mousemove', updateMousePosition);
    
    // Track when mouse leaves the page
    document.addEventListener('mouseleave', () => {
        isMouseOnPage = false;
    });
    
    document.addEventListener('mouseenter', () => {
        isMouseOnPage = true;
    });
    
    // Fencing Blade Particle class
    class BladeSegment {
        constructor(x, y, angle, speed) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.speed = speed;
            this.length = Math.min(30, 8 + speed * 0.7); // Shorter trails
            this.width = Math.min(2.5, 0.8 + speed * 0.05); // Slightly thinner
            this.opacity = 0.8; // Slightly less opaque
            
            // Random color from palette, with white more likely for fast movements
            const colorIndex = speed > 10 ? 0 : Math.floor(Math.random() * colors.length);
            this.color = colors[colorIndex];
            
            // Calculate end point based on angle and length
            this.endX = this.x + Math.cos(this.angle) * this.length;
            this.endY = this.y + Math.sin(this.angle) * this.length;
            
            // Sparks for quick direction changes
            this.hasSpark = speed > 18; // Higher threshold for sparks
            this.sparkSize = speed * 0.25; // Smaller sparks
            this.sparkOpacity = Math.min(0.9, 0.6 + speed * 0.015); // Less opaque sparks
        }
        
        update() {
            this.opacity -= trailFadeSpeed;
            
            // Fade out sparks faster
            if (this.hasSpark) {
                this.sparkOpacity -= trailFadeSpeed * 2;
            }
        }
        
        draw() {
            if (this.opacity <= 0) return;
            
            // Draw blade segment as a line
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.endX, this.endY);
            ctx.lineWidth = this.width;
            ctx.lineCap = 'round';
            
            // Line gradient for blade effect
            const gradient = ctx.createLinearGradient(
                this.x, this.y, this.endX, this.endY
            );
            
            const alphaHex = Math.round(this.opacity * 255).toString(16).padStart(2, '0');
            gradient.addColorStop(0, `${this.color}${alphaHex}`);
            gradient.addColorStop(1, `${this.color}00`);
            
            ctx.strokeStyle = gradient;
            ctx.shadowBlur = 3; // Reduced blur
            ctx.shadowColor = `${this.color}60`; // Less shadow opacity
            ctx.stroke();
            ctx.shadowBlur = 0;
            
            // Draw spark at the tip for quick movements
            if (this.hasSpark && this.sparkOpacity > 0) {
                ctx.beginPath();
                ctx.arc(this.endX, this.endY, this.sparkSize, 0, Math.PI * 2);
                
                // Spark gradient
                const sparkGradient = ctx.createRadialGradient(
                    this.endX, this.endY, 0,
                    this.endX, this.endY, this.sparkSize
                );
                
                const sparkAlphaHex = Math.round(this.sparkOpacity * 255).toString(16).padStart(2, '0');
                sparkGradient.addColorStop(0, '#FFFFFF');
                sparkGradient.addColorStop(0.6, `${this.color}${sparkAlphaHex}`);
                sparkGradient.addColorStop(1, `${this.color}00`);
                
                ctx.fillStyle = sparkGradient;
                ctx.shadowBlur = 10; // Reduced spark blur
                ctx.shadowColor = '#FFFFFF60'; // Less intense spark glow
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
    }
    
    // Initialize canvas as transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Animation loop
    const animate = () => {
        // Use clearRect for a completely transparent trail background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Only add trail segments when mouse is on page and moving
        if (isMouseOnPage) {
            const distance = Math.hypot(mouseX - lastX, mouseY - lastY);
            
            if (distance > 5) { // Only add segments with significant movement
                const angle = Math.atan2(mouseY - lastY, mouseX - lastX);
                    
                // Add a new segment
                trail.push(new BladeSegment(lastX, lastY, angle, speed));
                    
                // Limit trail length
                if (trail.length > maxTrailLength) {
                    trail.shift();
                }
                
                lastX = mouseX;
                lastY = mouseY;
            }
        }
        
        // Update and draw all blade segments
        for (let i = trail.length - 1; i >= 0; i--) {
            trail[i].update();
            trail[i].draw();
            
            // Remove completely faded segments
            if (trail[i].opacity <= 0.01) {
                trail.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    };
    
    animate();
}); 