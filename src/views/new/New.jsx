import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AxiosClient from "../../client/client";
import useSession from "../../hooks/useSession";
import "./styles.css";
import NavBar from "../../components/navbar/BlogNavbar";

const NewBlogPost = () => {

  const session = useSession()

  const [formData, setFormData] = useState({
    author: session.id,
    title: "",
    category: "Fantasy",
    readTimeValue: "",
    readTimeUnit: "Minuti",
    cover: null,
    content: "",
  });

  const [file, setFile] = useState(null)


  const onChangeSetFile = (e) => {
    setFile(e.target.files[0])
  }


  const uploadFile = async (cover) => {
    const fileData = new FormData()
    fileData.append('cover', cover)
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/cloudUpload`, {
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

      const readTimeValue = parseFloat(formData.readTimeValue);
      const uploadCover = await uploadFile(file)

      if (isNaN(readTimeValue)) {
        console.error("Il valore di Tempo di lettura non è un numero valido.");
        return;
      }

      const readTime = {
        value: formData.readTimeValue,
        unit: formData.readTimeUnit,
      };

      const data = {
        ...formData,
        readTime,
        cover: uploadCover.cover
      };

      try {

        const response = await client.post("/blogPosts/create", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.statusCode === 201) {
          console.log("Blog post created successfully:", response.payload);
        } else {
          console.error("Errore nella creazione del blog post");
        }

        const emailResponse = await client.post("/send-email", {
          to: session.email,
          subject: 'Nuovo Blog Post',
          text: 'Creazione del blog post avvenuta con successo'
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
      <NavBar />
      <Container className="new-blog-container asd">
        <h1 className="mb-4">Aggiungi Blog Post</h1>
        <Form encType="multipart/form-data" onSubmit={onSubmit} >
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              size="lg"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Titolo"
            />
          </Form.Group>

          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Musica">Musica</option>
              <option value="Cinema">Cinema</option>
              <option value="Teatro">Teatro</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="blog-readTime" className="mt-3">
            <Form.Label>Tempo di lettura</Form.Label>
            <Form.Control
              size="lg"
              name="readTimeValue"
              value={formData.readTimeValue}
              onChange={handleInputChange}
              placeholder="Numero"
            />
            <Form.Control
              size="lg"
              as="select"
              className="mt-3"
              name="readTimeUnit"
              value={formData.readTimeUnit}
              onChange={handleInputChange}
            >
              <option value="Minuti">Minuti</option>
              <option value="Ore">Ore</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="blog-cover" className="mt-3">
            <Form.Label>Cover</Form.Label>
            <Form.Control
              size="lg"
              type="file"
              onChange={onChangeSetFile}
              name="cover"
            />
          </Form.Group>

          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Post</Form.Label>
            <Form.Control
              as="textarea"
              size="lg"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Scrivi il tuo post..."
              style={{ minHeight: '200px' }}
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
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default NewBlogPost;
