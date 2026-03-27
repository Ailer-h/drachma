import { check_session } from "./modules/supabase";

document.addEventListener("DOMContentLoaded", () => {

    check_session("login.html", false)

})