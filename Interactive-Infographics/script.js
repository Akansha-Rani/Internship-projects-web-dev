// Animate counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Animate stat cards
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        setTimeout(() => {
            const number = card.querySelector('.stat-number');
            const progress = card.querySelector('.stat-progress');
            const target = parseInt(number.dataset.target);
            
            animateCounter(number, target);
            
            setTimeout(() => {
                progress.style.width = '85%';
            }, 100);
        }, index * 200);
    });
}

// Animate bar chart
function animateBars() {
    const barItems = document.querySelectorAll('.bar-item');
    
    barItems.forEach((item, index) => {
        setTimeout(() => {
            const bar = item.querySelector('.bar');
            const percent = item.dataset.percent;
            bar.style.width = percent + '%';
        }, index * 150);
    });
}

// Animate pie chart
function animatePieChart() {
    const segments = document.querySelectorAll('.pie-segment');
    const circumference = 2 * Math.PI * 80;
    let currentAngle = 0;
    
    segments.forEach((segment, index) => {
        setTimeout(() => {
            const value = parseFloat(segment.dataset.value);
            const segmentLength = (value / 100) * circumference;
            const gap = circumference - segmentLength;
            
            segment.style.strokeDasharray = `${segmentLength} ${gap}`;
            segment.style.strokeDashoffset = -currentAngle;
            
            currentAngle += segmentLength;
        }, index * 500);
    });
}

// Animate timeline on scroll
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add hover effects to stat cards
function addHoverEffects() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize all animations
function init() {
    setTimeout(() => {
        animateStats();
    }, 300);
    
    setTimeout(() => {
        animateBars();
    }, 1000);
    
    setTimeout(() => {
        animatePieChart();
    }, 1500);
    
    animateTimeline();
    addHoverEffects();
}

// Wait for page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
