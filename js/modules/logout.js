import { supabase, check_session } from "./supabase";

export async function logout() {

    check_session("../index.html", false);

    const { error } = await supabase.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }
    
    window.location.href = "../index.html";

}