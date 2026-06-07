'use client'
import { useRouter, useParams } from "next/navigation"
import { supabase } from "../../../lib/supabaseClient"
import { useState } from "react"

const AccountDetails = () => {

    const [ loading, setLoading ] = useState(true)

    const params = useParams()
    const accountName = params?.accountName as string
    const router = useRouter()

    const isAccountValid = async () => {

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return

        const { data, error } = await supabase
            .from("accounts")
            .select("id, account_name")
            .eq("user_id", user.id)

        if (error) {
            console.log(error)
            return false
        }

        const accounts = data.map((value) => {
            return value.account_name.toString().toLowerCase()
        })

        return accounts.includes(accountName)

    }

    const validateAccountPage = async () => {

        const accountValid = await isAccountValid()

        if (!accountValid) {
            router.push("/")
            return
        }

        setLoading(false)

    }

    validateAccountPage()

    return <>

        {
            !loading &&
            <h1>{accountName}</h1>
        }

    </>

}

export default AccountDetails
