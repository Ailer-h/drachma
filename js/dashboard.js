import { start_navbar_controller } from "./modules/navbar";
import { check_session } from "./modules/supabase";

document.addEventListener("DOMContentLoaded", () => {

    check_session("login.html", false)

    start_navbar_controller();

})