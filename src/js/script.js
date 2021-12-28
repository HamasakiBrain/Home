$(document).ready(function () {
    let screenWidth = $("body").width()
    $(".burger-menu").on('click', function () {
        $(".mobile-menu").toggleClass('active')
    })
    if (screenWidth <= 700) {
        $(".mobile-menu-wrapper").append($(".menu_wrap"))
        $(".mobile-menu-wrapper").append($(".phone")[0])
        let img = $(".zakazat .col-4 img")
        let img2 = $(".zakazat .col-2 img").attr('src', '/img/pen2.png')
        $(".zakazat .col-12").prepend(img)
        $(".zakazat .col-12").append(img2)
        $(".zakazat .col-4").remove()
        $(".zakazat .col-2").remove()
        $(".uslugi-item-description br").remove()
        $('.menu_link').on('click', function (){
            $('.mobile-menu').toggleClass('active')
        })
    }

    let swiper = new Swiper(".gallery-wrapper", {
        slidesPerView: "auto",
        centeredSlides: "auto",
        spaceBetween: 140,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: "auto",
                // centeredSlides: "auto",
                spaceBetween: 40
            },
        }
    });
    let totalSlide = $(".gallery-wrapper .swiper-slide").length
    let tdx = totalSlide < 10 ? ("0" + totalSlide) : totalSlide;
    let fragment = $(".swiper-pagination-count");
    let s = swiper.realIndex + 1;
    if (s > totalSlide)
        s = 1;
    let idx = s < 10 ? ("0" + s) : s;
    fragment.html(`<span>${idx}</span>` + '/' + tdx)
    swiper.on('slideChange', function () {
        let current = swiper.realIndex + 1;
        if (current > totalSlide)
            current = 1;
        let idx = current < 10 ? ("0" + current) : current;
        console.log(current, tdx)
        fragment.html(`<span>${idx}</span>` + '/' + tdx)
    });
    $("input[name='phone']").mask("+ 7 (000)-000-00-00")
})
