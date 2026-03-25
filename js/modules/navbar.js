import { logout } from "./logout.js";
import { debounce } from "./debounce.js"

export function start_navbar_controller() {

    let menu = $(".menu-items")

    $(".menu").find("button").click(function() {

        menu.slideDown(100, function(){
            menu.focus()    
        });

    })

    menu.on("focusout", function(e) {
        const next = e.relatedTarget;

        if (!menu.has(next).length) {
            menu.slideUp(100);
        }
    })

    document.getElementById("logout").addEventListener("click", logout)

}