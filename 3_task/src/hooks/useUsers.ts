import {useQuery} from "react-query";
import {UserService} from "../services/user.service";

export const useUsers = () => {
    const {isLoading, data: response, error} = useQuery('user list', () => UserService.getAll())

    return {isLoading, data: response, error}
}
