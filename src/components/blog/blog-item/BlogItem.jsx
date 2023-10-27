import React from "react";
import { Card } from "react-bootstrap";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const BlogItem = ({ title, category, cover, authorNome, authorCognome, authorAvatar, content, _id }) => {
  return (
    <Card className="blog-card my-5 ">
      <Link to={`/blogPosts/${_id}`} className="blog-link">
        <Card.Img variant="top" src={cover} className="blog-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Row>
            <Col>
              <p>{category}</p>
              <div className="ellissi-3-righe">{content}</div>
            </Col>
          </Row>
        </Card.Body>
      </Link>
      <Card.Footer>
        <Row>
          <Col
            xs={2}>
            <Image className="blog-author" src={authorAvatar} roundedCircle />
          </Col>
          <Col>
            <div>by</div>
            <h6>{`${authorNome} ${authorCognome}`}</h6>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default BlogItem;
