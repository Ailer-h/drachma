import { check_session, addPaymentType } from "./modules/supabase";
import { get_icon } from "./modules/iconManager";

document.addEventListener("DOMContentLoaded", () => {

    check_session("login.html", false)
    document.getElementById("new-payment-method").addEventListener("click", function (){})

})