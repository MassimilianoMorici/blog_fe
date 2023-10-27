import React from "react";
import useSession from "../../hooks/useSession";
import { Container, Image } from "react-bootstrap";
import "./account.css";
import NavBar from "../../components/navbar/BlogNavbar";


const Account = () => {

    const session = useSession()

    return (
        <>
            <NavBar />
            <div className="blog-details-root">

                <Container className="my-5 d-flex flex-wrap">
                    <Image className="blog-details-avatar me-4" src={session.avatar} fluid />
                    <div>
                        <h1>Ciao {session.nome}!</h1>
                        <h2>info account:</h2>
                        <h4>Nome: {session.nome}</h4>
                        <h4>Cognome: {session.cognome}</h4>
                        <h4>Email: {session.email}</h4>
                        <h4>Data di nascita: {session.dataDiNascita}</h4>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Account; 