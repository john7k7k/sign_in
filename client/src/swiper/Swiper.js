export class Swiper{
    constructor(options) {
        this.$options = options
        this.__init();
        //this.setupTouchSwipe();
        this.moveCount = 0;
    }

    __init(){
        this.SwiperContent = document.querySelector(this.$options.SwiperContent).children;
        this.classList = this.$options.classList;
        this.center = this.$options.center;
        if (window.innerWidth <= 600) {
            //this.__moveformobile(this.classList);
        }else if(window.innerWidth<1200){
            //this.__moveforipad();
        } else {
            this.__move(this.classList);
        }
    }

    __moveforipad(){
        [...this.SwiperContent].forEach((item) => {
            item.removeAttribute("class");
            item.setAttribute("class","forIpadcenter" );
        });
    }

    __moveformobile(List){
        [...this.SwiperContent].forEach((item) => {
            item.removeAttribute("class");
            item.setAttribute("class", List[0]);
        });
    }

    __move(List){
            [...this.SwiperContent].forEach((item, index) => {
                item.removeAttribute("class");
                item.setAttribute("class", List[index]);
            });
    }

    __leftMove() {
        //this.__lefttransform();
        this.a = this.classList.pop();
        this.classList.unshift(this.a);
        this.__move(this.classList);
        //this.incrementMoveCount();
    }

    __rightMove() {
        this.a = this.classList.shift();
        this.classList.push(this.a);
        this.__move(this.classList);
        //this.incrementMoveCount();
    }

    incrementMoveCount() {
        this.moveCount++;
        if (this.moveCount >= 4) {
            this.moveCount = 0;
        }
    }

    __lefttransform() {
        const currentThreeItem = [...this.SwiperContent].find(item => item.classList.contains("three"));
    
        if (currentThreeItem) {
            currentThreeItem.style.transition = 'transform 10s ease'; 
            currentThreeItem.style.transform = 'translateX(-275px)'; 
            const scaleInterval = setInterval(() => {
                const currentScale = parseFloat(currentThreeItem.style.transform.replace(/[^0-9.-]/g, ""));
                if (currentScale > 0.9) {
                    currentThreeItem.style.transform = `translateX(-275px) scale(${currentScale - 0.1})`;
                } else {
                    clearInterval(scaleInterval); // 停止縮放效果
                    setTimeout(() => {
                        currentThreeItem.style.transition = 'none';
                        currentThreeItem.style.transform = 'none';
                    }, 1000); // 1 秒後停止過渡效果，恢復原樣
                }
            }, 100);
        }
        
    }

    __timers() {
        setInterval(() => {
            this.__leftMove();
        },3000);
    }

    setupTouchSwipe() {
        let startX = 0;
        let endX = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;

            if (startX - endX > 50) {
                // 向左滑动，执行右移函数
                this.__rightMove();
            } else if (endX - startX > 50) {
                // 向右滑动，执行左移函数
                this.__leftMove();
            }
        });
    }

    setInstance(instance) {
        this.instance = instance;
    }
}