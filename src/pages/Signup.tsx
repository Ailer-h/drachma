import { useState } from "react"
import { useNavigate } from "react-router-dom"

import FormInputField from "../components/FormInputField";

import "../stylesheets/Forms.css"
import { supabase } from "../lib/supabaseClient";
import RequireGuest from "../routes/RequireGuest";
import type { InputType } from "../Types";

const fields = [
    {
        fieldName: "Username",
        fieldId: "username",
        fieldType: "text",
        inputType: "text",
        minLength: 5
    },
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
    },
    {
        fieldName: "Confirm Password",
        fieldId: "confirmPassword",
        fieldType: "password",
        inputType: "password",
        minLength: 10,
        matchTo: "password"
    }
];

const Signup = () => {

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

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!formValid) return;

        const { username, email, password } = formValues;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: username
                }
            }
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
            <form onSubmit={handleSignup}>

                <div className="header">
                    <div className="icon">
                        <img src="src/assets/logo.png"/>
                    </div>
                    <h1>Sign Up</h1>
                    <hr/>
                </div>

               {fields.map(field => (
                    <FormInputField
                    key={field.fieldId}
                    fieldName={field.fieldName}
                    fieldId={field.fieldId}
                    fieldType={field.fieldType}
                    inputType={field.inputType as InputType}
                    minLength={field.minLength}
                    value={formValues[field.fieldId] || ""}
                    matchValue={field.matchTo ? formValues[field.matchTo] || "" : undefined}
                    onChangeValue={handleValueChange}       
                    onValidate={handleValidate}
                    />
                ))}
                
                <button type="submit" id="submit" disabled={!formValid}>Sign Up</button>

                <hr/>
                
                <p>Already have an account? <span onClick={() => {Navigate("/login")}} className="link">Log In</span>.</p>

            </form>
        </section>
        
        <section className="banner">
            <div className="title">
                <h1>Welcome to Drachma!</h1>
                <h2>Create an account to give your first steps towards wealth.</h2>
            </div>
        </section>

    </main>
    </RequireGuest></>

}

export default Signup