import { logout } from "./logout";
import { change_theme } from "./themeController";
import { check_session } from "./supabase";

const menu_functionalities = {
    profile: function(){alert("wip")},
    theme: change_theme,
    logout: logout,
}

const navigation_tabs = {

    payments: {
        address: "paymentMethods.html",
        label: "Payment methods"
    },
    income: {
        address: "income.html",
        label: "Income sources"
    },
    expenses: {
        address: "expenses.html",
        label: "Expenses"
    }
    
}

function add_navigation_menu() {

    let navigation_menu = ""

    Object.entries(navigation_tabs).forEach(([id, props]) => {

        if (!window.location.href.includes(props.address)){
            navigation_menu += `<p class="navigation" id="${id}">${props.label}</p>`
        }
    })

    navigation_menu += $(".menu").html()

    $(".menu").html(navigation_menu)

}

function start_navbar_controller() {

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

    $(".navigation").each(function() {
        $(this).click(function() {
            check_session("login.html", false)

            window.location.href = navigation_tabs[$(this).attr('id')].address

        })
    })
    
}

document.addEventListener("DOMContentLoaded", () => {
    add_navigation_menu();
    start_navbar_controller();
})