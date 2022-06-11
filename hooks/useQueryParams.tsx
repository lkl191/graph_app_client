import { useRouter } from "next/router";
import React from "react";

const useQueryParams = (key: string) => {
    const router = useRouter()
    const value = router.query[key]

    return value
}

export { useQueryParams }