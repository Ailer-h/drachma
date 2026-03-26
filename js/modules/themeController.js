import { withoutTransition } from "./transitionBlocker"

export function change_theme(e) {

    withoutTransition(() => {

        $("html").toggleClass("dark-mode")
        
    })

    let target = $(e.target)

    if(target.is("span")){
        target = target.parent()
    }
    
    target.html(`Theme: ${get_theme_label()}`)
    
}

export function get_current_theme() {
    if ($("html").hasClass("dark-mode")) {
        return "dark"
    }

    return "light"
}

export function get_theme_label() {

    let curr_theme = get_current_theme()

    if (curr_theme == "dark") {
        return "<span>light</span> dark"
        
    }
    
    return "light <span>dark</span>"

}