import { withoutTransition } from "./transition_blocker"

export function change_theme(e) {

    let past_theme = get_current_theme()
    let themes = [past_theme]

    withoutTransition(() => {

        $("html").toggleClass("dark-mode")
        
    })

    let target = $(e.target)

    themes.push(get_current_theme())
    
    themes.sort().reverse()
    
    themes[themes.indexOf(past_theme)] = `<span>${past_theme}</span>`
            
    if(target.is("span")){
        target = target.parent()
    }
    
    target.html(`Theme: ${themes.join(" ")}`)
    
}

export function get_current_theme() {
    if ($("html").hasClass("dark-mode")) {
        return "dark"
    }

    return "light"
}