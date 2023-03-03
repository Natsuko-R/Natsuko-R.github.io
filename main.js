/*=============== 控制小屏nav菜单显示/隐藏 ===============*/
const navMobile = document.getElementById('mobile-nav'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== 显示 =====*/
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMobile.classList.add('show-menu')
    })
}

/*===== 隐藏 =====*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMobile.classList.remove('show-menu')
    })
}

/*=============== 点击菜单上的link后，退出菜单面板 ===============*/
const mobileLink = document.querySelectorAll('.mobile-link')

// 点击每一个nav-link都会remove这个类show-menu
function linkAction() {
    navMobile.classList.remove('show-menu')
}
mobileLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== 控制小屏tips弹窗 ===============*/
const tips = document.getElementById('tips'),
    tipsClose = document.getElementById('tips-close')

tipsClose.addEventListener('click', () => tips.style.display = 'none')


/*=============== 页面滚动后显示导航条 ===============*/
const Navbar = document.querySelector("[data-nav]")

window.addEventListener('scroll', () => {
    if (this.scrollY > 240) {
        Navbar.classList.add('active')
    } else {
        Navbar.classList.remove('active')
    }
})


/*=============== ABOUT切换三张图 ===============*/
const aboutTabs = [...document.querySelectorAll('.about-tab')];
const aboutItems = [...document.querySelectorAll('.about-item')];

// 切换三个页面
aboutTabs.forEach(itemLabel => {
    itemLabel.addEventListener('click', () => {
        performClassSwitcheroo(aboutTabs, itemLabel, 'isActive');
        let itemElement = document.getElementById(itemLabel.dataset.about);
        performClassSwitcheroo(aboutItems, itemElement, 'show');
    })
})

// 切换函数，无需更改
function performClassSwitcheroo(elements, target, className) {
    elements
        .filter(elem => elem.classList.contains(className))
        .forEach(elem => elem.classList.remove(className));
    target.classList.add(className);
}


/*=============== 页面滚动后显示导航条 ===============*/
// 参数和返回值 new Date(year, monthIndex, day, hours, minutes, seconds)

let now = new Date();
let year = now.getFullYear(); //获取年份
let month = now.getMonth() + 1; //获取月份
let today = now.getDate(); //获取每一天
let allDays; //一个月的总天数

// 显示月份
function showMonth() {
    let year_month = year + ". " + month;
    document.getElementById("month").innerHTML = year_month; //显示当前的年月日
}

// 计算不同月份的allDays总天数
function allDaysCount() {
    if (month != 2) {
        if (month == 4 || month == 6 || month == 9 || month == 11) //判断是否是相同天数的几个月，二月除外
            allDays = 30;
        else
            allDays = 31;
    }
    else {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) //判断是否是闰年，进行相应的改变
            allDays = 29;
        else
            allDays = 28;
    }
}

//显示本月
function showDay() {
    showMonth()
    allDaysCount();

    // getDay()返回星期几，如周六-6，周日-0
    let firstDay = new Date(year, month, 1); //获取本月第一天
    let firstDayWeek = firstDay.getDay(); // 获取本月第一天是星期几
    let days = document.getElementById("days");


    // 表格本身是一个二维数组，所以让for大师出来跑两个循环
    // 循环一：i为每月初的空白日
    for (let i = 0; i < firstDayWeek; i++) {
        let dayElement = document.createElement("div");
        // dayElement.innerHTML = '@';
        days.appendChild(dayElement);
    }

    // 循环二：j从i后循环输出天数
    for (let j = 1; j <= allDays; j++) {
        let dayElement = document.createElement("div");
        dayElement.innerHTML = j;
        dayElement.className = "active-day";

        //已经过去的日期的样式：
        // 1.当前月份下小于today；
        // 2.当前年份下，小于本月；
        // 3.小于当前年份
        if (j < today && month == now.getMonth() + 1 && year == now.getFullYear()
            || (year == now.getFullYear() && month < now.getMonth() + 1)
            || year < now.getFullYear()) {
            dayElement.classList.add('past-days')
        }
        //当前日today样式
        else if (j == today && month == now.getMonth() + 1 && year == now.getFullYear()) {
            dayElement.classList.add('today')
        }
        // 还未发生的日期的样式
        else {
            dayElement.classList.add('future-days')
        }

        days.appendChild(dayElement);
    }
}

//点击下个月
function next() {
    document.getElementById('days').innerHTML = "";
    if (month < 12) {
        month = month + 1;
    }
    else {
        month = 1;
        year = year + 1;
    }
    showDay();
}

//点击上个月
function prev() {
    document.getElementById('days').innerHTML = "";
    if (month > 1) {
        month = month - 1;
    }
    else {
        month = 12;
        year = year - 1;
    }
    showDay();
}

window.onload = function () {
    showDay();
    next();
    prev();
}


/*=============== 点击展开show more ===============*/

const showMoreBtn = document.getElementById('show-more')
const showMore = document.getElementById('more-str')
const moreItems = [...document.querySelectorAll('.more-item')]

showMoreBtn.addEventListener('click', (e) => {
    moreItems.forEach(e => {
        if (e.classList.contains('more-item')) {
            e.classList.remove('more-item')
            showMore.innerText = 'hide'
        } else {
            e.classList.add('more-item')
            showMore.innerText = 'show more'
        }
    })
})

/*=============== 回到顶部按钮 ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)


/*=============== 轮播图 ===============*/
let cardSwiper = new Swiper(".swiper-container", {
    loop: 'true',

    pagination: {
        el: '.swiper-pagination',
        clickable: "true",
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

});


/*=============== 点击查看大图 ===============*/

const img = document.getElementById('Cohen-img')
const bigImg = document.getElementById("big-img");
const maskWrap = document.getElementById('mask-wrap')

// 需要遮罩层的方法
img.addEventListener("click", () => {
    bigImg.setAttribute("src", img.getAttribute("src"));
    maskWrap.style.display = "block";
})

maskWrap.addEventListener("click", () => maskWrap.style.display = "none")

// 点击图片外部隐藏——判断条件
// if (bigImg !== e.target) { }

// 无需遮罩层的方法
// document.addEventListener("click", e => {
//     if (img == e.target || img.contains(e.target)) {
//         // 拿到imgItems里每一个图片的src，设置成bigImg的src
//         bigImg.setAttribute("src", img.getAttribute("src"));
//         bigImg.style.display = "block";
//     } else {
//         bigImg.style.display = "none"
//     }
// })




