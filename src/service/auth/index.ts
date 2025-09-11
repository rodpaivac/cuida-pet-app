import { UserDTO } from "@dtos/UserDTO";
import { api } from "@service/api";

export const signInApi = async (cpf: string, password: string) => {
    const response = await api.post("/login", {
        cpf: cpf, password: password
    })

    if (response.data) {
        return response.data
    }

}


export const newUserApi = async (user: UserDTO, image: FormData | null) => {

    const response = await api.post("/new-user", {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        birthdate: user.birthdate,
        gender: user.gender,
        cpf: user.cpf, //id
        password: user.password
    });

    if (image) {
        try {
            await uploadUserImageApi(user.cpf, image);

        } catch (error) {
            console.log(error)
        }
    }

    return response.status === 201;
}

export const editUserApi = async (user: UserDTO, image: FormData | null) => {
    if (!user.cpf) {
        return;
    }

    let newImageUrl = null;

    if (image) {
        try {
            newImageUrl = await uploadUserImageApi(user.cpf, image);
        } catch (error) {
            console.log(error)
        }
    }


    const response = await api.put(`/edit-user/${user.cpf}`, {
        name: user.name,
        email: user.email,
        avatar: newImageUrl ?? user.avatar,
        phone: user.phone,
        birthdate: user.birthdate,
        gender: user.gender,
    })

    console.log(response.data.user)
    if (response.data.user) {
        return response.data.user;
    }
    return;
}


const uploadUserImageApi = async (cpf: string, image: FormData) => {
    if (!cpf || !image) {
        return;
    }
    const response = await api.post(`/upload-user-avatar/${cpf}`, image,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    if (response.data.url) {
        return response.data.url
    }
}