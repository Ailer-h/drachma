import { check_session, addPaymentType } from "./modules/supabase";

document.addEventListener("DOMContentLoaded", () => {

    check_session("login.html", false)
    document.getElementById("new-payment-method").addEventListener("click", function (){})

})