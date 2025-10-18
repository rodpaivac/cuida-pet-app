import { UserDTO } from "@dtos/UserDTO";
import { api } from "@service/api";

export const signInApi = async (cpf: string, password: string) => {
    console.log('login')
    const response = await api.post("/login", {
        cpf: cpf, password: password
    })

    console.log('response', response)

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

export const changePasswordApi = async (currentPassword: string, newPassword: string, cpf: string) => {
    if (!currentPassword || !newPassword || !cpf) {
        return;
    }

    const response = await api.put("/change-password", {
        cpf: cpf, currentPassword: currentPassword, newPassword: newPassword
    })

    if (response.data) {
        return response.data
    }
}

export const verifyUserDataApi = async (cpf: string, phone: string, birthdate: Date, email: string) => {

    if (!phone || !birthdate || !cpf || !email) {
        return;
    }

    const response = await api.post("/verify-user-data", {
        cpf: cpf, phone: phone, birthdate: birthdate, email: email
    })

    if (response.data) {
        return response.data.valid
    }

}

export const forgotPasswordApi = async (cpf: string, newPassword: string) => {
    if (!cpf || !newPassword) {
        return;
    }

    const response = await api.put("/forgot-password", {
        cpf: cpf, password: newPassword
    })

    if (response.data) {
        return response.data;
    }
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