import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient";

import FormInputField from "../components/FormInputField"

import "../stylesheets/Forms.css"
import RequireGuest from "../routes/RequireGuest";

const fields = [
    {
        fieldName: "Email",
        fieldId: "email",
        fieldType: "email",
        inputType: "text"
    },
    {
        fieldName: "Password",
        fieldId: "password",
        fieldType: "password",
        inputType: "password",
        minLength: 10
    }
];

const Login = () => {

    const Navigate = useNavigate();
    const [fieldValidity, setFieldValidity] = useState<Record<string, boolean>>({});
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const handleValueChange = (fieldId: string, value: string) => {
        setFormValues(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleValidate = (fieldId: string, isValid: boolean) => {
        setFieldValidity(prev => ({ ...prev, [fieldId]: isValid }))
    }

    const formValid = fields.every(f => fieldValidity[f.fieldId] === true)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();

        if (!formValid) return;

        const { email, password } = formValues;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error(error.message);
            return;
        }

        console.log("Logged in:", data);

        Navigate("/dashboard");

    }

    return <><RequireGuest>
        <main className="forms">

        <section>
            <form onSubmit={handleLogin}>

                <div className="header">
                    <div className="icon">
                        <img src="src/assets/logo.png"/>
                    </div>
                    <h1>Log In</h1>
                    <hr/>
                </div>

                {fields.map(field => (
                    <FormInputField
                    key={field.fieldId}
                    fieldName={field.fieldName}
                    fieldId={field.fieldId}
                    fieldType={field.fieldType}
                    inputType={field.inputType}
                    minLength={field.minLength}
                    value={formValues[field.fieldId] || ""}
                    onChangeValue={handleValueChange}       
                    onValidate={handleValidate}
                    />
                ))}

                <p id="forgot_password">
                    <span onClick={() => {alert("WORK IN PROGRESS")}} className="link">Forgot Password</span>
                </p>

                <button type="submit" id="submit" disabled={!formValid}>Log In</button>

                <hr/>

                <p>Don't have an account? <span onClick={() => {Navigate("/signup")}} className="link">Create account</span>.</p>

            </form>
        </section>

        <section className="banner">
            <div className="title">
                <h1>
                    Welcome back to Drachma!
                </h1>
            </div>
        </section>

        </main>
    </RequireGuest></>

}

export default Login