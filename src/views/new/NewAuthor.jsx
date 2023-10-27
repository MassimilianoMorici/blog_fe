import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AxiosClient from "../../client/client";
import "./styles.css";
import NavBarNoToken from "../../components/navbar/NavbarNoToken";

const NewAuthor = () => {

    const [formData, setFormData] = useState({
        nome: "",
        cognome: "",
        email: "",
        password: "",
        dataDiNascita: "",
        avatar: null,
    });

    const [file, setFile] = useState(null)

    const onChangeSetFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = async (avatar) => {
        const fileData = new FormData()
        fileData.append('avatar', avatar)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/authors/cloudUpload`, {
                method: "POST",
                body: fileData
            })
            return await response.json()
        } catch (e) {
            console.log(e, "Errore in uploadFile");
        }
    }


    const client = new AxiosClient();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (file) {

            const uploadCover = await uploadFile(file)
            const data = {
                ...formData,
                avatar: uploadCover.avatar
            };

            try {

                const response = await client.post("/authors/create", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.statusCode === 201) {
                    console.log("Author created successfully:", response.payload);
                } else {
                    console.error("Errore nella creazione dell'autore");
                }

                const emailResponse = await client.post("/send-email", {
                    to: formData.email,
                    subject: 'Creazione Account',
                    text: 'Creazione del tuo account avvenuta con successo'
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(emailResponse);

            } catch (e) {
                console.error("Errore nella richiesta al server:", e);
            }
        }
    };

    return (
        <>
            <NavBarNoToken />
            <Container className="new-blog-container asd">
                <h1 className="mb-4">Registrati</h1>
                <Form encType="multipart/form-data" onSubmit={onSubmit} >

                    <Form.Group controlId="nome-form" className="mt-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            size="lg"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            placeholder="Nome"
                        />
                    </Form.Group>

                    <Form.Group controlId="cognome-form" className="mt-3">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                            size="lg"
                            name="cognome"
                            value={formData.cognome}
                            onChange={handleInputChange}
                            placeholder="Cognome"
                        />
                    </Form.Group>

                    <Form.Group controlId="email-form" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            size="lg"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password-form" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            size="lg"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                    </Form.Group>

                    <Form.Group controlId="dataDiNascita-form" className="mt-3">
                        <Form.Label>Data di nascita</Form.Label>
                        <Form.Control
                            size="lg"
                            name="dataDiNascita"
                            value={formData.dataDiNascita}
                            onChange={handleInputChange}
                            placeholder="DD / MM / YY"
                        />
                    </Form.Group>

                    <Form.Group controlId="avatar-form" className="mt-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            size="lg"
                            type="file"
                            onChange={onChangeSetFile}
                            name="avatar"
                        />
                    </Form.Group>



                    <Form.Group className="d-flex mt-3 justify-content-end">
                        <Button type="reset" size="lg" variant="outline-dark">
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            variant="dark"
                            style={{
                                marginLeft: "1em",
                            }}
                        > Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};

export default NewAuthor;