import { useState } from "react";
import { CurrentPageEnum } from "../enums/CurrentPageEnum";

export function useAuthController() {
    const [currentPage, setPage] = useState<CurrentPageEnum>(CurrentPageEnum.Signin);

    function onChagendCurrentPage(currentPage: CurrentPageEnum){
        setPage(currentPage);
    }
    return {currentPage, onChagendCurrentPage};

}
