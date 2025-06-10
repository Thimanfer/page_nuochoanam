// Cuộn đến form đặt hàng
function scrollToOrder() {
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// Countdown flash sale (12h)
function startCountdown(duration) {
    let timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        if (--timer < 0) timer = 0;
    }, 1000);
}

// Thêm hiệu ứng scroll reveal
function revealOnScroll() {
    const elements = document.querySelectorAll('.hidden');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// Thêm hiệu ứng hover cho sản phẩm
function initProductHover() {
    const product = document.querySelector('.hero-product');
    if (product) {
        product.addEventListener('mousemove', (e) => {
            const rect = product.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            product.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        product.addEventListener('mouseleave', () => {
            product.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    }
}

window.onload = function() {
    // 12h = 43200s
    startCountdown(43200);
    renderReviews();
    initProductHover();
    
    // Thêm class hidden cho các phần tử cần animate
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Lắng nghe sự kiện scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Xử lý form đặt hàng
    document.getElementById('order-form').onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Hiệu ứng loading
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Đang xử lý...';
        button.disabled = true;
        
        // Giả lập gửi form
        setTimeout(() => {
            alert('Đặt hàng thành công! Shop sẽ liên hệ bạn sớm.');
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    };
};

// Render đánh giá sản phẩm mẫu
function renderReviews() {
    const reviews = [
        {
            name: 'Nguyễn Trung Đức',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            time: '15 phút trước',
            text: 'Thơm không quá gắt, bám mùi khoảng 8 đến 9 tiếng. Shop giao hàng siêu nhanh và tư vấn nhiệt tình. Lại còn tặng thêm quà nữa yêu quá trời!'
        },
        {
            name: 'Phạm Công Thành',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            time: '20 phút trước',
            text: 'Hàng chuẩn thơm. Độ bám mùi được 8 tiếng đi dã ngoại hay đi làm đều rất nhẹ. Đặc biệt shop có tặng mẫu thử mini 1.5ml nữa nhé.'
        },
        {
            name: 'Anh Trí',
            avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
            time: '1 giờ trước',
            text: 'Độ lưu hương ấn tượng, dễ sử dụng. Shop lại còn tặng thêm chai 1,5 ml nhỏ nữa. Mọi người nên mua thử 1 lần!'
        }
    ];
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = reviews.map((r, index) => `
        <div class="review-item hidden" style="animation-delay: ${index * 0.2}s">
            <img class="review-avatar" src="${r.avatar}" alt="${r.name}">
            <div class="review-content">
                <div class="review-name">${r.name}</div>
                <div class="review-time">${r.time}</div>
                <div class="review-text">${r.text}</div>
            </div>
        </div>
    `).join('');
}
