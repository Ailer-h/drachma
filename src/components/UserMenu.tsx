import { useEffect, useRef, type FocusEventHandler } from "react"
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface UserMenuProps {

    visible: boolean,
    onBlur: FocusEventHandler

}

const UserMenu = ({visible, onBlur}: UserMenuProps) => {

    const firstItemRef = useRef<HTMLLIElement>(null);
    const Navigate = useNavigate();

    const handleLogout = async () => {

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error(error.message);
            return;
        }

        Navigate("/");

    }

    useEffect(() => {
        if (visible) {
            firstItemRef.current?.focus();
        }
    }, [visible]);

    return <>
        <menu className={`menu-items ${visible ? "open" : ""}`} tabIndex={-1} ref={firstItemRef} onBlur={onBlur}>
            <li id="profile">Henrique Ailer <span>Profile</span></li>
            <li id="theme">Theme: light <span>dark</span></li>

            <hr/>
            <button id="logout" onClick={handleLogout}>Log-out</button>

        </menu>
    </>

}

export default UserMenu