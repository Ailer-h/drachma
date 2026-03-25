function scrollbar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    const scrollable = docHeight - winHeight;

    if (scrollable <= 0) return;

    let percent = scrollTop / scrollable;

    percent = Math.max(0, Math.min(1, percent));

    const trackHeight = winHeight - 80;
    const thumbHeight = $(".thumb").outerHeight();

    const maxMove = trackHeight - thumbHeight;
    const thumbTop = percent * maxMove;

    $(".scroll-container").css({"background-color": "rgba(0, 0, 0, 0.384)", "transition": "200ms ease-in-out"})
    $(".thumb").css({"width": "100%"});

    $(".thumb").css("transform", `translateY(${thumbTop}px)`);

}

function hide_scroll() {
    setTimeout(() => {
        $(".scroll-container").css({"background-color": "rgba(0, 0, 0, 0)", "transition": "200ms ease-in-out"})
        $(".thumb").css({"width": "70%"});
    }, 200);
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", scrollbar);
    window.addEventListener("resize", scrollbar);
    window.addEventListener("scrollend", hide_scroll);

    scrollbar();
    hide_scroll();

})