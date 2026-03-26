import { logout } from "./logout.js";
import { change_theme } from "./theme_controller.js";

const menu_functionalities = {
    profile: function(){alert("wip")},
    theme: change_theme,
    logout: logout,
}

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

    Object.entries(menu_functionalities).forEach(([id, func]) => {
        document.getElementById(id).addEventListener("click", func)
    })
    
}